/* Dynamics-instructies \u2014 onderwerp 7: Contracten. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P, CmdBar = DI.CmdBar;

  var TOPIC = { nl: 'Contracten', en: 'Contracts' };
  var ORG = 'Stichting Welzijn Lindenhoven';
  var ACCOUNTS = [
    ['Aalberts Kinderopvang', 'SkillsTown Direct', 'Klant', 'Actief', '0251 555 120', 'Castricum'],
    ['Bakkerij De Korenaar', 'SkillsTown Direct', 'Prospect', '', '030 555 0142', 'Utrecht'],
    ['Breedveld Logistiek', 'SkillsTown Direct', 'Prospect', '', '0345 555 210', 'Culemborg'],
    ['Co\u00f6peratie Zuiderzorg', 'SkillsTown (OA)', 'Klant', 'Actief', '0418 555 900', 'Zaltbommel'],
    ['Gemeente Lindenhoven', 'SkillsTown Direct', 'Prospect', '', '14 0555', 'Lindenhoven'],
    ['Jeugdzorg Rivierenland', 'SkillsTown Connect', 'Klant via Reseller', 'Actief', '0488 555 300', 'Elst'],
    ['Kinderopvang Het Speelhuis', 'SkillsTown Direct', 'Klant', 'Actief', '073 555 6120', 'Vught'],
    [ORG, 'SkillsTown Direct', 'Klant', 'Actief', '085 555 2200', 'Lindenhoven'],
    ['Westvliet Groep', 'SkillsTown (OA)', 'Cold Prospect', '', '010 555 3870', 'Rotterdam'],
    ['Zorggroep Lindenhoven', 'SkillsTown (OA)', 'Klant', 'Actief', '085 555 7300', 'Lindenhoven']
  ];

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u20138). */
  var CON = { view: 'acc', tab: 'con' };
  var STEPS = [
    { n: 1, s: { view: 'dash', nav: 'dashboards' }, t: 'nav:accounts',
      title: { nl: 'Contracten bekijk je via het account', en: 'You view contracts through the account' },
      body: { nl: 'De contracten van een klant bekijk je bij het account. Klik in het menu op Accounts.', en: 'You view a customer\u2019s contracts on the account. In the menu, click Accounts.' },
      hint: { nl: 'Accounts staat in het menu links onder Relaties.', en: 'Accounts is in the menu on the left, under Customers.' } },
    { n: 2, s: { view: 'alist' }, t: 'cell:7:name',
      title: { nl: 'Open het account', en: 'Open the account' },
      body: { nl: 'Klik op Stichting Welzijn Lindenhoven.', en: 'Click Stichting Welzijn Lindenhoven.' },
      hint: { nl: 'Het account staat onder Kinderopvang Het Speelhuis.', en: 'The account is below Kinderopvang Het Speelhuis.' } },
    { n: 3, s: { view: 'acc' }, t: 'tab:con',
      title: { nl: 'Tabblad Contract | Afspraken', en: 'Contract | Agreements tab' },
      body: { nl: 'Klik op het tabblad Contract | Afspraken.', en: 'Click the Contract | Agreements tab.' },
      hint: { nl: 'Contract | Afspraken staat rechts van Details.', en: 'Contract | Agreements is to the right of Details.' } },
    { n: 4, s: CON, info: true, focus: 'afs',
      title: { nl: 'Afspraken', en: 'Agreements' },
      body: { nl: 'Bovenaan staan de afspraken met de klant: hoe vaak er wordt gefactureerd, of er een kostenplaats op de factuur moet en hoe het contract wordt verlengd. Bij deze klant is dat Stilzwijgend.', en: 'At the top are the agreements with the customer: how often invoices are sent, whether a cost centre must be on the invoice and how the contract is renewed. For this customer that is Tacit.' } },
    { n: 5, s: CON, info: true, focus: 'con:list',
      title: { nl: 'Contracten', en: 'Contracts' },
      body: { nl: 'Elke rij is een contractperiode, met start- en einddatum, de totale contractwaarde en de indexatie. Actief is het lopende contract. Verlengd betekent dat er een nieuw contract op is gevolgd.', en: 'Each row is a contract period, with start and end date, the total contract value and the indexation. Active is the current contract. Renewed means a new contract has followed it.' } },
    { n: 6, s: CON, info: true, focus: 'con:eind',
      title: { nl: 'Let op de einddatum', en: 'Watch the end date' },
      body: { nl: 'De einddatum van het actieve contract laat zien wanneer de verlenging eraan komt. Die pak je op met een verkoopkans van het type Verlenging, zoals in het onderwerp Verkoopkansen.', en: 'The end date of the active contract shows when the renewal is coming up. You pick that up with an opportunity of type Renewal, as in the Opportunities topic.' } },
    { n: 7, s: CON, info: true, focus: 'con:regels',
      title: { nl: 'Contractregels', en: 'Contract lines' },
      body: { nl: 'Contractregels zijn de factuurmomenten van het contract. Per regel zie je de titel, het aantal licenties, de totaalprijs en de datum waarop de factuur is verstuurd.', en: 'Contract lines are the invoice moments of the contract. Per line you see the title, the number of licences, the total price and the date the invoice was sent.' } },
    { n: 8, s: CON, info: true, focus: 'con:btns',
      title: { nl: 'Niets wijzigen', en: 'Do not change anything' },
      body: { nl: 'Contracten en contractregels maken en wijzigen doet Commercial Ops. De knoppen Contract OA maken en Contractregel OA maken gebruik je dus niet. Klopt er iets niet? Mail dan naar orders@skillstown.nl.', en: 'Commercial Ops creates and changes contracts and contract lines. So you do not use the New Contract OA and New Contract line OA buttons. Is something wrong? Then email orders@skillstown.nl.' } }
  ];
  var TOTAL = 8;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Waar zie je de contracten van een klant?', en: 'Where do you see a customer\u2019s contracts?' },
      o: [{ nl: 'Op het tabblad Details van het account', en: 'On the account\u2019s Details tab' }, { nl: 'Op het tabblad Contract | Afspraken van het account', en: 'On the account\u2019s Contract | Agreements tab' }, { nl: 'In de tijdlijn van de verkoopkans', en: 'In the opportunity\u2019s timeline' }, { nl: 'In Mijn activiteiten', en: 'In My Activities' }], a: 1,
      x: { nl: 'Contracten en contractregels staan op het tabblad Contract | Afspraken van het account.', en: 'Contracts and contract lines are on the account\u2019s Contract | Agreements tab.' } },
    { q: { nl: 'Je ziet een fout in een contractregel. Wat doe je?', en: 'You spot a mistake in a contract line. What do you do?' },
      o: [{ nl: 'Zelf de contractregel aanpassen', en: 'Change the contract line yourself' }, { nl: 'Een nieuwe contractregel maken', en: 'Create a new contract line' }, { nl: 'Mailen naar orders@skillstown.nl', en: 'Email orders@skillstown.nl' }, { nl: 'Niets, dat lost zich vanzelf op', en: 'Nothing, it sorts itself out' }], a: 2,
      x: { nl: 'Contracten wijzigt alleen Commercial Ops. Je meldt de fout via orders@skillstown.nl.', en: 'Only Commercial Ops changes contracts. You report the mistake via orders@skillstown.nl.' } },
    { q: { nl: 'Wat betekent de contractstatus Verlengd?', en: 'What does the contract status Renewed mean?' },
      o: [{ nl: 'Er is een nieuw contract op gevolgd', en: 'A new contract has followed it' }, { nl: 'Het contract loopt nog', en: 'The contract is still running' }, { nl: 'Het contract is opgezegd', en: 'The contract has been cancelled' }, { nl: 'Het contract wacht op handtekening', en: 'The contract awaits signature' }], a: 0,
      x: { nl: 'Verlengd betekent dat de periode voorbij is en dat er een nieuw contract op is gevolgd. Het lopende contract heeft de status Actief.', en: 'Renewed means the period has ended and a new contract has followed. The current contract has the status Active.' } },
    { q: { nl: 'Wat zie je in Contractregels?', en: 'What do you see in Contract lines?' },
      o: [{ nl: 'De contactpersonen van het contract', en: 'The contacts of the contract' }, { nl: 'De afspraken in je agenda', en: 'The appointments in your calendar' }, { nl: 'De fasen van de verkoopkans', en: 'The stages of the opportunity' }, { nl: 'Per factuurmoment de licenties, de prijs en de datum waarop de factuur is verstuurd', en: 'Per invoice moment the licences, the price and the date the invoice was sent' }], a: 3,
      x: { nl: 'Contractregels zijn de factuurmomenten van het contract.', en: 'Contract lines are the invoice moments of the contract.' } },
    { q: { nl: 'Waarom is de einddatum van het actieve contract belangrijk voor jou?', en: 'Why is the end date of the active contract important to you?' },
      o: [{ nl: 'Dan moet je de factuur sturen', en: 'Then you have to send the invoice' }, { nl: 'Zo pak je de verlenging op tijd op', en: 'So you pick up the renewal in time' }, { nl: 'Dan wordt het account verwijderd', en: 'Then the account is deleted' }, { nl: 'Hij is niet belangrijk', en: 'It is not important' }], a: 1,
      x: { nl: 'Aan de einddatum zie je wanneer de verlenging eraan komt. Die pak je op met een verkoopkans van het type Verlenging.', en: 'The end date tells you when the renewal is coming up. You pick it up with an opportunity of type Renewal.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je de contracten en contractregels van een klant bekijken via het account. Contracten wijzig je niet zelf: dat doet Commercial Ops.', parts: ['Het account openen', 'Contracten en contractregels lezen', 'Wat je niet doet'], steps: '8 stappen', time: 'Ongeveer 5 minuten' },
    en: { intro: 'In this topic you learn to view a customer\u2019s contracts and contract lines through the account. You do not change contracts yourself: Commercial Ops does that.', parts: ['Open the account', 'Read contracts and contract lines', 'What you do not do'], steps: '8 steps', time: 'About 5 minutes' }
  };

  var CMD_ACC = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'org', i: 'assign', l: { nl: 'Organigram openen', en: 'Open Org Chart' } },
    { k: 'deactivate', i: 'error-circle', l: { nl: 'Deactiveren', en: 'Deactivate' } }, { k: 'connect', i: 'contact', l: { nl: 'Verbinding maken', en: 'Connect' }, chev: true },
    { k: 'mlist', i: 'report', l: { nl: 'Toevoegen aan marketinglijst', en: 'Add to Marketing List' } }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } },
    { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }, { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }
  ];
  var TABS = [['sam', { nl: 'Samenvatting', en: 'Summary' }], ['sub', { nl: 'Onderliggende Accounts', en: 'Child Accounts' }], ['adr', { nl: 'Adressen', en: 'Addresses' }], ['best', { nl: 'Bestanden', en: 'Files' }],
    ['sc', { nl: 'Sales Cases', en: 'Sales Cases' }], ['det', { nl: 'Details', en: 'Details' }], ['con', { nl: 'Contract | Afspraken', en: 'Contract | Agreements' }]];

  function f(label, value, o) {
    o = o || {};
    return h('div', { className: 'fld acf', key: label },
      h('span', { className: 'fld__l' }, label, o.req ? h('i', null, '*') : null),
      h('div', { className: 'acf__v' }, h('span', { className: 'fld__v' + (value ? '' : ' is-empty') }, value || '---', o.icon ? h(D.Icon, { name: o.icon, size: 16 }) : null)));
  }

  function List(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t;
    var cols = [
      { key: 'name', label: { nl: 'Accountnaam', en: 'Account Name' }, width: 320, link: true, sort: 'asc' }, { key: 'entity', label: { nl: 'Entiteit', en: 'Entity' }, width: 220 },
      { key: 'rel', label: { nl: 'Relatietype', en: 'Relationship type' }, width: 200 }, { key: 'status', label: { nl: 'Status samen...', en: 'Collaboration...' }, width: 160 },
      { key: 'tel', label: { nl: 'Telefoonnummer 1', en: 'Phone 1' }, width: 200 }, { key: 'city', label: { nl: 'Adres 2: plaats', en: 'Address 2: City' } }];
    var rows = ACCOUNTS.map(function (r) { return { name: r[0], entity: r[1], rel: r[2], status: r[3] && isEn ? 'Active' : r[3], tel: r[4], city: r[5] }; });
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', newLabel: 'create', lang: lang }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: { nl: 'Actieve accounts', en: 'Active Accounts' } }),
        h(D.DataGrid, { lang: lang, columns: cols, rows: rows, highlight: t, total: 412 })));
  }

  function Sub(title, actions, cols, rows, o) {
    var tpl = '36px ' + cols.map(function (c) { return c[1]; }).join(' ') + ' 28px';
    return h('div', { className: 'asub', 'data-focus': o.focusKey },
      h('div', { className: 'asub__h' }, h('b', null, title), h('span', { className: 'asub__acts', 'data-focus': o.btnKey }, actions.map(function (a, i) { return h('span', { key: i }, h(D.Icon, { name: a[0], size: 16 }), a[1]); }), h(D.Icon, { name: 'more', size: 16 }))),
      h('div', { className: 'asub__row is-head', style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })),
        cols.map(function (c, i) { return h('span', { key: i, className: c[2] ? 'is-end' : '' }, c[0], h(D.Icon, { name: 'chevron-down', size: 12 })); }), h('span', null, h(D.Icon, { name: 'open', size: 14 }))),
      rows.map(function (r, ri) {
        return h('div', { key: ri, className: 'asub__row', style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })),
          r.map(function (v, i) { return h('span', { key: i, className: cols[i][2] ? 'is-end' : '', 'data-focus': o.cellFocus && ri === 0 && i === o.cellFocus[0] ? o.cellFocus[1] : undefined }, v); }),
          h('span', { className: 'cosub__open' }, h(D.Icon, { name: 'open', size: 14 })));
      }),
      h('div', { className: 'asub__foot' }, (o.lang === 'en' ? 'Rows: ' : 'Rijen: ') + rows.length));
  }

  function Account(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, tab = s.tab || 'sam';
    var body = tab === 'con' ? h('div', { className: 'acc__tab' },
      h('div', { className: 'sec acsec', 'data-focus': 'afs' }, h('div', { className: 'sec__h2' }, isEn ? 'Agreements' : 'Afspraken'),
        h('div', { className: 'acc__adr3' },
          f(isEn ? 'Invoice every X months' : 'Facturatie frequentie iedere X mnd', '12', { icon: 'chevron-down' }),
          f(isEn ? 'Cost centre stated' : 'Kostenpl.vermeld.', ''),
          f(isEn ? 'Renewal' : 'Verlenging', isEn ? 'Tacit' : 'Stilzwijgend', { icon: 'chevron-down' }))),
      Sub(isEn ? 'Contracts' : 'Contracten', [['add', isEn ? 'New Contract OA' : 'Contract OA maken'], ['open', isEn ? 'Add Existing Contract OA' : 'Bestaande Contract OA toevoegen'], ['refresh', isEn ? 'Refresh' : 'Vernieuwen']],
        [[isEn ? 'Start date \u2193' : 'Start datum \u2193', '150px'], [isEn ? 'End date' : 'Eind datum', '150px'], [isEn ? 'Total contract value' : 'Totale contractwaarde', '200px', true], [isEn ? 'Total contract value (incl. indexation)' : 'Totale contractwaarde (incl. indexatie)', '320px', true], [isEn ? 'Indexation %' : 'Indexatiepercentage', '180px', true], [isEn ? 'Indexation type' : 'Indexatietype', '160px'], [isEn ? 'Contract status' : 'Contractstatus', '1fr']],
        [['1-4-2026', '31-3-2027', '\u20ac 18.400,00', '18.952,00', '3,00', isEn ? 'Standard' : 'Standaard', isEn ? 'Active' : 'Actief'],
          ['1-4-2025', '31-3-2026', '\u20ac 17.900,00', '17.900,00', '0,00', isEn ? 'None' : 'Geen', isEn ? 'Renewed' : 'Verlengd'],
          ['1-4-2024', '31-3-2025', '\u20ac 17.200,00', '17.200,00', '0,00', isEn ? 'None' : 'Geen', isEn ? 'Renewed' : 'Verlengd']], { lang: lang, focusKey: 'con:list', btnKey: 'con:btns', cellFocus: [1, 'con:eind'] }),
      Sub(isEn ? 'Contract lines' : 'Contractregels', [['add', isEn ? 'New Contract line OA' : 'Contractregel OA maken'], ['open', isEn ? 'Add Existing Contract line' : 'Bestaande Contractregel toevoegen']],
        [[isEn ? 'Invoice date \u2193' : 'Factuurdatum \u2193', '150px'], [isEn ? 'Title' : 'Titel', '240px'], [isEn ? '# licences' : '# licenties', '120px', true], [isEn ? 'Description' : 'Beschrijving', '1fr'], [isEn ? 'Total price' : 'Totaal Prijs', '160px', true], [isEn ? 'Invoice sent' : 'Datum factuur verstuurd', '200px']],
        [['1-4-2026', 'SkillsTown Abonnement', '160', isEn ? '160 Licences 1-4-2026 - 31-3-2027' : '160 Licenties 1-4-2026 - 31-3-2027', '\u20ac 18.952,00', '7-4-2026'],
          ['1-4-2025', 'SkillsTown Abonnement', '150', isEn ? '150 Licences 1-4-2025 - 31-3-2026' : '150 Licenties 1-4-2025 - 31-3-2026', '\u20ac 17.900,00', '4-4-2025'],
          ['1-4-2024', 'SkillsTown Abonnement', '145', isEn ? '145 Licences 1-4-2024 - 31-3-2025' : '145 Licenties 1-4-2024 - 31-3-2025', '\u20ac 17.200,00', '3-4-2024']], { lang: lang, focusKey: 'con:regels' }))
      : h('div', { className: 'acc__body' },
        h('div', { className: 'rec__col' },
          h('div', { className: 'sec acsec' }, h('div', { className: 'sec__t' }, isEn ? 'Account details' : 'Accountgegevens'),
            f(isEn ? 'Entity' : 'Entiteit', 'SkillsTown Direct', { icon: 'chevron-down' }), f(isEn ? 'Account name' : 'Accountnaam', ORG, { req: true }),
            f(isEn ? 'Relationship type' : 'Relatietype', 'Klant', { req: true, icon: 'chevron-down' }), f('Dealer', '', { icon: 'chevron-down' }),
            f(isEn ? 'Phone' : 'Telefoon', '085 555 2200', { req: true, icon: 'phone' }), f('Website', 'https://www.welzijnlindenhoven.example', { req: true, icon: 'globe' }),
            f(isEn ? 'Parent account' : 'Moederaccount', '', { icon: 'search' }), f(isEn ? 'Competitor' : 'Concurrent', '', { icon: 'search' }),
            f(isEn ? 'Collaboration status' : 'Status samenwerking', isEn ? 'Active' : 'Actief', { icon: 'chevron-down' }), f(isEn ? 'Open revenue' : 'Open omzet', '******'))),
        h('div', { className: 'rec__col' },
          h('div', { className: 'bz' }, h('div', { className: 'bz__t' }, isEn ? 'Particulars' : 'Bijzonderheden'),
            h('div', { className: 'bz__txt bz__txt--s' }, isEn ? 'The neighbourhood teams, youth work and informal-care support fall under this account.' : 'De wijkteams, het jongerenwerk en de mantelzorgondersteuning vallen hieronder.')),
          h('div', { className: 'tl' }, h('div', { className: 'tl__h' }, 'Timeline'),
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'))));
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: CMD_ACC }),
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id' }, h('span', { className: 'rec__av rec__av--acc' }, 'SW'),
            h('div', null, h('div', { className: 'rec__name' }, ORG, h('small', null, isEn ? ' - Saved' : ' - Opgeslagen')), h('div', { className: 'rec__type' }, 'Account \u00b7 ', h('b', { className: 'acc__form' }, 'SKT - Account', h(D.Icon, { name: 'chevron-down', size: 12 }))))),
          h('div', { className: 'rec__hf' },
            h('div', { className: 'rec__f acc__owner' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('div', null, h('div', { className: 'rec__fv' }, h('a', null, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, 'AM NOA/ST'))),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, 'SkillsTown'), h('div', { className: 'rec__fl' }, isEn ? 'Account origin' : 'Oorsprong account')),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv is-empty' }, '---'), h('div', { className: 'rec__fl' }, 'AM Salta')),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, h('a', null, 'Visser, Lotte')), h('div', { className: 'rec__fl' }, 'Learning Professional')),
            h('span', { className: 'rec__chev' }, h(D.Icon, { name: 'chevron-down' })))),
        h('div', { className: 'rec__tabs' },
          TABS.map(function (x) { return P(t === 'tab:' + x[0], h('span', { key: x[0], className: 'rec__tab' + (x[0] === tab ? ' is-on' : '') }, L(x[1], lang))); }),
          h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      body);
  }

  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.view === 'dash' ? h(DI.Dash, { lang: lang, t: t }) : s.view === 'alist' ? h(List, { lang: lang, t: t }) : h(Account, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'accounts' }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'contractkenner', Screen: Screen };
})();
