/* ============================================================
   js/dashboard.js
   Dashboard (Startseite nach dem Login) + Wechsel zwischen
   Dashboard und Getränke-Datenbank.

   NEUE KACHEL HINZUFÜGEN: unten in dashTileDefs() einen Eintrag ergänzen
   (id, icon, title, sub, run = Funktionsname als Text, need = wer sie sieht).
   Und in dashLayoutFor() die id in die gewünschte Gruppe eintragen.
   ============================================================ */

    // ---------- Welche Kacheln gibt es? ----------
    // need: 'all' = alle, 'edit' = darf Getränke bearbeiten, 'admin' = Manager/Developer
    function dashTileDefs() {
      const seasonSub = (typeof currentSeasonFilter !== 'undefined' && currentSeasonFilter)
        ? 'Aktiv: ' + currentSeasonFilter : 'Aktive Karte wählen';
      const drinkCount = (typeof allDrinks !== 'undefined' && allDrinks.length) ? allDrinks.length + ' Getränke · ' : '';
      return {
        drinks:   { icon: '🍸', title: 'Getränke & Rezepte', sub: drinkCount + 'Datenbank öffnen', run: 'openDrinksView', need: 'all', primary: true },
        season:   { icon: '📅', title: 'Saison wählen', sub: seasonSub, run: 'openSeasonModal', need: 'admin' },
        print:    { icon: '🖨️', title: 'Karte drucken / PDF', sub: 'A3-Getränkekarte', run: 'openA3PrintSetupModal', need: 'admin' },
        impexp:   { icon: '📊', title: 'Import & Export', sub: 'Excel oder CSV', run: 'openImportExportModal', need: 'edit' },
        teamplan: { icon: '📆', title: 'Team & Arbeitsplan', sub: 'Monatsraster, Stunden, Schichten', run: 'openTeamPlanModal', need: 'admin' },
        staff:    { icon: '👤', title: 'Personal & PINs', sub: 'Mitarbeiter, Rollen, Rechte', run: 'openStaffPinModal', need: 'admin' },
        chat:     { icon: '💬', title: 'Team-Chat', sub: 'Nachrichten ans Team', run: 'openTeamChatModal', need: 'all', badge: 'dashChatBadge' },
        myplan:   { icon: '🗓️', title: 'Mein Arbeitsplan', sub: 'Deine Schichten', run: 'openWorkScheduleModal', need: 'all' },
        login:    { icon: '🔐', title: 'Login-Protokoll', sub: 'Wer war wann online', run: 'openLoginHistoryModal', need: 'admin' },
        settings: { icon: '⚙️', title: 'Einstellungen', sub: 'Design, Schrift, Hinweise', run: 'openUnifiedSettingsModal', need: 'admin' },
        news:     { icon: '🚀', title: 'Was ist neu?', sub: 'Neuigkeiten & Team-News', run: 'openChangelogModal', need: 'all' },
        support:  { icon: '🛟', title: 'Support & Tickets', sub: 'Fehler melden, Anfragen', run: 'openSupportModal', need: 'admin', badge: 'dashTicketBadge' }
      };
    }

    // ---------- Anordnung je Rolle ----------
    function dashLayoutFor() {
      if (userIsAdmin) {
        return [
          { title: '🍸 Bar & Betrieb',          ids: ['drinks', 'season', 'print', 'impexp'] },
          { title: '👥 Team & Personal',        ids: ['teamplan', 'staff', 'chat'] },
          { title: '🔐 Sicherheit & System',    ids: ['login', 'settings'] },
          { title: '💡 Support & Infos',        ids: ['news', 'support'] }
        ];
      }
      // Kellner: Datenbank, eigener Plan, Chat, Neuigkeiten (+ Import, falls Getränke-Recht)
      const ids = ['drinks', 'myplan', 'chat', 'news'];
      if (userCanEdit) ids.splice(1, 0, 'impexp');
      return [{ title: '', ids }];
    }

    // ---------- Anzeigen ----------
    function dashTileHtml(id, d) {
      const badge = d.badge ? `<span id="${d.badge}" class="dash-badge hidden">0</span>` : '';
      return `
        <button type="button" onclick="dashRun(${jsArg(d.run)})" class="dash-tile${d.primary ? ' dash-tile-primary' : ''}" data-tile="${escapeHtml(id)}">
          <span class="dash-ico">${d.icon}${badge}</span>
          <span class="dash-text"><b>${escapeHtml(d.title)}</b><small>${escapeHtml(d.sub)}</small></span>
          <span class="dash-arrow">›</span>
        </button>`;
    }

    function renderDashboard() {
      const groupsEl = document.getElementById('dashGroups');
      if (!groupsEl) return;
      const defs = dashTileDefs();

      const hello = document.getElementById('dashHello');
      if (hello) {
        const h = new Date().getHours();
        const greet = h < 11 ? 'Guten Morgen' : (h < 18 ? 'Hallo' : 'Guten Abend');
        hello.textContent = greet + ', ' + (currentWaiterName || '') + '!';
      }
      const dateEl = document.getElementById('dashDate');
      if (dateEl) dateEl.textContent = new Date().toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const pill = document.getElementById('dashRolePill');
      if (pill) {
        pill.textContent = ({ developer: 'Developer', manager: 'Manager' })[currentStaffRole] || 'Kellner';
        pill.className = 'staff-pill ' + (currentStaffRole === 'developer' ? 'pill-dev' : currentStaffRole === 'manager' ? 'pill-manager' : 'pill-staff');
      }

      groupsEl.innerHTML = dashLayoutFor().map(g => {
        const tiles = g.ids.map(id => defs[id] ? dashTileHtml(id, defs[id]) : '').join('');
        return `<section class="dash-group">
          ${g.title ? `<h3 class="dash-group-title">${escapeHtml(g.title)}</h3>` : ''}
          <div class="dash-grid">${tiles}</div>
        </section>`;
      }).join('');

      refreshDashboardBadges();
    }

    // Kachel antippen: Funktion aufrufen (nur bekannte Funktionen, nie beliebigen Text ausführen)
    function dashRun(fnName) {
      const allowed = Object.values(dashTileDefs()).map(d => d.run);
      if (allowed.indexOf(fnName) === -1) return;
      const fn = window[fnName];
      if (typeof fn === 'function') fn();
    }

    // Zähler auf den Kacheln (Chat ungelesen, offene Tickets)
    function refreshDashboardBadges() {
      const chat = document.getElementById('dashChatBadge');
      if (chat) {
        const n = (typeof chatUnreadCount !== 'undefined') ? chatUnreadCount : 0;
        chat.textContent = n > 99 ? '99+' : String(n);
        chat.classList.toggle('hidden', n <= 0);
      }
      const ticket = document.getElementById('dashTicketBadge');
      if (ticket) {
        const n = window.dashPendingTickets || 0;
        ticket.textContent = String(n);
        ticket.classList.toggle('hidden', n <= 0);
      }
    }

    // ---------- Wechsel Dashboard <-> Getränke-Datenbank ----------
    function isDrinksViewOpen() {
      const v = document.getElementById('drinksView');
      return !!v && !v.classList.contains('hidden');
    }

    function showDashboard(opts) {
      const o = opts || {};
      const dash = document.getElementById('dashboardView');
      const drinks = document.getElementById('drinksView');
      if (!dash || !drinks) return;
      closeSettingsMenu();
      renderDashboard();
      drinks.classList.add('hidden');
      dash.classList.remove('hidden');
      document.body.classList.add('on-dashboard');
      if (!o.fromPopState && history.state && history.state.view === 'drinks') {
        // Zurück-Knopf der App = Zurück im Browser, damit der Verlauf stimmt
        try { history.back(); return; } catch (e) {}
      }
      window.scrollTo({ top: 0 });
    }

    function openDrinksView(opts) {
      const o = opts || {};
      const dash = document.getElementById('dashboardView');
      const drinks = document.getElementById('drinksView');
      if (!dash || !drinks) return;
      closeSettingsMenu();
      dash.classList.add('hidden');
      drinks.classList.remove('hidden');
      document.body.classList.remove('on-dashboard');
      if (!o.fromPopState) {
        try { history.pushState({ view: 'drinks' }, '', '#drinks'); } catch (e) {}
      }
      window.scrollTo({ top: 0 });
    }

    // Android-Zurück / Browser-Zurück: aus der Datenbank zurück zum Dashboard
    window.addEventListener('popstate', () => {
      if (!currentWaiterName) return;
      if (history.state && history.state.view === 'drinks') openDrinksView({ fromPopState: true });
      else showDashboard({ fromPopState: true });
    });
