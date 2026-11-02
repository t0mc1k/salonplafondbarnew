/* ============================================================
   js/changelog.js
   Version, Changelog ("Was ist neu?") und dessen Bedienung

   NEUE VERSION VERÖFFENTLICHEN (nur hier ändern):
   1. APP_VERSION unten auf die neue Nummer setzen.
   2. Oben in CHANGELOG einen neuen Eintrag einfügen (neueste Version zuerst).
      Die bisher aktuelle Version rutscht automatisch ins Archiv.
   3. In index.html alle "?v=..." auf die neue Nummer setzen (Cache).
   Änderungs-Typen: 'new' Neu, 'improved' Verbessert, 'fixed' Behoben,
                    'security' Sicherheit, 'info' Allgemein
   ============================================================ */
    const APP_VERSION = '4.0.00';

    const CHANGELOG = [
  { version: '4.0.00', range: '', date: 'November 2026', title: 'Fehlerbehebungen & Verlauf aufräumen',
    changes: [
      ['fixed', 'In Eingabefeldern und Fenstern (Mengen, Minuten, Preise, PIN, Suche ...) ließen sich keine Zahlen eintippen und mit Backspace nichts löschen. Das funktioniert wieder überall.'],
      ['new', 'Schichttausch → Verlauf: Manager und Developer können einzelne Einträge oder den gesamten Verlauf löschen.'],
    ] },
  { version: '3.2.03', range: '', date: 'November 2026', title: 'Checklisten, Schichttausch, Stunden, Speisekarte & mehr',
    changes: [
      ['new', 'Checklisten & Standards: Aufgaben für Öffnung, Laufend und Schließung, getrennt nach Bar, Service und Terrasse. Eine gemeinsame Liste pro Tag: Wer abhakt, steht mit Name und Uhrzeit dabei. Manager/Developer legen die Aufgaben selbst an und ändern sie. Für das Team heißt die Kachel „Meine Schicht“.'],
      ['new', 'Schichttausch: Anfrage direkt an einen Kollegen oder in die Börse für alle. Wer die Schicht übernimmt, bestätigt; am Ende entscheidet immer der Manager. Erst dann wird der Arbeitsplan geändert.'],
      ['new', 'Mein Arbeitsplan: Monatskalender mit deinen Schichten, Pausen (Minuten) und Tausch-Anfrage pro Tag.'],
      ['new', 'Stunden & Lohn (Manager/Developer): Monatsstunden pro Person (geplant − Pause + Korrektur), Korrekturen pro Tag und Excel-Export für die Lohnverrechnung. Ohne Zuschläge.'],
      ['new', 'Speisekarte & Allergene: Speisekarte pro Saison mit Allergenen A–R (Österreich), Suche, Ausblenden nach Allergen und Einfügen aus Excel. Die Getränke sind ebenfalls nach Allergenen durchsuchbar.'],
      ['new', 'Störungen melden (mit Foto und Dringlichkeit), Fundsachen und Verluste & Bruch: drei getrennte Funktionen für das ganze Team. Störungen und Verluste sehen Manager/Developer, Fundsachen alle.'],
      ['improved', 'Das Dashboard hat neue Kacheln und Zähler (Tausch-Anfragen, neue Störungen).'],
      ['info', 'Wichtig für den Betrieb: Den Arbeitsplan können nur noch Manager und Developer ändern (auch der Excel-Import).']
    ] },
  { version: '3.2.02', range: '', date: 'November 2026', title: 'Einfachere, kompakte Anmeldung',
    changes: [
      ['improved', 'Anmeldung komplett vereinfacht: alles passt auf einen Bildschirm, ein kleiner Kopf statt großem Logo, alle Namen in einer kompakten Liste (A–Z) mit Suche und den letzten 3 Anmeldungen als schnelle Knöpfe.'],
      ['improved', 'PIN-Eingabe übersichtlicher: gewählter Name mit Foto und „Ändern“, PIN als Punkte, kleinere Zahlentasten. Am Computer geht die Eingabe auch mit der Tastatur (Enter = Anmelden, Esc = Name ändern).'],
      ['improved', 'Leitung (Manager/Developer) steht nicht mehr in einem eigenen Bereich, sondern ist in der Liste klein beschriftet.'],
      ['info', 'Die „klassische Ansicht“ der Anmeldung entfällt, weil die neue Liste sie ersetzt.']
    ] },
  { version: '3.2.01', range: '', date: 'November 2026', title: 'Dashboard als Startseite & Team-Arbeitsplan',
    changes: [
      ['new', 'Dashboard als Startseite: Nach dem Login siehst du zuerst übersichtliche Kacheln statt direkt der Getränkeliste. Manager und Developer bekommen vier Bereiche (Bar & Betrieb, Team & Personal, Sicherheit & System, Support & Infos), Kellner ihre vier wichtigsten Kacheln: Getränke & Rezepte, Mein Arbeitsplan, Team-Chat und Was ist neu?.'],
      ['new', 'Team & Arbeitsplan (Manager/Developer): Monatsraster für das ganze Team mit Schichten pro Tag, Stunden pro Mitarbeiter, Besetzung pro Tag, Monatswechsel und Excel-Export. Schichten lassen sich per Tipp auf ein Feld ändern (auch Frei, Urlaub, Krank).'],
      ['new', 'Zähler auf den Kacheln: ungelesene Chat-Nachrichten und offene Support-Tickets.'],
      ['improved', 'In der Getränke-Datenbank gibt es oben „← Dashboard“; auch der Zurück-Knopf am Handy führt zurück zum Dashboard. Im Menü stehen „Dashboard“ und „Getränke & Rezepte“ ganz oben.'],
      ['improved', 'Die Team-Ansicht im alten Arbeitsplan-Fenster sehen jetzt nur noch Manager und Developer; Kellner sehen weiterhin ihren eigenen Plan.']
    ] },
  { version: '3.1.04', range: '', date: 'Oktober 2026', title: 'Schnellere Anmeldung, mehrere Fotos & klarere Handy-Ansicht',
    changes: [
      ['new', 'Bis zu 3 Fotos pro Getränk: Hauptfoto festlegen, Fotos entfernen, direkt vom Handy aufnehmen oder hochladen. Im Detail gibt es eine kleine Galerie. Fotos werden vor dem Hochladen automatisch verkleinert.'],
      ['improved', 'Anmeldung neu: „Zuletzt auf diesem Gerät“ ganz oben, Namenssuche, Team und Leitung (Manager/Developer) getrennt und alles kompakt statt langem Scrollen. Mit dem Link unter der Liste kannst du jederzeit zur klassischen Ansicht wechseln.'],
      ['improved', 'Handy-Kopf wie in der Küche-App: voller Name „Salonplafond BAR“, Chat und Einstellungen als Symbole sowie eine Zeile mit deinem Foto, Namen und „Wechseln“.'],
      ['improved', 'Der Arbeitsplan ist am Handy nicht mehr auf der Startseite, sondern in Mein Profil (und weiter im Menü). Am Computer bleibt er auf der Startseite.'],
      ['fixed', 'Saison und Filter werden am Handy nicht mehr abgeschnitten.']
    ] },
  { version: '3.1.03', range: '', date: 'Oktober 2026', title: 'Handy-Ansicht & App installieren',
    changes: [
      ['new', 'App installierbar: Symbol auf dem Startbildschirm (Android, iPhone, Computer). Sie startet ohne Browser-Leiste, öffnet schneller und auch bei schwachem Netz. Installieren-Knopf und Anleitung findest du unter Menü → App installieren bzw. in den Einstellungen.'],
      ['improved', 'Handy-Ansicht deutlich einfacher: schlanke Kopfleiste (Chat und Menü), Kategorien und Schnellzugriff (Saison, Arbeitsplan, Filter) als wischbare Reihen und ein runder ➕-Knopf unten rechts für neue Getränke.'],
      ['improved', 'Benutzer wechseln und Vollbild liegen am Handy im Menü; am Computer bleibt alles wie gewohnt in der Kopfleiste.'],
      ['improved', '„App neu laden“ leert jetzt auch den Zwischenspeicher der App.'],
      ['fixed', 'Die Kategorien-Leiste blieb nach dem Start leer, bis man eine Saison oder Kategorie wählte.']
    ] },
  { version: '3.1.02', range: '', date: 'Oktober 2026', title: 'Team-Chat, neues Menü, Einstellungen & augenschonender Hellmodus',
    changes: [
      ['new', 'Team-Chat als echte Kommunikations-App: Reaktionen mit Emoji, Nachrichten bearbeiten, Fotos senden, wichtige Nachricht anpinnen, Suche, „schreibt ...“-Anzeige, Trennung nach Tagen und Markierung neuer Nachrichten.'],
      ['new', 'Neue Kategorie direkt beim Anlegen eines Getränks erstellen. Sie erscheint nach dem Speichern automatisch in der Kategorien-Leiste.'],
      ['new', 'Einstellungen & Zentrale mit vielen neuen Optionen: Design Hell/Dunkel/Automatisch, Schriftgröße, Sortierung, Preise ein/aus, weniger Animationen sowie einzeln schaltbare Hinweise und Chat-Ton.'],
      ['improved', 'Menü übersichtlich in Bereiche gegliedert (Getränke & Karte, Team & Arbeit, Verwaltung, App) – jeder Punkt mit kurzer Erklärung und dein Profil gleich oben.'],
      ['improved', 'Mein Profil neu gestaltet: Profilkarte, Status-Vorschläge, PIN mit Wiederholung und Übersicht deiner Rechte.'],
      ['improved', 'Getränke-Formular neu aufgebaut: Bestseller, Vegan, Glutenfrei und Laktosefrei sind jetzt einstellbar, dazu Live-Marge und Foto-Vorschau.'],
      ['improved', 'Hellmodus augenschonender: warmer Hintergrund, kräftigere Textfarben und keine dunklen Menüs mehr.'],
      ['fixed', 'Der Hell/Dunkel-Schalter folgt jetzt der App-Einstellung statt dem Gerät. Dadurch waren Menüs im hellen Modus teils dunkel und Texte schwer lesbar.'],
      ['fixed', 'Changelog: Die Reiter wurden bei „Alle Versionen“ und „Team-News“ verdeckt.'],
      ['fixed', 'Design und Ansicht werden jetzt dauerhaft gemerkt.']
    ] },
  { version: '3.1.01', range: '', date: 'Oktober 2026', title: 'Weichzeichner, neue Verwaltung & neuer Changelog',
    changes: [
      ['new', 'Weichzeichner-Effekt (Milchglas) in Dialogen, Menüs und Hinweisen – in den Einstellungen & Zentrale ein- und ausschaltbar.'],
      ['new', 'Hinweis oben rechts, sobald sich ein Kollege anmeldet. Er verschwindet nach wenigen Sekunden von selbst.'],
      ['new', 'Die Logo-Animation zeigt jetzt das Profilfoto des angemeldeten Benutzers.'],
      ['improved', 'Personal & PINs (Zentrale) komplett neu gestaltet: Suche, Filter nach Rolle, übersichtliche Karten und ein eigener Bearbeiten-Bildschirm mit PIN-Hilfe.'],
      ['improved', 'Changelog neu aufgebaut: Reiter „Neu in dieser Version“, „Alle Versionen“ (aufklappbar, mit Suche und Filter) und „Team-News“. Ältere Versionen wandern automatisch ins Archiv.'],
      ['fixed', 'Logo: über dem O ist jetzt eine einzige durchgehende Linie statt zwei getrennter Striche.'],
      ['fixed', 'Login-Protokoll leeren funktioniert wieder (deutsche Beschriftung, serverseitig abgesichert).']
    ] },
  { version: '3.1.00', range: '', date: 'Oktober 2026', title: 'Modularisierung & Chat',
    changes: [
      ['improved', 'App in übersichtliche Module aufgeteilt (einfacher zu warten und zu erweitern).'],
      ['new', 'Team-Chat: @-Vorschläge beim Tippen und Textformatierung (fett, kursiv).'],
      ['new', 'Login-Protokoll kann geleert werden; der Menüpunkt dafür entfällt, die Verwaltung liegt unter Personal & PINs.'],
      ['fixed', 'Saison-Dialog: Der Schließen-Button überlappt nicht mehr mit „Neue Saison“.']
    ] },
  { version: '3.0.52', range: '', date: 'Oktober 2026', title: 'Menü, Multi-View & Textschutz',
    changes: [
      ['new', 'Getränke lassen sich per Drag & Drop (Maus oder langes Drücken am Handy) in den Multi-View ziehen.'],
      ['fixed', 'Das Menü lässt sich am PC wieder mit dem Mausrad scrollen.'],
      ['security', 'Texte aus der Datenbank (Namen, Chat, Tickets, Rezepte) werden vor der Anzeige abgesichert.']
    ] },
  { version: '3.0.51', range: '', date: 'Oktober 2026', title: 'Deutsche Oberfläche',
    changes: [
      ['improved', 'Deutsche Oberfläche; Saisons kommen nur noch aus der Datenbank (kein festes Sommer 2026).'],
      ['fixed', 'Mobilmenü bleibt im Bildschirm und ist scrollbar.']
    ] },
  { version: '3.0.50', range: '', date: 'Oktober 2026', title: 'Sicherer Login',
    changes: [
      ['security', 'PIN-Login über den Server: PINs werden nur noch verschlüsselt gespeichert, nach mehreren Fehlversuchen wird kurz gesperrt.'],
      ['security', 'Rechte pro Mitarbeiter („Darf Getränke bearbeiten“) und abgesicherte Datenbank (Chat, Tickets, Fotos, Personal).']
    ] },
  { version: "3.0.49", range: "", date: "Oktober 2026", title: "Arbeitsplan & Versionshistorie",
    changes: [ ['info', "Persönlicher Arbeitsplan für das Servicepersonal mit Testhinweis sowie vollständige, gegliederte Versionshistorie von v1.0 bis v3.0.49."] ] },
  { version: "3.0.47", range: "", date: "Oktober 2026", title: "Saison-Löschung & Benachrichtigungen",
    changes: [ ['info', "Entfernen der Login-Benachrichtigungsanimation für Kollegen; kaskadierendes Löschen von Saisons (z. B. Summer 2026 inklusive aller zugehörigen Drinks)."] ] },
  { version: "3.0.46", range: "v3.0.40 – v3.0.46", date: "September - Oktober 2026", title: "PIN-Login, Chat & Profile",
    changes: [ ['info', "Einführung des PIN-Login-Grids für das Personal, Speichern der Login-Historie (login_history), Online-Status-Erkennung, verbesserter Echtzeit-Team-Chat mit @Mentions sowie Profilen mit Bio und Fotos."] ] },
  { version: "3.0.39", range: "v3.0.30 – v3.0.39", date: "August - September 2026", title: "Saisons, Margen & A3-Druck",
    changes: [ ['info', "Unterstützung mehrerer Saisons, dynamische Berechnung von Margen und Wareneinsatz, A3-Druckvorschau für 3 Drinks, verbesserter Excel/CSV-Import/Export-Assistent."] ] },
  { version: "3.0.29", range: "v3.0.20 – v3.0.29", date: "Juli - August 2026", title: "Bar Tray & Multi-View",
    changes: [ ['info', "Einführung des Bar Trays und des Multi-View-Rezeptvergleichs, Filter nach Allergien, vegan, glutenfrei, laktosefrei und Glastyp."] ] },
  { version: "3.0.19", range: "v1.0 – v3.0.19", date: "2026", title: "Grundlagen der App",
    changes: [ ['info', "Grundlegende Getränkeliste, Kategorien (Cocktails, Mocktails, Salonplafond Classic, After Dinner Drinks, APERITIF), dunkler/heller Modus und Fotos über Supabase Storage."] ] }
    ];

    const CHANGELOG_TYPES = {
      new:      { icon: '✨', label: 'Neu' },
      improved: { icon: '🔧', label: 'Verbessert' },
      fixed:    { icon: '🐞', label: 'Behoben' },
      security: { icon: '🔒', label: 'Sicherheit' },
      info:     { icon: '📌', label: 'Allgemein' }
    };
    const CHANGELOG_TYPE_ORDER = ['new', 'improved', 'fixed', 'security', 'info'];

    let changelogTab = 'current';
    let changelogFilter = 'all';
    let changelogQuery = '';
    let changelogNews = [];

    function versionLabel(e) {
      return e.range ? e.range : 'v' + e.version;
    }

    function applyVersionLabels() {
      document.title = 'Salonplafond NeXuS · BAR v' + APP_VERSION;
      document.querySelectorAll('[data-app-version]').forEach(el => { el.textContent = 'v' + APP_VERSION; });
      document.querySelectorAll('[data-app-number]').forEach(el => { el.textContent = APP_VERSION; });
      document.querySelectorAll('[data-brand-header]').forEach(el => { el.textContent = 'BAR v' + APP_VERSION; });
      const badge = document.getElementById('changelogVersionBadge');
      if (badge) badge.textContent = 'v' + APP_VERSION;
      if (CHANGELOG[0] && CHANGELOG[0].version !== APP_VERSION) {
        console.warn('Changelog: Der oberste Eintrag (' + CHANGELOG[0].version + ') passt nicht zu APP_VERSION (' + APP_VERSION + ').');
      }
    }

    function openChangelogModal() {
      closeSettingsMenu();
      changelogFilter = 'all';
      changelogQuery = '';
      const search = document.getElementById('clSearch');
      if (search) search.value = '';
      applyVersionLabels();
      renderChangelogCurrent();
      renderChangelogAll();
      setChangelogTab('current');
      loadChangelogNews();
      const modal = document.getElementById('changelogModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeChangelogModal() {
      const modal = document.getElementById('changelogModal');
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }

    function setChangelogTab(tab) {
      changelogTab = tab;
      ['current', 'all', 'news'].forEach(t => {
        const panel = document.getElementById('clPanel_' + t);
        const btn = document.getElementById('clTab_' + t);
        if (panel) panel.classList.toggle('hidden', t !== tab);
        if (btn) {
          btn.classList.toggle('active', t === tab);
          btn.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        }
      });
      const body = document.getElementById('clBody');
      if (body) body.scrollTop = 0;
    }

    function changelogGroupsHtml(changes, onlyType) {
      let html = '';
      CHANGELOG_TYPE_ORDER.forEach(type => {
        if (onlyType && onlyType !== 'all' && onlyType !== type) return;
        const items = (changes || []).filter(c => c[0] === type);
        if (!items.length) return;
        const meta = CHANGELOG_TYPES[type];
        html += `
          <div class="cl-group">
            <div class="cl-group-head cl-t-${type}"><span>${meta.icon}</span> ${escapeHtml(meta.label)}</div>
            <ul class="cl-list">
              ${items.map(c => `<li>${escapeHtml(c[1])}</li>`).join('')}
            </ul>
          </div>`;
      });
      return html;
    }

    function renderChangelogCurrent() {
      const box = document.getElementById('clCurrentContent');
      if (!box || !CHANGELOG.length) return;
      const cur = CHANGELOG[0];
      const prev = CHANGELOG[1];
      box.innerHTML = `
        <div class="cl-hero">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="cl-ver">${escapeHtml(versionLabel(cur))}</span>
            <span class="cl-date">${escapeHtml(cur.date || '')}</span>
          </div>
          <h4 class="cl-title">${escapeHtml(cur.title || 'Neu in dieser Version')}</h4>
        </div>
        ${changelogGroupsHtml(cur.changes, 'all')}
        ${prev ? `<button type="button" onclick="setChangelogTab('all')" class="cl-link">📜 Frühere Versionen ansehen (zuletzt ${escapeHtml(versionLabel(prev))})</button>` : ''}
      `;
    }

    function changelogMatches(entry, change, q) {
      if (!q) return true;
      const hay = (versionLabel(entry) + ' ' + (entry.title || '') + ' ' + (entry.date || '') + ' ' + change[1]).toLowerCase();
      return hay.indexOf(q) !== -1;
    }

    function renderChangelogAll() {
      const list = document.getElementById('clAllList');
      const info = document.getElementById('clResultInfo');
      const countEl = document.getElementById('clAllCount');
      if (!list) return;
      const q = (changelogQuery || '').trim().toLowerCase();
      const f = changelogFilter;
      const filtering = !!q || f !== 'all';

      let shown = 0;
      let html = '';
      CHANGELOG.forEach((e, idx) => {
        const metaHit = q && (versionLabel(e) + ' ' + (e.title || '') + ' ' + (e.date || '')).toLowerCase().indexOf(q) !== -1;
        const changes = (e.changes || []).filter(c => (f === 'all' || c[0] === f) && (metaHit || changelogMatches(e, c, q)));
        if (!changes.length) return;
        shown++;
        const open = filtering || idx === 0;
        html += `
          <details class="cl-item" ${open ? 'open' : ''}>
            <summary>
              <span class="cl-ver">${escapeHtml(versionLabel(e))}</span>
              <span class="cl-sum-title">${escapeHtml(e.title || '')}</span>
              <span class="cl-date">${escapeHtml(e.date || '')}</span>
              <span class="cl-count">${changes.length}</span>
              <span class="cl-arrow">▸</span>
            </summary>
            <div class="cl-item-body">${changelogGroupsHtml(changes, 'all')}</div>
          </details>`;
      });

      list.innerHTML = html || `<p class="cl-empty">Keine Einträge gefunden. Versuche einen anderen Suchbegriff oder Filter.</p>`;
      if (info) info.textContent = filtering ? `${shown} von ${CHANGELOG.length} Versionen` : `${CHANGELOG.length} Versionen`;
      if (countEl) countEl.textContent = String(CHANGELOG.length);

      CHANGELOG_TYPE_ORDER.concat(['all']).forEach(t => {
        const chip = document.getElementById('clChip_' + t);
        if (chip) chip.classList.toggle('active', t === f);
      });
    }

    function setChangelogFilter(type) {
      changelogFilter = type;
      renderChangelogAll();
    }

    function onChangelogSearch(value) {
      changelogQuery = value || '';
      renderChangelogAll();
    }

    function toggleAllChangelogItems(open) {
      document.querySelectorAll('#clAllList details.cl-item').forEach(d => { d.open = !!open; });
    }

    async function loadChangelogNews() {
      const list = document.getElementById('clNewsList');
      const countEl = document.getElementById('clNewsCount');
      if (list) list.innerHTML = `<p class="cl-empty">Lade Team-News...</p>`;
      const { data, error } = await _supabase.from('support_tickets').select('*').eq('is_changelog', true).order('created_at', { ascending: false }).limit(50);
      if (error) {
        if (list) list.innerHTML = `<p class="cl-empty">Fehler beim Laden: ${escapeHtml(error.message)}</p>`;
        return;
      }
      changelogNews = data || [];
      if (countEl) countEl.textContent = String(changelogNews.length);
      renderChangelogNews();
    }

    function renderChangelogNews() {
      const list = document.getElementById('clNewsList');
      if (!list) return;
      if (!changelogNews.length) {
        list.innerHTML = `<p class="cl-empty">Noch keine Team-News veröffentlicht.</p>`;
        return;
      }
      list.innerHTML = changelogNews.map(item => {
        const dateStr = new Date(item.created_at).toLocaleDateString('de-AT');
        return `
          <div class="cl-news">
            <div class="cl-news-head">
              <span>${escapeHtml(item.author_email || 'Team')}</span>
              <span class="cl-date">${escapeHtml(dateStr)}</span>
            </div>
            <p class="cl-news-text">${escapeHtml(item.message)}</p>
          </div>`;
      }).join('');
    }

    async function submitNewChangelog() {
      checkManagerAuth(async () => {
        const textInput = document.getElementById('newChangelogText');
        const text = textInput.value.trim();
        if (!text) return alert("Bitte Neuigkeit eingeben.");

        const { error } = await _supabase.from('support_tickets').insert([{
          author_email: `${currentWaiterName} (${currentStaffRole || 'staff'})`,
          message: text,
          status: 'resolved',
          is_changelog: true,
          admin_comment: 'Veröffentlicht von ' + currentWaiterName
        }]);

        if (error) {
          alert("Fehler: " + error.message);
        } else {
          textInput.value = '';
          showAppToast({ initial: '📣', title: 'Neuigkeit veröffentlicht', text: 'Die Team-News ist jetzt für alle sichtbar.' });
          loadChangelogNews();
        }
      });
    }
