/* Dynamics-instructies \u2014 onderwerp 5: Activiteiten. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P, CmdBar = DI.CmdBar;

  var TOPIC = { nl: 'Activiteiten', en: 'Activities' };
  var ORG = 'Stichting Welzijn Lindenhoven';
  var AF_SUBJ = 'Kennismaking L&D-plannen 2027', TEL_SUBJ = 'Nabellen offerte', TAAK_SUBJ = 'Offerte opstellen Breedveld Logistiek';

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u201325). */
  function A(o) { return Object.assign({ view: 'acc' }, o); }
  function AF(o) { return Object.assign({ view: 'af' }, o); }
  function TE(o) { return Object.assign({ view: 'tel' }, o); }
  function TA(o) { return Object.assign({ view: 'taak', nav: 'activities' }, o); }
  var AF_DONE = { vereist: true, subj: true, loc: true, tijd: true, besch: true };

  var STEPS = [
    { n: 1, s: A({}), t: 'tl:add',
      title: { nl: 'Een afspraak vastleggen', en: 'Record an appointment' },
      body: { nl: 'Je hebt het account Stichting Welzijn Lindenhoven geopend. Je plant een kennismakingsgesprek met Fleur Jacobs. Klik op het plusje in de tijdlijn.', en: 'You have opened the account Stichting Welzijn Lindenhoven. You are planning an introductory meeting with Fleur Jacobs. Click the plus sign in the timeline.' },
      hint: { nl: 'Het plusje staat rechtsboven in het blok Timeline.', en: 'The plus sign is at the top right of the Timeline block.' } },
    { n: 2, s: A({ menu: true }), t: 'tlm:afspraak',
      title: { nl: 'Kies Afspraak', en: 'Choose Appointment' },
      body: { nl: 'Kies onder Activiteit voor Afspraak.', en: 'Under Activity, choose Appointment.' },
      hint: { nl: 'Afspraak is de eerste optie onder Activiteit.', en: 'Appointment is the first option under Activity.' } },
    { n: 3, s: AF({}), info: true, focus: 'af:title',
      title: { nl: 'Afspraak of taak?', en: 'Appointment or task?' },
      body: { nl: 'Een Afspraak is een gepland gesprek met de klant, fysiek of online, op een vast moment. Een Taak is iets wat je zelf moet doen, zoals een offerte opstellen. Er wordt gerapporteerd op het aantal afspraken: leg een taak dus nooit vast als afspraak. Betreft is al ingevuld met het account, omdat je vanuit de tijdlijn begon.', en: 'An Appointment is a scheduled conversation with the customer, in person or online, at a fixed time. A Task is something you need to do yourself, such as drawing up a quote. Reporting is based on the number of appointments: so never record a task as an appointment. Regarding is already filled in with the account, because you started from the timeline.' } },
    { n: 4, s: AF({}), t: 'af:vereist',
      title: { nl: 'Wie nodig je uit?', en: 'Who are you inviting?' },
      body: { nl: 'Bij Vereist kies je wie je uitnodigt: een contactpersoon, het account of gewoon een e-mailadres. Klik op Vereist; Jacobs, Fleur wordt gekozen.', en: 'Under Required you choose who you invite: a contact, the account or simply an email address. Click Required; Jacobs, Fleur is chosen.' },
      hint: { nl: 'Vereist is het eerste veld.', en: 'Required is the first field.' } },
    { n: 5, s: AF({ vereist: true }), t: 'af:subj',
      title: { nl: 'Onderwerp', en: 'Subject' },
      body: { nl: 'Onderwerp is verplicht. Klik op Onderwerp; het onderwerp wordt ingevuld.', en: 'Subject is required. Click Subject; the subject is filled in.' },
      hint: { nl: 'Onderwerp staat onder Optioneel.', en: 'Subject is below Optional.' } },
    { n: 6, s: AF({ vereist: true, subj: true }), t: 'af:loc',
      title: { nl: 'Locatie of Teams', en: 'Location or Teams' },
      body: { nl: 'Dit wordt een bezoek op locatie. Klik op Locatie; het adres wordt ingevuld. Is het een online gesprek? Zet dan Teams-vergadering op Ja.', en: 'This will be an on-site visit. Click Location; the address is filled in. Is it an online meeting? Then set Teams meeting to Yes.' },
      hint: { nl: 'Locatie staat onder Onderwerp.', en: 'Location is below Subject.' } },
    { n: 7, s: AF({ vereist: true, subj: true, loc: true }), t: 'af:begin',
      title: { nl: 'Datum en tijd', en: 'Date and time' },
      body: { nl: 'Klik op de datum bij Begintijd; begin- en eindtijd worden ingevuld.', en: 'Click the date at Start time; start and end time are filled in.' },
      hint: { nl: 'Begintijd staat in het blok onder Bijlagen.', en: 'Start time is in the block below Attachments.' } },
    { n: 8, s: AF({ vereist: true, subj: true, loc: true, tijd: true }), t: 'af:besch',
      title: { nl: 'Beschrijving', en: 'Description' },
      body: { nl: 'Zet in Beschrijving kort de agenda of het doel van het gesprek. Klik op Beschrijving; de tekst wordt ingevuld.', en: 'Put the agenda or goal of the meeting briefly in Description. Click Description; the text is filled in.' },
      hint: { nl: 'Beschrijving is het onderste blok.', en: 'Description is the bottom block.' } },
    { n: 9, s: AF(AF_DONE), t: 'cmd:saveclose',
      title: { nl: 'Opslaan en sluiten', en: 'Save & Close' },
      body: { nl: 'Klik op Opslaan en sluiten. Je gaat terug naar het account.', en: 'Click Save & Close. You return to the account.' },
      hint: { nl: 'Opslaan en sluiten staat in de opdrachtbalk, rechts van Markeren als voltooid.', en: 'Save & Close is in the command bar, to the right of Mark Complete.' } },
    { n: 10, s: A({ af: true }), t: 'tl:add',
      title: { nl: 'Een telefoongesprek vastleggen', en: 'Record a phone call' },
      body: { nl: 'De afspraak staat nu in de tijdlijn van het account. Je hebt net Nadia El Amrani gebeld over de offerte. Dat leg je vast als telefoongesprek. Klik op het plusje.', en: 'The appointment is now in the account\u2019s timeline. You have just called Nadia El Amrani about the quote. You record that as a phone call. Click the plus sign.' },
      hint: { nl: 'Het plusje staat rechtsboven in het blok Timeline.', en: 'The plus sign is at the top right of the Timeline block.' } },
    { n: 11, s: A({ af: true, menu: true }), t: 'tlm:tel',
      title: { nl: 'Kies Telefoongesprek', en: 'Choose Phone Call' },
      body: { nl: 'Kies Telefoongesprek.', en: 'Choose Phone Call.' },
      hint: { nl: 'Telefoongesprek is de vierde optie onder Activiteit.', en: 'Phone Call is the fourth option under Activity.' } },
    { n: 12, s: TE({}), t: 'tel:subj',
      title: { nl: 'Gesprek over', en: 'Call about' },
      body: { nl: 'Gesprek over is verplicht. Klik op het veld; het onderwerp wordt ingevuld.', en: 'Call about is required. Click the field; the subject is filled in.' },
      hint: { nl: 'Gesprek over is het eerste veld.', en: 'Call about is the first field.' } },
    { n: 13, s: TE({ subj: true }), t: 'tel:richting',
      title: { nl: 'Richting', en: 'Direction' },
      body: { nl: 'Richting staat op Binnenkomend. Jij hebt gebeld, dus dat pas je aan. Klik op Richting.', en: 'Direction is set to Incoming. You made the call, so you change it. Click Direction.' },
      hint: { nl: 'Richting staat onder Telefoonnummer.', en: 'Direction is below Phone number.' } },
    { n: 14, s: TE({ subj: true, rMenu: true }), t: 'rich:uit',
      title: { nl: 'Kies Uitgaand', en: 'Choose Outgoing' },
      body: { nl: 'Kies Uitgaand.', en: 'Choose Outgoing.' },
      hint: { nl: 'Uitgaand is de tweede optie.', en: 'Outgoing is the second option.' } },
    { n: 15, s: TE({ subj: true, uit: true }), t: 'tel:naar',
      title: { nl: 'Wie heb je gebeld?', en: 'Who did you call?' },
      body: { nl: 'Jij staat nu bij Aanroepen vanuit en het account bij Oproep naar. Vervang het account door de persoon die je hebt gebeld. Klik op Oproep naar; El Amrani, Nadia en een korte beschrijving worden ingevuld.', en: 'You are now under Call from and the account under Call to. Replace the account with the person you called. Click Call to; El Amrani, Nadia and a short description are filled in.' },
      hint: { nl: 'Oproep naar staat onder Aanroepen vanuit.', en: 'Call to is below Call from.' } },
    { n: 16, s: TE({ subj: true, uit: true, naar: true }), t: 'cmd:done',
      title: { nl: 'Markeren als voltooid', en: 'Mark Complete' },
      body: { nl: 'Het gesprek is al gevoerd. Klik daarom op Markeren als voltooid: het telefoongesprek wordt opgeslagen en gesloten.', en: 'The call has already taken place. So click Mark Complete: the phone call is saved and closed.' },
      hint: { nl: 'Markeren als voltooid staat in de opdrachtbalk, rechts van Opslaan.', en: 'Mark Complete is in the command bar, to the right of Save.' } },
    { n: 17, s: A({ af: true, tel: true }), t: 'nav:activities',
      title: { nl: 'Een taak maken via het menu', en: 'Create a task via the menu' },
      body: { nl: 'Het telefoongesprek staat als Gesloten in de tijdlijn. Nu maak je een taak: je moet nog een offerte opstellen voor Breedveld Logistiek. Klik in het menu op Activiteiten.', en: 'The phone call is in the timeline as Closed. Now you create a task: you still need to draw up a quote for Breedveld Logistiek. In the menu, click Activities.' },
      hint: { nl: 'Activiteiten staat in het menu links onder Mijn Werk.', en: 'Activities is in the menu on the left, under My Work.' } },
    { n: 18, s: { view: 'list', nav: 'activities' }, t: 'cmd:taak',
      title: { nl: 'Klik op Taak', en: 'Click Task' },
      body: { nl: 'Dit is Mijn activiteiten, met je openstaande activiteiten. In de opdrachtbalk kies je welk soort activiteit je maakt. Klik op Taak.', en: 'This is My Activities, with your open activities. In the command bar you choose which kind of activity to create. Click Task.' },
      hint: { nl: 'Taak staat in de opdrachtbalk, rechts van Grafiek weergeven.', en: 'Task is in the command bar, to the right of Show Chart.' } },
    { n: 19, s: TA({}), t: 'taak:subj',
      title: { nl: 'Onderwerp', en: 'Subject' },
      body: { nl: 'Klik op Onderwerp; het onderwerp wordt ingevuld.', en: 'Click Subject; the subject is filled in.' },
      hint: { nl: 'Onderwerp is het eerste veld.', en: 'Subject is the first field.' } },
    { n: 20, s: TA({ subj: true }), t: 'taak:betreft',
      title: { nl: 'Betreft', en: 'Regarding' },
      body: { nl: 'Via het menu staat Betreft nog leeg: dat vul je zelf in, zodat de taak bij het juiste account hoort. Klik op Betreft; Breedveld Logistiek wordt gekozen.', en: 'Via the menu, Regarding is still empty: you fill it in yourself, so the task belongs to the right account. Click Regarding; Breedveld Logistiek is chosen.' },
      hint: { nl: 'Betreft staat onder Beschrijving.', en: 'Regarding is below Description.' } },
    { n: 21, s: TA({ subj: true, betreft: true }), t: 'hdr:chev',
      title: { nl: 'Open de kop', en: 'Expand the header' },
      body: { nl: 'Geef de taak een einddatum, zodat hij op tijd in beeld komt. De Einddatum staat in de kop: klap hem open met het pijltje rechtsboven.', en: 'Give the task a due date, so it shows up in time. Due date is in the header: expand it with the arrow at the top right.' },
      hint: { nl: 'Het pijltje staat helemaal rechts, naast de eigenaar.', en: 'The arrow is at the far right, next to the owner.' } },
    { n: 22, s: TA({ subj: true, betreft: true, fly: true }), t: 'fly:eind',
      title: { nl: 'Klik op Einddatum', en: 'Click Due date' },
      body: { nl: 'Klik op Einddatum; de datum wordt ingevuld.', en: 'Click Due date; the date is filled in.' },
      hint: { nl: 'Einddatum staat onder Prioriteit.', en: 'Due date is below Priority.' } },
    { n: 23, s: TA({ subj: true, betreft: true, eind: true }), t: 'cmd:saveclose',
      title: { nl: 'Opslaan en sluiten', en: 'Save & Close' },
      body: { nl: 'Klik op Opslaan en sluiten.', en: 'Click Save & Close.' },
      hint: { nl: 'Opslaan en sluiten staat in de opdrachtbalk.', en: 'Save & Close is in the command bar.' } },
    { n: 24, s: { view: 'list', nav: 'activities', taak: true }, info: true, focus: 'grid',
      title: { nl: 'Jouw activiteiten', en: 'Your activities' },
      body: { nl: 'Mijn activiteiten toont je openstaande activiteiten: de afspraak en de taak. Het telefoongesprek staat er niet in, omdat je dat als voltooid hebt gemarkeerd; je vindt het in de tijdlijn van het account. De kolom Type activiteit laat zien wat voor activiteit het is.', en: 'My Activities shows your open activities: the appointment and the task. The phone call is not listed, because you marked it complete; you find it in the account\u2019s timeline. The Activity Type column shows what kind of activity it is.' } },
    { n: 25, s: { view: 'list', nav: 'activities', taak: true }, info: true, focus: 'col:type',
      title: { nl: 'Onthoud de regel', en: 'Remember the rule' },
      body: { nl: 'Een gepland gesprek met de klant is een Afspraak. Iets wat je zelf moet doen is een Taak. Een gevoerd gesprek leg je vast als Telefoongesprek. Zo kloppen de rapportages over afspraken.', en: 'A scheduled conversation with the customer is an Appointment. Something you need to do yourself is a Task. A call that has taken place is recorded as a Phone Call. That keeps the appointment reports accurate.' } }
  ];
  var TOTAL = 25;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Je hebt volgende week een online gesprek met een klant gepland. Welke activiteit maak je?', en: 'You have scheduled an online meeting with a customer next week. Which activity do you create?' },
      o: [{ nl: 'Taak', en: 'Task' }, { nl: 'Afspraak', en: 'Appointment' }, { nl: 'Telefoongesprek', en: 'Phone Call' }, { nl: 'Notitie', en: 'Note' }], a: 1,
      x: { nl: 'Een gepland gesprek met de klant, ook online, is een Afspraak. Zet Teams-vergadering op Ja.', en: 'A scheduled conversation with the customer, online too, is an Appointment. Set Teams meeting to Yes.' } },
    { q: { nl: 'Je moet nog een offerte opstellen. Welke activiteit maak je?', en: 'You still need to draw up a quote. Which activity do you create?' },
      o: [{ nl: 'Afspraak', en: 'Appointment' }, { nl: 'Telefoongesprek', en: 'Phone Call' }, { nl: 'Taak', en: 'Task' }, { nl: 'E-mail', en: 'Email' }], a: 2,
      x: { nl: 'Iets wat je zelf moet doen is een Taak, met een einddatum.', en: 'Something you need to do yourself is a Task, with a due date.' } },
    { q: { nl: 'Waarom mag je een taak niet als afspraak vastleggen?', en: 'Why must you not record a task as an appointment?' },
      o: [{ nl: 'Er wordt gerapporteerd op het aantal afspraken', en: 'Reporting is based on the number of appointments' }, { nl: 'Een afspraak kun je niet verwijderen', en: 'You cannot delete an appointment' }, { nl: 'Een afspraak stuurt altijd een factuur', en: 'An appointment always sends an invoice' }, { nl: 'Dat mag wel, het maakt niet uit', en: 'You may, it does not matter' }], a: 0,
      x: { nl: 'Het aantal afspraken telt mee in de rapportage. Een taak als afspraak maakt die cijfers onbetrouwbaar.', en: 'The number of appointments counts in the reports. A task recorded as an appointment makes those figures unreliable.' } },
    { q: { nl: 'Je hebt een klant net gebeld. Hoe leg je dat vast?', en: 'You have just called a customer. How do you record it?' },
      o: [{ nl: 'Als afspraak, met Teams-vergadering op Ja', en: 'As an appointment, with Teams meeting set to Yes' }, { nl: 'Als taak met een einddatum', en: 'As a task with a due date' }, { nl: 'Als telefoongesprek, Richting Binnenkomend, en open laten', en: 'As a phone call, Direction Incoming, and leave it open' }, { nl: 'Als telefoongesprek, Richting Uitgaand, Markeren als voltooid', en: 'As a phone call, Direction Outgoing, Mark Complete' }], a: 3,
      x: { nl: 'Jij hebt gebeld, dus Richting Uitgaand. Het gesprek is al gevoerd, dus Markeren als voltooid.', en: 'You made the call, so Direction Outgoing. The call has already taken place, so Mark Complete.' } },
    { q: { nl: 'Wat is het voordeel van een activiteit aanmaken via de tijdlijn van het account?', en: 'What is the advantage of creating an activity from the account\u2019s timeline?' },
      o: [{ nl: 'De activiteit telt dubbel mee', en: 'The activity counts twice' }, { nl: 'Betreft staat al ingevuld met het account', en: 'Regarding is already filled in with the account' }, { nl: 'Je hoeft geen onderwerp in te vullen', en: 'You do not need to fill in a subject' }, { nl: 'Er is geen verschil', en: 'There is no difference' }], a: 1,
      x: { nl: 'Vanuit de tijdlijn vult Dynamics Betreft in met het account. Via het menu Activiteiten vul je Betreft zelf in.', en: 'From the timeline, Dynamics fills in Regarding with the account. Via the Activities menu you fill in Regarding yourself.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je wanneer iets een afspraak, een taak of een telefoongesprek is, en hoe je ze vastlegt via de tijdlijn en via het menu Activiteiten.', parts: ['Afspraak via de tijdlijn', 'Telefoongesprek via de tijdlijn', 'Taak via het menu Activiteiten'], steps: '25 stappen', time: 'Ongeveer 12 minuten' },
    en: { intro: 'In this topic you learn when something is an appointment, a task or a phone call, and how to record them via the timeline and via the Activities menu.', parts: ['Appointment via the timeline', 'Phone call via the timeline', 'Task via the Activities menu'], steps: '25 steps', time: 'About 12 minutes' }
  };

  /* ---------- Opdrachtbalken ---------- */
  var CMD_ACC = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'org', i: 'assign', l: { nl: 'Organigram openen', en: 'Open Org Chart' } },
    { k: 'deactivate', i: 'error-circle', l: { nl: 'Deactiveren', en: 'Deactivate' } }, { k: 'connect', i: 'contact', l: { nl: 'Verbinding maken', en: 'Connect' }, chev: true },
    { k: 'mlist', i: 'report', l: { nl: 'Toevoegen aan marketinglijst', en: 'Add to Marketing List' } }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } },
    { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }, { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }
  ];
  var CMD_ACT = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'done', i: 'checkmark', l: { nl: 'Markeren als voltooid', en: 'Mark Complete' } },
    { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } }
  ];
  var CMD_AF = CMD_ACT.concat([{ k: 'recur', i: 'refresh', l: { nl: 'Terugkeerpatroon', en: 'Recurrence' } }, { k: 'flow', i: 'flow', l: { nl: 'Stroom', en: 'Flow' }, chev: true }]);
  var CMD_TASK = CMD_ACT.concat([{ k: 'flow', i: 'flow', l: { nl: 'Stroom', en: 'Flow' }, chev: true }]);
  var CMD_LIST = [
    { k: 'focus', i: 'views', l: { nl: 'Gerichte weergave', en: 'Focused view' } }, { k: 'chart', i: 'chart', l: { nl: 'Grafiek weergeven', en: 'Show Chart' } },
    { k: 'taak', i: 'task', l: { nl: 'Taak', en: 'Task' } }, { k: 'mail', i: 'email', l: { nl: 'E-mail', en: 'Email' } },
    { k: 'afspraak', i: 'appointment', l: { nl: 'Afspraak', en: 'Appointment' } }, { k: 'tel', i: 'phone', l: { nl: 'Telefoongesprek', en: 'Phone Call' } },
    { k: 'brief', i: 'report', l: { nl: 'Brief', en: 'Letter' } }, { k: 'fax', i: 'report', l: { nl: 'Fax', en: 'Fax' } },
    { k: 'service', i: 'settings', l: { nl: 'Serviceactiviteit', en: 'Service Activity' } }, { k: 'camp', i: 'campaign', l: { nl: 'Campagnerespons', en: 'Campaign Response' } },
    { k: 'other', i: 'activity', l: { nl: 'Overige activiteiten', en: 'Other activities' }, chev: true }
  ];

  /* ---------- Velden ---------- */
  function f(label, value, o) {
    o = o || {};
    var val = h('span', { className: 'fld__v' + (value ? '' : ' is-empty') + (o.focus ? ' is-focus' : '') + (o.cls ? ' ' + o.cls : '') },
      value ? (o.link ? h('a', null, value) : value) : (o.ph || '---'), o.icon ? h(D.Icon, { name: o.icon, size: 16 }) : null);
    return h('div', { className: 'fld acf', key: label, 'data-focus': o.focusKey },
      h('span', { className: 'fld__l' }, label, o.req ? h('i', null, '*') : o.rec ? h('i', { className: 'is-rec' }, '*') : null, o.lock ? h(D.Icon, { name: 'lock', size: 16 }) : null),
      h('div', { className: 'acf__v' }, o.target ? P(o.t === o.target, val, true) : val, o.menu || null));
  }
  function person(name) { return h('span', { className: 'acfly__pick' }, h(D.Avatar, { name: name }), h('a', null, name), h(D.Icon, { name: 'dismiss', size: 12 })); }
  function rec(name, icon) { return h('span', { className: 'acfly__pick' }, h(D.Icon, { name: icon || 'account', size: 16 }), h('a', null, name), h(D.Icon, { name: 'dismiss', size: 12 })); }

  /* Kop van een activiteit */
  function ActHead(p) {
    var lang = p.lang, isEn = lang === 'en';
    return h('div', { className: 'rec__head' },
      h('div', { className: 'rec__top' },
        h('div', { className: 'rec__id', 'data-focus': p.focusKey },
          h('div', null, h('div', { className: 'rec__name' }, p.title, h('small', null, isEn ? ' - Unsaved' : ' - Niet-opgeslagen')), p.type ? h('div', { className: 'rec__type' }, p.type, ' \u00b7 ', h('b', { className: 'acc__form' }, p.type, h(D.Icon, { name: 'chevron-down', size: 12 }))) : null)),
        h('div', { className: 'rec__hf' },
          p.fields.map(function (x, i) { return h('div', { key: i, className: 'rec__f' }, h('div', { className: 'rec__fv' + (x[0] === '---' ? ' is-empty' : '') }, x[0]), h('div', { className: 'rec__fl' }, x[1])); }),
          h('div', { className: 'rec__f acc__owner' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('div', null, h('div', { className: 'rec__fv' }, h('a', null, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, isEn ? 'Owner' : 'Eigenaar'))),
          P(p.t === 'hdr:chev', h('button', { type: 'button', className: 'rec__chev' + (p.fly ? ' is-open' : '') }, h(D.Icon, { name: p.fly ? 'chevron-up' : 'chevron-down' }))))),
      p.flyNode || null,
      h('div', { className: 'rec__tabs' }, p.tabs.map(function (x, i) { return h('span', { key: i, className: 'rec__tab' + (i === 0 ? ' is-on' : '') }, x); })));
  }

  /* ---------- Afspraak ---------- */
  function Afspraak(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t;
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: CMD_AF }),
      h(ActHead, { lang: lang, t: t, focusKey: 'af:title', title: isEn ? 'New Appointment' : 'Nieuw: Afspraak', type: isEn ? 'Appointment' : 'Afspraak',
        fields: [[isEn ? 'Normal' : 'Normaal', isEn ? 'Priority' : 'Prioriteit'], ['Open', 'Status']], tabs: [isEn ? 'Appointment' : 'Afspraak'] }),
      h('div', { className: 'actform' },
        h('div', { className: 'sec acsec actsec' },
          f(isEn ? 'Required' : 'Vereist', s.vereist ? person('Jacobs, Fleur') : '', { t: t, target: 'af:vereist', icon: 'search' }),
          f(isEn ? 'Optional' : 'Optioneel', '', { icon: 'search' }),
          f(isEn ? 'Subject' : 'Onderwerp', s.subj ? AF_SUBJ : '', { req: true, t: t, target: 'af:subj' }),
          f(isEn ? 'Location' : 'Locatie', s.loc ? 'Stationsplein 4, Lindenhoven' : '', { t: t, target: 'af:loc' }),
          h('div', { className: 'fld acf' }, h('span', { className: 'fld__l' }, isEn ? 'Teams meeting' : 'Teams-vergadering'), h('span', { className: 'tgl' }, h('span', { className: 'tgl__k' }), isEn ? 'No' : 'Nee')),
          f(isEn ? 'Regarding' : 'Betreft', rec(ORG), { icon: 'search' })),
        h('div', { className: 'sec acsec actsec actsec--bar' }, h('b', null, isEn ? 'Attachments' : 'Bijlagen')),
        h('div', { className: 'sec acsec actsec' },
          h('div', { className: 'fld acf actime' }, h('span', { className: 'fld__l' }, isEn ? 'Start time' : 'Begintijd', h('i', null, '*')),
            h('div', { className: 'actime__v' }, P(t === 'af:begin', h('span', { className: 'fld__v' }, s.tijd ? '12-11-2026' : '30-10-2026', h(D.Icon, { name: 'appointment', size: 16 })), true),
              h('span', { className: 'fld__v' }, s.tijd ? '10:00' : '11:00', h(D.Icon, { name: 'chevron-down', size: 16 })))),
          h('div', { className: 'fld acf actime' }, h('span', { className: 'fld__l' }, isEn ? 'End time' : 'Eindtijd', h('i', null, '*')),
            h('div', { className: 'actime__v' }, h('span', { className: 'fld__v' }, s.tijd ? '12-11-2026' : '30-10-2026', h(D.Icon, { name: 'appointment', size: 16 })),
              h('span', { className: 'fld__v' }, s.tijd ? '11:00' : '11:30', h(D.Icon, { name: 'chevron-down', size: 16 })))),
          h('div', { className: 'fld acf' }, h('span', { className: 'fld__l' }, isEn ? 'All day event' : 'Duurt de hele dag'), h('span', null, h(D.Icon, { name: 'checkbox', size: 20 }))),
          f(isEn ? 'Duration' : 'Duur', s.tijd ? (isEn ? '1 hour' : '1 uur') : (isEn ? '30 minutes' : '30 minuten'), { icon: 'chevron-down' })),
        h('div', { className: 'sec acsec actsec' }, h('div', { className: 'sec__h2' }, isEn ? 'Description' : 'Beschrijving'),
          P(t === 'af:besch', h('div', { className: 'actxt' + (s.besch ? '' : ' is-empty') }, s.besch ? (isEn ? 'Agenda: L&D plans for 2027, onboarding of new staff and a demo of the knowledge platform.' : 'Agenda: L&D-plannen voor 2027, onboarding van nieuwe medewerkers en een demo van het kennisplatform.') : '---'), true))));
  }

  /* ---------- Telefoongesprek ---------- */
  function Telefoon(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t;
    var richting = s.uit ? (isEn ? 'Outgoing' : 'Uitgaand') : (isEn ? 'Incoming' : 'Binnenkomend');
    var van = s.uit ? person('Jansen, Eva') : rec(ORG), naar = s.naar ? person('El Amrani, Nadia') : s.uit ? rec(ORG) : person('Jansen, Eva');
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: CMD_TASK }),
      h(ActHead, { lang: lang, t: t, title: isEn ? 'New Phone Call' : 'Nieuw: Telefoongesprek',
        fields: [[isEn ? 'Normal' : 'Normaal', isEn ? 'Priority' : 'Prioriteit'], ['---', isEn ? 'Due date' : 'Einddatum'], ['Open', 'Status']], tabs: [isEn ? 'Phone Call' : 'Telefoongesprek', 'Conflicts Tab'] }),
      h('div', { className: 'actform' },
        h('div', { className: 'sec acsec actsec' },
          f(isEn ? 'Call about' : 'Gesprek over', s.subj ? TEL_SUBJ : '', { req: true, t: t, target: 'tel:subj' }),
          f(isEn ? 'Account name' : 'Accountnaam', rec(ORG), { icon: 'search' }),
          f(isEn ? 'Contact' : 'Contactpersoon', '', { icon: 'search' }),
          f(isEn ? 'Call from' : 'Aanroepen vanuit', van, { rec: true, icon: 'search' }),
          f(isEn ? 'Call to' : 'Oproep naar', naar, { req: true, t: t, target: 'tel:naar', icon: 'search' }),
          f(isEn ? 'Phone number' : 'Telefoonnummer', s.naar ? '06 5555 0182' : ''),
          f(isEn ? 'Direction' : 'Richting', richting, { t: t, target: 'tel:richting', icon: 'chevron-down', focus: s.rMenu,
            menu: s.rMenu ? h('div', { className: 'dd acdd actdd' },
              [['in', isEn ? 'Incoming' : 'Binnenkomend'], ['uit', isEn ? 'Outgoing' : 'Uitgaand']].map(function (o, i) {
                return P(t === 'rich:' + o[0], h('span', { key: o[0], className: 'dd__o' + (i === 0 ? ' is-sel' : '') }, i === 0 ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), o[1]), true);
              })) : null }),
          f(isEn ? 'Regarding' : 'Betreft', rec(ORG), { icon: 'search' })),
        h('div', { className: 'sec acsec actsec' }, h('div', { className: 'sec__h2' }, isEn ? 'Description' : 'Beschrijving'),
          h('div', { className: 'actxt' + (s.naar ? '' : ' is-empty') }, s.naar ? (isEn ? 'Discussed the quote with Nadia. She will present it to the board on 20 November.' : 'Offerte met Nadia doorgenomen. Zij legt hem op 20 november voor aan de directie.') : '---'))));
  }

  /* ---------- Taak ---------- */
  function Taak(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, eind = s.eind ? '6-11-2026 17:00' : '';
    var fly = s.fly ? h('div', { className: 'fly acfly' },
      h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Priority' : 'Prioriteit'), h('span', { className: 'fld__v' }, isEn ? 'Normal' : 'Normaal', h(D.Icon, { name: 'chevron-down', size: 16 }))),
      h('div', { className: 'fld acf' }, h('span', { className: 'fld__l' }, isEn ? 'Due date' : 'Einddatum'),
        h('div', { className: 'acf__v' }, P(t === 'fly:eind', h('span', { className: 'fld__v is-empty' }, 'd/M/yyyy', h(D.Icon, { name: 'appointment', size: 16 })), true))),
      h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Activity status' : 'Activiteitsstatus', h('i', null, '*')), h('span', { className: 'fld__v' }, 'Open', h(D.Icon, { name: 'lock', size: 16 }))),
      h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Owner' : 'Eigenaar', h('i', null, '*')), h('span', { className: 'fld__v' }, person('Jansen, Eva')))) : null;
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: CMD_TASK }),
      h(ActHead, { lang: lang, t: t, fly: s.fly, flyNode: fly, title: isEn ? 'New Task' : 'Nieuw: Taak', type: isEn ? 'Task' : 'Taak',
        fields: [[isEn ? 'Normal' : 'Normaal', isEn ? 'Priority' : 'Prioriteit'], [eind || '---', isEn ? 'Due date' : 'Einddatum'], ['Open', isEn ? 'Activity status' : 'Activiteitsstatus']], tabs: [isEn ? 'Task' : 'Taak'] }),
      h('div', { className: 'actform' },
        h('div', { className: 'sec acsec actsec' }, f(isEn ? 'Subject' : 'Onderwerp', s.subj ? TAAK_SUBJ : '', { req: true, t: t, target: 'taak:subj' })),
        h('div', { className: 'sec acsec actsec' }, h('div', { className: 'sec__h2' }, isEn ? 'Description' : 'Beschrijving'),
          h('div', { className: 'actxt' + (s.subj ? '' : ' is-empty') }, s.subj ? (isEn ? '40 licences for the knowledge platform plus implementation support.' : '40 licenties kennisplatform plus implementatiebegeleiding.') : '---')),
        h('div', { className: 'sec acsec actsec' },
          f(isEn ? 'Regarding' : 'Betreft', s.betreft ? rec('Breedveld Logistiek') : '', { t: t, target: 'taak:betreft', icon: 'search' }),
          f(isEn ? 'Duration' : 'Duur', isEn ? '30 minutes' : '30 minuten', { icon: 'chevron-down' }))));
  }

  /* ---------- Account met tijdlijn ---------- */
  function Account(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t;
    var TABS = [isEn ? 'Summary' : 'Samenvatting', isEn ? 'Child Accounts' : 'Onderliggende Accounts', isEn ? 'Addresses' : 'Adressen', isEn ? 'Files' : 'Bestanden', 'Sales Cases', 'Details', isEn ? 'Contract | Agreements' : 'Contract | Afspraken'];
    var items = [];
    if (s.tel) items.push({ i: 'phone', d: '30-10-2026 14:12', b: isEn ? 'Phone call from: Jansen, Eva' : 'Telefoongesprek van: Jansen, Eva', st: isEn ? 'Closed' : 'Gesloten', x: TEL_SUBJ, k: 'tel' });
    if (s.af) items.push({ i: 'appointment', d: '30-10-2026 14:05', b: isEn ? 'Appointment from: Jansen, Eva' : 'Afspraak van: Jansen, Eva', st: 'Open', x: AF_SUBJ + ' \u00b7 12-11-2026 10:00', k: 'af' });
    items.push({ i: 'email', d: '27-10-2026 09:12', b: isEn ? 'Email from: Jansen, Eva' : 'E-mail van: Jansen, Eva', st: isEn ? 'Closed' : 'Gesloten', x: isEn ? 'Planning quarterly meeting' : 'Planning kwartaaloverleg', k: 'mail' });
    var menu = s.menu ? h('div', { className: 'tlm' },
      h('div', { className: 'tlm__h' }, h(D.Icon, { name: 'activity', size: 16 }), isEn ? 'Activity' : 'Activiteit'),
      [['afspraak', 'appointment', isEn ? 'Appointment' : 'Afspraak'], ['mail', 'email', 'E-mail'], ['taak', 'task', isEn ? 'Task' : 'Taak'], ['tel', 'phone', isEn ? 'Phone Call' : 'Telefoongesprek']].map(function (o) {
        return P(t === 'tlm:' + o[0], h('span', { key: o[0], className: 'tlm__o tlm__o--sub' }, h(D.Icon, { name: o[1], size: 16 }), o[2]), true);
      }),
      h('span', { className: 'tlm__o' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Note' : 'Notitie'),
      h('span', { className: 'tlm__o' }, h(D.Icon, { name: 'report', size: 16 }), 'OneNote'),
      h('span', { className: 'tlm__o' }, h(D.Icon, { name: 'email', size: 16 }), isEn ? 'Post' : 'Bericht')) : null;
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
        h('div', { className: 'rec__tabs' }, TABS.map(function (x, i) { return h('span', { key: i, className: 'rec__tab' + (i === 0 ? ' is-on' : '') }, x); }),
          h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      h('div', { className: 'acc__body' },
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
          h('div', { className: 'tl attl' },
            h('div', { className: 'tl__h' }, 'Timeline', h('span', { className: 'tl__icons' }, P(t === 'tl:add', h('span', { className: 'attl__add' + (s.menu ? ' is-on' : '') }, h(D.Icon, { name: 'add', size: 16 }))), h(D.Icon, { name: 'filter', size: 16 }), h(D.Icon, { name: 'refresh', size: 16 }), h(D.Icon, { name: 'more', size: 16 }))),
            menu,
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
            h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'),
            items.map(function (it) {
              return h('div', { key: it.k, className: 'attl__item' + ((it.k === 'af' && s.af && !s.tel) || (it.k === 'tel' && s.tel) ? ' is-new' : '') },
                h('span', { className: 'attl__ic' }, h(D.Icon, { name: it.i, size: 16 })),
                h('div', null, h('div', { className: 'attl__d' }, (isEn ? 'Created on: ' : 'Gemaakt op: ') + it.d),
                  h('div', null, h('b', null, it.b), h('span', { className: 'attl__st' }, it.st)), h('div', null, it.x)));
            })))));
  }

  /* ---------- Mijn activiteiten ---------- */
  function List(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t, s = p.s;
    var rows = [];
    if (s.taak) rows.push({ type: isEn ? 'Task' : 'Taak', subj: TAAK_SUBJ, reg: 'Breedveld Logistiek', prio: isEn ? 'Normal' : 'Normaal', created: '30-10-2026 14:20', start: '', end: '6-11-2026 17:00' });
    rows.push({ type: isEn ? 'Appointment' : 'Afspraak', subj: AF_SUBJ, reg: ORG, prio: isEn ? 'Normal' : 'Normaal', created: '30-10-2026 14:05', start: '12-11-2026 10:00', end: '12-11-2026 11:00' });
    var cols = [
      { key: 'type', label: { nl: 'Type activiteit', en: 'Activity Type' }, width: 200 }, { key: 'subj', label: { nl: 'Onderwerp', en: 'Subject' }, width: 420, link: true },
      { key: 'reg', label: { nl: 'Betreft', en: 'Regarding' }, width: 300, link: true }, { key: 'prio', label: { nl: 'Prioriteit', en: 'Priority' }, width: 140 },
      { key: 'created', label: { nl: 'Gemaakt op', en: 'Created On' }, width: 180 }, { key: 'start', label: { nl: 'Begindatum', en: 'Start Date' }, width: 180 },
      { key: 'end', label: { nl: 'Einddatum', en: 'Due Date' }, sort: 'asc' }];
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(CmdBar, { lang: lang, t: t, items: CMD_LIST }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: { nl: 'Mijn activiteiten', en: 'My Activities' } }),
        h('div', { className: 'atfilt' },
          h('label', null, isEn ? 'Due date' : 'Einddatum', h('span', null, isEn ? 'All' : 'Alle', h(D.Icon, { name: 'chevron-down', size: 16 }))),
          h('label', null, isEn ? 'Activity Type' : 'Type activiteit', h('span', null, isEn ? 'All' : 'Alle', h(D.Icon, { name: 'chevron-down', size: 16 })))),
        h('div', { className: 'atgrid', 'data-focus': 'grid' },
          h('span', { className: 'atgrid__col', 'data-focus': 'col:type' }),
          h(D.DataGrid, { lang: lang, columns: cols, rows: rows, highlight: t }))));
  }

  /* Het volledige nagebouwde scherm voor een stap */
  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var v = s.view;
    var content = v === 'acc' ? h(Account, { lang: lang, s: s, t: t }) : v === 'af' ? h(Afspraak, { lang: lang, s: s, t: t }) : v === 'tel' ? h(Telefoon, { lang: lang, s: s, t: t })
      : v === 'taak' ? h(Taak, { lang: lang, s: s, t: t }) : h(List, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'accounts' }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'planner', Screen: Screen };
})();
