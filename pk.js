/* Dynamics-instructies \u2014 onderwerp 1: Potenti\u00eble klanten. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P, CmdBar = DI.CmdBar, Bpf = DI.Bpf, Fld = DI.Fld;
  var useState = React.useState, useLayoutEffect = React.useLayoutEffect, useRef = React.useRef;

  /* ---------- Verzonnen gegevens ---------- */
  var LEADS = {
    sanne: { name: 'De Vries, Sanne', first: 'Sanne', tussen: 'de', last: 'Vries', initials: 'SV', company: 'Bakkerij De Korenaar', email: 's.devries@korenaar.example', phone: '030 555 0142', topic: { nl: 'E-learning voor 40 medewerkers', en: 'E-learning for 40 employees' }, form: 'Webinar - Inschrijving', entity: 'SkillsTown Direct', created: '28-10-2026 09:14' },
    jeroen: { name: 'Bakker, Jeroen', first: 'Jeroen', tussen: '', last: 'Bakker', initials: 'JB', company: 'Van Dijk Installatietechniek B.V.', email: 'j.bakker@vandijk-installatie.example', phone: '0413 555 017', topic: { nl: 'Compliance-trainingen', en: 'Compliance training' }, form: 'BE - Download - Web', entity: 'SkillsTown Direct', created: '21-10-2026 15:02' },
    elif: { name: 'Yilmaz, Elif', company: 'Zorggroep Lindenhoven', topic: { nl: 'Onboarding zorgmedewerkers', en: 'Onboarding care staff' }, form: 'Contactformulier - Web', created: '14-10-2026 11:47' }
  };
  var STATUS = { nieuw: { nl: 'Nieuw', en: 'New' }, contact: { nl: 'Contact mee opgenomen', en: 'Contacted' }, mkt: { nl: 'Gekwalificeerd voor marketing', en: 'Marketing qualified' } };
  var REASONS = [
    ['gemist', { nl: 'Gemist', en: 'Lost' }], ['geannuleerd', { nl: 'Geannuleerd', en: 'Canceled' }], ['onmogelijk', { nl: 'Contact opnemen onmogelijk', en: 'Cannot contact' }],
    ['geeninteresse', { nl: 'Niet meer ge\u00efnteresseerd', en: 'No longer interested' }], ['abonnee', { nl: 'Reeds abonnee', en: 'Already a subscriber' }],
    ['particulier', { nl: 'Particulier', en: 'Private individual' }], ['dubbel', { nl: 'Dubbel', en: 'Duplicate' }], ['spam', { nl: 'Bot / Spam', en: 'Bot / Spam' }]
  ];
  var TOPIC = { nl: 'Potenti\u00eble klanten', en: 'Leads' };

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u201315). */
  var STEPS = [
    { n: 1, s: { view: 'dash', nav: 'dashboards' }, t: 'nav:leads',
      title: { nl: 'Open Potenti\u00eble klanten', en: 'Open Leads' },
      body: { nl: 'Leads uit webformulieren en downloads komen binnen als potenti\u00eble klant. Klik in het menu links op Potenti\u00eble klanten.', en: 'Leads from web forms and downloads arrive as leads. In the menu on the left, click Leads.' },
      hint: { nl: 'Kijk in het menu links onder het kopje Marketing.', en: 'Look in the menu on the left, under the Marketing heading.' } },
    { n: 2, s: { view: 'list', rows: ['sanne', 'jeroen', 'elif'] }, t: 'cell:0:name',
      title: { nl: 'Open de lead van Sanne', en: "Open Sanne's lead" },
      body: { nl: 'Dit is de weergave Mijn open potenti\u00eble klanten: de leads die aan jou zijn toegewezen. Klik op de naam De Vries, Sanne.', en: 'This is the My Open Leads view: the leads assigned to you. Click the name De Vries, Sanne.' },
      hint: { nl: 'Klik op de blauwe naam in de kolom Naam, niet op de bedrijfsnaam.', en: 'Click the blue name in the Name column, not the company name.' } },
    { n: 3, s: { view: 'lead', lead: 'sanne' }, t: 'hdr:chev',
      title: { nl: 'Status bijwerken na contact', en: 'Update the status after contact' },
      body: { nl: 'Je hebt Sanne gebeld. Voordat je kwalificeert, werk je eerst het veld Status bij. Dat staat in de kop: klap die open met het pijltje rechtsboven.', en: 'You called Sanne. Before you qualify, first update the Status field. It sits in the header: expand it with the arrow at the top right.' },
      hint: { nl: 'Het pijltje staat helemaal rechts, naast Status.', en: 'The arrow is at the far right, next to Status.' } },
    { n: 4, s: { view: 'lead', lead: 'sanne', fly: true }, t: 'fly:status',
      title: { nl: 'Klik op Status', en: 'Click Status' },
      body: { nl: 'De kop is opengeklapt. Klik op het veld Status, dat nu op Nieuw staat.', en: 'The header is expanded. Click the Status field, which is set to New.' },
      hint: { nl: 'Status staat onder Beoordeling.', en: 'Status is below Rating.' } },
    { n: 5, s: { view: 'lead', lead: 'sanne', fly: true, dd: true }, t: 'opt:contact',
      title: { nl: 'Kies de nieuwe status', en: 'Choose the new status' },
      body: { nl: 'Je hebt contact gehad. Kies Contact mee opgenomen.', en: 'You have been in touch. Choose Contacted.' },
      hint: { nl: 'Het is de tweede optie in de lijst.', en: 'It is the second option in the list.' } },
    { n: 6, s: { view: 'lead', lead: 'sanne', status: 'contact', unsaved: true }, t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'De nieuwe status is nog niet opgeslagen. Klik op Opslaan in de opdrachtbalk.', en: 'The new status is not saved yet. Click Save in the command bar.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk, met het diskette-icoon.', en: 'Save is on the left of the command bar, with the floppy-disk icon.' } },
    { n: 7, s: { view: 'lead', lead: 'sanne', status: 'contact' }, t: 'cmd:qualify',
      title: { nl: 'Kwalificeren', en: 'Qualify' },
      body: { nl: 'Sanne heeft echte interesse. Zet de lead om naar een verkoopkans: klik op Kwalificeren.', en: 'Sanne is genuinely interested. Turn the lead into an opportunity: click Qualify.' },
      hint: { nl: 'Kwalificeren staat in de opdrachtbalk, rechts van Toegang controleren.', en: 'Qualify is in the command bar, to the right of Check Access.' } },
    { n: 8, s: { view: 'lead', lead: 'sanne', status: 'contact', panel: true }, t: 'qp:go',
      title: { nl: 'Controleer en kwalificeer', en: 'Check and qualify' },
      body: { nl: 'Bakkerij De Korenaar en Sanne staan nog niet in Dynamics. Laat Account en Contactpersoon op Nieuwe maken staan en klik onderaan op Kwalificeren.', en: 'Bakkerij De Korenaar and Sanne are not in Dynamics yet. Leave Account and Contact on Create new and click Qualify at the bottom.' },
      hint: { nl: 'De blauwe knop Kwalificeren staat rechtsonder in het paneel.', en: 'The blue Qualify button is at the bottom right of the panel.' } },
    { n: 9, s: { view: 'opp' }, info: true, focus: 'opp:title',
      title: { nl: 'De verkoopkans is aangemaakt', en: 'The opportunity has been created' },
      body: { nl: 'Dynamics heeft een nieuw account, een nieuwe contactpersoon en deze verkoopkans gemaakt, en opent de verkoopkans meteen. Hoe je hem verder brengt, leer je bij Verkoopkansen.', en: 'Dynamics created a new account, a new contact and this opportunity, and opens the opportunity straight away. You will learn how to take it further in Opportunities.' } },
    { n: 10, s: { view: 'opp' }, t: 'nav:leads',
      title: { nl: 'Terug naar de lijst', en: 'Back to the list' },
      body: { nl: 'Nu de tweede lead. Klik in het menu op Potenti\u00eble klanten.', en: 'Now the second lead. In the menu, click Leads.' },
      hint: { nl: 'Potenti\u00eble klanten staat in het menu links onder Marketing.', en: 'Leads is in the menu on the left, under Marketing.' } },
    { n: 11, s: { view: 'list', rows: ['jeroen', 'elif'] }, t: 'cell:0:name',
      title: { nl: 'Open de lead van Jeroen', en: "Open Jeroen's lead" },
      body: { nl: 'Sanne staat niet meer in de lijst: zij is gekwalificeerd. Open de lead van Jeroen Bakker.', en: 'Sanne is no longer in the list: she has been qualified. Open the lead for Jeroen Bakker.' },
      hint: { nl: 'Klik op de blauwe naam Bakker, Jeroen.', en: 'Click the blue name Bakker, Jeroen.' } },
    { n: 12, s: { view: 'lead', lead: 'jeroen' }, t: 'hdr:chev',
      title: { nl: 'Eerst de status bijwerken', en: 'Update the status first' },
      body: { nl: 'Jeroen vertelde aan de telefoon dat hij geen interesse meer heeft. Ook nu werk je eerst de status bij. Klap de kop open.', en: 'On the phone, Jeroen told you he is no longer interested. Again, you update the status first. Expand the header.' },
      hint: { nl: 'Het pijltje staat helemaal rechts, naast Status.', en: 'The arrow is at the far right, next to Status.' } },
    { n: 12, s: { view: 'lead', lead: 'jeroen', fly: true }, t: 'fly:status',
      title: { nl: 'Klik op Status', en: 'Click Status' },
      body: { nl: 'Klik op het veld Status.', en: 'Click the Status field.' },
      hint: { nl: 'Status staat onder Beoordeling.', en: 'Status is below Rating.' } },
    { n: 12, s: { view: 'lead', lead: 'jeroen', fly: true, dd: true }, t: 'opt:contact',
      title: { nl: 'Kies Contact mee opgenomen', en: 'Choose Contacted' },
      body: { nl: 'Ook als de klant geen interesse heeft, heb je contact gehad. Kies Contact mee opgenomen.', en: 'Even if the customer is not interested, you have been in touch. Choose Contacted.' },
      hint: { nl: 'Het is de tweede optie in de lijst.', en: 'It is the second option in the list.' } },
    { n: 12, s: { view: 'lead', lead: 'jeroen', status: 'contact', unsaved: true }, t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Klik op Opslaan.', en: 'Click Save.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk.', en: 'Save is on the left of the command bar.' } },
    { n: 13, s: { view: 'lead', lead: 'jeroen', status: 'contact' }, t: 'cmd:disqualify',
      title: { nl: 'Diskwalificeren', en: 'Disqualify' },
      body: { nl: 'Jeroen heeft geen interesse, dus je sluit de lead af. Klik op Diskwalificeren om de redenen te zien.', en: 'Jeroen is not interested, so you close the lead. Click Disqualify to see the reasons.' },
      hint: { nl: 'Diskwalificeren staat in de opdrachtbalk, rechts van Proces.', en: 'Disqualify is in the command bar, to the right of Process.' } },
    { n: 14, s: { view: 'lead', lead: 'jeroen', status: 'contact', menu: true }, t: 'reason:geeninteresse',
      title: { nl: 'Kies de reden', en: 'Choose the reason' },
      body: { nl: 'Kies de reden die past bij wat Jeroen zei: Niet meer ge\u00efnteresseerd.', en: 'Choose the reason that matches what Jeroen said: No longer interested.' },
      hint: { nl: 'Het is de vierde reden in de lijst.', en: 'It is the fourth reason in the list.' } },
    { n: 15, s: { view: 'lead', lead: 'jeroen', status: 'geeninteresse', readonly: true }, info: true, focus: 'banner',
      title: { nl: 'De lead is gesloten', en: 'The lead is closed' },
      body: { nl: 'De lead is nu alleen-lezen en staat niet meer in je open lijst. Wil je hem later toch oppakken? Dan gebruik je Potenti\u00eble klant opnieuw activeren.', en: 'The lead is now read-only and no longer in your open list. Want to pick it up again later? Use Reactivate Lead.' } }
  ];
  var TOTAL = 15;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Onder welk kopje in het menu vind je Potenti\u00eble klanten?', en: 'Under which heading in the menu do you find Leads?' },
      o: [{ nl: 'Relaties', en: 'Customers' }, { nl: 'Verkoop', en: 'Sales' }, { nl: 'Marketing', en: 'Marketing' }, { nl: 'Mijn Werk', en: 'My Work' }], a: 2,
      x: { nl: 'Potenti\u00eble klanten staat onder Marketing, omdat leads meestal via formulieren en campagnes binnenkomen.', en: 'Leads sits under Marketing, because leads usually arrive through forms and campaigns.' } },
    { q: { nl: 'Je hebt contact gehad met een lead. Wat doe je eerst in Dynamics?', en: 'You have been in touch with a lead. What do you do first in Dynamics?' },
      o: [{ nl: 'Direct kwalificeren', en: 'Qualify straight away' }, { nl: "Status op 'Contact mee opgenomen' zetten en opslaan", en: "Set Status to 'Contacted' and save" }, { nl: 'Een nieuw account aanmaken', en: 'Create a new account' }, { nl: 'Niets, de status past zich vanzelf aan', en: 'Nothing, the status updates itself' }], a: 1,
      x: { nl: 'Eerst leg je vast dat er contact is geweest. Pas daarna kwalificeer of diskwalificeer je.', en: 'First you record that there has been contact. Only then do you qualify or disqualify.' } },
    { q: { nl: 'Waar vind je het veld Status van een potenti\u00eble klant?', en: 'Where do you find the Status field of a lead?' },
      o: [{ nl: 'Op het tabblad Datamigratie', en: 'On the Data migration tab' }, { nl: 'In de sectie Contactpersoon', en: 'In the Contact section' }, { nl: 'In de kop, na openklappen met het pijltje', en: 'In the header, after expanding it with the arrow' }, { nl: 'In de opdrachtbalk', en: 'In the command bar' }], a: 2,
      x: { nl: 'Status staat in de kop van het formulier. Met het pijltje rechtsboven klap je de kop open.', en: 'Status is in the form header. Expand the header with the arrow at the top right.' } },
    { q: { nl: 'De lead heeft echte interesse en het bedrijf en de persoon staan nog niet in Dynamics. Wat kies je in het kwalificeerpaneel bij Account en Contactpersoon?', en: 'The lead is genuinely interested, and the company and person are not in Dynamics yet. What do you choose for Account and Contact in the qualify panel?' },
      o: [{ nl: "Bij allebei 'Nieuwe maken'", en: "'Create new' for both" }, { nl: 'Bij allebei leeg laten', en: 'Leave both empty' }, { nl: "Alleen Account op 'Nieuwe maken'", en: "Only Account on 'Create new'" }, { nl: 'Eerst zelf een account aanmaken', en: 'Create an account yourself first' }], a: 0,
      x: { nl: 'Met Nieuwe maken bij allebei maakt Dynamics het account en de contactpersoon voor je aan, samen met de verkoopkans.', en: 'With Create new for both, Dynamics creates the account and the contact for you, together with the opportunity.' } },
    { q: { nl: 'Een lead blijkt al klant van SkillsTown te zijn. Welke reden kies je bij Diskwalificeren?', en: 'A lead turns out to be a SkillsTown customer already. Which reason do you choose when disqualifying?' },
      o: [{ nl: 'Dubbel', en: 'Duplicate' }, { nl: 'Gemist', en: 'Lost' }, { nl: 'Reeds abonnee', en: 'Already a subscriber' }, { nl: 'Niet meer ge\u00efnteresseerd', en: 'No longer interested' }], a: 2,
      x: { nl: 'Reeds abonnee is de reden voor iemand die al klant is. Dubbel gebruik je als dezelfde lead twee keer in Dynamics staat.', en: 'Already a subscriber is the reason for someone who is already a customer. Use Duplicate when the same lead is in Dynamics twice.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je hoe je een binnengekomen lead opvolgt: openen, de status bijwerken na contact, en dan kwalificeren of diskwalificeren.', parts: ['Openen en lijst lezen', 'Status bijwerken na contact', 'Kwalificeren', 'Diskwalificeren'], steps: '15 stappen', time: 'Ongeveer 10 minuten' },
    en: { intro: 'In this topic you learn how to follow up an incoming lead: open it, update the status after contact, and then qualify or disqualify it.', parts: ['Open the list', 'Update the status after contact', 'Qualify', 'Disqualify'], steps: '15 steps', time: 'About 10 minutes' }
  };

  var CMD_LEAD = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } },
    { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }, { k: 'access', i: 'search', l: { nl: 'Toegang controleren', en: 'Check Access' } },
    { k: 'qualify', i: 'lead', l: { nl: 'Kwalificeren', en: 'Qualify' } }, { k: 'process', i: 'flow', l: { nl: 'Proces', en: 'Process' }, chev: true },
    { k: 'disqualify', i: 'disqualify', l: { nl: 'Diskwalificeren', en: 'Disqualify' }, chev: true }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } }
  ];
  var CMD_READONLY = [
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } },
    { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }, { k: 'access', i: 'search', l: { nl: 'Toegang controleren', en: 'Check Access' } },
    { k: 'process', i: 'flow', l: { nl: 'Proces', en: 'Process' }, chev: true }, { k: 'reactivate', i: 'lead', l: { nl: 'Potenti\u00eble klant opnieuw activeren', en: 'Reactivate Lead' } },
    { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } }, { k: 'follow', i: 'star', l: { nl: 'Volgen', en: 'Follow' } },
    { k: 'flow', i: 'flow', l: { nl: 'Stroom', en: 'Flow' }, chev: true }, { k: 'word', i: 'report', l: { nl: 'Word-sjablonen', en: 'Word Templates' }, chev: true }
  ];
  var LEAD_COLS = [
    { key: 'created', label: { nl: 'Gemaakt op', en: 'Created On' }, width: 150, sort: 'desc' },
    { key: 'form', label: 'Submitted form', width: 190, link: true },
    { key: 'name', label: { nl: 'Naam', en: 'Name' }, width: 160, link: true },
    { key: 'company', label: { nl: 'Bedrijfsnaam', en: 'Company Name' }, width: 230 },
    { key: 'topic', label: { nl: 'Onderwerp', en: 'Topic' } },
    { key: 'owner', label: 'Owner', type: 'owner', width: 150 },
    { key: 'reason', label: { nl: 'Reden van status', en: 'Status Reason' }, width: 130 }
  ];

  function List(p) {
    var lang = p.lang;
    var rows = p.rows.map(function (k) { var d = LEADS[k]; return { created: d.created, form: d.form, name: d.name, company: d.company, topic: L(d.topic, lang), owner: 'Jansen, Eva', reason: L(STATUS.nieuw, lang) }; });
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', lang: lang }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: { nl: 'Mijn open potenti\u00eble klanten', en: 'My Open Leads' } }),
        h(D.DataGrid, { lang: lang, columns: LEAD_COLS, rows: rows, highlight: p.t })));
  }

  function Lead(p) {
    var s = p.s, lang = p.lang, d = LEADS[s.lead], t = p.t;
    var statusKey = s.status || 'nieuw';
    var statusLabel = statusKey === 'geeninteresse' ? L(REASONS[3][1], lang) : L(STATUS[statusKey], lang);
    var chev = h('button', { type: 'button', className: 'rec__chev' + (s.fly ? ' is-open' : ''), 'aria-label': 'Kop' }, h(D.Icon, { name: s.fly ? 'chevron-up' : 'chevron-down' }));
    var isEn = lang === 'en';
    var recRef = useRef(null), mp = useState(null), menuPos = mp[0], setMenuPos = mp[1];
    useLayoutEffect(function () {
      if (!s.menu || !recRef.current) return;
      var btn = recRef.current.querySelector('[data-k="disqualify"]'); if (!btn) return;
      var can = recRef.current.closest('.stage__canvas, .dy-mstep__canvas');
      var m = can && can.style.transform.match(/scale\(([\d.]+)\)/); var sc = m ? +m[1] : 1; if (!sc) return;
      var a = btn.getBoundingClientRect(), b = recRef.current.getBoundingClientRect();
      var np = { left: Math.round((a.left - b.left) / sc), top: Math.round((a.bottom - b.top) / sc) + 2 };
      if (!menuPos || np.left !== menuPos.left || np.top !== menuPos.top) setMenuPos(np);
    });
    return h('div', { className: 'rec', ref: recRef },
      s.readonly ? h('div', { className: 'rec__banner', 'data-focus': 'banner' }, h(D.Icon, { name: 'lock', size: 16 }), isEn ? 'Read-only: this record\u2019s status: Disqualified' : 'Alleen-lezen: de status van deze record: Gediskwalificeerd') : null,
      h(CmdBar, { lang: lang, t: t, items: s.readonly ? CMD_READONLY : CMD_LEAD }),
      s.menu ? h('div', { className: 'menu', style: { left: (menuPos ? menuPos.left : -9999) + 'px', top: (menuPos ? menuPos.top : 0) + 'px' } },
        REASONS.map(function (r) { return P(t === 'reason:' + r[0], h('span', { key: r[0], className: 'menu__o' }, L(r[1], lang)), true); })) : null,
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id' }, h('span', { className: 'rec__av' }, d.initials),
            h('div', null, h('div', { className: 'rec__name' }, d.name, h('small', null, s.unsaved ? (isEn ? ' - Unsaved' : ' - Niet opgeslagen') : (isEn ? ' - Saved' : ' - Opgeslagen'))), h('div', { className: 'rec__type' }, isEn ? 'Lead' : 'Potenti\u00eble klant'))),
          h('div', { className: 'rec__hf' },
            hf('---', isEn ? 'Source Campaign' : 'Bron Campagne', true), hf('---', isEn ? 'Source Campaign Note' : 'Toelichting Broncampagne', true),
            hf(isEn ? 'Warm' : 'Warm', isEn ? 'Rating' : 'Beoordeling'), hf(statusLabel, 'Status'),
            P(t === 'hdr:chev', chev))),
        s.fly ? h('div', { className: 'fly' },
          flyRow(isEn ? 'Source Campaign' : 'Bron Campagne', '---', true), flyRow(isEn ? 'Source Campaign Note' : 'Toelichting Broncampagne', '', false, true),
          flyRow(isEn ? 'Rating' : 'Beoordeling', 'Warm', true),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, 'Status'),
            P(t === 'fly:status', h('span', { className: 'fld__v' + (s.dd ? ' is-focus' : '') }, statusLabel, h(D.Icon, { name: 'chevron-down', size: 16 })), true)),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Owner' : 'Eigenaar', h('i', null, '*')), h('span', { className: 'fld__v' }, h('span', { style: { display: 'inline-flex', gap: '6px', alignItems: 'center' } }, h(D.Avatar, { name: 'Jansen, Eva' }), h('a', { style: { color: 'var(--link)' } }, 'Jansen, Eva')))),
          s.dd ? h('div', { className: 'dd', style: { top: '196px' } },
            ['nieuw', 'contact', 'mkt'].map(function (k) {
              var o = h('span', { key: k, className: 'dd__o' + (k === statusKey ? ' is-sel' : '') }, k === statusKey ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), L(STATUS[k], lang));
              return P(t === 'opt:' + k, o, true);
            })) : null) : null,
        h(Bpf, { name: isEn ? 'Lead to Opportunity Sal\u2026' : 'Verkoopproces van pote\u2026', sub: isEn ? 'Active for 2 days' : 'Actief gedurende 2 dagen', stages: [{ name: isEn ? 'Qualify' : 'Kwalificeren', time: '(2 D)', state: 'active' }] }),
        h('div', { className: 'rec__tabs' },
          h('span', { className: 'rec__tab is-on' }, isEn ? 'Summary' : 'Samenvatting'), h('span', { className: 'rec__tab' }, isEn ? 'Data migration' : 'Datamigratie'),
          h('span', { className: 'rec__tab' }, isEn ? 'Contact insights' : 'Inzichten voor contactpersonen'), h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      h('div', { className: 'rec__body' },
        h('div', { className: 'rec__col' },
          h('div', { className: 'sec' }, h('div', { className: 'sec__t' }, isEn ? 'Contact' : 'Contactpersoon'),
            Fld(isEn ? 'Entity' : 'Entiteit', d.entity), Fld(isEn ? 'Topic' : 'Onderwerp', L(d.topic, lang)), Fld(isEn ? 'First Name' : 'Voornaam', d.first, true),
            Fld(isEn ? 'Middle name' : 'Tussenvoegsel(s)', d.tussen), Fld(isEn ? 'Last Name' : 'Achternaam', d.last, true), Fld(isEn ? 'Email' : 'E-mailadres', d.email), Fld(isEn ? 'Business Phone' : 'Telefoon (werk)', d.phone)),
          h('div', { className: 'sec' }, h('div', { className: 'sec__t' }, isEn ? 'Company' : 'Bedrijf'), Fld(isEn ? 'Company' : 'Bedrijf', d.company), Fld('Submitted form', d.form, false, true))),
        h('div', { className: 'rec__col' },
          h('div', { className: 'sub' }, h('div', { className: 'sub__h' }, isEn ? 'All leads for contact' : 'Alle leads voor contactpersoon', h(D.Icon, { name: 'refresh', size: 16 })),
            h('div', { className: 'sub__row is-head' }, h('span', null, isEn ? 'Created On' : 'Gemaakt op'), h('span', null, isEn ? 'Name' : 'Naam'), h('span', null, isEn ? 'Company' : 'Bedrijfsnaam')),
            h('div', { className: 'sub__row' }, h('span', null, d.created.split(' ')[0]), h('a', null, d.name), h('span', null, d.company))),
          h('div', { className: 'tl' }, h('div', { className: 'tl__h' }, D.t('timeline', lang), h('span', { className: 'tl__icons' }, h(D.Icon, { name: 'add', size: 16 }), h(D.Icon, { name: 'filter', size: 16 }), h(D.Icon, { name: 'more', size: 16 }))),
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'),
            h('div', { className: 'tl__item' }, h('b', null, isEn ? 'Auto-post on lead ' : 'Automatisch plaatsen op potenti\u00eble klant '), d.name + ' \u00b7 ' + d.created))),
        h('div', { className: 'rec__col' },
          h('div', { className: 'sec' }, Fld(isEn ? 'Description' : 'Beschrijving', ''), Fld(isEn ? 'Area of interest' : 'Interessegebied', ''), Fld(isEn ? 'Training policy' : 'Opleidingsbeleid', isEn ? 'No' : 'Nee'), Fld('Tips', isEn ? 'No' : 'Nee')),
          h('div', { className: 'sec' }, Fld(isEn ? 'Package' : 'Pakket', ''), Fld(isEn ? 'Is subscriber?' : 'Is abonnee?', isEn ? 'No' : 'Nee')))),
      null);

    function hf(v, l, empty) { return h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' + (empty ? ' is-empty' : '') }, v), h('div', { className: 'rec__fl' }, l)); }
    function flyRow(l, v, chevron, lock) {
      return h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, l, lock ? h(D.Icon, { name: 'lock', size: 16 }) : null),
        h('span', { className: 'fld__v' + (v && v !== '---' ? '' : ' is-empty') }, v || '', chevron ? h(D.Icon, { name: 'chevron-down', size: 16 }) : null));
    }
  }

  function QualifyPanel(p) {
    var lang = p.lang, d = p.d, isEn = lang === 'en';
    return h(React.Fragment, null, h('div', { className: 'qp-dim' }),
      h('aside', { className: 'qp' },
        h('span', { className: 'qp__x' }, h(D.Icon, { name: 'dismiss' })),
        h('h2', null, isEn ? 'Qualify lead' : 'Potenti\u00eble klant kwalificeren'),
        h('div', { className: 'qp__sub' }, isEn ? 'Create or link related records for this lead.' : 'Maak of koppel gerelateerde records voor deze potenti\u00eble klant.'),
        blk(isEn ? 'Account' : 'Account', d.company, isEn ? 'A new account is created from the information on the lead form.' : 'Nieuwe account wordt gemaakt op basis van informatie uit het formulier over de potenti\u00eble klant.'),
        blk(isEn ? 'Contact' : 'Contactpersoon', d.first + (d.tussen ? ' ' + d.tussen : '') + ' ' + d.last, isEn ? 'A new contact is created from the information on the lead form.' : 'Nieuwe contactpersoon wordt gemaakt op basis van informatie uit het formulier over de potenti\u00eble klant.'),
        h('div', null, h('div', { className: 'qp__lbl' }, isEn ? 'Opportunity' : 'Verkoopkans', h(D.Icon, { name: 'help', size: 16 })),
          h('div', { className: 'qp__opp' }, h('span', null, isEn ? 'Opportunity 1' : 'Verkoopkans 1'), h('span', { style: { display: 'inline-flex', gap: '10px', color: 'var(--ink-2)' } }, h(D.Icon, { name: 'note', size: 16 }), h(D.Icon, { name: 'delete', size: 16 }))),
          h('div', { className: 'qp__new' }, '+ ' + (isEn ? 'New opportunity' : 'Nieuwe verkoopkans'))),
        h('div', { className: 'qp__foot' }, P(p.t === 'qp:go', h('button', { type: 'button', className: 'qp__btn' }, isEn ? 'Qualify' : 'Kwalificeren')))));
    function blk(label, value, note) {
      return h('div', { className: 'qp__blk' }, h('div', { className: 'qp__lbl' }, label, h(D.Icon, { name: 'help', size: 16 })),
        h('div', { className: 'qp__row' }, h('div', { className: 'qp__sel' }, isEn ? 'Create new' : 'Nieuwe maken', h(D.Icon, { name: 'chevron-down', size: 16 })), h('div', { className: 'qp__val' }, value)),
        h('div', { className: 'qp__note' }, note));
    }
  }

  var OPP_SANNE = { company: 'Bakkerij De Korenaar', entity: 'SkillsTown Direct', contact: 'De Vries, Sanne', lead: 'De Vries, Sanne' };

  /* Het volledige nagebouwde scherm voor een stap */
  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.view === 'dash' ? h(DI.Dash, { lang: lang, t: t }) : s.view === 'list' ? h(List, { lang: lang, rows: s.rows, t: t }) : s.view === 'opp' ? h(DI.Opp, { lang: lang, t: t, d: OPP_SANNE, s: {} }) : h(Lead, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.view === 'opp' ? 'opportunities' : (s.nav || 'leads'),
      overlay: s.panel ? h(QualifyPanel, { lang: lang, d: LEADS[s.lead], t: t }) : null }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'leadjager', Screen: Screen };
})();
