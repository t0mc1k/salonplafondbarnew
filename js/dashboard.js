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
        ? t('menu.seasonActive', { name: currentSeasonFilter }) : t('dash.seasonSub0');
      const n = (typeof allDrinks !== 'undefined') ? allDrinks.length : 0;
      const drinkSub = n ? t('dash.drinksSub', { n }) : t('dash.drinksSub0');
      const adm = !!userIsAdmin;
      return {
        drinks:   { icon: '🍸', title: t('dash.drinks'), sub: drinkSub, run: 'openDrinksView', need: 'all', primary: true },
        allergens:{ icon: '🍽️', title: t('dash.allergens'), sub: t('dash.allergensSub'), run: 'openAllergenModal', need: 'all' },
        season:   { icon: '📅', title: t('dash.season'), sub: seasonSub, run: 'openSeasonModal', need: 'admin' },
        print:    { icon: '🖨️', title: t('dash.print'), sub: t('dash.printSub'), run: 'openA3PrintSetupModal', need: 'admin' },
        impexp:   { icon: '📊', title: t('dash.impexp'), sub: t('dash.impexpSub'), run: 'openImportExportModal', need: 'edit' },
        checklist:{ icon: '✅', title: adm ? t('dash.checklistA') : t('dash.checklistS'), sub: adm ? t('dash.checklistAS') : t('dash.checklistSS'), run: 'openChecklistModal', need: 'all' },
        maint:    { icon: '🛠️', title: adm ? t('dash.maintA') : t('dash.maintS'), sub: adm ? t('dash.maintAS') : t('dash.maintSS'), run: 'openMaintenanceModal', need: 'all', badge: 'dashMaintBadge' },
        found:    { icon: '🧳', title: t('dash.found'), sub: t('dash.foundSub'), run: 'openFoundModal', need: 'all' },
        loss:     { icon: '🔨', title: adm ? t('dash.lossA') : t('dash.lossS'), sub: adm ? t('dash.lossAS') : t('dash.lossSS'), run: 'openLossModal', need: 'all' },
        teamplan: { icon: '📆', title: t('dash.teamplan'), sub: t('dash.teamplanSub'), run: 'openTeamPlanModal', need: 'admin' },
        swaps:    { icon: '🔄', title: t('dash.swaps'), sub: adm ? t('dash.swapsA') : t('dash.swapsS'), run: 'openSwapModal', need: 'all', badge: 'dashSwapBadge' },
        payroll:  { icon: '💶', title: t('dash.payroll'), sub: t('dash.payrollSub'), run: 'openPayrollModal', need: 'admin' },
        staff:    { icon: '👤', title: t('dash.staff'), sub: t('dash.staffSub'), run: 'openStaffPinModal', need: 'admin' },
        chat:     { icon: '💬', title: t('dash.chat'), sub: t('dash.chatSub'), run: 'openTeamChatModal', need: 'all', badge: 'dashChatBadge' },
        myplan:   { icon: '🗓️', title: t('dash.myplan'), sub: t('dash.myplanSub'), run: 'openMyPlanModal', need: 'all' },
        login:    { icon: '🔐', title: t('dash.login'), sub: t('dash.loginSub'), run: 'openLoginHistoryModal', need: 'admin' },
        settings: { icon: '⚙️', title: t('dash.settings'), sub: t('dash.settingsSub'), run: 'openUnifiedSettingsModal', need: 'admin' },
        news:     { icon: '🚀', title: t('dash.news'), sub: t('dash.newsSub'), run: 'openChangelogModal', need: 'all' },
        help:     { icon: '📖', title: t('dash.help'), sub: t('dash.helpSub'), run: 'openHelpModal', need: 'all' },
        support:  { icon: '🛟', title: t('dash.support'), sub: t('dash.supportSub'), run: 'openSupportModal', need: 'admin', badge: 'dashTicketBadge' }
      };
    }

    // ---------- Anordnung je Rolle ----------
    function dashLayoutFor() {
      if (userIsAdmin) {
        return [
          { title: t('dash.g.bar'),  ids: ['drinks', 'allergens', 'season', 'print', 'impexp'] },
          { title: t('dash.g.std'),  ids: ['checklist', 'maint', 'found', 'loss'] },
          { title: t('dash.g.team'), ids: ['teamplan', 'swaps', 'payroll', 'staff', 'chat'] },
          { title: t('dash.g.sys'),  ids: ['login', 'settings'] },
          { title: t('dash.g.info'), ids: ['news', 'help', 'support'] }
        ];
      }
      // Kellner/Barkeeper (+ Import, falls Getränke-Recht)
      const bar = ['drinks', 'allergens', 'maint', 'found', 'loss', 'help', 'news'];
      if (userCanEdit) bar.splice(1, 0, 'impexp');
      return [
        { title: t('dash.g.shift'),      ids: ['checklist', 'myplan', 'swaps', 'chat'] },
        { title: t('dash.g.barService'), ids: bar }
      ];
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
        hello.textContent = t(h < 11 ? 'dash.morning' : (h < 18 ? 'dash.hello' : 'dash.evening'), { name: currentWaiterName || '' });
      }
      const dateEl = document.getElementById('dashDate');
      if (dateEl) dateEl.textContent = new Date().toLocaleDateString(langLocale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const pill = document.getElementById('dashRolePill');
      if (pill) {
        pill.textContent = ({ developer: t('role.developer'), manager: t('role.manager') })[currentStaffRole] || t('role.staff');
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
      loadDashboardCounts();
    }

    // Kachel antippen: Funktion aufrufen (nur bekannte Funktionen, nie beliebigen Text ausführen)
    function dashRun(fnName) {
      const allowed = Object.values(dashTileDefs()).map(d => d.run);
      if (allowed.indexOf(fnName) === -1) return;
      const fn = window[fnName];
      if (typeof fn === 'function') fn();
    }

    // Zähler auf den Kacheln (Chat ungelesen, offene Tickets, Tausch, Störungen)
    function refreshDashboardBadges() {
      const set = (id, n) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = n > 99 ? '99+' : String(n);
        el.classList.toggle('hidden', !(n > 0));
      };
      set('dashChatBadge', (typeof chatUnreadCount !== 'undefined') ? chatUnreadCount : 0);
      set('dashTicketBadge', window.dashPendingTickets || 0);
      set('dashSwapBadge', window.dashSwapCount || 0);
      set('dashMaintBadge', window.dashMaintCount || 0);
    }

    // Zähler für Tausch-Anfragen und Störungen laden (höchstens alle 20 Sekunden)
    let dashCountsAt = 0;
    async function loadDashboardCounts(force) {
      if (!currentWaiterName) return;
      if (!force && Date.now() - dashCountsAt < 20000) return;
      dashCountsAt = Date.now();
      const me = String(currentWaiterName).toLowerCase();
      try {
        const today = fmIso(new Date(Date.now() - 86400000));
        const sw = await _supabase.from('shift_swaps').select('status, kind, requester, target_name, work_date')
          .in('status', ['open', 'awaiting_manager']).gte('work_date', today);
        if (!sw.error) {
          let n = 0;
          (sw.data || []).forEach(s => {
            if (s.status === 'awaiting_manager') { if (userIsAdmin) n++; }
            else if (s.kind === 'pool' ? String(s.requester).toLowerCase() !== me : String(s.target_name || '').toLowerCase() === me) n++;
          });
          window.dashSwapCount = n;
        }
        if (userIsAdmin) {
          const mt = await _supabase.from('maintenance_reports').select('id').eq('status', 'neu');
          if (!mt.error) window.dashMaintCount = (mt.data || []).length;
        }
      } catch (e) {}
      refreshDashboardBadges();
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
