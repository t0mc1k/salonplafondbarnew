/* ============================================================
   js/i18n.js  (v4.0.01)
   Sprachen: Deutsch (de) und Englisch (en). Der Wechsel gilt pro Gerät
   (localStorage „nexus_lang“). Übersetzt werden die Teile für Kellner:
   Anmeldung, Kopf/Menü, Dashboard, Einstellungen, Getränke-Kopf und Hilfe.
   Manager-Fenster, A3-Karte und „Was ist neu?“ bleiben deutsch.

   NEUEN TEXT ÜBERSETZBAR MACHEN:
   1) In I18N_DICT unten einen Eintrag ergänzen: 'bereich.name': { de: '…', en: '…' }
   2) Im HTML:    <span data-i18n="bereich.name">Deutscher Text</span>
      (Platzhalter: data-i18n-ph, data-i18n-title, data-i18n-aria)
      Im JavaScript: t('bereich.name', { name: 'Anna' })   // {name} im Text wird ersetzt
   Jede neue Funktion für Kellner braucht Deutsch UND Englisch.
   ============================================================ */

    let currentLang = (function () {
      try { return localStorage.getItem('nexus_lang') === 'en' ? 'en' : 'de'; } catch (e) { return 'de'; }
    })();

    const I18N_DICT = {
 "login.who": {
  "de": "Wer bist du?",
  "en": "Who are you?"
 },
 "login.loading": {
  "de": "Personal wird geladen ...",
  "en": "Loading team ..."
 },
 "login.enterPin": {
  "de": "PIN eingeben",
  "en": "Enter PIN"
 },
 "login.change": {
  "de": "Ändern",
  "en": "Change"
 },
 "login.submit": {
  "de": "Anmelden",
  "en": "Log in"
 },
 "login.title": {
  "de": "Anmeldung",
  "en": "Login"
 },
 "login.search": {
  "de": "🔍 Name suchen ...",
  "en": "🔍 Search name ..."
 },
 "login.recent": {
  "de": "Zuletzt angemeldet",
  "en": "Last logged in"
 },
 "login.noStaff": {
  "de": "Kein Personal in der Datenbank gefunden.",
  "en": "No staff found in the database."
 },
 "login.noName": {
  "de": "Kein Name gefunden. Prüfe die Schreibweise.",
  "en": "No name found. Check the spelling."
 },
 "login.pin4": {
  "de": "Bitte mindestens 4 Ziffern eingeben.",
  "en": "Please enter at least 4 digits."
 },
 "login.tooMany": {
  "de": "Zu viele Versuche. Bitte in 10 Minuten erneut versuchen.",
  "en": "Too many attempts. Please try again in 10 minutes."
 },
 "login.error": {
  "de": "Fehler: {msg}",
  "en": "Error: {msg}"
 },
 "login.wrongPin": {
  "de": "Falscher PIN-Code!",
  "en": "Wrong PIN code!"
 },
 "role.staff": {
  "de": "Kellner",
  "en": "Waiter"
 },
 "role.manager": {
  "de": "Manager",
  "en": "Manager"
 },
 "role.developer": {
  "de": "Developer",
  "en": "Developer"
 },
 "hdr.switch": {
  "de": "🚪 Benutzer wechseln",
  "en": "🚪 Switch user"
 },
 "hdr.fullscreen": {
  "de": "⛶ Vollbild",
  "en": "⛶ Fullscreen"
 },
 "hdr.menu": {
  "de": "☰ Menü",
  "en": "☰ Menu"
 },
 "menu.dashboard": {
  "de": "Dashboard",
  "en": "Dashboard"
 },
 "menu.dashboardSub": {
  "de": "Zurück zur Startseite",
  "en": "Back to the start page"
 },
 "menu.drinks": {
  "de": "Getränke & Rezepte",
  "en": "Drinks & Recipes"
 },
 "menu.drinksSub": {
  "de": "Datenbank öffnen",
  "en": "Open database"
 },
 "menu.addDrink": {
  "de": "➕ Neues Getränk hinzufügen",
  "en": "➕ Add new drink"
 },
 "menu.secDrinks": {
  "de": "Getränke & Karte",
  "en": "Drinks & Menu"
 },
 "menu.season": {
  "de": "Saison wählen",
  "en": "Choose season"
 },
 "menu.seasonSub": {
  "de": "Aktive Karte wechseln",
  "en": "Switch the active menu"
 },
 "menu.newSeason": {
  "de": "Neue Saison erstellen",
  "en": "Create new season"
 },
 "menu.newSeasonSub": {
  "de": "Neue Karte anlegen",
  "en": "Set up a new menu"
 },
 "menu.shopping": {
  "de": "Einkaufsliste / Inventur",
  "en": "Shopping list / Stocktake"
 },
 "menu.shoppingSub": {
  "de": "Zutaten der Saison zusammenrechnen",
  "en": "Add up the ingredients of the season"
 },
 "menu.print": {
  "de": "Karten-Druck (A3)",
  "en": "Menu print (A3)"
 },
 "menu.printSub": {
  "de": "Getränkekarte zum Ausdrucken",
  "en": "Drinks menu to print"
 },
 "menu.impexp": {
  "de": "Import & Export",
  "en": "Import & Export"
 },
 "menu.impexpSub": {
  "de": "Excel oder CSV",
  "en": "Excel or CSV"
 },
 "menu.secTeam": {
  "de": "Team & Arbeit",
  "en": "Team & Work"
 },
 "menu.chat": {
  "de": "Team-Chat",
  "en": "Team Chat"
 },
 "menu.chatSub": {
  "de": "Nachrichten an das ganze Team",
  "en": "Messages to the whole team"
 },
 "menu.myplan": {
  "de": "Mein Arbeitsplan",
  "en": "My Schedule"
 },
 "menu.myplanSub": {
  "de": "Deine Schichten",
  "en": "Your shifts"
 },
 "menu.secApp": {
  "de": "App",
  "en": "App"
 },
 "menu.settings": {
  "de": "Einstellungen & Zentrale",
  "en": "Settings & Control Centre"
 },
 "menu.settingsSub": {
  "de": "Design, Schrift, Hinweise, Sortierung",
  "en": "Theme, text size, notifications, sorting"
 },
 "menu.refresh": {
  "de": "Daten aktualisieren",
  "en": "Refresh data"
 },
 "menu.refreshSub": {
  "de": "Getränke neu laden",
  "en": "Reload the drinks"
 },
 "menu.install": {
  "de": "App installieren",
  "en": "Install app"
 },
 "menu.installSub": {
  "de": "Symbol auf dem Startbildschirm",
  "en": "Icon on your home screen"
 },
 "menu.fullscreen": {
  "de": "Vollbild",
  "en": "Fullscreen"
 },
 "menu.fullscreenSub": {
  "de": "Ganzer Bildschirm ein/aus",
  "en": "Full screen on/off"
 },
 "menu.news": {
  "de": "Was ist neu?",
  "en": "What's new?"
 },
 "menu.newsSub": {
  "de": "Neuigkeiten in ",
  "en": "News in "
 },
 "menu.support": {
  "de": "Support & Tickets",
  "en": "Support & Tickets"
 },
 "menu.supportSub": {
  "de": "Fehler melden oder Fragen stellen",
  "en": "Report problems or ask questions"
 },
 "menu.logout": {
  "de": "Benutzer wechseln",
  "en": "Switch user"
 },
 "menu.logoutSub": {
  "de": "Abmelden",
  "en": "Log out"
 },
 "menu.help": {
  "de": "Hilfe & Anleitung",
  "en": "Help & Guide"
 },
 "menu.helpSub": {
  "de": "So funktioniert die App",
  "en": "How the app works"
 },
 "menu.profileEdit": {
  "de": "{role} · Profil bearbeiten",
  "en": "{role} · Edit profile"
 },
 "menu.profile": {
  "de": "Mein Profil",
  "en": "My profile"
 },
 "menu.seasonActive": {
  "de": "Aktiv: {name}",
  "en": "Active: {name}"
 },
 "dv.title": {
  "de": "🍸 Getränke & Rezepte",
  "en": "🍸 Drinks & Recipes"
 },
 "dv.category": {
  "de": "Kategorie:",
  "en": "Category:"
 },
 "dv.season": {
  "de": " Saison:",
  "en": " Season:"
 },
 "dv.schedule": {
  "de": "🗓️ Arbeitsplan",
  "en": "🗓️ Schedule"
 },
 "dv.diet": {
  "de": "Ernährung & Bestseller:",
  "en": "Diet & bestsellers:"
 },
 "dv.top": {
  "de": "⭐ TOP / Highlight",
  "en": "⭐ TOP / Highlight"
 },
 "dv.vegan": {
  "de": "🌱 Vegan",
  "en": "🌱 Vegan"
 },
 "dv.gluten": {
  "de": "🌾 Glutenfrei",
  "en": "🌾 Gluten-free"
 },
 "dv.lactose": {
  "de": "🥛 Laktosefrei",
  "en": "🥛 Lactose-free"
 },
 "dv.noalc": {
  "de": "🚫 Alkoholfrei",
  "en": "🚫 Alcohol-free"
 },
 "dv.fav": {
  "de": "❤️ Schicht-Favoriten",
  "en": "❤️ Shift favourites"
 },
 "dv.glass": {
  "de": "🍸 Nach Glas-Typ filtern:",
  "en": "🍸 Filter by glass type:"
 },
 "set.title": {
  "de": "⚙️ Einstellungen & Zentrale",
  "en": "⚙️ Settings & Control Centre"
 },
 "set.sub": {
  "de": "Gelten nur auf diesem Gerät und werden automatisch gespeichert.",
  "en": "Apply to this device only and are saved automatically."
 },
 "set.appearance": {
  "de": "🎨 Darstellung",
  "en": "🎨 Appearance"
 },
 "set.theme": {
  "de": "Design",
  "en": "Theme"
 },
 "set.light": {
  "de": "☀️ Hell",
  "en": "☀️ Light"
 },
 "set.dark": {
  "de": "🌙 Dunkel",
  "en": "🌙 Dark"
 },
 "set.font": {
  "de": "Schriftgröße",
  "en": "Text size"
 },
 "set.fontSub": {
  "de": "Vergrößert alle Texte der App.",
  "en": "Enlarges all text in the app."
 },
 "set.fs90": {
  "de": "Klein",
  "en": "Small"
 },
 "set.fs100": {
  "de": "Normal",
  "en": "Normal"
 },
 "set.fs112": {
  "de": "Groß",
  "en": "Large"
 },
 "set.fs125": {
  "de": "Sehr groß",
  "en": "Extra large"
 },
 "set.blur": {
  "de": "Weichzeichner (Blur)",
  "en": "Blur effect"
 },
 "set.blurSub": {
  "de": "Milchglas-Effekt in Dialogen, Menüs und Hinweisen. Auf schwächeren Geräten ausschalten.",
  "en": "Frosted-glass effect in dialogs, menus and notices. Turn it off on weaker devices."
 },
 "set.motion": {
  "de": "Animationen reduzieren",
  "en": "Reduce animations"
 },
 "set.motionSub": {
  "de": "Weniger Bewegung und Übergänge, ruhiger und akkusparender.",
  "en": "Less movement and transitions; calmer and easier on the battery."
 },
 "set.drinks": {
  "de": "🍸 Getränke",
  "en": "🍸 Drinks"
 },
 "set.view": {
  "de": "Ansicht",
  "en": "View"
 },
 "set.viewSub": {
  "de": "Karten mit Foto oder kompakte Liste.",
  "en": "Cards with a photo, or a compact list."
 },
 "set.cards": {
  "de": "▦ Karten",
  "en": "▦ Cards"
 },
 "set.list": {
  "de": "☰ Liste",
  "en": "☰ List"
 },
 "set.sort": {
  "de": "Sortierung",
  "en": "Sorting"
 },
 "set.sortSub": {
  "de": "Reihenfolge der Getränke in der Liste.",
  "en": "Order of the drinks in the list."
 },
 "set.sortNew": {
  "de": "Neueste zuerst",
  "en": "Newest first"
 },
 "set.sortPA": {
  "de": "Preis aufsteigend",
  "en": "Price: low to high"
 },
 "set.sortPD": {
  "de": "Preis absteigend",
  "en": "Price: high to low"
 },
 "set.sortFav": {
  "de": "Favoriten zuerst",
  "en": "Favourites first"
 },
 "set.prices": {
  "de": "Preise anzeigen",
  "en": "Show prices"
 },
 "set.pricesSub": {
  "de": "Preis neben dem Namen auf Karten und im Detail.",
  "en": "Price next to the name on cards and in the detail view."
 },
 "set.season": {
  "de": "Aktive Saison",
  "en": "Active season"
 },
 "set.seasonSub": {
  "de": "Welche Karte gerade angezeigt wird.",
  "en": "Which menu is currently shown."
 },
 "set.notif": {
  "de": "🔔 Hinweise",
  "en": "🔔 Notifications"
 },
 "set.nLogin": {
  "de": "Wenn sich ein Kollege anmeldet",
  "en": "When a colleague logs in"
 },
 "set.nLoginSub": {
  "de": "Kurzer Hinweis oben rechts mit Foto.",
  "en": "A short notice at the top right, with a photo."
 },
 "set.nChat": {
  "de": "Neue Chat-Nachricht",
  "en": "New chat message"
 },
 "set.nChatSub": {
  "de": "Hinweis, wenn der Chat gerade geschlossen ist.",
  "en": "A notice when the chat is closed."
 },
 "set.nSound": {
  "de": "Ton bei neuer Nachricht",
  "en": "Sound for new messages"
 },
 "set.nSoundSub": {
  "de": "Leiser Signalton im Chat.",
  "en": "A quiet alert sound in the chat."
 },
 "set.rights": {
  "de": "👤 Ansicht für Mitarbeiter mit Rechten",
  "en": "👤 View for staff with extra rights"
 },
 "set.mode": {
  "de": "Ansichtsmodus",
  "en": "View mode"
 },
 "set.modeSub": {
  "de": "Kellner-Ansicht blendet Verwaltungs-Knöpfe aus.",
  "en": "The waiter view hides the management buttons."
 },
 "set.modeStaff": {
  "de": "Kellner",
  "en": "Waiter"
 },
 "set.modeAdmin": {
  "de": "Verwaltung",
  "en": "Admin"
 },
 "set.install": {
  "de": "📲 App installieren",
  "en": "📲 Install app"
 },
 "set.installOn": {
  "de": "Auf dem Startbildschirm",
  "en": "On the home screen"
 },
 "set.installSub": {
  "de": "Mit einem Symbol auf dem Startbildschirm startet die App wie eine normale App.",
  "en": "With an icon on your home screen, the app starts like a normal app."
 },
 "set.installBtn": {
  "de": "📲 So geht’s",
  "en": "📲 How to"
 },
 "set.app": {
  "de": "🧰 App",
  "en": "🧰 App"
 },
 "set.version": {
  "de": "Version",
  "en": "Version"
 },
 "set.news": {
  "de": "🚀 Was ist neu?",
  "en": "🚀 What's new?"
 },
 "set.reload": {
  "de": "App neu laden",
  "en": "Reload app"
 },
 "set.reloadSub": {
  "de": "Hilft, wenn etwas hängt oder alt aussieht.",
  "en": "Helps if something is stuck or looks outdated."
 },
 "set.reloadBtn": {
  "de": "🔄 Neu laden",
  "en": "🔄 Reload"
 },
 "set.reset": {
  "de": "Einstellungen zurücksetzen",
  "en": "Reset settings"
 },
 "set.resetSub": {
  "de": "Setzt alle Einstellungen dieses Geräts auf Standard.",
  "en": "Resets all settings of this device to the default."
 },
 "set.resetBtn": {
  "de": "↩️ Zurücksetzen",
  "en": "↩️ Reset"
 },
 "set.done": {
  "de": "Fertig",
  "en": "Done"
 },
 "set.sortName": {
  "de": "Name A – Z",
  "en": "Name A – Z"
 },
 "set.langTitle": {
  "de": "Sprache / Language",
  "en": "Language / Sprache"
 },
 "set.langSub": {
  "de": "Gilt für Anmeldung, Dashboard, Menü, Einstellungen und Hilfe.",
  "en": "Applies to login, dashboard, menu, settings and help."
 },
 "set.themeAuto": {
  "de": "Folgt dem Gerät – aktuell: {mode}",
  "en": "Follows the device – currently: {mode}"
 },
 "set.themeDark": {
  "de": "Dunkel",
  "en": "Dark"
 },
 "set.themeLight": {
  "de": "Hell",
  "en": "Light"
 },
 "dash.g.bar": {
  "de": "🍸 Bar & Betrieb",
  "en": "🍸 Bar & Operations"
 },
 "dash.g.std": {
  "de": "✅ Standards & Betrieb",
  "en": "✅ Standards & Operations"
 },
 "dash.g.team": {
  "de": "👥 Team & Personal",
  "en": "👥 Team & Staff"
 },
 "dash.g.sys": {
  "de": "🔐 Sicherheit & System",
  "en": "🔐 Security & System"
 },
 "dash.g.info": {
  "de": "💡 Support & Infos",
  "en": "💡 Support & Info"
 },
 "dash.g.shift": {
  "de": "🕒 Meine Schicht",
  "en": "🕒 My Shift"
 },
 "dash.g.barService": {
  "de": "🍸 Bar & Service",
  "en": "🍸 Bar & Service"
 },
 "dash.drinks": {
  "de": "Getränke & Rezepte",
  "en": "Drinks & Recipes"
 },
 "dash.drinksSub": {
  "de": "{n} Getränke · Datenbank öffnen",
  "en": "{n} drinks · open database"
 },
 "dash.drinksSub0": {
  "de": "Datenbank öffnen",
  "en": "Open database"
 },
 "dash.allergens": {
  "de": "Speisekarte & Allergene",
  "en": "Food Menu & Allergens"
 },
 "dash.allergensSub": {
  "de": "Gerichte, Allergene A–R",
  "en": "Dishes, allergens A–R"
 },
 "dash.season": {
  "de": "Saison wählen",
  "en": "Choose season"
 },
 "dash.seasonSub0": {
  "de": "Aktive Karte wählen",
  "en": "Choose the active menu"
 },
 "dash.print": {
  "de": "Karte drucken / PDF",
  "en": "Print menu / PDF"
 },
 "dash.printSub": {
  "de": "A3-Getränkekarte",
  "en": "A3 drinks menu"
 },
 "dash.impexp": {
  "de": "Import & Export",
  "en": "Import & Export"
 },
 "dash.impexpSub": {
  "de": "Excel oder CSV",
  "en": "Excel or CSV"
 },
 "dash.checklistA": {
  "de": "Checklisten & Standards",
  "en": "Checklists & Standards"
 },
 "dash.checklistAS": {
  "de": "Öffnung, Schließung, Aufgaben",
  "en": "Opening, closing, tasks"
 },
 "dash.checklistS": {
  "de": "Meine Schicht",
  "en": "My Shift"
 },
 "dash.checklistSS": {
  "de": "Aufgaben für heute",
  "en": "Tasks for today"
 },
 "dash.maintA": {
  "de": "Störungen",
  "en": "Fault Reports"
 },
 "dash.maintAS": {
  "de": "Gemeldete Defekte",
  "en": "Reported defects"
 },
 "dash.maintS": {
  "de": "Störung melden",
  "en": "Report a Fault"
 },
 "dash.maintSS": {
  "de": "Etwas kaputt?",
  "en": "Something broken?"
 },
 "dash.found": {
  "de": "Fundsachen",
  "en": "Lost & Found"
 },
 "dash.foundSub": {
  "de": "Vergessene Dinge der Gäste",
  "en": "Things guests left behind"
 },
 "dash.lossA": {
  "de": "Verluste & Bruch",
  "en": "Losses & Breakage"
 },
 "dash.lossAS": {
  "de": "Übersicht & Export",
  "en": "Overview & export"
 },
 "dash.lossS": {
  "de": "Bruch melden",
  "en": "Report Breakage"
 },
 "dash.lossSS": {
  "de": "Gläser, Verschüttetes",
  "en": "Glasses, spills"
 },
 "dash.teamplan": {
  "de": "Team & Arbeitsplan",
  "en": "Team Schedule"
 },
 "dash.teamplanSub": {
  "de": "Monatsraster, Stunden, Schichten",
  "en": "Month grid, hours, shifts"
 },
 "dash.swaps": {
  "de": "Schichttausch",
  "en": "Shift Swap"
 },
 "dash.swapsA": {
  "de": "Anfragen genehmigen",
  "en": "Approve requests"
 },
 "dash.swapsS": {
  "de": "Tauschen & Börse",
  "en": "Swap & board"
 },
 "dash.payroll": {
  "de": "Stunden & Lohn",
  "en": "Hours & Payroll"
 },
 "dash.payrollSub": {
  "de": "Monatsstunden, Excel",
  "en": "Monthly hours, Excel"
 },
 "dash.staff": {
  "de": "Personal & PINs",
  "en": "Staff & PINs"
 },
 "dash.staffSub": {
  "de": "Mitarbeiter, Rollen, Rechte",
  "en": "Employees, roles, rights"
 },
 "dash.chat": {
  "de": "Team-Chat",
  "en": "Team Chat"
 },
 "dash.chatSub": {
  "de": "Nachrichten ans Team",
  "en": "Messages to the team"
 },
 "dash.myplan": {
  "de": "Mein Arbeitsplan",
  "en": "My Schedule"
 },
 "dash.myplanSub": {
  "de": "Schichten, Pausen, Tausch",
  "en": "Shifts, breaks, swaps"
 },
 "dash.login": {
  "de": "Login-Protokoll",
  "en": "Login Log"
 },
 "dash.loginSub": {
  "de": "Wer war wann online",
  "en": "Who was online and when"
 },
 "dash.settings": {
  "de": "Einstellungen",
  "en": "Settings"
 },
 "dash.settingsSub": {
  "de": "Design, Schrift, Hinweise",
  "en": "Theme, text size, notifications"
 },
 "dash.news": {
  "de": "Was ist neu?",
  "en": "What's new?"
 },
 "dash.newsSub": {
  "de": "Neuigkeiten (auf Deutsch)",
  "en": "News (in German)"
 },
 "dash.support": {
  "de": "Support & Tickets",
  "en": "Support & Tickets"
 },
 "dash.supportSub": {
  "de": "App-Fehler melden",
  "en": "Report app problems"
 },
 "dash.help": {
  "de": "Hilfe & Anleitung",
  "en": "Help & Guide"
 },
 "dash.helpSub": {
  "de": "So funktioniert alles",
  "en": "How everything works"
 },
 "dash.morning": {
  "de": "Guten Morgen, {name}!",
  "en": "Good morning, {name}!"
 },
 "dash.hello": {
  "de": "Hallo, {name}!",
  "en": "Hello, {name}!"
 },
 "dash.evening": {
  "de": "Guten Abend, {name}!",
  "en": "Good evening, {name}!"
 },
 "common.close": {
  "de": "Schließen",
  "en": "Close"
 },
 "common.done": {
  "de": "Fertig",
  "en": "Done"
 }
};

    function langLocale() { return currentLang === 'en' ? 'en-GB' : 'de-AT'; }

    function t(key, vars) {
      const e = I18N_DICT[key];
      let s = e ? (e[currentLang] !== undefined ? e[currentLang] : e.de) : key;
      if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
      return s;
    }

    function applyTranslations(root) {
      const scope = root || document;
      scope.querySelectorAll('[data-i18n]').forEach(el => {
        const e = I18N_DICT[el.getAttribute('data-i18n')];
        if (e) el.textContent = e[currentLang] !== undefined ? e[currentLang] : e.de;
      });
      [['data-i18n-ph', 'placeholder'], ['data-i18n-title', 'title'], ['data-i18n-aria', 'aria-label']].forEach(p => {
        scope.querySelectorAll('[' + p[0] + ']').forEach(el => {
          const e = I18N_DICT[el.getAttribute(p[0])];
          if (e) el.setAttribute(p[1], e[currentLang] !== undefined ? e[currentLang] : e.de);
        });
      });
    }

    function updateLangSwitchUI() {
      document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === currentLang));
    }

    function setLanguage(lang) {
      if (lang !== 'de' && lang !== 'en') return;
      currentLang = lang;
      try { localStorage.setItem('nexus_lang', lang); } catch (e) {}
      document.documentElement.lang = lang;
      applyTranslations();
      updateLangSwitchUI();
      if (typeof renderLoginGrid === 'function') renderLoginGrid();
      if (typeof currentWaiterName !== 'undefined' && currentWaiterName) {
        if (typeof applyRoleUI === 'function') applyRoleUI();
        if (typeof updateActiveSeasonBadgeUI === 'function') updateActiveSeasonBadgeUI();
        if (typeof renderDashboard === 'function') renderDashboard();
        if (typeof updateUnifiedSettingsUI === 'function') updateUnifiedSettingsUI();
      }
      if (typeof helpOnLanguageChange === 'function') helpOnLanguageChange();
    }

    document.documentElement.lang = currentLang;
    applyTranslations();
    updateLangSwitchUI();
