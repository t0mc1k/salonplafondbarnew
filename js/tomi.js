/* ============================================================
   js/tomi.js  (v4.1.00)
   TomiAI: Assistent (Google Gemini) für alle Mitarbeiter.
   - Kellner: Fragen zu Rezepten, Allergenen, Speisekarte, Checklisten und zur App.
   - Manager/Developer: zusätzlich Hilfe bei Plan, Stunden, Tausch und Tickets.
     Die KI ändert NIE selbst etwas. Sie macht Vorschläge, die der Manager hier bestätigen muss.
   - Der API-Schlüssel liegt nur auf dem Server (Edge Function tomi-ai, Secret GEMINI_API_KEY).
   - Der Gesprächsverlauf wird nicht gespeichert; er gilt nur, solange das Fenster offen ist.
   ============================================================ */

    let tomi = { m: null, hist: [], busy: false };

    function tomiChips() {
      return userIsAdmin
        ? ['tomi.chipM1', 'tomi.chipM2', 'tomi.chipM3', 'tomi.chipM4']
        : ['tomi.chipS1', 'tomi.chipS2', 'tomi.chipS3', 'tomi.chipS4'];
    }

    function openTomiModal() {
      closeSettingsMenu();
      tomi.hist = [];
      tomi.busy = false;
      tomi.m = fmOpen('tomiModal', {
        title: t('tomi.title'),
        sub: userIsAdmin ? t('tomi.subAdmin') : t('tomi.subStaff'),
        onClose: () => { tomi.hist = []; tomi.busy = false; }
      });
      tomi.m.root.querySelector('.fm-card').classList.add('tomi-card');
      tomi.m.body.classList.add('tomi-body');
      tomi.m.setBody('<div id="tomiThread" class="tomi-thread"></div>');
      tomi.m.setFoot(`
        <div class="tomi-input">
          <textarea id="tomiInput" class="ui-field" rows="1" maxlength="1500" placeholder="${escapeHtml(t('tomi.ph'))}"
            onkeydown="tomiKey(event)" oninput="tomiGrow(this)"></textarea>
          <button type="button" id="tomiSendBtn" class="ui-btn-primary" onclick="tomiSend()" aria-label="${escapeHtml(t('tomi.send'))}">➤</button>
        </div>
        <p class="fm-hint tomi-disc">${escapeHtml(t('tomi.disc'))}</p>`);
      tomiRenderThread();
      setTimeout(() => { const i = document.getElementById('tomiInput'); if (i) i.focus(); }, 80);
    }

    function tomiKey(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); tomiSend(); }
    }
    function tomiGrow(el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    // Einfache Formatierung: **fett**, Listen mit „- “, Zeilenumbrüche (Text wird zuerst escaped)
    function tomiFormat(text) {
      const lines = escapeHtml(text).split('\n');
      let html = '', inList = false;
      lines.forEach(line => {
        const li = line.match(/^\s*(?:[-*•])\s+(.*)$/);
        const body = x => x.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        if (li) {
          if (!inList) { html += '<ul>'; inList = true; }
          html += '<li>' + body(li[1]) + '</li>';
        } else {
          if (inList) { html += '</ul>'; inList = false; }
          html += line.trim() ? '<p>' + body(line) + '</p>' : '';
        }
      });
      if (inList) html += '</ul>';
      return html;
    }

    function tomiProposalLine(p) {
      if (p.type === 'swap_decide') return (p.approve ? '✅ ' : '❌ ') + 'Swap ' + p.swap_id;
      if (p.type === 'schedule_set') return `${p.employee} · ${p.date} · ${p.start}–${p.end}${p.start2 ? ' / ' + p.start2 + '–' + p.end2 : ''}${p.station ? ' · ' + p.station : ''}`;
      if (p.type === 'schedule_off') return `${p.employee} · ${p.date} · ${p.code}`;
      return `${p.employee} · ${p.date} · ✖`;
    }

    function tomiProposalHtml(mi, pi, p) {
      let actions;
      if (p.status === 'done') actions = `<span class="fm-chip fm-chip-green">${escapeHtml(t('tomi.done'))}</span>`;
      else if (p.status === 'discarded') actions = `<span class="fm-chip fm-chip-gray">${escapeHtml(t('tomi.discarded'))}</span>`;
      else actions = `${p.status === 'failed' ? `<span class="fm-chip fm-chip-red">${escapeHtml(t('tomi.failed', { msg: p.err || '' }))}</span> ` : ''}
        <button type="button" class="fm-btn fm-btn-ok" onclick="tomiApply(${mi}, ${pi})">${escapeHtml(t('tomi.confirm'))}</button>
        <button type="button" class="fm-btn" onclick="tomiDiscard(${mi}, ${pi})">${escapeHtml(t('tomi.discard'))}</button>`;
      return `<div class="tomi-prop"><div class="tomi-prop-title">${escapeHtml(t('tomi.propTitle'))}</div>
        <div>${escapeHtml(p.summary)}</div><div class="fm-hint">${escapeHtml(tomiProposalLine(p))}</div>
        <div class="fm-item-actions">${actions}</div></div>`;
    }

    function tomiRenderThread() {
      const box = document.getElementById('tomiThread');
      if (!box) return;
      let html = '';
      if (!tomi.hist.length) {
        html += `<div class="tomi-msg tomi-bot"><p>${escapeHtml(t('tomi.hello', { name: currentWaiterName }))}</p>${userIsAdmin ? `<p>${escapeHtml(t('tomi.helloAdmin'))}</p>` : ''}</div>`;
        html += `<div class="tomi-chips">${tomiChips().map(k => `<button type="button" class="fm-tab" onclick="tomiSend(${jsArg(t(k))})">${escapeHtml(t(k))}</button>`).join('')}</div>`;
      }
      tomi.hist.forEach((m, mi) => {
        if (m.role === 'user') html += `<div class="tomi-msg tomi-me">${escapeHtml(m.text).replace(/\n/g, '<br>')}</div>`;
        else html += `<div class="tomi-msg tomi-bot${m.error ? ' tomi-err' : ''}">${m.error ? `<p>${escapeHtml(m.text)}</p>` : tomiFormat(m.text)}${(m.proposals || []).map((p, pi) => tomiProposalHtml(mi, pi, p)).join('')}</div>`;
      });
      if (tomi.busy) html += `<div class="tomi-msg tomi-bot tomi-typing"><span></span><span></span><span></span><em>${escapeHtml(t('tomi.thinking'))}</em></div>`;
      box.innerHTML = html;
      box.scrollTop = box.scrollHeight;
      const btn = document.getElementById('tomiSendBtn');
      if (btn) btn.disabled = tomi.busy;
    }

    async function tomiErrorText(error, data) {
      let code = data && data.error;
      try {
        if (!code && error && error.context && typeof error.context.json === 'function') code = (await error.context.json()).error;
      } catch (e) {}
      const status = error && error.context && error.context.status;
      if (code === 'auth' || status === 401) return t('tomi.errAuth');
      if (code === 'quota' || status === 429) return t('tomi.errQuota');
      if (code === 'not_configured') return t('tomi.errNotConfigured');
      if (status === 404) return t('tomi.errDeploy');
      return t('tomi.errAi');
    }

    async function tomiSend(preset) {
      const input = document.getElementById('tomiInput');
      const text = String(preset != null ? preset : (input ? input.value : '')).trim();
      if (!text || tomi.busy) return;
      if (input) { input.value = ''; tomiGrow(input); }
      tomi.hist.push({ role: 'user', text });
      tomi.busy = true;
      tomiRenderThread();
      try {
        // Nur Texte senden (ohne Fehlermeldungen/Vorschläge); der Server prüft Person, Rolle und Tageslimit
        const messages = tomi.hist.filter(m => !m.error).map(m => ({ role: m.role, text: m.text }));
        const { data, error } = await _supabase.functions.invoke('tomi-ai', {
          body: { messages, lang: currentLang },
          headers: { 'x-staff-token': getStaffToken() }
        });
        if (error || !data || data.error || typeof data.reply !== 'string') {
          tomi.hist.push({ role: 'model', text: await tomiErrorText(error, data), error: true });
        } else {
          tomi.hist.push({ role: 'model', text: data.reply, proposals: userIsAdmin ? (data.proposals || []).map(p => Object.assign({ status: 'pending' }, p)) : [] });
        }
      } catch (e) {
        tomi.hist.push({ role: 'model', text: t('tomi.errAi'), error: true });
      }
      tomi.busy = false;
      tomiRenderThread();
      const i = document.getElementById('tomiInput');
      if (i) i.focus();
    }

    // ---------- Vorschläge ausführen (nur Manager, nur nach Bestätigung) ----------
    function tomiDiscard(mi, pi) {
      const p = tomi.hist[mi] && tomi.hist[mi].proposals && tomi.hist[mi].proposals[pi];
      if (!p) return;
      p.status = 'discarded';
      tomiRenderThread();
    }

    async function tomiApply(mi, pi) {
      const p = tomi.hist[mi] && tomi.hist[mi].proposals && tomi.hist[mi].proposals[pi];
      if (!p || p.status === 'done' || p.status === 'discarded' || !userIsAdmin) return;
      try {
        await tomiApplyOne(p);
        p.status = 'done';
        fmToast(t('tomi.done'));
      } catch (e) {
        p.status = 'failed';
        p.err = (e && e.message) || String(e);
      }
      tomiRenderThread();
    }

    async function tomiApplyOne(p) {
      if (p.type === 'swap_decide') {
        const { error } = await _supabase.rpc('decide_shift_swap', { p_id: p.swap_id, p_approve: !!p.approve, p_note: p.note || '' });
        if (error) throw new Error(fmDbError(error));
        if (typeof loadDashboardCounts === 'function') loadDashboardCounts(true);
        return;
      }
      const parts = String(p.date).split('-').map(Number);
      const y = parts[0], mo = parts[1], d = parts[2];
      const found = await _supabase.from('work_schedules').select('*').eq('year', y).eq('month', mo).eq('day', d).ilike('employee_name', '%' + p.employee + '%');
      if (found.error) throw new Error(fmDbError(found.error));
      const rows = found.data || [];
      const want = String(p.employee).trim().toLowerCase();
      const exact = rows.find(r => String(r.employee_name).trim().toLowerCase() === want) || rows.find(r => fmNameMatches(r.employee_name, p.employee)) || null;
      const key = exact ? { employee_name: exact.employee_name, year: y, month: mo, day: d } : null;

      if (p.type === 'schedule_clear') {
        if (!exact) throw new Error(fmL('Kein Eintrag vorhanden.', 'No entry found.'));
        const del = await _supabase.from('work_schedules').delete().match(key).select();
        if (del.error) throw new Error(fmDbError(del.error));
        return;
      }
      const payload = p.type === 'schedule_off'
        ? { shift_1_start: p.code, shift_1_end: null, shift_2_start: null, shift_2_end: null, station: (exact && exact.station) || null }
        : { shift_1_start: p.start, shift_1_end: p.end, shift_2_start: p.start2 || null, shift_2_end: p.end2 || null, station: p.station || (exact && exact.station) || null };
      const res = exact
        ? await _supabase.from('work_schedules').update(payload).match(key).select()
        : await _supabase.from('work_schedules').insert([Object.assign({ employee_name: p.employee, year: y, month: mo, day: d }, payload)]).select();
      if (res.error) throw new Error(fmDbError(res.error));
      if (!res.data || !res.data.length) throw new Error(fmL('Nichts gespeichert (fehlende Berechtigung?).', 'Nothing saved (missing permission?).'));
    }
