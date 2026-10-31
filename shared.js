/* Dynamics-instructies \u2014 gedeelde schermonderdelen voor alle onderwerpen.
   Gebouwd op het design system Dynamics-instructies (window.Dyn). Alle gegevens zijn verzonnen. */
(function () {
  var D = window.Dyn, h = React.createElement;
  var useState = React.useState, useLayoutEffect = React.useLayoutEffect, useRef = React.useRef;
  var CW = 1920, CH = 900;

  function L(v, lang) { return v && typeof v === 'object' && !React.isValidElement(v) ? (v[lang] != null ? v[lang] : v.nl) : v; }

  /* ---------- Scherm-onderdelen ---------- */
  function P(on, node, block) { return on ? h(D.PulseTarget, { block: !!block }, node) : node; }

  function CmdBar(p) {
    var lang = p.lang;
    return h('div', { className: 'dy-cmd', role: 'toolbar' },
      P(p.t === 'cmd:back', h('span', { className: 'dy-cmd__back' }, h(D.Icon, { name: 'back' }))),
      h('span', { className: 'dy-cmd__sep' }),
      h('div', { className: 'dy-cmd__items' },
        p.items.map(function (it) {
          var node = h('button', { key: it.k, type: 'button', className: 'dy-cmd__btn', 'data-k': it.k },
            h(D.Icon, { name: it.i, color: it.c }), h('span', null, L(it.l, lang)), it.chev ? h(D.Icon, { name: 'chevron-down', size: 16 }) : null);
          return P(p.t === 'cmd:' + it.k, node);
        }),
        h('span', { className: 'dy-cmd__btn' }, h(D.Icon, { name: 'more' }))),
      h('span', { className: 'dy-cmd__share' }, h(D.Icon, { name: 'share', size: 16 }), D.t('share', lang), h(D.Icon, { name: 'chevron-down', size: 16 })));
  }
  var CMD_OPP = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' }, chev: true },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'won', i: 'ribbon', l: { nl: 'Afsluiten als binnengehaald', en: 'Close as Won' } },
    { k: 'lost', i: 'error-circle', c: 'var(--danger)', l: { nl: 'Afsluiten als gemist', en: 'Close as Lost' } }, { k: 'copy', i: 'open', l: { nl: 'Verkoopkans kopi\u00ebren', en: 'Copy Opportunity' } },
    { k: 'recalc', i: 'report', l: { nl: 'Herberekenen', en: 'Recalculate' } }, { k: 'access', i: 'search', l: { nl: 'Toegang controleren', en: 'Check Access' } },
    { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }, { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }
  ];
  var CMD_OPP_CLOSED = [
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'reopen', i: 'refresh', l: { nl: 'Verkoopkans opnieuw openen', en: 'Reopen Opportunity' } },
    { k: 'copy', i: 'open', l: { nl: 'Verkoopkans kopi\u00ebren', en: 'Copy Opportunity' } }, { k: 'access', i: 'search', l: { nl: 'Toegang controleren', en: 'Check Access' } },
    { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }, { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }
  ];

  /* Procesbalk in de stijl van de SkillsTown-omgeving: fasen als cirkels op een lijn.
     Een fase is een doel met t = 'bpf:<index>'. */
  function Bpf(p) {
    return h('div', { className: 'rec__bpf' },
      h('div', { className: 'rec__bpfname' }, h('b', null, p.name), p.sub),
      h('div', { className: 'rec__bpfarrow' }, h(D.Icon, { name: 'back', size: 16 })),
      h('div', { className: 'rec__bpfstages' + (p.stages.length > 1 ? ' is-multi' : '') },
        p.stages.map(function (st, i) {
          var node = h('div', { key: i, 'data-focus': 'bpf:' + i, className: 'rec__bpfstage is-' + (st.state || 'todo') + (p.open === i ? ' is-open' : '') },
            h('span', { className: 'rec__bpfdot' }, st.state === 'done' ? h(D.Icon, { name: 'checkmark', size: 12 }) : null),
            h('span', { className: 'rec__bpflabel' }, st.name, st.time ? h('span', null, ' ' + st.time) : null));
          return P(p.t === 'bpf:' + i, node, true);
        })),
      h('div', { className: 'rec__bpfarrow' }, h(D.Icon, { name: 'forward', size: 16 })));
  }

  function Dash(p) {
    var lang = p.lang, bands = [['#3a96dd', 560], ['#6e9f26', 420], ['#d77440', 300], ['#b762d1', 220], ['#3b7a32', 160]];
    return h('div', { className: 'dash' },
      h(CmdBar, { lang: lang, t: p.t, items: [{ k: 'saveas', i: 'save', l: { nl: 'Opslaan als', en: 'Save As' } }, { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' }, chev: true }, { k: 'default', i: 'checkmark', l: { nl: 'Instellen als standaard', en: 'Set as Default' } }, { k: 'refreshall', i: 'refresh', l: { nl: 'Alles vernieuwen', en: 'Refresh All' } }] }),
      h('div', { className: 'dash__title' }, lang === 'en' ? 'Sales Performance Dashboard' : 'Verkoopprestatiedashboard', h(D.Icon, { name: 'chevron-down', size: 16 })),
      h('div', { className: 'dash__grid' },
        h('div', { className: 'dash__card' }, h('div', { className: 'dash__h' }, lang === 'en' ? 'Open opportunities' : 'Open verkoopkansen'),
          h('div', { className: 'dash__funnel', 'aria-hidden': true }, bands.map(function (b, i) { return h('span', { key: i, style: { width: b[1] * 0.75 + 'px', background: b[0], opacity: 0.85 } }); }))),
        h('div', { className: 'dash__card' }, h('div', { className: 'dash__h' }, lang === 'en' ? 'My goals for this period' : 'Mijn doelstellingen voor deze periode'),
          h('div', { className: 'dash__empty' }, lang === 'en' ? 'No data available.' : 'Er zijn geen gegevens beschikbaar.'))));
  }

  function Fld(label, value, req, link) {
    return h('div', { className: 'fld' },
      h('span', { className: 'fld__l' }, label, req ? h('i', null, '*') : null),
      h('span', { className: 'fld__v' + (value ? '' : ' is-empty') }, value ? (link ? h('a', null, value) : value) : '---'));
  }

  /* ---------- Verkoopkans (nieuwe schermen, oktober 2026) ----------
     d: verkoopkansgegevens, waaronder d.kind = 'nk' (nieuwe klant) of 'vl' (verlenging).
     s: { active, fly, tab, scrolled, filled{...}, bron, tbron, bronMenu, tbronMenu, werk, prodDlg, dlgSel[], prods[], stil, closeDlg, reasonMenu, reason, closed, unsaved }
     Doelen: field:bron, bron:<v>, field:tbron, tbron:<v>, field:werk, tab:<i>, tab:kans, tab:stil, prod:add, dlg:add:<code>, dlg:save,
             bpf:<i>, fly:<veld>, fly:next, close:reason, close:<reden>, close:save */
  var BRON_OPTIONS = ['Inbound', 'Outreach', 'Partners & Events', 'Overig'];
  var TBRON_OPTIONS = ['ST BE-Webformulier Arbeidsdeal (NL)', 'ABU', 'Beurs/Evenement', 'Brochure onderwijs', 'Canvassing', 'Cold call', 'Contactaanvraag EN', 'Contactaanvraag FR', 'Contactaanvraag NL', 'Demo aanvraag', 'E-mail', 'Eigen netwerk'];
  var LOST_REASONS = [
    ['uitgesteld', { nl: 'Beslissing uitgesteld naar volgend jaar', en: 'Decision postponed to next year' }], ['budget', { nl: 'Budget', en: 'Budget' }], ['content', { nl: 'Content', en: 'Content' }],
    ['geannuleerd', { nl: 'Geannuleerd', en: 'Canceled' }], ['onbereikbaar', { nl: 'Contactpersoon onbereikbaar', en: 'Contact unreachable' }], ['implementatie', { nl: 'Implementatie/activatiebegeleiding', en: 'Implementation/activation support' }],
    ['lms', { nl: 'Integratie met LMS', en: 'LMS integration' }], ['lmsfunc', { nl: 'LMS functionaliteiten', en: 'LMS functionality' }], ['look', { nl: 'Look & feel', en: 'Look & feel' }], ['prijs', { nl: 'Verloren op prijs', en: 'Lost on price' }]
  ];
  var STAGES = {
    nk: [{ nl: 'Discovery', en: 'Discovery' }, { nl: 'Demo', en: 'Demo' }, { nl: 'Offerte', en: 'Quote' }, { nl: 'Onderhandeling', en: 'Negotiation' }, { nl: 'Te Factureren', en: 'To Invoice' }],
    vl: [{ nl: 'Discovery', en: 'Discovery' }, { nl: 'In Gesprek', en: 'In Discussion' }, { nl: 'Offerte', en: 'Quote' }, { nl: 'Onderhandeling', en: 'Negotiation' }, { nl: 'Te Factureren', en: 'To Invoice' }]
  };
  var TABS = {
    nk: [{ nl: 'Algemene informatie', en: 'General information' }, { nl: 'Fase 1 - Discovery', en: 'Phase 1 - Discovery' }, { nl: 'Fase 2 - Demo', en: 'Phase 2 - Demo' }, { nl: 'Fase 3 - Offerte', en: 'Phase 3 - Quote' }, { nl: 'Fase 4 - Onderhandeling', en: 'Phase 4 - Negotiation' }, { nl: 'Fase 5 - Facturatie', en: 'Phase 5 - Invoicing' }, { nl: 'Bestanden', en: 'Files' }],
    vl: [{ nl: 'Algemene informatie', en: 'General information' }, { nl: 'Fase 1 - Lopend contract', en: 'Phase 1 - Running contract' }, { nl: 'Fase 2 - In gesprek', en: 'Phase 2 - In discussion' }, { nl: 'Fase 3 - Offerte', en: 'Phase 3 - Quote' }, { nl: 'Fase 4 - Onderhandeling', en: 'Phase 4 - Negotiation' }, { nl: 'Fase 5 - Facturatie', en: 'Phase 5 - Invoicing' }, { nl: 'Bestanden', en: 'Files' }]
  };
  /* Productcatalogus in het venster Producten toevoegen (codes en namen uit de SkillsTown-omgeving, prijzen verzonnen) */
  var CATALOG = [
    { code: 'ABO010', name: 'Branchepakket Jeugdzorg', price: '\u20ac 0,00' }, { code: 'ABO008', name: 'Branchepakket Kinderopvang', price: '' },
    { code: 'ABO011', name: 'Branchepakket Overheid', price: '' }, { code: 'ABO006', name: 'Branchepakket Retail', price: '\u20ac 120,00' },
    { code: 'ABO009', name: 'Branchepakket Transport & Logistiek', price: '' }, { code: 'ABO005', name: 'Branchepakket Zorg', price: '\u20ac 0,00' },
    { code: 'CON004', name: 'Implementatie begeleiding', price: '\u20ac 1.250,00', qty: 1 }, { code: 'ABO012', name: 'Kennisplatform', price: '\u20ac 187,50', qty: 40 },
    { code: 'CON003', name: 'Koppeling maatwerk', price: '' }
  ];

  function Opp(p) {
    var lang = p.lang, isEn = lang === 'en', d = p.d, s = p.s || {}, t = p.t, kind = d.kind || 'nk';
    var typeLabel = kind === 'vl' ? (isEn ? 'Renewal' : 'Verlenging') : (isEn ? 'New Customer' : 'Nieuwe Klant');
    var title = d.company + ' | ' + typeLabel;
    var active = s.active || 0, filled = s.filled || {};
    var stages = STAGES[kind].map(function (n, i) {
      var skipped = s.skip && (i === 2 || i === 3);
      return { name: L(n, lang), state: s.closed ? (i <= active ? 'done' : 'todo') : skipped ? 'todo' : i < active ? 'done' : i === active ? 'active' : 'todo', time: !s.closed && i === active ? '(< 1 Min)' : null };
    });
    var tab = s.tab || 0;
    return h('div', { className: 'rec' },
      s.closed ? h('div', { className: 'rec__banner', 'data-focus': 'banner' }, h(D.Icon, { name: 'lock', size: 16 }), isEn ? 'Read-only: this record\u2019s status: Lost' : 'Alleen-lezen: de status van deze record: Verloren') : null,
      h(CmdBar, { lang: lang, t: t, items: s.closed ? CMD_OPP_CLOSED : CMD_OPP }),
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id', 'data-focus': 'opp:title' },
            h('div', null, h('div', { className: 'rec__name' }, title, h('small', null, s.unsaved ? (isEn ? ' - Unsaved' : ' - Niet opgeslagen') : (isEn ? ' - Saved' : ' - Opgeslagen'))), h('div', { className: 'rec__type' }, isEn ? 'Opportunity' : 'Verkoopkans'))),
          h('div', { className: 'rec__hf' },
            hf(d.entity, isEn ? 'Entity' : 'Entiteit'),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, h('a', { style: { color: 'var(--link)' } }, d.company)), h('div', { className: 'rec__fl' }, 'Account')),
            hf(typeLabel, 'Type'),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv', style: { display: 'flex', gap: '6px', alignItems: 'center' } }, h(D.Avatar, { name: 'Jansen, Eva' }), h('a', { style: { color: 'var(--link)' } }, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, isEn ? 'Owner' : 'Eigenaar')),
            h('span', { className: 'rec__chev' }, h(D.Icon, { name: 'chevron-down' })))),
        h(Bpf, { t: t, open: s.fly, name: isEn ? 'Opportunity Sales Proc\u2026' : 'Verkoopproces verkoopk\u2026', sub: s.closed ? (isEn ? 'Finished' : 'Voltooid') : (isEn ? 'Active for less than one minute' : 'Actief gedurende minder dan een minuut'), stages: stages }),
        s.fly != null ? h(Flyout, { i: s.fly, active: active, filled: filled, lang: lang, t: t, d: d, s: s }) : null,
        h('div', { className: 'rec__tabs' },
          TABS[kind].map(function (x, i) { return P(t === 'tab:' + i, h('span', { key: i, className: 'rec__tab' + (i === tab ? ' is-on' : '') }, L(x, lang))); }),
          h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      tab ? h(PhaseTab, { i: tab, lang: lang, t: t, filled: filled, d: d, s: s }) : h(GeneralTab, { lang: lang, t: t, d: d, s: s, title: title, typeLabel: typeLabel }),
      s.prodDlg ? h(ProductDialog, { lang: lang, t: t, s: s }) : null,
      s.closeDlg ? h(CloseLost, { lang: lang, t: t, s: s }) : null);
    function hf(v, l) { return h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, v), h('div', { className: 'rec__fl' }, l)); }
  }

  function sel(l, v, req, target, t, extra) {
    var val = h('span', { className: 'fld__v' + (v ? '' : ' is-empty') + (extra && extra.focus ? ' is-focus' : '') }, v || '---', h(D.Icon, { name: (extra && extra.icon) || 'chevron-down', size: 16 }));
    return h('div', { className: 'fld', key: l }, h('span', { className: 'fld__l' }, l, req ? h('i', null, '*') : null, extra && extra.lock ? h(D.Icon, { name: 'lock', size: 16 }) : null), target ? P(t === target, val, true) : val);
  }
  function look(l, v, req) { return h('div', { className: 'fld', key: l }, h('span', { className: 'fld__l' }, l, req ? h('i', null, '*') : null), h('span', { className: 'fld__v' }, v ? h('a', null, v) : '---', h(D.Icon, { name: 'search', size: 16 }))); }
  function txt(l, v, req, target, t, opts) {
    opts = opts || {};
    var val = h('span', { className: 'fld__v' + (v ? '' : ' is-empty') + (opts.area ? ' fld__v--area' : '') + (opts.plain ? ' fld__v--plain' : '') }, v || '---', opts.date ? h(D.Icon, { name: 'appointment', size: 16 }) : null);
    return h('div', { className: 'fld ptab__fld', key: l }, h('span', { className: 'fld__l' }, l, req ? h('i', null, '*') : null, opts.lock ? h(D.Icon, { name: 'lock', size: 16 }) : null), target ? P(t === target, val, true) : val);
  }

  /* Tabblad Algemene informatie */
  function GeneralTab(p) {
    var lang = p.lang, isEn = lang === 'en', d = p.d, s = p.s, t = p.t;
    return h('div', { className: 'rec__body rec__body--opp' },
      h('div', { className: 'rec__col' },
        h('div', { className: 'sec', style: { position: 'relative' } },
          sel(isEn ? 'Entity' : 'Entiteit', d.entity, true),
          look('Account', d.company, true), look(isEn ? 'Contact' : 'Contactpersoon', d.contact, true),
          sel(isEn ? 'Source' : 'Bron', s.bron || (s.bronMenu ? (isEn ? '--Select--' : '--Selecteren--') : ''), false, 'field:bron', t, { focus: s.bronMenu }),
          sel(isEn ? 'Source details' : 'Toelichting Bron', s.tbron, true, 'field:tbron', t, { focus: s.tbronMenu }),
          sel('Type', p.typeLabel, true),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Number of employees' : 'Aantal werknemers'), P(t === 'field:werk', h('span', { className: 'fld__v' + (s.werk ? '' : ' is-empty') }, s.werk || '---'), true)),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Topic' : 'Onderwerp', h(D.Icon, { name: 'lock', size: 16 })), h('span', { className: 'fld__v' }, p.title)),
          s.bronMenu ? h('div', { className: 'dd dd--bron2' },
            [isEn ? '--Select--' : '--Selecteren--'].concat(BRON_OPTIONS).map(function (o, i) { return P(t === 'bron:' + o, h('span', { key: o, className: 'dd__o' + (i === 0 ? ' is-sel' : '') }, i === 0 ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), o), true); })) : null,
          s.tbronMenu ? h('div', { className: 'dd dd--tbron' },
            TBRON_OPTIONS.map(function (o) { return P(t === 'tbron:' + o, h('span', { key: o, className: 'dd__o' }, h('span', { className: 'dd__sp' }), o), true); }),
            h('span', { className: 'dd__more' }, '\u2026')) : null),
        h('div', { className: 'sec' }, h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Expected contract start date' : 'Verwachte start datum contract'), h('span', { className: 'fld__v' }, d.start || '01-02-2027', h(D.Icon, { name: 'appointment', size: 16 }))))),
      h('div', { className: 'rec__col' },
        h('div', { className: 'tl' },
          h('div', { className: 'tl__h' }, 'Timeline', h('span', { className: 'tl__icons' }, h(D.Icon, { name: 'add', size: 16 }), h(D.Icon, { name: 'filter', size: 16 }), h(D.Icon, { name: 'refresh', size: 16 }), h(D.Icon, { name: 'more', size: 16 }))),
          h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
          h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'),
          d.lead ? h('div', { className: 'tl__item' }, h('b', null, (isEn ? 'Auto-post on lead ' : 'Automatisch plaatsen op potenti\u00eble klant ') + d.lead + ': '), d.when || (isEn ? 'just now' : 'zojuist'),
            h('br'), (isEn ? 'Lead qualified by Jansen, Eva and converted to account ' : 'Potenti\u00eble klant gekwalificeerd door Jansen, Eva en omgezet naar Account ') + d.company + (isEn ? ', opportunity ' : ', Verkoopkans ') + p.title) : null)));
  }

  /* Tabbladen per fase: uitleg, criteria en velden (tekst zoals in de SkillsTown-omgeving) */
  var PHASE_TXT = {
    1: { nl: { u: 'In deze fase wordt de behoefte van de prospect in kaart gebracht en wordt de commerci\u00eble kans gevalideerd. We verzamelen informatie over de huidige situatie, de belangrijkste uitdagingen, doelstellingen, het beschikbare budget en de besluitvormingsstructuur.',
                c: ['Inzicht in behoefte en pijnpunten: De kernbehoeften en belangrijkste uitdagingen van de klant zijn helder en bevestigd.', 'Bereidheid tot vervolgstap: De klant erkent de relevantie van onze oplossing en is bereid een vervolgstap te zetten, zoals het inplannen van een demo of een verdiepend gesprek.'] },
         en: { u: 'In this stage we map out the prospect\u2019s needs and validate the commercial opportunity. We gather information about the current situation, the main challenges, goals, the available budget and the decision-making structure.',
                c: ['Insight into needs and pain points: The customer\u2019s core needs and main challenges are clear and confirmed.', 'Willingness to take a next step: The customer recognises the relevance of our solution and is willing to take a next step, such as scheduling a demo or an in-depth conversation.'] } },
    2: { nl: { u: 'In deze fase laten we de klant zien hoe onze oplossing werkt in hun specifieke situatie. Deze demonstratie is cruciaal om vertrouwen te wekken, de toegevoegde waarde te tonen en eventuele (technische) vragen te beantwoorden.',
                c: ['De demo is uitgevoerd met de belangrijkste beslissers en be\u00efnvloeders.', 'Tijdens of na de demo bevestigt de klant dat de getoonde oplossing past bij hun vraagstuk.', 'De klant geeft aan een offerte te willen ontvangen of in elk geval verdere pricing/condities te willen bespreken.'] },
         en: { u: 'In this stage we show the customer how our solution works in their specific situation. This demonstration is crucial to build trust, show the added value and answer any (technical) questions.',
                c: ['The demo has been given to the key decision makers and influencers.', 'During or after the demo, the customer confirms that the solution shown fits their needs.', 'The customer indicates they want to receive a quote, or at least discuss pricing and conditions further.'] } },
    3: { nl: { u: 'Hier doen we een formeel voorstel aan de prospect. Dit voorstel bevat de scope van de oplossing, de commerci\u00eble condities (prijs, kortingen, etc.) en de voorwaarden (duur samenwerking, licentiemodel, ondersteuning).',
                c: ['Heldere scope en condities: De inhoud en reikwijdte (scope) van de oplossing en de financi\u00eble voorwaarden (prijs, licenties, etc.) zijn met de klant besproken en duidelijk.', 'Offerte formeel aangeboden: Er is een offici\u00eble prijsopgave opgesteld en verstuurd (digitaal of op papier).', 'Klant bereid tot onderhandeling of akkoord: De klant staat open om over de aanbieding te praten (onderhandeling) of is nagenoeg akkoord met de voorwaarden.'] },
         en: { u: 'Here we make a formal proposal to the prospect. The proposal contains the scope of the solution, the commercial conditions (price, discounts, etc.) and the terms (duration, licence model, support).',
                c: ['Clear scope and conditions: The content and scope of the solution and the financial terms (price, licences, etc.) have been discussed with the customer and are clear.', 'Quote formally offered: An official quote has been drawn up and sent (digitally or on paper).', 'Customer ready to negotiate or agree: The customer is open to discussing the offer (negotiation) or has nearly agreed to the terms.'] } },
    4: { nl: { u: 'In de onderhandelingsfase worden de details van de deal verder uitgewerkt en afgestemd. Denk aan prijzen, duur samenwerking, uitstapmogelijkheden, verwerkersovereenkomst, algemene voorwaarden en contractuele details. Deze afspraken worden vastgelegd in een contractdocument (anders dan de offerte).',
                c: ['Getekend contract: De overeenkomst is ondertekend door alle bevoegde personen.', 'Facturatievoorwaarden bekend: Er is duidelijkheid over facturatiemoment, betaaltermijnen en eventuele termijnen of deelfacturatie.', 'Levering/implementatie gestart of gepland: De interne overdracht (naar implementatie, onboarding, etc.) is geregeld en de factuur kan worden verstuurd (of is al verstuurd).'],
                x: 'Je bent klaar, gefeliciteerd met je deal! De administratieafdeling neemt het deze fase over.' },
         en: { u: 'In the negotiation stage the details of the deal are worked out and agreed. Think of prices, contract duration, exit options, data processing agreement, general terms and contractual details. These agreements are recorded in a contract document (separate from the quote).',
                c: ['Signed contract: The agreement has been signed by all authorised persons.', 'Invoicing terms known: The invoicing moment, payment terms and any instalments or partial invoicing are clear.', 'Delivery/implementation started or planned: The internal handover (to implementation, onboarding, etc.) is arranged and the invoice can be sent (or has been sent).'],
                x: 'You are done, congratulations on your deal! The administration department takes over in this stage.' } }
  };

  PHASE_TXT.vl1 = { nl: { u: 'In deze fase loopt het contract met de klant. Gesprekken over de verlenging zijn nog niet gestart.', c: [] }, en: { u: 'In this stage the contract with the customer is running. Renewal talks have not started yet.', c: [] } };
  PHASE_TXT.vl2 = { nl: { u: 'In deze fase is het verlengingsgesprek met de klant begonnen.', c: [] }, en: { u: 'In this stage the renewal conversation with the customer has started.', c: [] } };
  PHASE_TXT[5] = {
    nl: { u: 'Sales is voor de eerdere fases verantwoordelijk. In deze fase is Sales nog verantwoordelijk voor het aanmaken of verlengen van het contract. Daarna wordt deze overgedragen naar de administratieafdeling.', c: [],
          p: ['Nieuwe klant | Verlenging | Studio -> Zorg ervoor dat de Producten de juiste prijzen bevatten, contractduur en startdatum contract is ingevuld. Kies vervolgens voor Genereer contract en contractregels.', 'Het afronden van deze fase is de verantwoordelijkheid van de administratieafdeling (orders@skillstown.nl).'] },
    en: { u: 'Sales is responsible for the earlier stages. In this stage Sales is still responsible for creating or renewing the contract. After that it is handed over to the administration department.', c: [],
          p: ['New customer | Renewal | Studio -> Make sure the Products have the right prices, and the contract term and contract start date are filled in. Then choose Generate contract and contract lines.', 'Completing this stage is the responsibility of the administration department (orders@skillstown.nl).'] }
  };

  function ProductGrid(p) {
    var lang = p.lang, isEn = lang === 'en', prods = p.prods || [];
    return h('div', { className: 'ptab__grid ptab__prods' },
      h('div', { className: 'sub__h' }, p.title, h('span', { className: 'tl__icons' }, P(p.t === 'prod:add', h('span', { className: 'ptab__addprod' }, h(D.Icon, { name: 'add', size: 16 }), isEn ? 'Add products' : 'Producten toevoegen')), h(D.Icon, { name: 'refresh', size: 16 }), isEn ? 'Refresh' : 'Vernieuwen')),
      h('div', { className: 'prow is-head' }, h('span', null, isEn ? 'Name' : 'Naam'), h('span', null, isEn ? 'Quantity (licences)' : 'Aantal (licenties)'), h('span', null, isEn ? 'Unit price' : 'Prijs per eenheid'), h('span', null, isEn ? 'Discount amount' : 'Kortingsbedrag'), h('span', null, isEn ? 'Price' : 'Prijs')),
      prods.length ? prods.map(function (r) { return h('div', { key: r[0], className: 'prow' }, h('a', null, r[0]), h('span', null, r[1]), h('span', null, r[2]), h('span', null, '\u20ac 0,00'), h('span', null, r[3])); })
        : h('div', { className: 'ptab__empty' }, h(D.Icon, { name: 'table', size: 20 }), isEn ? 'Nothing to show here' : 'Er is niets gevonden dat hier kan worden weergegeven'));
  }

  function PhaseTab(p) {
    var i = p.i, lang = p.lang, isEn = lang === 'en', t = p.t, f = p.filled, d = p.d, s = p.s, vl = d.kind === 'vl';
    var key = vl && i === 1 ? 'vl1' : vl && i === 2 ? 'vl2' : i;
    var tx = PHASE_TXT[key] && PHASE_TXT[key][isEn ? 'en' : 'nl'];
    var prods = s.prods || d.prods || [];
    var fields = [];
    if (i === 1) fields = [
      h('div', { key: 'a', className: 'ptab__col' },
        look(isEn ? 'Contact' : 'Contactpersoon', d.contact, true),
        sel(isEn ? 'Tender type' : 'Aanvulling typering', isEn ? 'No tender' : 'Geen aanbesteding', true),
        txt(isEn ? 'Potential revenue per year' : 'Potentiele omzet per jaar', f.omzet || vl ? (d.omzet || '\u20ac 7.500,00') : '', true)),
      h('div', { key: 'b', className: 'ptab__col' },
        txt(isEn ? 'Est. Close Date' : 'Verwachte sluitingsdatum', f.sluit || vl ? (d.sluit || '15-12-2026') : '', true, null, t, { date: true }),
        txt(isEn ? 'Probability (%)' : 'Slagingskans (%)', f.kans || vl ? (d.kans || '20') : '', true, 'tab:kans', t),
        txt('SPICED', '', false, null, t, { area: true })),
      h(ProductGrid, { key: 'c', lang: lang, t: t, prods: prods, title: isEn ? 'Desired products' : 'Gewenste producten' })];
    else if (i === 2) fields = [
      vl ? h('div', { key: 's', className: 'ptab__col ptab__col--wide' }, h('div', { className: 'fld ptab__fld' }, h('span', { className: 'fld__l' }, isEn ? 'Tacit renewal' : 'Stilzwijgend verlengen', h('i', null, '*')),
        h('span', { className: 'seg' }, P(t === 'tab:stil', h('span', { className: 'seg__o' + (s.stil === 'ja' ? ' is-on' : '') }, isEn ? 'Yes' : 'Ja'), true), h('span', { className: 'seg__o' + (s.stil === 'nee' ? ' is-on' : '') }, isEn ? 'No' : 'Nee')))) : null,
      h('div', { key: 'a', className: 'ptab__col' }, sel('LMS', '', false)),
      h('div', { key: 'c', className: 'ptab__grid' },
        h('div', { className: 'sub__h' }, isEn ? 'Competitors' : 'Concurrenten', h('span', { className: 'tl__icons' }, isEn ? 'Add Existing Competitor' : 'Bestaande Concurrent toevoegen', h(D.Icon, { name: 'refresh', size: 16 }))),
        h('div', { className: 'sub__row is-head', style: { gridTemplateColumns: '1fr 1fr' } }, h('span', null, isEn ? 'Name \u2191' : 'Naam \u2191'), h('span', null, 'Website')),
        h('div', { className: 'ptab__empty' }, h(D.Icon, { name: 'table', size: 20 }), isEn ? 'Nothing to show here' : 'Er is niets gevonden dat hier kan worden weergegeven'))];
    else if (i === 3) fields = [h('div', { key: 'b', className: 'ptab__col ptab__col--wide' }, txt(isEn ? 'Special conditions' : 'Speciale condities', '', false, null, t, { area: true }))];
    else if (i === 4) fields = [
      h('div', { key: 'a', className: 'ptab__col' },
        txt(isEn ? 'Final annual costs (ARR)' : 'Definitieve jaarlijkse kosten (ARR)', '\u20ac 7.500,00', false, null, t, { lock: true }),
        txt(isEn ? 'Final one-off costs' : 'Definitieve eenmalige kosten', '\u20ac 1.250,00', false, null, t, { lock: true }),
        txt(isEn ? 'Final contract term # months' : 'Definitieve contractduur # Mnd', '12', true),
        txt(isEn ? 'Final TCV' : 'Definitieve TCV', '\u20ac 8.750,00', false, null, t, { lock: true }),
        txt(isEn ? 'Exit option' : 'Uitstapmogelijkheid', isEn ? 'No' : 'Nee', false, null, t, { plain: true })),
      h('div', { key: 'b', className: 'ptab__col' },
        txt(isEn ? 'Desired technical integration' : 'Gewenste technische koppeling', 'SSO via Microsoft Entra ID'),
        sel(isEn ? 'ST general terms apply?' : 'Algemene voorwaarden ST van toepassing?', 'Yes'),
        sel(isEn ? 'Standard SLA applies?' : 'Standaard SLA van toepassing?', 'Yes'),
        sel(isEn ? 'Standard data processing agreement applies?' : 'Standaard verwerkersovereenkomst van toepassing?', 'Yes'))];
    else if (i === 5) fields = s.scrolled ? [h(AccountBilling, { key: 'acc', lang: lang, d: d })] : [
      h('div', { key: 'a', className: 'ptab__col' },
        txt(isEn ? 'Contract start date' : 'Start datum contract', '01-02-2027', true, null, t, { date: true }), txt(isEn ? 'PO / Reference' : 'PO / Referentie', ''),
        sel(isEn ? 'VAT percentage' : 'BTW percentage', '21%'), txt(isEn ? 'Number of licences' : 'Aantal licenties', '41', false, null, t, { lock: true }),
        txt(isEn ? 'Date of (start) invoicing' : 'Datum van (start) facturatie', '', false, null, t, { lock: true })),
      h('div', { key: 'b', className: 'ptab__col' },
        txt(isEn ? 'Final contract term # months' : 'Definitieve contractduur # Mnd', '12', true), txt(isEn ? 'Final TCV' : 'Definitieve TCV', '\u20ac 8.750,00', false, null, t, { lock: true }),
        look(isEn ? 'Contract (Upsell)' : 'Contract (Upsell)', ''),
        h('div', { className: 'fld ptab__fld' }, h('span', { className: 'fld__l' }, isEn ? 'Generate contract and contract lines' : 'Contract en contractregels genereren'), h('span', { className: 'tgl' }, h('span', { className: 'tgl__k' }), 'No')),
        txt(isEn ? 'Generated contract' : 'Gegenereerd Contract', '', false, null, t, { lock: true }))];
    return h('div', { className: 'ptab' },
      tx && !s.scrolled ? h('div', { className: 'ptab__intro', 'data-focus': 'tabintro' },
        h('div', { className: 'ptab__h' }, isEn ? 'Explanation of the stage' : 'Uitleg van de fase'),
        h('p', null, tx.u),
        tx.p ? tx.p.map(function (x, k) { return h('p', { key: k }, x); }) : null,
        tx.c && tx.c.length ? h('div', { className: 'ptab__h' }, isEn ? 'Criteria for moving to the next stage:' : 'Criteria voor doorgang naar de volgende fase:') : null,
        tx.c && tx.c.length ? h('ol', null, tx.c.map(function (c, k) { return h('li', { key: k }, c); })) : null,
        tx.x ? h('div', { className: 'ptab__h' }, tx.x) : null) : null,
      h('div', { className: 'ptab__fields' }, i === 4 ? h('div', { className: 'ptab__sect' }, isEn ? 'Negotiation' : 'Onderhandeling') : i === 5 && !s.scrolled ? h('div', { className: 'ptab__sect' }, isEn ? 'Invoicing' : 'Facturatie') : null, fields),
      i === 4 ? h('div', { className: 'ptab__fields' }, h(ProductGrid, { lang: lang, t: t, prods: prods, title: isEn ? 'Products' : 'Producten' })) : null);
  }

  /* Fase 5, na scrollen: Gegevens Account ten behoeve van facturatie */
  function AccountBilling(p) {
    var isEn = p.lang === 'en', d = p.d;
    function f(l, v) { return h('div', { className: 'fld ptab__fld', key: l }, h('span', { className: 'fld__l' }, l), h('span', { className: 'fld__v' + (v ? '' : ' is-empty') }, v || '---')); }
    return h('div', { className: 'ptab__col--wide accsec', 'data-focus': 'accsec' },
      h('div', { className: 'ptab__sect' }, isEn ? 'Account details for invoicing - Note: this changes the details on the Account and therefore applies to all contracts' : 'Gegevens Account ten behoeve van facturatie - Let op dit wijzigt de gegevens op het Account en heeft dus betrekking op alle contracten'),
      h('div', { className: 'accsec__grid' },
        h('div', null, f(isEn ? 'Entity' : 'Entiteit', d.entity), f(isEn ? 'OIN number' : 'OIN nummer', ''), h('div', { className: 'ptab__h', style: { margin: '6px 0' } }, isEn ? 'Invoice address' : 'Factuuradres'),
          f(isEn ? 'Addressee' : 'Tenaamstelling', d.company), f('T.a.v.', isEn ? 'Accounts payable' : 'Crediteurenadministratie'), f(isEn ? 'Street + no.' : 'Straat + Hnr.', 'Molenweg 12'), f(isEn ? 'House number addition' : 'Huisnummer toevoeging', ''), f(isEn ? 'Postcode' : 'Postcode', '3511 AB'), f(isEn ? 'City' : 'Plaats', 'Utrecht')),
        h('div', null, f(isEn ? 'Chamber of Commerce no.' : 'KvK nummer', ''), f(isEn ? 'VAT number' : 'BTW nummer', ''), f(isEn ? 'Country' : 'Land', 'Nederland'), f(isEn ? 'Invoice address: Email' : 'Factuuradres : E-mail', 'facturen@korenaar.example'),
          f(isEn ? 'Debtor number Exact' : 'Debiteurnummer Exact', ''), f(isEn ? 'Account indexation Y/N' : 'Indexering Account J/N', ''), f(isEn ? 'Apply VAT?' : 'BTW Toepassen?', 'Ja'))));
  }

  /* Venster Producten toevoegen */
  function ProductDialog(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t, s = p.s, chosen = s.dlgSel || [];
    return h(React.Fragment, null, h('div', { className: 'qp-dim qp-dim--dark' }),
      h('div', { className: 'pdlg' },
        h('div', { className: 'pdlg__head' }, h('b', null, isEn ? 'Add products' : 'Producten toevoegen'),
          h('span', { className: 'pdlg__search' }, h('span', { className: 'pdlg__all' }, isEn ? 'All' : 'Alles', h(D.Icon, { name: 'chevron-down', size: 16 })), h(D.Icon, { name: 'search', size: 16 }), isEn ? 'Search' : 'Zoeken'),
          h('span', { className: 'pdlg__sel' }, h(D.Icon, { name: 'task', size: 16 }), (isEn ? 'Selected' : 'Geselecteerd') + (chosen.length ? ' (' + chosen.length + ')' : '')), h(D.Icon, { name: 'dismiss' })),
        h('div', { className: 'pdlg__tabs' }, h('span', { className: 'is-on' }, isEn ? 'All products' : 'Alle producten'), h('span', null, isEn ? 'Recently used' : 'Recent gebruikt'), h('span', null, isEn ? 'Add' : 'Toevoegen')),
        h('div', { className: 'pdlg__table' },
          h('div', { className: 'pdlg__row is-head' }, h('span', null, 'Product \u2191'), h('span', null, isEn ? 'Quantity (licences)' : 'Aantal (licenties)'), h('span', null, isEn ? 'Unit price' : 'Prijs per eenheid'), h('span', null, isEn ? 'Discount percentage' : 'Kortingspercentage'), h('span', null, 'Actions')),
          CATALOG.map(function (c) {
            var on = chosen.indexOf(c.code) >= 0;
            var btn = h('span', { className: 'pdlg__btn' + (on ? ' is-on' : '') }, on ? (isEn ? 'Added' : 'Toegevoegd') : (isEn ? 'Add' : 'Toevoegen'));
            return h('div', { key: c.code, className: 'pdlg__row' },
              h('span', null, h('b', null, c.name), h('small', null, c.code)), h('span', null, String(c.qty || 1), h('i', null, '*')), h('span', null, c.price || '---'), h('span', null, '---'),
              h('span', null, P(t === 'dlg:add:' + c.code, btn)));
          })),
        h('div', { className: 'pdlg__foot' }, P(t === 'dlg:save', h('button', { type: 'button', className: 'qp__btn' + (chosen.length ? '' : ' is-off') }, isEn ? 'Save in Opportunity' : 'Opslaan in Verkoopkans')))));
  }

  /* Uitklapvenster van een fase in de procesbalk (nieuwe velden) */
  function Flyout(p) {
    var i = p.i, lang = p.lang, isEn = lang === 'en', t = p.t, f = p.filled, d = p.d, vl = d.kind === 'vl', s = p.s;
    var head = i < p.active ? (isEn ? 'Completed' : 'Voltooid') : i === p.active ? (isEn ? 'Active for less than one minute' : 'Actief gedurende minder dan een minuut') : (isEn ? 'Inactive' : 'Inactief');
    var rows;
    if (i === 0) rows = [
      row('Type', vl ? (isEn ? 'Renewal' : 'Verlenging') : (isEn ? 'New Customer' : 'Nieuwe Klant'), true, null, true),
      row(isEn ? 'Number of employees' : 'Aantal werknemers', d.werk || (s.werk ? s.werk : ''), true),
      row(isEn ? 'Potential revenue per year' : 'Potenti\u00eble omzet per jaar', f.omzet || vl ? (d.omzet || '\u20ac 7.500,00') : '', true, 'fly:omzet'),
      row(isEn ? 'Est. Close Date' : 'Verwachte sluitingsdatum', f.sluit || vl ? (d.sluit || '15-12-2026') : '', true, 'fly:sluit'),
      row(isEn ? 'Contract term # months' : 'Contractduur # Mnd', f.duur || vl ? '12' : '', true, 'fly:duur')];
    else if (i === 1 && vl) rows = [row(isEn ? 'Tacit renewal' : 'Stilzwijgend verlengen', s.stil === 'ja' ? (isEn ? 'Yes' : 'Ja') : '', true, null, true), row(isEn ? 'Probability' : 'Slagingskans', f.kans ? '90' : '', true, 'fly:kans')];
    else if (i === 1) rows = [row('LMS', '', false, null, true)];
    else if (i === 2) rows = [row(isEn ? 'Special conditions' : 'Speciale condities', '', false)];
    else if (i === 3) rows = [
      row(isEn ? 'Desired technical integration' : 'Gewenste technische koppeling', 'SSO via Microsoft Entra ID', true),
      row(isEn ? 'ST general terms apply?' : 'Algemene voorwaarden ST van toepassing?', 'Yes', true, null, true), row(isEn ? 'Standard SLA applies?' : 'Standaard SLA van toepassing?', 'Yes', true, null, true),
      row(isEn ? 'Expected go-live date' : 'Verwachte live datum', '01-02-2027', true), row(isEn ? 'Contract start date' : 'Startdatum contract', '01-02-2027', true), row(isEn ? 'Contract term # months' : 'Contractduur #Mnd', '12', true)];
    else rows = [row(isEn ? 'Date of (start) invoicing' : 'Datum van (start) facturatie', '', true)];
    var nextBtn = h('button', { type: 'button', className: 'qp__btn' }, isEn ? 'Next Stage' : 'Volgende fase');
    var foot = i < p.active ? h('button', { type: 'button', className: 'qp__btn' }, isEn ? 'Set Active' : 'Instellen op actief')
      : i === p.active && i < 4 ? h(React.Fragment, null, i > 0 ? h('span', { className: 'fly2__back' }, h(D.Icon, { name: 'back', size: 16 })) : null, P(t === 'fly:next', nextBtn)) : null;
    return h('div', { className: 'fly2', 'data-focus': 'fly', style: i === 4 ? { right: '30px' } : { left: 'calc(224px + (100% - 248px) * ' + (i / 5) + ' + ' + (i === 0 ? 20 : 0) + 'px)' } },
      h('div', { className: 'fly2__head' }, h('span', null, head), h('span', { className: 'fly2__icons' }, h(D.Icon, { name: 'open', size: 16 }), h(D.Icon, { name: 'dismiss', size: 16 }))),
      h('div', { className: 'fly2__body' }, rows),
      foot ? h('div', { className: 'fly2__foot' }, foot) : null);
    function row(l, v, req, target, select) {
      var val = h('span', { className: 'fld__v' + (v ? '' : ' is-empty') }, v || '---', select ? h(D.Icon, { name: 'chevron-down', size: 16 }) : null);
      return h('div', { key: l, className: 'fld fly2__fld' },
        h('span', { className: 'fld__l' }, l, h('i', null, req ? '*' : ''), v ? h('span', { className: 'fly2__ok' }, '\u2713') : null),
        target ? P(t === target, val, true) : val);
    }
  }

  /* Snelle invoer: Sluiting van een verkoopkans (afsluiten als gemist) */
  function CloseLost(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t, s = p.s;
    var reason = s.reason ? L(LOST_REASONS.filter(function (r) { return r[0] === s.reason; })[0][1], lang) : '';
    return h(React.Fragment, null, h('div', { className: 'qp-dim' }),
      h('aside', { className: 'qp qp--close' },
        h('span', { className: 'qp__x' }, h(D.Icon, { name: 'dismiss' })),
        h('h2', null, isEn ? 'Quick Create: Opportunity Close' : 'Snelle invoer: Sluiting van een verkoopkans'),
        h('div', { className: 'qp__lbl', style: { marginTop: '8px' } }, isEn ? 'Add closing details below' : 'Voeg hieronder afsluitdetails toe'),
        h('div', { className: 'cl__body' },
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Status Reason' : 'Reden van status', h('i', null, '*')),
            P(t === 'close:reason', h('span', { className: 'fld__v' + (reason ? '' : ' is-empty') + (s.reasonMenu ? ' is-focus' : '') }, reason || '---', h(D.Icon, { name: 'chevron-down', size: 16 })), true)),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Actual Revenue' : 'Werkelijke omzet', h('i', null, '*')), h('span', { className: 'fld__v' }, '\u20ac 0,00')),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Close Date' : 'Sluitingsdatum', h('i', null, '*')), h('span', { className: 'fld__v' }, '30-10-2026', h(D.Icon, { name: 'appointment', size: 16 }))),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Competitor' : 'Concurrent'), h('span', { className: 'fld__v is-empty' }, '---', h(D.Icon, { name: 'search', size: 16 }))),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Description' : 'Beschrijving'), h('span', { className: 'fld__v is-empty' }, '---')),
          s.reasonMenu ? h('div', { className: 'dd dd--reason' },
            LOST_REASONS.map(function (r) { return P(t === 'close:' + r[0], h('span', { key: r[0], className: 'dd__o' }, h('span', { className: 'dd__sp' }), L(r[1], lang)), true); })) : null),
        h('div', { className: 'qp__foot', style: { gap: '8px' } },
          P(t === 'close:save', h('button', { type: 'button', className: 'qp__btn' }, isEn ? 'Save & Close' : 'Opslaan en sluiten', h('span', { className: 'qp__split' }, h(D.Icon, { name: 'chevron-down', size: 16 })))),
          h('button', { type: 'button', className: 'dy-btn' }, isEn ? 'Cancel' : 'Annuleren'))));
  }

  /* Het volledige nagebouwde scherm: kop, menu, inhoud en eventueel een paneel */
  function Shell(p) {
    return h('div', { className: 'dy-shell', style: { position: 'relative' } },
      p.header || h(D.AppHeader, { lang: p.lang }),
      h('div', { className: 'dy-shell__main' },
        h(D.SiteMap, { lang: p.lang, active: p.nav, highlight: p.t && p.t.indexOf('nav:') === 0 ? p.t.slice(4) : null }),
        h('div', { className: 'dy-shell__content', style: { position: 'relative' } }, p.children)),
      p.overlay || null);
  }

  /* ---------- Positie van de ballon ---------- */
  function rectIn(el, root, scale) {
    var a = el.getBoundingClientRect(), b = root.getBoundingClientRect();
    return { x: (a.left - b.left) / scale, y: (a.top - b.top) / scale, w: a.width / scale, h: a.height / scale };
  }
  function place(r, cw, ch, side) {
    var W = 320, cx = r.x + r.w / 2;
    if ((r.x + r.w < 210 && r.x < 200) || side === 'right') { // in het menu links: ballon rechts ernaast
      var top = Math.max(8, Math.min(CH - ch - 8, r.y + r.h / 2 - 32));
      return { placement: 'right', left: r.x + r.w + 14, top: top, beak: Math.max(12, Math.min(ch - 28, r.y + r.h / 2 - top - 8)) };
    }
    var left = Math.max(8, Math.min(CW - W - 8, cx - 40));
    if (r.x > CW - 460 && r.w < 340 && r.y > 120) { left = Math.max(8, r.x - W - 14); var t2 = Math.max(8, Math.min(CH - ch - 8, r.y + r.h / 2 - 32)); return { placement: 'left', left: left, top: t2, beak: Math.max(12, Math.min(ch - 28, r.y + r.h / 2 - t2 - 8)) }; }
    var below = r.y + r.h + 14;
    if (below + ch <= CH - 8) return { placement: 'bottom', left: left, top: below, beak: Math.max(12, Math.min(W - 28, cx - left - 8)) };
    return { placement: 'top', left: left, top: Math.max(8, r.y - ch - 14), beak: Math.max(12, Math.min(W - 28, cx - left - 8)) };
  }

  window.DI = { D: D, h: h, CW: CW, CH: CH, L: L, P: P, CmdBar: CmdBar, Bpf: Bpf, Dash: Dash, Fld: Fld, Opp: Opp, Shell: Shell, rectIn: rectIn, place: place, CMD_OPP: CMD_OPP, LOST_REASONS: LOST_REASONS };
})();
