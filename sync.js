const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// DOPLŇ SVOJE PRIHLASOVACIE ÚDAJE DO GASTROONAUTU:
const EMAIL = 'willkommen@salonplafond.wien';
const PASSWORD = 'Salonplafond6';
const AUTH_FILE = path.join(__dirname, 'auth.json');

async function stiahniData() {
  console.log('1. Spúšťam prehliadač...');
  const browser = await chromium.launch({ headless: false }); 
  
  let contextOptions = {};
  if (fs.existsSync(AUTH_FILE)) {
    console.log('> Našiel som uloženú reláciu (auth.json), skúšam ju použiť...');
    contextOptions = { storageState: AUTH_FILE };
  }

  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    console.log('2. Otváram aplikáciu...');
    await page.goto('https://app.gastronaut.ai/', { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(3000);

    // Skontrolujeme, či nás to hodilo na prihlasovaciu stránku (čiže auth.json exspiroval)
    if (page.url().includes('/auth/login')) {
      console.log('> Uložená relácia vypršala alebo neplatí. Prihlasujem sa nanovo...');
      
      // Ak existuje starý nefunkčný auth.json, zmažeme ho
      if (fs.existsSync(AUTH_FILE)) {
        fs.unlinkSync(AUTH_FILE);
      }

      await page.fill('input[name="email"]', EMAIL);
      await page.fill('input[name="password"]', PASSWORD);
      await page.click('button[type="submit"]');

      console.log('3. Čakám na prebehnutie prihlásenia...');
      await page.waitForTimeout(5000);

      // Uložíme novú čerstvú reláciu
      await context.storageState({ path: AUTH_FILE });
      console.log('> Nová relácia úspešne uložená do auth.json.');
      
      // Prejdeme na hlavnú stránku
      await page.goto('https://app.gastronaut.ai/', { waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(3000);
    } else {
      console.log('> Úspešne prihlásený cez uloženú reláciu!');
    }

    console.log('4. Hľadám a klikam na kachličku Reservierungen...');
    const rezervacieBtn = page.locator('button[aria-label="Reservierungen"]');
    await rezervacieBtn.waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(1000);
    await rezervacieBtn.click();

    console.log('5. Čakám na načítanie layoutu stolov (tablePlan)...');
    await page.waitForTimeout(6000); // Priestor pre WebSocket dáta

    // Funkcia na vyťahovanie štatistík a zoznamu z aktuálnej smeny
    async function vybalSmenuKomplet() {
      for (let i = 0; i < 4; i++) {
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(400);
      }

      return await page.evaluate(() => {
        const statElements = Array.from(document.querySelectorAll('span.text-3.color-subdued'));
        const statistiky = statElements.map(el => el.innerText.trim()).filter(Boolean);

        const riadky = document.body.innerText
          .split('\n')
          .map(r => r.trim())
          .filter(Boolean);

        const rezervacie = [];
        const uzMame = new Set();

        for (let i = 0; i < riadky.length; i++) {
          if (riadky[i].startsWith('#') && riadky[i].length > 4) {
            const kodMeno = riadky[i];
            if (!uzMame.has(kodMeno)) {
              uzMame.add(kodMeno);
              rezervacie.push({
                cas_a_osoby: riadky[i - 1] || '',
                kod_a_meno: kodMeno,
                stol: riadky[i + 1] || ''
              });
            }
          }
        }

        return {
          suhrnne_hodnoty: statistiky,
          pocet_v_zozname: rezervacie.length,
          rezervacie: rezervacie
        };
      });
    }

    // Bezpečné prepínanie smén
    async function prepniSmenu(nazovSmeny) {
      console.log(`Prepínam smenu na: ${nazovSmeny}...`);
      
      const tlacidloSmeny = page.locator('button:has-text("Ganzer Tag"), button:has-text("FRÜHSCHICHT"), button:has-text("ABENDSCHICHT")').first();
      await tlacidloSmeny.click();
      await page.waitForTimeout(1500);

      await page.evaluate((hladanyText) => {
        const spans = Array.from(document.querySelectorAll('span, div'));
        const ciel = spans.find(el => el.innerText.trim() === hladanyText && el.offsetParent !== null);
        if (ciel) ciel.click();
      }, nazovSmeny);

      await page.waitForTimeout(5000);
    }

    // 1. Frühschicht
    await prepniSmenu('FRÜHSCHICHT');
    const fruhData = await vybalSmenuKomplet();
    console.log(`Frühschicht hotová – Počet v zozname: ${fruhData.pocet_v_zozname}`);

    // 2. Abendschicht
    await prepniSmenu('ABENDSCHICHT');
    const abendData = await vybalSmenuKomplet();
    console.log(`Abendschicht hotová – Počet v zozname: ${abendData.pocet_v_zozname}`);

    // Finálny objekt
    const kompletnyVysledok = {
      aktualizovane: new Date().toLocaleString('sk-SK'),
      fruhschicht: fruhData,
      abendschicht: abendData
    };

    fs.writeFileSync('data.json', JSON.stringify(kompletnyVysledok, null, 2), 'utf-8');
    console.log('HOTOVO! Všetky dáta úspešne uložené do data.json.');

  } catch (chyba) {
    console.error('Nastala chyba:', chyba);
  } finally {
    await browser.close();
  }
}

stiahniData();