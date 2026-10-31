/* Dynamics-instructies \u2014 onderwerp 6: Weergaven. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P;

  var TOPIC = { nl: 'Weergaven', en: 'Views' };
  var MY_VIEW = 'Mijn verkoopkansen deze maand';
  var SYS_VIEWS = ['Alle verkoopkansen', 'Binnengehaalde verkoopkansen', 'Gemiste verkoopkansen', 'Gesloten verkoopkansen', 'Mijn open verkoopkansen', 'Open verkoopkansen'];
  var ME = 'Jansen, Eva';
  /* onderwerp, account, klantprofielscore, omzet, eigenaar, sluitdatum, slagingskans, type (nk/vl) */
  var OPPS = [
    ['Breedveld Logistiek', 'Breedveld Logistiek', '', 12000, ME, '28-10-2026', 40, 'nk'],
    ['Hoveniersbedrijf Ter Meer', 'Hoveniersbedrijf Ter Meer', '', 2400, ME, '29-10-2026', 50, 'nk'],
    ['Aalberts Kinderopvang', 'Aalberts Kinderopvang', 68, 5600, 'de Wit, Tom', '30-10-2026', 80, 'vl'],
    ['Zorggroep Lindenhoven', 'Zorggroep Lindenhoven', 74, 26000, ME, '31-10-2026', 90, 'vl'],
    ['Westvliet Groep', 'Westvliet Groep', '', 8000, 'Kaya, Sara', '31-10-2026', 30, 'nk'],
    ['Gemeente Lindenhoven', 'Gemeente Lindenhoven', '', 22000, ME, '15-11-2026', 30, 'nk'],
    ['Jeugdzorg Rivierenland', 'Jeugdzorg Rivierenland', 61, 11200, 'Kaya, Sara', '20-11-2026', 70, 'vl'],
    ['Van Dijk Installatietechniek B.V.', 'Van Dijk Installatietechniek B.V.', '', 4500, 'de Wit, Tom', '1-12-2026', 20, 'nk'],
    ['Bakkerij De Korenaar', 'Bakkerij De Korenaar', '', 7500, ME, '15-12-2026', 20, 'nk'],
    ['Co\u00f6peratie Zuiderzorg', 'Co\u00f6peratie Zuiderzorg', 70, 9800, ME, '14-1-2027', 60, 'vl'],
    ['Stichting Welzijn Lindenhoven', 'Stichting Welzijn Lindenhoven', 72, 18400, ME, '31-3-2027', 50, 'vl']
  ];
  var DATE_OPS = ['Op', 'Op of na', 'Op of voor', 'Vandaag', 'Gisteren', 'Morgen', 'Deze week', 'Deze maand', 'Dit jaar', 'Deze boekingsperiode'];
  var DATE_OPS_EN = ['On', 'On or after', 'On or before', 'Today', 'Yesterday', 'Tomorrow', 'This week', 'This month', 'This year', 'This fiscal period'];

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u201320). */
  function S(o) { return Object.assign({ v: 'open' }, o); }
  var MIJN = { v: 'mijn' };
  var MONTH = { v: 'mijn', month: true, mod: true };
  var SORTED = Object.assign({ desc: true }, MONTH);
  var TYPED = Object.assign({ type: true }, SORTED);
  function M(base, o) { return Object.assign({}, base, o); }

  var STEPS = [
    { n: 1, s: { dash: true, nav: 'dashboards' }, t: 'nav:opportunities',
      title: { nl: 'Open Verkoopkansen', en: 'Open Opportunities' },
      body: { nl: 'Een weergave bepaalt welke records je in een lijst ziet, met welke kolommen en in welke volgorde. Je oefent in de lijst Verkoopkansen. Klik in het menu op Verkoopkansen.', en: 'A view determines which records you see in a list, with which columns and in which order. You practise in the Opportunities list. In the menu, click Opportunities.' },
      hint: { nl: 'Verkoopkansen staat in het menu links onder Verkoop.', en: 'Opportunities is in the menu on the left, under Sales.' } },
    { n: 2, s: S({}), t: 'view:title',
      title: { nl: 'De weergavekiezer', en: 'The view selector' },
      body: { nl: 'Open verkoopkansen toont de open verkoopkansen van al je collega\u2019s. Je wilt alleen die van jezelf zien. Klik op de naam van de weergave.', en: 'Open Opportunities shows the open opportunities of all your colleagues. You only want to see your own. Click the name of the view.' },
      hint: { nl: 'De weergavenaam staat linksboven de lijst, met een pijltje ernaast.', en: 'The view name is at the top left of the list, with an arrow next to it.' } },
    { n: 3, s: S({ vmenu: true }), t: 'view:Mijn open verkoopkansen',
      title: { nl: 'Kies Mijn open verkoopkansen', en: 'Choose My Open Opportunities' },
      body: { nl: 'Kies Mijn open verkoopkansen.', en: 'Choose My Open Opportunities (Mijn open verkoopkansen).' },
      hint: { nl: 'Mijn open verkoopkansen staat boven Open verkoopkansen.', en: 'Mijn open verkoopkansen is above Open verkoopkansen.' } },
    { n: 4, s: M(MIJN, {}), t: 'col:close',
      title: { nl: 'Filteren op sluitingsdatum', en: 'Filter by close date' },
      body: { nl: 'Nu zie je alleen je eigen verkoopkansen. Je wilt weten welke deze maand moeten sluiten. Klik op de kolomkop Verwachte sluitingsdatum.', en: 'Now you only see your own opportunities. You want to know which ones should close this month. Click the Est. Close Date column header.' },
      hint: { nl: 'Verwachte sluitingsdatum staat rechts van Eigenaar.', en: 'Est. Close Date is to the right of Owner.' } },
    { n: 5, s: M(MIJN, { cmenu: 'close' }), t: 'cm:filter',
      title: { nl: 'Klik op Filteren op', en: 'Click Filter by' },
      body: { nl: 'Met dit menu sorteer je, filter je of verplaats je de kolom. Klik op Filteren op.', en: 'With this menu you sort, filter or move the column. Click Filter by.' },
      hint: { nl: 'Filteren op staat onder Groeperen op.', en: 'Filter by is below Group by.' } },
    { n: 6, s: M(MIJN, { fpanel: true }), t: 'flt:Deze maand',
      title: { nl: 'Kies Deze maand', en: 'Choose This month' },
      body: { nl: 'Kies in de lijst Deze maand.', en: 'In the list, choose This month (Deze maand).' },
      hint: { nl: 'Deze maand staat onder Deze week.', en: 'This month is below This week.' } },
    { n: 7, s: M(MIJN, { fpanel: true, fsel: true }), t: 'flt:apply',
      title: { nl: 'Toepassen', en: 'Apply' },
      body: { nl: 'Klik op Toepassen.', en: 'Click Apply.' },
      hint: { nl: 'Toepassen staat onderaan het filtervenster.', en: 'Apply is at the bottom of the filter window.' } },
    { n: 8, s: M(MONTH, {}), t: 'col:omzet',
      title: { nl: 'Sorteren op omzet', en: 'Sort by revenue' },
      body: { nl: 'Er staan nu alleen verkoopkansen die deze maand sluiten. Het filtericoontje bij de kolomkop laat zien dat er een filter actief is. Zet nu de grootste kansen bovenaan: klik op de kolomkop Geschatte omzet.', en: 'Only opportunities closing this month are listed now. The filter icon at the column header shows that a filter is active. Now put the biggest deals at the top: click the Est. Revenue column header.' },
      hint: { nl: 'Geschatte omzet staat rechts van Klantprofiel score.', en: 'Est. Revenue is to the right of Customer profile score.' } },
    { n: 9, s: M(MONTH, { cmenu: 'omzet' }), t: 'cm:desc',
      title: { nl: 'Groot naar klein', en: 'Largest to smallest' },
      body: { nl: 'Kies Groter naar kleiner.', en: 'Choose Largest to smallest.' },
      hint: { nl: 'Groter naar kleiner is de tweede optie.', en: 'Largest to smallest is the second option.' } },
    { n: 10, s: M(SORTED, {}), t: 'tool:cols',
      title: { nl: 'Een kolom toevoegen', en: 'Add a column' },
      body: { nl: 'De grootste kans staat bovenaan. Je wilt ook zien of het om een nieuwe klant of een verlenging gaat. Klik op Kolommen bewerken.', en: 'The biggest deal is at the top. You also want to see whether it is a new customer or a renewal. Click Edit columns.' },
      hint: { nl: 'Kolommen bewerken staat rechtsboven de lijst.', en: 'Edit columns is at the top right of the list.' } },
    { n: 11, s: M(SORTED, { ec: true }), t: 'ec:add',
      title: { nl: 'Kolommen toevoegen', en: 'Add columns' },
      body: { nl: 'Hier zie je de kolommen van de weergave. Klik op Kolommen toevoegen; in het zoekveld wordt Type ingetypt.', en: 'Here you see the columns of the view. Click Add columns; Type is typed into the search box.' },
      hint: { nl: 'Kolommen toevoegen staat bovenaan het paneel.', en: 'Add columns is at the top of the panel.' } },
    { n: 12, s: M(SORTED, { ec: true, ac: true }), t: 'ac:Type',
      title: { nl: 'Vink Type aan', en: 'Tick Type' },
      body: { nl: 'Type laat zien of het een Nieuwe Klant of een Verlenging is. Vink Type aan.', en: 'Type shows whether it is a New Customer or a Renewal. Tick Type.' },
      hint: { nl: 'Type staat onder Aanvulling typering.', en: 'Type is below Aanvulling typering.' } },
    { n: 13, s: M(SORTED, { ec: true, ac: true, acChk: true }), t: 'ac:close',
      title: { nl: 'Afsluiten', en: 'Close' },
      body: { nl: 'Klik op Afsluiten.', en: 'Click Close.' },
      hint: { nl: 'Afsluiten staat rechtsonder in het paneel.', en: 'Close is at the bottom right of the panel.' } },
    { n: 14, s: M(SORTED, { ec: true, ecType: true }), t: 'ec:apply',
      title: { nl: 'Toepassen', en: 'Apply' },
      body: { nl: 'Type staat nu onderaan de kolommen. Klik op Toepassen.', en: 'Type is now at the bottom of the columns. Click Apply.' },
      hint: { nl: 'Toepassen staat onderaan het paneel.', en: 'Apply is at the bottom of the panel.' } },
    { n: 15, s: M(TYPED, {}), t: 'view:title',
      title: { nl: 'Bewaar je weergave', en: 'Keep your view' },
      body: { nl: 'De kolom Type staat erbij. Het sterretje achter de weergavenaam betekent: de weergave is aangepast, maar nog niet opgeslagen. Klik op de weergavenaam om hem op te slaan.', en: 'The Type column has been added. The asterisk after the view name means: the view has been changed, but not saved yet. Click the view name to save it.' },
      hint: { nl: 'De weergavenaam staat linksboven de lijst.', en: 'The view name is at the top left of the list.' } },
    { n: 16, s: M(TYPED, { vmenu: true }), t: 'view:save',
      title: { nl: 'Opslaan als nieuwe weergave', en: 'Save as new view' },
      body: { nl: 'Klik onderaan op Opslaan als nieuwe weergave.', en: 'At the bottom, click Save as new view.' },
      hint: { nl: 'Opslaan als nieuwe weergave is de eerste optie onder de lijst met weergaven.', en: 'Save as new view is the first option below the list of views.' } },
    { n: 17, s: M(TYPED, { dlg: true }), t: 'sv:naam',
      title: { nl: 'Geef je weergave een naam', en: 'Name your view' },
      body: { nl: 'Klik op Naam; de naam Mijn verkoopkansen deze maand wordt ingevuld.', en: 'Click Name; the name Mijn verkoopkansen deze maand is filled in.' },
      hint: { nl: 'Naam is het eerste veld in het venster.', en: 'Name is the first field in the window.' } },
    { n: 18, s: M(TYPED, { dlg: true, named: true }), t: 'sv:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Klik op Opslaan.', en: 'Click Save.' },
      hint: { nl: 'Opslaan is de blauwe knop.', en: 'Save is the blue button.' } },
    { n: 19, s: M(TYPED, { saved: true, mod: false }), t: 'view:title',
      title: { nl: 'Als standaard instellen', en: 'Set as default' },
      body: { nl: 'Je weergave is opgeslagen en staat nu bij Mijn weergaven. Zorg dat Verkoopkansen voortaan met deze weergave opent: klik op de weergavenaam.', en: 'Your view has been saved and is now under My views. Make Opportunities open with this view from now on: click the view name.' },
      hint: { nl: 'De weergavenaam staat linksboven de lijst.', en: 'The view name is at the top left of the list.' } },
    { n: 20, s: M(TYPED, { saved: true, mod: false, vmenu: true }), t: 'view:default',
      title: { nl: 'Instellen als standaardweergave', en: 'Set as default view' },
      body: { nl: 'Klik op Instellen als standaardweergave. Voortaan opent Verkoopkansen meteen met jouw weergave.', en: 'Click Set as default view. From now on, Opportunities opens with your view straight away.' },
      hint: { nl: 'Instellen als standaardweergave staat onderaan het menu.', en: 'Set as default view is at the bottom of the menu.' } }
  ];
  var TOTAL = 20;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Hoe zie je alleen je eigen open verkoopkansen?', en: 'How do you see only your own open opportunities?' },
      o: [{ nl: 'Filteren op trefwoord met je eigen naam', en: 'Filter by keyword with your own name' }, { nl: 'Weergavekiezer \u2192 Mijn open verkoopkansen', en: 'View selector \u2192 My Open Opportunities' }, { nl: 'Kolommen bewerken \u2192 Eigenaar verwijderen', en: 'Edit columns \u2192 remove Owner' }, { nl: 'Dat kan niet', en: 'That is not possible' }], a: 1,
      x: { nl: 'In de weergavekiezer kies je Mijn open verkoopkansen: dan zie je alleen de open verkoopkansen waarvan jij eigenaar bent.', en: 'In the view selector you choose My Open Opportunities: then you only see the open opportunities you own.' } },
    { q: { nl: 'Wat betekent het sterretje achter de weergavenaam?', en: 'What does the asterisk after the view name mean?' },
      o: [{ nl: 'Het is je standaardweergave', en: 'It is your default view' }, { nl: 'De weergave is gedeeld met collega\u2019s', en: 'The view is shared with colleagues' }, { nl: 'De weergave is aangepast maar nog niet opgeslagen', en: 'The view has been changed but not saved yet' }, { nl: 'Er zijn nieuwe verkoopkansen', en: 'There are new opportunities' }], a: 2,
      x: { nl: 'Het sterretje laat zien dat je filters, sortering of kolommen hebt aangepast. Sla de weergave op als je hem wilt bewaren.', en: 'The asterisk shows that you changed filters, sorting or columns. Save the view if you want to keep it.' } },
    { q: { nl: 'Waar voeg je een kolom toe aan een lijst?', en: 'Where do you add a column to a list?' },
      o: [{ nl: 'Kolommen bewerken \u2192 Kolommen toevoegen', en: 'Edit columns \u2192 Add columns' }, { nl: 'Filters bewerken', en: 'Edit filters' }, { nl: 'In de opdrachtbalk via Nieuw', en: 'In the command bar via New' }, { nl: 'Via het menu van een kolomkop \u2192 Groeperen op', en: 'Via a column header menu \u2192 Group by' }], a: 0,
      x: { nl: 'Via Kolommen bewerken en dan Kolommen toevoegen zoek je een veld op en vink je het aan. Daarna klik je op Toepassen.', en: 'Via Edit columns and then Add columns you look up a field and tick it. Then you click Apply.' } },
    { q: { nl: 'Hoe toon je alleen de verkoopkansen die deze maand moeten sluiten?', en: 'How do you show only the opportunities that should close this month?' },
      o: [{ nl: 'Sorteren op Verwachte sluitingsdatum', en: 'Sort by Est. Close Date' }, { nl: 'Weergave Gesloten verkoopkansen kiezen', en: 'Choose the Closed Opportunities view' }, { nl: 'Filteren op trefwoord met de maandnaam', en: 'Filter by keyword with the month name' }, { nl: 'Kolomkop Verwachte sluitingsdatum \u2192 Filteren op \u2192 Deze maand', en: 'Est. Close Date column header \u2192 Filter by \u2192 This month' }], a: 3,
      x: { nl: 'In het menu van de kolomkop kies je Filteren op en dan Deze maand. Sorteren verandert alleen de volgorde, niet welke rijen je ziet.', en: 'In the column header menu you choose Filter by and then This month. Sorting only changes the order, not which rows you see.' } },
    { q: { nl: 'Hoe zorg je dat Verkoopkansen altijd met jouw eigen weergave opent?', en: 'How do you make Opportunities always open with your own view?' },
      o: [{ nl: 'De weergave een naam geven die met A begint', en: 'Give the view a name that starts with A' }, { nl: 'Weergavekiezer \u2192 Instellen als standaardweergave', en: 'View selector \u2192 Set as default view' }, { nl: 'De weergave delen met jezelf', en: 'Share the view with yourself' }, { nl: 'Dat gaat vanzelf na opslaan', en: 'That happens automatically after saving' }], a: 1,
      x: { nl: 'Open je weergave, klik op de weergavenaam en kies Instellen als standaardweergave.', en: 'Open your view, click the view name and choose Set as default view.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je in de lijst Verkoopkansen een andere weergave kiezen, filteren en sorteren, een kolom toevoegen en je aangepaste lijst opslaan als eigen standaardweergave.', parts: ['Weergave wisselen', 'Filteren en sorteren', 'Kolom toevoegen', 'Opslaan als eigen weergave'], steps: '20 stappen', time: 'Ongeveer 10 minuten' },
    en: { intro: 'In this topic you learn, in the Opportunities list, to choose another view, filter and sort, add a column and save your adjusted list as your own default view.', parts: ['Switch views', 'Filter and sort', 'Add a column', 'Save as your own view'], steps: '20 steps', time: 'About 10 minutes' }
  };

  /* ---------- De lijst ---------- */
  function euro(n) { return '\u20ac ' + n.toLocaleString('nl-NL') + ',00'; }
  var COLS = [
    { k: 'subj', l: { nl: 'Onderwerp', en: 'Topic' }, w: 280, link: true },
    { k: 'acc', l: { nl: 'Account', en: 'Account' }, w: 230, link: true },
    { k: 'kp', l: { nl: 'Klantprofiel sc...', en: 'Customer profi...' }, w: 120, end: true },
    { k: 'omzet', l: { nl: 'Geschatte o...', en: 'Est. Reven...' }, w: 140, end: true },
    { k: 'salta', l: { nl: 'AM Salta', en: 'AM Salta' }, w: 90 },
    { k: 'owner', l: { nl: 'Eigenaar', en: 'Owner' }, w: 160 },
    { k: 'close', l: { nl: 'Verwachte sluitingsd...', en: 'Est. Close Date' }, w: 180 },
    { k: 'status', l: 'Status', w: 90 },
    { k: 'kans', l: { nl: 'Slagingskan...', en: 'Probability' }, w: 110, end: true }
  ];
  var TYPE_COL = { k: 'type', l: 'Type', w: 140 };

  function List(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t;
    var viewName = s.saved ? MY_VIEW : s.v === 'mijn' ? 'Mijn open verkoopkansen' : 'Open verkoopkansen';
    var rows = OPPS.filter(function (r) { return s.v === 'open' || r[4] === ME; })
      .filter(function (r) { return !s.month || /-10-2026$/.test(r[5]); });
    if (s.desc) rows = rows.slice().sort(function (a, b) { return b[3] - a[3]; });
    var cols = s.type ? COLS.concat([TYPE_COL]) : COLS;
    var tpl = '44px ' + cols.map(function (c) { return c.w + 'px'; }).join(' ');
    var title = h('button', { type: 'button', className: 'dy-view__title' + (s.vmenu ? ' is-open' : '') }, h('span', null, viewName + (s.mod ? '*' : '')), h(D.Icon, { name: 'chevron-down', size: 16 }));
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', lang: lang }),
      h('div', { className: 'dy-shell__card vwcard' },
        h('div', { className: 'dy-view' },
          h('div', { className: 'dy-view__left' }, P(t === 'view:title', title), s.vmenu ? h(ViewMenu, { s: s, lang: lang, t: t }) : null),
          h('div', { className: 'dy-view__tools' },
            P(t === 'tool:cols', h('button', { type: 'button', className: 'dy-view__tool' }, h(D.Icon, { name: 'edit-columns', size: 16 }), D.t('editcolumns', lang))),
            h('button', { type: 'button', className: 'dy-view__tool' }, h(D.Icon, { name: 'filter', size: 16 }), D.t('editfilters', lang)),
            h('label', { className: 'dy-view__kw' }, h(D.Icon, { name: 'search', size: 16 }), h('span', { className: 'vwkw' }, D.t('keyword', lang))))),
        h('div', { className: 'vwgrid' },
          h('div', { className: 'vwgrid__head', style: { gridTemplateColumns: tpl } }, h('span', { className: 'vwgrid__chk' }, h(D.Icon, { name: 'checkbox', size: 16 })),
            cols.map(function (c) {
              var sort = (c.k === 'close' && !s.desc) ? 'sort-up' : (c.k === 'omzet' && s.desc) ? 'sort-down' : null;
              var th = h('span', { className: 'vwgrid__th' + (s.cmenu === c.k || (c.k === 'close' && s.fpanel) ? ' is-open' : '') + (c.end ? ' is-end' : '') },
                h('span', { className: 'vwgrid__thl' }, L(c.l, lang)), sort ? h(D.Icon, { name: sort, size: 16 }) : null,
                c.k === 'close' && s.month ? h(D.Icon, { name: 'filter', size: 12 }) : null, h(D.Icon, { name: 'chevron-down', size: 12 }));
              return h('span', { key: c.k, className: 'vwgrid__thw' }, P(t === 'col:' + c.k, th),
                s.cmenu === c.k ? h(ColMenu, { k: c.k, lang: lang, t: t }) : null,
                c.k === 'close' && s.fpanel ? h(FilterPanel, { s: s, lang: lang, t: t }) : null);
            })),
          rows.map(function (r, i) {
            return h('div', { key: r[0], className: 'vwgrid__row', style: { gridTemplateColumns: tpl } }, h('span', { className: 'vwgrid__chk' }, h(D.Icon, { name: 'checkbox', size: 16 })),
              cols.map(function (c) {
                var v = c.k === 'subj' ? r[0] + ' | ' + (r[7] === 'vl' ? (isEn ? 'Renewal' : 'Verlenging') : (isEn ? 'New Customer' : 'Nieuwe Klant'))
                  : c.k === 'acc' ? r[1] : c.k === 'kp' ? r[2] : c.k === 'omzet' ? euro(r[3]) : c.k === 'salta' ? '' : c.k === 'close' ? r[5]
                  : c.k === 'status' ? 'Open' : c.k === 'kans' ? r[6] : c.k === 'type' ? (r[7] === 'vl' ? (isEn ? 'Renewal' : 'Verlenging') : (isEn ? 'New Customer' : 'Nieuwe Klant')) : null;
                if (c.k === 'owner') return h('span', { key: c.k, className: 'vwgrid__owner' }, h(D.Avatar, { name: r[4] }), h('a', null, r[4]));
                return h('span', { key: c.k, className: (c.end ? 'is-end' : '') + (c.k === 'type' ? ' is-new' : '') }, c.link ? h('a', null, v) : v);
              }));
          }),
          h('div', { className: 'vwgrid__foot' }, (isEn ? 'Rows: ' : 'Rijen: ') + rows.length))),
      s.dlg ? h(SaveDialog, { s: s, lang: lang, t: t }) : null);
  }

  function ViewMenu(p) {
    var s = p.s, isEn = p.lang === 'en', t = p.t;
    var current = s.saved ? MY_VIEW : s.v === 'mijn' ? 'Mijn open verkoopkansen' : 'Open verkoopkansen';
    function opt(name) {
      var on = name === current;
      return P(t === 'view:' + name, h('span', { key: name, className: 'vwmenu__o' + (on ? ' is-sel' : '') }, on ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), name), true);
    }
    return h('div', { className: 'vwmenu' },
      h('div', { className: 'vwmenu__search' }, h(D.Icon, { name: 'search', size: 16 }), isEn ? 'Search views' : 'Zoekweergaven'),
      h('div', { className: 'vwmenu__list' },
        s.saved ? h('div', { className: 'vwmenu__g' }, isEn ? 'My views' : 'Mijn weergaven') : null,
        s.saved ? opt(MY_VIEW) : null,
        h('div', { className: 'vwmenu__g' }, isEn ? 'System views' : 'Systeemweergaven'),
        SYS_VIEWS.map(opt)),
      h('div', { className: 'vwmenu__foot' },
        s.mod ? P(t === 'view:save', h('span', { className: 'vwmenu__a' }, h(D.Icon, { name: 'save', size: 16 }), isEn ? 'Save as new view' : 'Opslaan als nieuwe weergave'), true)
          : P(t === 'view:default', h('span', { className: 'vwmenu__a' }, h(D.Icon, { name: 'pin', size: 16 }), isEn ? 'Set as default view' : 'Instellen als standaardweergave'), true),
        h('span', { className: 'vwmenu__a' }, h(D.Icon, { name: 'retry', size: 16 }), isEn ? 'Reset default view' : 'Standaardweergave opnieuw instellen'),
        h('span', { className: 'vwmenu__a' }, h(D.Icon, { name: 'settings', size: 16 }), isEn ? 'Manage and share views' : 'Weergaven beheren en delen')));
  }

  function ColMenu(p) {
    var isEn = p.lang === 'en', t = p.t, date = p.k === 'close';
    var o1 = date ? (isEn ? 'Older to newer' : 'Ouder naar nieuwer') : (isEn ? 'Smallest to largest' : 'Kleiner naar groter');
    var o2 = date ? (isEn ? 'Newer to older' : 'Nieuwer naar ouder') : (isEn ? 'Largest to smallest' : 'Groter naar kleiner');
    return h('div', { className: 'vwcm' },
      h('span', { className: 'vwcm__o' }, date ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'sort-up', size: 16 }), o1),
      P(t === 'cm:desc', h('span', { className: 'vwcm__o' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'sort-down', size: 16 }), o2), true),
      h('span', { className: 'vwcm__o is-sep' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'views', size: 16 }), isEn ? 'Group by' : 'Groeperen op'),
      P(t === 'cm:filter', h('span', { className: 'vwcm__o' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'filter', size: 16 }), isEn ? 'Filter by' : 'Filteren op'), true),
      h('span', { className: 'vwcm__o is-sep' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'edit-columns', size: 16 }), isEn ? 'Column width' : 'Kolombreedte'),
      h('span', { className: 'vwcm__o' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'back', size: 16 }), isEn ? 'Move left' : 'Naar links verplaatsen'),
      h('span', { className: 'vwcm__o' }, h('span', { className: 'dd__sp' }), h(D.Icon, { name: 'forward', size: 16 }), isEn ? 'Move right' : 'Naar rechts verplaatsen'));
  }

  function FilterPanel(p) {
    var s = p.s, isEn = p.lang === 'en', t = p.t, ops = isEn ? DATE_OPS_EN : DATE_OPS;
    return h('div', { className: 'vwflt' },
      h('div', { className: 'vwflt__h' }, h('b', null, isEn ? 'Filter by' : 'Filteren op'), h(D.Icon, { name: 'dismiss', size: 16 })),
      h('span', { className: 'vwflt__sel' + (s.fsel ? '' : ' is-open') }, s.fsel ? ops[7] : ops[0], h(D.Icon, { name: 'chevron-down', size: 16 })),
      s.fsel ? h('div', { className: 'vwflt__foot' }, P(t === 'flt:apply', h('span', { className: 'vwflt__btn is-primary' }, isEn ? 'Apply' : 'Toepassen')), h('span', { className: 'vwflt__btn' }, isEn ? 'Clear' : 'Wissen'))
        : h('div', { className: 'vwflt__list' }, DATE_OPS.map(function (o, i) {
          return P(t === 'flt:' + o, h('span', { key: o, className: 'vwflt__o' + (i === 0 ? ' is-sel' : '') }, ops[i]), true);
        })));
  }

  function SaveDialog(p) {
    var s = p.s, isEn = p.lang === 'en', t = p.t;
    return h(React.Fragment, null, h('div', { className: 'vwdim' }),
      h('div', { className: 'vwdlg' },
        h('div', { className: 'vwdlg__h' }, h('b', null, isEn ? 'Save as new view' : 'Opslaan als nieuwe weergave'), h(D.Icon, { name: 'dismiss', size: 16 })),
        h('div', { className: 'vwdlg__sub' }, isEn ? 'The view is saved in the list of views' : 'De weergave is opgeslagen in de lijst met weergaven'),
        h('div', { className: 'fld vwdlg__fld' }, h('span', { className: 'fld__l' }, isEn ? 'Name' : 'Naam', h('i', null, '*')),
          P(t === 'sv:naam', h('span', { className: 'fld__v' }, s.named ? MY_VIEW : 'Open verkoopkansen'), true)),
        h('div', { className: 'fld vwdlg__fld' }, h('span', { className: 'fld__l' }, isEn ? 'Description' : 'Beschrijving'), h('span', { className: 'fld__v is-empty vwdlg__area' }, '---')),
        h('div', { className: 'vwdlg__foot' }, P(t === 'sv:save', h('span', { className: 'vwflt__btn is-primary' }, isEn ? 'Save' : 'Opslaan')), h('span', { className: 'vwflt__btn' }, isEn ? 'Cancel' : 'Annuleren'))));
  }

  /* Paneel Kolommen bewerken (en Kolommen toevoegen) */
  function ColPanel(p) {
    var s = p.s, isEn = p.lang === 'en', t = p.t;
    var names = ['Onderwerp', 'Account', 'Klantprofiel score (Account)', 'Geschatte omzet (totale contractwaarde)', 'AM Salta', 'Eigenaar', 'Verwachte sluitingsdatum', 'Status', 'Slagingskans (%)', 'Pijplijnstadium'];
    if (s.ecType) names = names.concat(['Type']);
    if (s.ac) {
      return h('aside', { className: 'vwpanel' },
        h('div', { className: 'vwpanel__h' }, h('b', null, isEn ? 'Add columns' : 'Kolommen toevoegen'), h(D.Icon, { name: 'dismiss', size: 16 })),
        h('div', { className: 'vwpanel__tabs' }, h('span', { className: 'is-on' }, isEn ? 'Opportunity' : 'Verkoopkans'), h('span', null, isEn ? 'Related' : 'Gerelateerd')),
        h('div', { className: 'vwpanel__search' }, h('span', null, h(D.Icon, { name: 'search', size: 16 }), 'Type'), h('span', null, isEn ? 'All' : 'Alle', h(D.Icon, { name: 'chevron-down', size: 16 }))),
        h('div', { className: 'vwpanel__list' },
          h('span', { className: 'vwpanel__chk' }, h(D.Icon, { name: 'checkbox', size: 16 }), 'Aanvulling typering'),
          P(t === 'ac:Type', h('span', { className: 'vwpanel__chk' }, h(D.Icon, { name: s.acChk ? 'checkbox-checked-filled' : 'checkbox', size: 16, color: s.acChk ? 'var(--brand)' : undefined }), 'Type'), true)),
        h('div', { className: 'vwpanel__foot' }, P(t === 'ac:close', h('span', { className: 'vwflt__btn' }, isEn ? 'Close' : 'Afsluiten'))));
    }
    return h('aside', { className: 'vwpanel' },
      h('div', { className: 'vwpanel__h' }, h('b', null, isEn ? 'Edit columns: Opportunities' : 'Kolommen bewerken: Verkoopkansen'), h(D.Icon, { name: 'dismiss', size: 16 })),
      P(t === 'ec:add', h('span', { className: 'vwpanel__add' }, h(D.Icon, { name: 'add', size: 16 }), isEn ? 'Add columns' : 'Kolommen toevoegen')),
      h('span', { className: 'vwpanel__reset' }, h(D.Icon, { name: 'retry', size: 16 }), isEn ? 'Reset to default' : 'Standaardwaarde opnieuw instellen'),
      h('div', { className: 'vwpanel__cols' }, names.map(function (n) { return h('span', { key: n, className: 'vwpanel__col' + (n === 'Type' ? ' is-new' : '') }, h(D.Icon, { name: 'report', size: 16 }), n); })),
      h('div', { className: 'vwpanel__foot' }, P(t === 'ec:apply', h('span', { className: 'vwflt__btn is-primary' }, isEn ? 'Apply' : 'Toepassen')), h('span', { className: 'vwflt__btn' }, isEn ? 'Cancel' : 'Annuleren')));
  }

  /* Het volledige nagebouwde scherm voor een stap */
  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.dash ? h(DI.Dash, { lang: lang, t: t }) : h(List, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'opportunities', overlay: s.ec ? h(React.Fragment, null, h('div', { className: 'vwdim vwdim--full' }), h(ColPanel, { s: s, lang: lang, t: t })) : null }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'lijstmeester', Screen: Screen };
})();
