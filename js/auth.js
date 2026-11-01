/* ============================================================
   js/auth.js
   Anmeldung per PIN, Rollen/Rechte, Abmelden, Berechtigungsprüfung
   ============================================================ */
    async function fetchStaffByName(name) {
      const { data, error } = await _supabase.rpc('list_staff');
      if (error) return { data: null, error };
      const rec = (data || []).find(x => x.name === name);
      return { data: rec || null, error: rec ? null : { message: 'nicht gefunden' } };
    }

    // ---------- Anmeldung: Namen wählen ----------
    // Ansicht „neu“ (Standard): zuletzt benutzt, Suche, Team und Leitung getrennt, kompakt.
    // Ansicht „klassisch“: das bisherige Raster. Umschalten mit dem Link unter der Liste.
  function getLoginView() {
  try { return localStorage.getItem('salon_login_view') === 'new' ? 'new' : 'classic'; } catch (e) { return 'classic'; }
   }

    function toggleLoginView() {
      try { localStorage.setItem('salon_login_view', getLoginView() === 'classic' ? 'new' : 'classic'); } catch (e) {}
      const s = document.getElementById('loginSearchInput');
      if (s) s.value = '';
      renderLoginGrid();
    }

    function getRecentLogins() {
      try {
        const list = JSON.parse(localStorage.getItem('salon_recent_logins') || '[]');
        return Array.isArray(list) ? list.filter(n => typeof n === 'string') : [];
      } catch (e) { return []; }
    }

    function rememberRecentLogin(name) {
      try {
        const list = getRecentLogins().filter(n => n.toLowerCase() !== String(name).toLowerCase());
        list.unshift(name);
        localStorage.setItem('salon_recent_logins', JSON.stringify(list.slice(0, 3)));
      } catch (e) {}
    }

    function loginAvatarHtml(staff, size) {
      return staff.avatar_url
        ? `<img src="${escapeHtml(staff.avatar_url)}" class="login-av ${size || ''}" alt="">`
        : `<span class="login-av ${size || ''}">${escapeHtml(String(staff.name).charAt(0).toUpperCase())}</span>`;
    }

    function loginTileHtml(staff, showRole) {
      const role = ({ developer: 'Developer', manager: 'Manager' }[staff.role]) || '';
      return `
        <button type="button" onclick="selectWaiterForLogin(${jsArg(staff.name)})" class="login-tile" title="${escapeHtml(staff.name)}">
          ${loginAvatarHtml(staff)}
          <span class="login-name">${escapeHtml(staff.name)}</span>
          ${showRole && role ? `<span class="login-role">${escapeHtml(role)}</span>` : ''}
        </button>`;
    }

    function sortedStaff(list) {
      return list.slice().sort((a, b) => String(a.name).localeCompare(String(b.name), 'de', { sensitivity: 'base' }));
    }

    function renderLoginGrid() {
      const container = document.getElementById('waiterGridContainer');
      const searchRow = document.getElementById('loginSearchRow');
      const toggleBtn = document.getElementById('loginViewToggleBtn');
      if (!container) return;
      const data = staffDatabaseRecords || [];
      const view = getLoginView();
      if (toggleBtn) toggleBtn.textContent = view === 'classic' ? '✨ Neue Ansicht verwenden' : '☰ Zur klassischen Ansicht wechseln';

      if (!data.length) {
        container.className = 'grid grid-cols-2 sm:grid-cols-3 gap-2';
        container.innerHTML = `<p class="col-span-full text-slate-500 italic text-xs text-center py-4">Kein Personal in Datenbank gefunden</p>`;
        if (searchRow) searchRow.classList.add('hidden');
        return;
      }

      if (view === 'classic') {
        if (searchRow) searchRow.classList.add('hidden');
        container.className = 'grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1';
        container.innerHTML = data.map(staff => `
          <button type="button" onclick="selectWaiterForLogin(${jsArg(staff.name)})" class="p-3 bg-slate-100 dark:bg-slate-950 hover:bg-amber-500/20 hover:border-amber-500 border border-slate-300 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-1.5 transition group">
            ${staff.avatar_url
              ? `<img src="${escapeHtml(staff.avatar_url)}" class="w-12 h-12 rounded-full object-cover border border-amber-500/50 shadow" alt="${escapeHtml(staff.name)}">`
              : `<div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-black flex items-center justify-center border border-slate-300 dark:border-slate-700 text-sm">${escapeHtml(staff.name.charAt(0).toUpperCase())}</div>`}
            <span class="text-xs font-black text-slate-900 dark:text-white truncate w-full">${escapeHtml(staff.name)}</span>
            <span class="text-[9px] text-slate-600 dark:text-slate-400 uppercase tracking-wider">${escapeHtml(staff.role || 'staff')}</span>
          </button>`).join('');
        return;
      }

      // ----- neue Ansicht -----
      const q = ((document.getElementById('loginSearchInput') || {}).value || '').trim().toLowerCase();
      if (searchRow) searchRow.classList.toggle('hidden', data.length < 7);
      container.className = 'login-groups';

      const isLeader = s => s.role === 'manager' || s.role === 'developer';
      const match = s => !q || String(s.name).toLowerCase().indexOf(q) !== -1;
      const team = sortedStaff(data.filter(s => !isLeader(s) && match(s)));
      const leaders = sortedStaff(data.filter(s => isLeader(s) && match(s)));

      let html = '';
      if (!q) {
        const recent = getRecentLogins().map(n => data.find(s => String(s.name).toLowerCase() === n.toLowerCase())).filter(Boolean);
        if (recent.length) {
          html += `<section class="login-section">
            <div class="login-section-title">⏱ Zuletzt auf diesem Gerät</div>
            <div class="login-recent">${recent.map(s => `
              <button type="button" onclick="selectWaiterForLogin(${jsArg(s.name)})" class="login-recent-btn">
                ${loginAvatarHtml(s, 'lg')}
                <span class="login-recent-text"><b>${escapeHtml(s.name)}</b><small>Tippen zum Anmelden</small></span>
              </button>`).join('')}</div>
          </section>`;
        }
      }
      if (team.length) {
        html += `<section class="login-section">
          <div class="login-section-title">🍹 Team <span class="login-count">${team.length}</span></div>
          <div class="login-grid">${team.map(s => loginTileHtml(s, false)).join('')}</div>
        </section>`;
      }
      if (leaders.length) {
        html += `<section class="login-section login-leaders">
          <div class="login-section-title">🧑‍💼 Leitung & Entwicklung <span class="login-count">${leaders.length}</span></div>
          <div class="login-grid">${leaders.map(s => loginTileHtml(s, true)).join('')}</div>
        </section>`;
      }
      if (!html) html = `<p class="text-slate-500 italic text-xs text-center py-4">Kein Name gefunden. Prüfe die Schreibweise.</p>`;
      container.innerHTML = html;
    }

    function loginPickFirstMatch() {
      const first = document.querySelector('#waiterGridContainer .login-tile');
      if (first) first.click();
    }

    async function loadStaffPresenceRecordsForLogin() {
      const { data, error } = await _supabase.rpc('list_staff');
      if (error || !data || data.length === 0) {
        staffDatabaseRecords = [];
        renderLoginGrid();
        return;
      }
      staffDatabaseRecords = data;
      renderLoginGrid();
    }

    function selectWaiterForLogin(name) {
      selectedWaiterForPin = name;
      document.getElementById('selectedWaiterLabel').innerText = `👤 ${name}`;
      document.getElementById('loginPickerWrap').classList.add('hidden');
      document.getElementById('pinInputSection').classList.remove('hidden');
      currentEnteredPin = "";
      updatePinDisplay();
      document.getElementById('pinAuthError').classList.add('hidden');
    }

    function resetWaiterSelection() {
      selectedWaiterForPin = "";
      document.getElementById('selectedWaiterLabel').innerText = "";
      document.getElementById('pinInputSection').classList.add('hidden');
      document.getElementById('loginPickerWrap').classList.remove('hidden');
      currentEnteredPin = "";
      updatePinDisplay();
      document.getElementById('pinAuthError').classList.add('hidden');
    }

    function appendPinNum(num) {
      if (currentEnteredPin.length < 6) {
        currentEnteredPin += num;
        updatePinDisplay();
      }
    }

    function clearPinInput() {
      currentEnteredPin = "";
      updatePinDisplay();
      document.getElementById('pinAuthError').classList.add('hidden');
    }

    function backspacePinInput() {
      currentEnteredPin = currentEnteredPin.slice(0, -1);
      updatePinDisplay();
      document.getElementById('pinAuthError').classList.add('hidden');
    }

    function updatePinDisplay() {
      const inputEl = document.getElementById('loginPinInput');
      inputEl.value = "•".repeat(currentEnteredPin.length);
    }

    let pinLoginBusy = false;
    async function submitPinLogin() {
      const errDiv = document.getElementById('pinAuthError');
      errDiv.classList.add('hidden');
      if (!selectedWaiterForPin || pinLoginBusy) return;

      if (currentEnteredPin.length < 4) {
        errDiv.innerText = "Bitte mindestens 4 Ziffern eingeben.";
        errDiv.classList.remove('hidden');
        return;
      }

      pinLoginBusy = true;
      const { data, error } = await _supabase.rpc('login_with_pin', { p_name: selectedWaiterForPin, p_pin: currentEnteredPin });
      pinLoginBusy = false;

      if (error) {
        errDiv.innerText = (error.message || '').indexOf('Zu viele') !== -1
          ? "Zu viele Versuche. Bitte in 10 Minuten erneut versuchen."
          : "Fehler: " + error.message;
        errDiv.classList.remove('hidden');
        currentEnteredPin = "";
        updatePinDisplay();
        return;
      }

      const row = Array.isArray(data) ? data[0] : data;
      if (!row) {
        errDiv.innerText = "Falscher PIN-Code!";
        errDiv.classList.remove('hidden');
        currentEnteredPin = "";
        updatePinDisplay();
        return;
      }

      setStaffSession(row.out_token);
      rememberRecentLogin(row.out_name);
      currentWaiterName = row.out_name;
      sessionStorage.setItem('salon_waiter_name', currentWaiterName);
      currentEnteredPin = "";
      updatePinDisplay();
      await finalizeAppStartForStaff({
        name: row.out_name,
        role: row.out_role,
        avatar_url: row.out_avatar,
        can_edit_drinks: row.out_can_edit_drinks
      });
    }

    async function finalizeAppStartForStaff(staffRecord) {
      document.getElementById('authContainer').classList.add('hidden');
      document.getElementById('appContainer').classList.remove('hidden');

      currentWaiterAvatar = staffRecord.avatar_url || "";
      updateHeaderAvatarUI();

      currentStaffRole = staffRecord.role || 'staff';
      userIsAdmin = (currentStaffRole === 'manager' || currentStaffRole === 'developer');
      userCanEdit = userIsAdmin || staffRecord.can_edit_drinks === true;
      isAdmin = userIsAdmin || userCanEdit;   // Verwaltungsansicht standardmäßig an
      applyRoleUI();

      await loadDrinks();
      await checkPendingTicketsBadge();
      setupChatRealtimeListener();
      startLoginWatcher();
      showDashboard();   // 3.2.01: nach dem Login zuerst das Dashboard
    }

    // ---------- Hinweis, wenn sich ein Kollege anmeldet ----------
    let loginWatchTimer = null;
    let loginWatchBaseline = null;   // Map: Name -> letzter Login (ms)

    async function pollLoginWatcher() {
      if (document.hidden || !currentWaiterName) return;
      const { data, error } = await _supabase.rpc('list_staff');
      if (error || !Array.isArray(data)) return;

      const fresh = new Map(data.map(st => [st.name, st.last_used_at ? new Date(st.last_used_at).getTime() : 0]));
      if (loginWatchBaseline) {
        data.forEach(st => {
          const before = loginWatchBaseline.get(st.name) || 0;
          const now = fresh.get(st.name) || 0;
          const isMe = st.name.toLowerCase() === currentWaiterName.toLowerCase();
          const recent = (Date.now() - now) < 2 * 60 * 1000;
          if (!isMe && now > before && recent && getSetting('loginToast')) {
            showAppToast({
              avatarUrl: st.avatar_url,
              initial: st.name.charAt(0).toUpperCase(),
              title: st.name + ' hat sich angemeldet',
              text: '👋 Dein Kollege ist jetzt online.',
              ms: 6000
            });
          }
        });
      }
      loginWatchBaseline = fresh;
      staffDatabaseRecords = data;   // aktuelle Fotos/Namen für Chat und @-Vorschläge
    }

    function startLoginWatcher() {
      stopLoginWatcher();
      pollLoginWatcher();
      loginWatchTimer = setInterval(pollLoginWatcher, 15000);
    }

    function stopLoginWatcher() {
      if (loginWatchTimer) clearInterval(loginWatchTimer);
      loginWatchTimer = null;
      loginWatchBaseline = null;
    }

    function setVisible(id, on, useFlex) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('hidden', !on);
      if (useFlex) el.classList.toggle('flex', on);
    }

    function applyRoleUI() {
      const showEdit = isAdmin && userCanEdit;
      const showAdmin = isAdmin && userIsAdmin;
      setVisible('btnMenuImportExport', showEdit, true);
      setVisible('menuAddDrinkBtn', showEdit, true);
      setVisible('addDrinkBtnContainer', showEdit, false);
      setVisible('menuStaffPinBtn', showAdmin, true);
      setVisible('menuAdminSection', showAdmin, true);
      setVisible('menuNewSeasonBtn', showEdit, true);
      setVisible('adminChangelogFormContainer', showAdmin, false);
      if (typeof updateHeaderAvatarUI === 'function') updateHeaderAvatarUI();
      if (typeof renderDashboard === 'function' && !isDrinksViewOpen()) renderDashboard();
      const mobileLabel = document.getElementById('mobileUserLabel');
      if (mobileLabel) mobileLabel.textContent = (currentWaiterName || '') + ' (' + (({ developer: 'Developer', manager: 'Manager' })[currentStaffRole] || 'Kellner') + ')';
      const label = document.getElementById('currentUserEmail');
      if (label) {
        const roleTxt = (userIsAdmin || userCanEdit) && currentStaffRole && currentStaffRole !== 'staff' ? ` (${escapeHtml(currentStaffRole)})` : '';
        label.innerHTML = `<span class="text-amber-600 dark:text-amber-400 font-black">${escapeHtml(currentWaiterName)}${roleTxt}</span>`;
      }
    }

    async function handleLogout() {
      closeSettingsMenu();
      stopLoginWatcher();
      try { await _supabase.rpc('logout_staff'); } catch (e) {}
      clearStaffSession();
      sessionStorage.removeItem('salon_waiter_name');
      currentWaiterName = "";
      currentWaiterAvatar = "";
      currentStaffRole = "";
      userIsAdmin = false;
      userCanEdit = false;
      isAdmin = false;
      currentEnteredPin = "";
      selectedWaiterForPin = "";
      updatePinDisplay();
      resetWaiterSelection();
      document.getElementById('appContainer').classList.add('hidden');
      document.getElementById('authContainer').classList.remove('hidden');
      document.getElementById('drinksView').classList.add('hidden');
      document.getElementById('dashboardView').classList.remove('hidden');
      document.body.classList.add('on-dashboard');
      await loadStaffPresenceRecordsForLogin();
    }

    function checkManagerAuth(callback) {
      if (userIsAdmin) {
        if (callback) callback();
        return;
      }
      alert("Diese Aktion ist nur für Manager und Developer erlaubt.");
    }

    function checkDrinkEditAuth(callback) {
      if (userCanEdit) {
        if (callback) callback();
        return;
      }
      alert("Du hast keine Berechtigung, Getränke zu bearbeiten.");
    }
