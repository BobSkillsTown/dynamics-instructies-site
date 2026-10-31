/* Dynamics-instructies \u2014 onderwerp 4: Contactpersonen. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P, CmdBar = DI.CmdBar;

  /* ---------- Verzonnen gegevens ---------- */
  var TOPIC = { nl: 'Contactpersonen', en: 'Contacts' };
  var ORG = 'Stichting Welzijn Lindenhoven';
  var FUNCTIES = ['--Selecteren--', 'Academy Manager', 'Algemeen management', 'Communicatie', 'Directie', 'Directeur HR', 'Docent/Trainer', 'Finance', 'Functioneel Beheer', 'HR Adviseur',
    'HR Business Partner', 'HR Co\u00f6rdinator', 'HR Manager', 'IT Professional', 'Inkoop', 'Juridisch', 'L&D Adviseur', 'L&D Business Partner', 'L&D Co\u00f6rdinator', 'L&D Manager', 'L&D Consultant',
    'Management support', 'Marketing', 'Migratie', 'Programmamanager', 'Sales'];
  var ROLLEN = ['Beslisser', 'Mailing beheerders', 'Course editor', 'Cursist', 'IT Contactpersoon'];
  var GESLACHT = [['man', { nl: 'Man', en: 'Male' }], ['vrouw', { nl: 'Vrouw', en: 'Female' }], ['x', { nl: 'X', en: 'X' }]];
  var CONTACTS = [
    ['Bakker, Jeroen', 'j.bakker@vandijk-installatie.example', 'Van Dijk Installatietechniek B.V.', '0413 555 017'],
    ['Bos, Ilse', 'i.bos@westvliet.example', 'Westvliet Groep', '010 555 3871'],
    ['Brouwer, Sem', 's.brouwer@welzijnlindenhoven.example', ORG, '085 555 2201'],
    ['De Vries, Sanne', 's.devries@korenaar.example', 'Bakkerij De Korenaar', '030 555 0142'],
    ['El Amrani, Nadia', 'n.elamrani@welzijnlindenhoven.example', ORG, '085 555 2202'],
    ['Hendriks, Bram', 'b.hendriks@speelhuis.example', 'Kinderopvang Het Speelhuis', '073 555 6121'],
    ['Kramer, Joost', 'j.kramer@westvliet.example', 'Westvliet Groep', '010 555 3870'],
    ['Peters, Wim', 'w.peters@welzijnlindenhoven.example', ORG, '085 555 2203'],
    ['Smit, Anouk', 'a.smit@zuiderzorg.example', 'Co\u00f6peratie Zuiderzorg', '0418 555 901'],
    ['Visser, Noor', 'n.visser@rivierenland.example', 'Jeugdzorg Rivierenland', '0488 555 301'],
    ['Yilmaz, Elif', 'e.yilmaz@lindenhoven-zorg.example', 'Zorggroep Lindenhoven', '085 555 7301']
  ];
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
  /* Contactpersonen op het formulier */
  var PERSON = {
    nadia: { first: 'Nadia', last: 'El Amrani', full: 'El Amrani, Nadia', initials: 'NE', g: 'vrouw', functie: 'HR Business Partner', rol: ['Beslisser'], email: 'n.elamrani@welzijnlindenhoven.example', mob: '', created: '14-3-2025 10:02' },
    wim: { first: 'Wim', last: 'Peters', full: 'Peters, Wim', initials: 'WP', g: 'man', functie: 'Algemeen management', rol: ['Mailing beheerders'], email: 'w.peters@welzijnlindenhoven.example', mob: '06 5555 0347', created: '2-6-2025 14:31' },
    fleur: { first: 'Fleur', last: 'Jacobs', full: 'Jacobs, Fleur', initials: 'FJ', g: '', functie: '', rol: [], email: '', mob: '', created: '' }
  };

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u201325). */
  var NADIA = { view: 'ct', p: 'nadia' };
  function NA(o) { return Object.assign({}, NADIA, o); }
  var NADIA_NEW = { functie: 'L&D Manager', rol: ['Beslisser', 'Mailing beheerders'] };
  var ACC = { view: 'acc', nav: 'accounts' };
  var FLEUR = { view: 'ct', p: 'fleur', isNew: true, nav: 'accounts' };
  function FL(o) { return Object.assign({}, FLEUR, o); }
  var FLEUR_BASE = { named: true, g: 'vrouw' };

  var STEPS = [
    { n: 1, s: { view: 'dash', nav: 'dashboards' }, t: 'nav:contacts',
      title: { nl: 'Open Contactpersonen', en: 'Open Contacts' },
      body: { nl: 'Een contactpersoon is een persoon die bij een account (organisatie) hoort. Klik in het menu links op Contactpersonen.', en: 'A contact is a person who belongs to an account (organisation). In the menu on the left, click Contacts.' },
      hint: { nl: 'Contactpersonen staat in het menu links onder Relaties, onder Accounts.', en: 'Contacts is in the menu on the left under Customers, below Accounts.' } },
    { n: 2, s: { view: 'list' }, t: 'keyword',
      title: { nl: 'Zoek een contactpersoon', en: 'Find a contact' },
      body: { nl: 'Dit is de weergave Alle contactpersonen, met per persoon het e-mailadres en het account. Je zoekt Nadia El Amrani: klik op Filteren op trefwoord.', en: 'This is the All Contacts view, showing each person\u2019s email address and account. You are looking for Nadia El Amrani: click Filter by keyword.' },
      hint: { nl: 'Filteren op trefwoord staat rechtsboven de lijst.', en: 'Filter by keyword is at the top right of the list.' } },
    { n: 3, s: { view: 'list', kw: 'El Amrani' }, t: 'cell:0:name',
      title: { nl: 'Open de contactpersoon', en: 'Open the contact' },
      body: { nl: 'El Amrani is ingetypt. Klik op El Amrani, Nadia.', en: 'El Amrani has been typed. Click El Amrani, Nadia.' },
      hint: { nl: 'Klik op de blauwe naam in de kolom Volledige naam.', en: 'Click the blue name in the Full Name column.' } },
    { n: 4, s: NA({}), t: 'field:functie',
      title: { nl: 'Het contactformulier', en: 'The contact form' },
      body: { nl: 'Links staan de gegevens van de contactpersoon, rechts de tijdlijn. Velden met een rood sterretje zijn verplicht. Geboortedatum heeft een blauw sterretje: dat is aanbevolen, maar je mag het leeg laten. Nadia heeft een nieuwe functie. Klik op Functie.', en: 'The contact\u2019s details are on the left, the timeline on the right. Fields with a red asterisk are required. Birthday has a blue asterisk: it is recommended, but you may leave it empty. Nadia has a new job. Click Job title.' },
      hint: { nl: 'Functie staat onder Geboortedatum.', en: 'Job title is below Birthday.' } },
    { n: 5, s: NA({ fMenu: true }), t: 'opt:L&D Manager',
      title: { nl: 'Kies de nieuwe functie', en: 'Choose the new job title' },
      body: { nl: 'Nadia is L&D Manager geworden. Kies L&D Manager.', en: 'Nadia has become L&D Manager. Choose L&D Manager.' },
      hint: { nl: 'L&D Manager staat onder L&D Co\u00f6rdinator.', en: 'L&D Manager is below L&D Co\u00f6rdinator.' } },
    { n: 6, s: NA({ functie: 'L&D Manager', unsaved: true }), t: 'field:rol',
      title: { nl: 'Klik op Rol', en: 'Click Role' },
      body: { nl: 'Nadia wil voortaan onze mailings ontvangen. Dat regel je met het veld Rol. Klik op Rol.', en: 'From now on Nadia wants to receive our mailings. You arrange that with the Role field. Click Role.' },
      hint: { nl: 'Rol staat onder Functie.', en: 'Role is below Job title.' } },
    { n: 7, s: NA({ functie: 'L&D Manager', unsaved: true, rMenu: true }), t: 'rol:Mailing beheerders',
      title: { nl: 'Vink Mailing beheerders aan', en: 'Tick Mailing administrators' },
      body: { nl: 'Wie mee moet in onze mailinglijsten, krijgt de rol Mailing beheerders. Je kunt meerdere rollen aanvinken: Nadia blijft ook Beslisser. Vink Mailing beheerders aan.', en: 'Anyone who should be on our mailing lists gets the Mailing administrators role (Mailing beheerders). You can tick more than one role: Nadia stays Decision maker (Beslisser) too. Tick Mailing beheerders.' },
      hint: { nl: 'Mailing beheerders staat onder Beslisser.', en: 'Mailing beheerders is below Beslisser.' } },
    { n: 8, s: NA(Object.assign({ unsaved: true }, NADIA_NEW)), t: 'ct:email',
      title: { nl: 'E-mail en telefoon', en: 'Email and phone' },
      body: { nl: 'Nadia heeft ook een nieuw e-mailadres en een mobiel nummer doorgegeven. Klik op E-mail; in deze instructie worden E-mail en Mobiele telefoon daarna ingevuld.', en: 'Nadia has also given you a new email address and a mobile number. Click Email; in this instruction Email and Mobile phone are then filled in.' },
      hint: { nl: 'E-mail staat in het tweede blok, onder Relatietype.', en: 'Email is in the second block, below Relationship type.' } },
    { n: 9, s: NA(Object.assign({ unsaved: true, mail: true }, NADIA_NEW)), t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Functie, Rol, E-mail en Mobiele telefoon zijn bijgewerkt. Klik op Opslaan.', en: 'Job title, Role, Email and Mobile phone have been updated. Click Save.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk.', en: 'Save is on the left of the command bar.' } },
    { n: 10, s: NA(Object.assign({ mail: true }, NADIA_NEW)), t: 'nav:accounts',
      title: { nl: 'Via het account', en: 'Through the account' },
      body: { nl: 'Je kunt een contactpersoon ook vinden via het account waar hij bij hoort. Klik in het menu op Accounts.', en: 'You can also find a contact through the account they belong to. In the menu, click Accounts.' },
      hint: { nl: 'Accounts staat in het menu links onder Relaties.', en: 'Accounts is in the menu on the left, under Customers.' } },
    { n: 11, s: { view: 'alist', nav: 'accounts' }, t: 'cell:7:name',
      title: { nl: 'Open het account', en: 'Open the account' },
      body: { nl: 'Klik op Stichting Welzijn Lindenhoven.', en: 'Click Stichting Welzijn Lindenhoven.' },
      hint: { nl: 'Het account staat in de lijst onder Kinderopvang Het Speelhuis.', en: 'The account is in the list below Kinderopvang Het Speelhuis.' } },
    { n: 12, s: ACC, t: 'tab:det',
      title: { nl: 'Tabblad Details', en: 'Details tab' },
      body: { nl: 'De contactpersonen van een account staan op het tabblad Details. Klik op Details.', en: 'An account\u2019s contacts are on the Details tab. Click Details.' },
      hint: { nl: 'Details staat rechts van Sales Cases.', en: 'Details is to the right of Sales Cases.' } },
    { n: 13, s: Object.assign({ tab: 'det' }, ACC), t: 'sub:Peters, Wim',
      title: { nl: 'Open een contactpersoon', en: 'Open a contact' },
      body: { nl: 'In de lijst Contactpersonen staan alle personen van dit account, met hun functie en rol. Klik op Peters, Wim.', en: 'The Contacts list shows everyone at this account, with their job title and role. Click Peters, Wim.' },
      hint: { nl: 'Klik op de blauwe naam in de kolom Volledige naam.', en: 'Click the blue name in the Full Name column.' } },
    { n: 14, s: { view: 'ct', p: 'wim', nav: 'accounts' }, t: 'cmd:back',
      title: { nl: 'Terug naar het account', en: 'Back to the account' },
      body: { nl: 'Zo open je een contactpersoon vanuit het account. Met de pijl linksboven in de opdrachtbalk ga je terug naar het account. Klik op de pijl.', en: 'This is how you open a contact from the account. The arrow at the top left of the command bar takes you back to the account. Click the arrow.' },
      hint: { nl: 'De pijl staat helemaal links in de opdrachtbalk.', en: 'The arrow is at the far left of the command bar.' } },
    { n: 15, s: Object.assign({ tab: 'det' }, ACC), t: 'sub:new',
      title: { nl: 'Nieuwe contactpersoon', en: 'New contact' },
      body: { nl: 'Fleur Jacobs is de nieuwe L&D Adviseur bij Stichting Welzijn Lindenhoven. Klik in de lijst Contactpersonen op Contactpersoon maken.', en: 'Fleur Jacobs is the new L&D Adviseur at Stichting Welzijn Lindenhoven. In the Contacts list, click New Contact.' },
      hint: { nl: 'Contactpersoon maken staat rechtsboven de lijst Contactpersonen.', en: 'New Contact is at the top right of the Contacts list.' } },
    { n: 16, s: FL({}), t: 'ct:first',
      title: { nl: 'Het nieuwe formulier', en: 'The new form' },
      body: { nl: 'Accountnaam is al ingevuld, omdat je vanuit het account begon. Via menu Contactpersonen en Maken kan het ook, maar dan zoek je de Accountnaam zelf op. Klik op Voornaam; Voornaam en Achternaam worden ingevuld.', en: 'Account name is already filled in, because you started from the account. You can also use the Contacts menu and New, but then you look up the Account name yourself. Click First name; First name and Last name are filled in.' },
      hint: { nl: 'Voornaam is het eerste veld.', en: 'First name is the first field.' } },
    { n: 17, s: FL({ named: true }), t: 'field:geslacht',
      title: { nl: 'Klik op Geslacht', en: 'Click Gender' },
      body: { nl: 'Geslacht is verplicht. Klik op Geslacht.', en: 'Gender is required. Click Gender.' },
      hint: { nl: 'Geslacht staat onder Achternaam.', en: 'Gender is below Last name.' } },
    { n: 18, s: FL({ named: true, gMenu: true }), t: 'g:vrouw',
      title: { nl: 'Kies Vrouw', en: 'Choose Female' },
      body: { nl: 'Kies Vrouw. Geboortedatum laat je leeg.', en: 'Choose Female. Leave Birthday empty.' },
      hint: { nl: 'Vrouw is de tweede optie.', en: 'Female is the second option.' } },
    { n: 19, s: FL(FLEUR_BASE), t: 'field:functie',
      title: { nl: 'Klik op Functie', en: 'Click Job title' },
      body: { nl: 'Klik op Functie.', en: 'Click Job title.' },
      hint: { nl: 'Functie staat onder Geboortedatum.', en: 'Job title is below Birthday.' } },
    { n: 20, s: FL(Object.assign({ fMenu: true }, FLEUR_BASE)), t: 'opt:L&D Adviseur',
      title: { nl: 'Kies L&D Adviseur', en: 'Choose L&D Adviseur' },
      body: { nl: 'Kies L&D Adviseur.', en: 'Choose L&D Adviseur.' },
      hint: { nl: 'L&D Adviseur staat onder Juridisch.', en: 'L&D Adviseur is below Juridisch.' } },
    { n: 21, s: FL(Object.assign({ functie: 'L&D Adviseur' }, FLEUR_BASE)), t: 'field:rol',
      title: { nl: 'Klik op Rol', en: 'Click Role' },
      body: { nl: 'Fleur moet ook onze mailings ontvangen. Klik op Rol.', en: 'Fleur should receive our mailings too. Click Role.' },
      hint: { nl: 'Rol staat onder Functie.', en: 'Role is below Job title.' } },
    { n: 22, s: FL(Object.assign({ functie: 'L&D Adviseur', rMenu: true }, FLEUR_BASE)), t: 'rol:Mailing beheerders',
      title: { nl: 'Vink Mailing beheerders aan', en: 'Tick Mailing beheerders' },
      body: { nl: 'Vink Mailing beheerders aan.', en: 'Tick Mailing beheerders.' },
      hint: { nl: 'Mailing beheerders is de tweede optie.', en: 'Mailing beheerders is the second option.' } },
    { n: 23, s: FL(Object.assign({ functie: 'L&D Adviseur', rol: ['Mailing beheerders'] }, FLEUR_BASE)), t: 'ct:email',
      title: { nl: 'Vul het e-mailadres in', en: 'Fill in the email address' },
      body: { nl: 'Klik op E-mail; het zakelijke e-mailadres van Fleur wordt ingevuld.', en: 'Click Email; Fleur\u2019s business email address is filled in.' },
      hint: { nl: 'E-mail staat in het tweede blok.', en: 'Email is in the second block.' } },
    { n: 24, s: FL(Object.assign({ functie: 'L&D Adviseur', rol: ['Mailing beheerders'], mail: true }, FLEUR_BASE)), t: 'cmd:saveclose',
      title: { nl: 'Opslaan en sluiten', en: 'Save & Close' },
      body: { nl: 'Alle verplichte velden zijn ingevuld. Klik op Opslaan en sluiten: Dynamics slaat Fleur op en brengt je terug naar het account.', en: 'All required fields are filled in. Click Save & Close: Dynamics saves Fleur and takes you back to the account.' },
      hint: { nl: 'Opslaan en sluiten staat naast Opslaan in de opdrachtbalk.', en: 'Save & Close is next to Save in the command bar.' } },
    { n: 25, s: Object.assign({ tab: 'det', fleur: true }, ACC), info: true, focus: 'det:contacts',
      title: { nl: 'Fleur staat bij het account', en: 'Fleur is on the account' },
      body: { nl: 'Fleur Jacobs staat nu in de lijst Contactpersonen van Stichting Welzijn Lindenhoven, met de rol Mailing beheerders.', en: 'Fleur Jacobs is now in the Contacts list of Stichting Welzijn Lindenhoven, with the Mailing beheerders role.' } }
  ];
  var TOTAL = 25;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Een contactpersoon moet onze mailings ontvangen. Welke rol geef je?', en: 'A contact should receive our mailings. Which role do you give?' },
      o: [{ nl: 'Beslisser', en: 'Beslisser (Decision maker)' }, { nl: 'Mailing beheerders', en: 'Mailing beheerders (Mailing administrators)' }, { nl: 'Cursist', en: 'Cursist (Learner)' }, { nl: 'IT Contactpersoon', en: 'IT Contactpersoon (IT contact)' }], a: 1,
      x: { nl: 'Wie mee moet in onze mailinglijsten, krijgt de rol Mailing beheerders.', en: 'Anyone who should be on our mailing lists gets the Mailing beheerders role.' } },
    { q: { nl: 'Wat is het voordeel van een contactpersoon maken vanuit het account?', en: 'What is the advantage of creating a contact from the account?' },
      o: [{ nl: 'De Accountnaam staat al ingevuld', en: 'The Account name is already filled in' }, { nl: 'Je hoeft geen Geslacht in te vullen', en: 'You do not need to fill in Gender' }, { nl: 'De contactpersoon krijgt automatisch een rol', en: 'The contact gets a role automatically' }, { nl: 'Er is geen verschil', en: 'There is no difference' }], a: 0,
      x: { nl: 'Begin je vanuit het account (Details, Contactpersoon maken), dan vult Dynamics de Accountnaam voor je in.', en: 'If you start from the account (Details, New Contact), Dynamics fills in the Account name for you.' } },
    { q: { nl: 'Welke velden zijn verplicht bij een nieuwe contactpersoon?', en: 'Which fields are required for a new contact?' },
      o: [{ nl: 'Voornaam, Achternaam en E-mail', en: 'First name, Last name and Email' }, { nl: 'Voornaam, Functie en Rol', en: 'First name, Job title and Role' }, { nl: 'Voornaam, Achternaam, Geslacht en Accountnaam', en: 'First name, Last name, Gender and Account name' }, { nl: 'Alleen Achternaam', en: 'Only Last name' }], a: 2,
      x: { nl: 'Voornaam, Achternaam, Geslacht en Accountnaam hebben een rood sterretje en zijn verplicht.', en: 'First name, Last name, Gender and Account name have a red asterisk and are required.' } },
    { q: { nl: 'Geboortedatum heeft een blauw sterretje. Wat betekent dat?', en: 'Birthday has a blue asterisk. What does that mean?' },
      o: [{ nl: 'Het veld is verplicht', en: 'The field is required' }, { nl: 'Het veld is alleen-lezen', en: 'The field is read-only' }, { nl: 'Het veld wordt automatisch gevuld', en: 'The field is filled automatically' }, { nl: 'Het veld is aanbevolen: je mag het leeg laten', en: 'The field is recommended: you may leave it empty' }], a: 3,
      x: { nl: 'Een blauw sterretje betekent aanbevolen. Je kunt opslaan zonder het in te vullen.', en: 'A blue asterisk means recommended. You can save without filling it in.' } },
    { q: { nl: 'Kan een contactpersoon meer dan \u00e9\u00e9n rol hebben?', en: 'Can a contact have more than one role?' },
      o: [{ nl: 'Nee, er past maar \u00e9\u00e9n rol in het veld', en: 'No, the field holds only one role' }, { nl: 'Ja, je vinkt meerdere rollen aan', en: 'Yes, you tick several roles' }, { nl: 'Alleen als Commercial Ops dat doet', en: 'Only if Commercial Ops does it' }, { nl: 'Alleen bij een nieuwe contactpersoon', en: 'Only for a new contact' }], a: 1,
      x: { nl: 'Rol is een keuzelijst met vinkjes. Nadia is bijvoorbeeld Beslisser \u00e9n Mailing beheerders.', en: 'Role is a list with tick boxes. Nadia, for example, is both Beslisser and Mailing beheerders.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je een contactpersoon opzoeken via de lijst en via het account, de gegevens bijwerken en een nieuwe contactpersoon maken.', parts: ['Opzoeken via de lijst', 'Gegevens bijwerken', 'Opzoeken via het account', 'Nieuwe contactpersoon vanuit het account'], steps: '25 stappen', time: 'Ongeveer 12 minuten' },
    en: { intro: 'In this topic you learn to find a contact via the list and via the account, update their details and create a new contact.', parts: ['Find via the list', 'Update details', 'Find via the account', 'New contact from the account'], steps: '25 steps', time: 'About 12 minutes' }
  };

  /* ---------- Opdrachtbalken ---------- */
  var CMD_CT = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'org', i: 'assign', l: { nl: 'Organigram openen', en: 'Open Org Chart' } },
    { k: 'deactivate', i: 'error-circle', l: { nl: 'Deactiveren', en: 'Deactivate' } }, { k: 'connect', i: 'contact', l: { nl: 'Verbinding maken', en: 'Connect' }, chev: true },
    { k: 'mlist', i: 'report', l: { nl: 'Toevoegen aan marketinglijst', en: 'Add to Marketing List' } }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } },
    { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }
  ];
  var CMD_CT_NEW = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'flow', i: 'flow', l: { nl: 'Stroom', en: 'Flow' }, chev: true }
  ];
  var CMD_ACC = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'org', i: 'assign', l: { nl: 'Organigram openen', en: 'Open Org Chart' } },
    { k: 'deactivate', i: 'error-circle', l: { nl: 'Deactiveren', en: 'Deactivate' } }, { k: 'connect', i: 'contact', l: { nl: 'Verbinding maken', en: 'Connect' }, chev: true },
    { k: 'mlist', i: 'report', l: { nl: 'Toevoegen aan marketinglijst', en: 'Add to Marketing List' } }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } },
    { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }, { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }
  ];

  /* ---------- Velden ---------- */
  /* f(label, value, o): o = { req, rec, t, target, icon, link, focus, menu, focusKey, lock } */
  function f(label, value, o) {
    o = o || {};
    var val = h('span', { className: 'fld__v' + (value ? '' : ' is-empty') + (o.focus ? ' is-focus' : '') + (o.cls ? ' ' + o.cls : '') },
      value ? (o.link ? h('a', null, value) : value) : (o.ph || '---'), o.icon ? h(D.Icon, { name: o.icon, size: 16 }) : null);
    return h('div', { className: 'fld acf', key: label, 'data-focus': o.focusKey },
      h('span', { className: 'fld__l' }, label, o.req ? h('i', null, '*') : o.rec ? h('i', { className: 'is-rec' }, '*') : null),
      h('div', { className: 'acf__v' }, o.target ? P(o.t === o.target, val, true) : val, o.menu || null));
  }
  function ddMenu(opts, sel, t, pre, lang) {
    return h('div', { className: 'dd acdd' },
      opts.map(function (o) {
        var key = Array.isArray(o) ? o[0] : o, label = Array.isArray(o) ? L(o[1], lang) : o, on = key === sel || (!sel && key === '--Selecteren--');
        return P(t === pre + key, h('span', { key: key, className: 'dd__o' + (on ? ' is-sel' : '') }, on ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), label), true);
      }),
      opts.length > 6 ? h('span', { className: 'acdd__bar', 'aria-hidden': true }) : null);
  }
  function rolMenu(sel, t, lang) {
    var isEn = lang === 'en';
    return h('div', { className: 'dd acdd ctrol' },
      h('span', { className: 'ctrol__all' }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 }), isEn ? 'Select all' : 'Alles selecteren'), h('small', null, '5 items')),
      ROLLEN.map(function (r) {
        var on = sel.indexOf(r) >= 0;
        return P(t === 'rol:' + r, h('span', { key: r, className: 'dd__o ctrol__o' }, h(D.Icon, { name: on ? 'checkbox-checked-filled' : 'checkbox', size: 16, color: on ? 'var(--brand)' : undefined }), r), true);
      }));
  }
  function rolVal(rol) {
    return rol.length ? h('span', { className: 'ctchips' }, rol.map(function (r) { return h('span', { key: r, className: 'ctchip' }, r); })) : null;
  }

  /* Lijst met contactpersonen (of accounts) */
  function List(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t, kw = p.s.kw, acc = p.s.view === 'alist';
    var cols = acc ? [
      { key: 'name', label: { nl: 'Accountnaam', en: 'Account Name' }, width: 320, link: true, sort: 'asc' }, { key: 'entity', label: { nl: 'Entiteit', en: 'Entity' }, width: 220 },
      { key: 'rel', label: { nl: 'Relatietype', en: 'Relationship type' }, width: 200 }, { key: 'status', label: { nl: 'Status samen...', en: 'Collaboration...' }, width: 160 },
      { key: 'tel', label: { nl: 'Telefoonnummer 1', en: 'Phone 1' }, width: 200 }, { key: 'city', label: { nl: 'Adres 2: plaats', en: 'Address 2: City' } }]
      : [{ key: 'name', label: { nl: 'Volledige naam', en: 'Full Name' }, width: 330, link: true }, { key: 'email', label: { nl: 'E-mail', en: 'Email' }, width: 380, link: true },
        { key: 'acc', label: { nl: 'Accountnaam', en: 'Account Name' }, width: 340, link: true }, { key: 'tel', label: { nl: 'Telefoon (werk)', en: 'Business Phone' }, width: 230 }, { key: 'status', label: 'Status' }];
    var rows = acc ? ACCOUNTS.map(function (r) { return { name: r[0], entity: r[1], rel: r[2], status: r[3] && isEn ? 'Active' : r[3], tel: r[4], city: r[5] }; })
      : CONTACTS.filter(function (r) { return !kw || r[0].indexOf(kw) >= 0; }).map(function (r) { return { name: r[0], email: r[1], acc: r[2], tel: r[3], status: isEn ? 'Active' : 'Actief' }; });
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', newLabel: 'create', lang: lang }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: acc ? { nl: 'Actieve accounts', en: 'Active Accounts' } : { nl: 'Alle contactpersonen', en: 'All Contacts' }, highlight: t === 'keyword' ? 'keyword' : null, keyword: kw || '' }),
        h(D.DataGrid, { lang: lang, columns: cols, rows: rows, highlight: t, total: kw ? rows.length : acc ? 412 : 5000 })));
  }

  /* ---------- Contactformulier (bestaand en nieuw) ---------- */
  function Contact(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, d = PERSON[s.p], isNew = !!s.isNew;
    var first = !isNew || s.named ? d.first : '', last = !isNew || s.named ? d.last : '';
    var functie = s.functie || d.functie, rol = s.rol || d.rol, g = s.g || d.g;
    var email = s.p === 'nadia' && s.mail ? 'nadia.elamrani@welzijnlindenhoven.example' : s.p === 'fleur' ? (s.mail ? 'f.jacobs@welzijnlindenhoven.example' : '') : d.email;
    var mob = s.p === 'nadia' && s.mail ? '06 5555 0182' : d.mob;
    var title = isNew ? (isEn ? 'New Contact' : 'Nieuw: Contactpersoon') : d.full;
    var stateTxt = isNew ? '' : s.unsaved ? (isEn ? ' - Unsaved' : ' - Niet opgeslagen') : (isEn ? ' - Saved' : ' - Opgeslagen');
    var gLabel = g ? L(GESLACHT.filter(function (x) { return x[0] === g; })[0][1], lang) : '';
    var fWin = FUNCTIES.slice(12, 25);
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: isNew ? CMD_CT_NEW : CMD_CT }),
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id' }, h('span', { className: 'rec__av rec__av--ct' }, isNew ? h(D.Icon, { name: 'contact', size: 20 }) : d.initials),
            h('div', null, h('div', { className: 'rec__name' }, title, h('small', null, stateTxt)), isNew ? null : h('div', { className: 'rec__type' }, isEn ? 'Contact' : 'Contactpersoon'))),
          h('div', { className: 'rec__hf' },
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, isEn ? 'No' : 'Nee'), h('div', { className: 'rec__fl' }, isEn ? 'Migration' : 'Migratie')),
            h('div', { className: 'rec__f acc__owner' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('div', null, h('div', { className: 'rec__fv' }, h('a', null, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, isEn ? 'Owner' : 'Eigenaar'))),
            h('span', { className: 'rec__chev' }, h(D.Icon, { name: 'chevron-down' })))),
        h('div', { className: 'rec__tabs' },
          h('span', { className: 'rec__tab is-on' }, isEn ? 'Summary' : 'Samenvatting'), h('span', { className: 'rec__tab' }, 'Details'),
          isNew ? null : h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      h('div', { className: 'acc__body' },
        h('div', { className: 'rec__col' },
          h('div', { className: 'sec acsec ctsec' },
            f(isEn ? 'First name' : 'Voornaam', first, { req: true, t: t, target: 'ct:first' }),
            f(isEn ? 'Middle name' : 'Tussenvoegsel', ''),
            f(isEn ? 'Last name' : 'Achternaam', last, { req: true }),
            f(isEn ? 'Gender' : 'Geslacht', gLabel, { req: true, t: t, target: 'field:geslacht', icon: 'chevron-down', focus: s.gMenu, menu: s.gMenu ? ddMenu(GESLACHT, g, t, 'g:', lang) : null }),
            f(isEn ? 'Birthday' : 'Geboortedatum', '', { rec: true, icon: 'appointment', ph: 'd/M/yyyy' }),
            f(isEn ? 'Job title' : 'Functie', s.fMenu ? (functie || '--Selecteren--') : functie, { t: t, target: 'field:functie', icon: 'chevron-down', focus: s.fMenu, menu: s.fMenu ? ddMenu(fWin, functie, t, 'opt:', lang) : null }),
            h('div', { className: 'fld acf', key: 'rol' }, h('span', { className: 'fld__l' }, isEn ? 'Role' : 'Rol'),
              h('div', { className: 'acf__v' },
                P(t === 'field:rol', s.rMenu ? h('span', { className: 'fld__v ctrol__in is-focus' }, isEn ? 'Select or search options' : 'Opties selecteren of zoeken', h(D.Icon, { name: 'chevron-up', size: 16 }))
                  : h('span', { className: 'fld__v ctrol__val' + (rol.length ? '' : ' is-empty') }, rolVal(rol) || '---'), true),
                s.rMenu ? rolMenu(rol, t, lang) : null)),
            f(isEn ? 'Account name' : 'Accountnaam', ORG, { req: true, link: true, icon: 'search' }),
            f(isEn ? 'Relationship type' : 'Relatietype', '', { icon: 'chevron-down' })),
          h('div', { className: 'sec acsec ctsec' },
            f(isEn ? 'Email' : 'E-mail', email, { t: t, target: 'ct:email', icon: email ? 'email' : null }),
            f(isEn ? 'Mobile phone' : 'Mobiele telefoon', mob),
            f(isEn ? 'Home phone' : 'Telefoon (thuis)', ''),
            f(isEn ? 'Preferred method of contact' : 'Contactwijze', isEn ? 'Any' : 'Willekeurig', { icon: 'chevron-down' }))),
        h('div', { className: 'rec__col' },
          h('div', { className: 'tl' },
            h('div', { className: 'sec__t' }, isEn ? 'Timeline' : 'Tijdlijn'),
            h('div', { className: 'tl__h' }, isEn ? 'Timeline' : 'Tijdlijn', isNew ? null : h('span', { className: 'tl__icons' }, h(D.Icon, { name: 'add', size: 16 }), h(D.Icon, { name: 'filter', size: 16 }), h(D.Icon, { name: 'refresh', size: 16 }), h(D.Icon, { name: 'more', size: 16 }))),
            isNew ? h('div', { className: 'tl__almost' }, h('b', null, isEn ? 'Almost there' : 'Bijna klaar'), h('span', null, isEn ? 'Select Save to see your timeline.' : 'Selecteer Opslaan om uw tijdlijn weer te geven.'))
              : h(React.Fragment, null,
                h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
                h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'),
                h('div', { className: 'tl__item' }, h('b', null, (isEn ? 'Auto-post on Contact ' : 'Automatisch plaatsen op Contactpersoon ') + d.full + ': '), d.created, h('br'), (isEn ? 'Contact created by Jansen, Eva' : 'Contactpersoon gemaakt door Jansen, Eva')))))));
  }

  /* ---------- Account Stichting Welzijn Lindenhoven (alleen wat dit onderwerp nodig heeft) ---------- */
  var ACC_TABS = [['sam', { nl: 'Samenvatting', en: 'Summary' }], ['sub', { nl: 'Onderliggende Accounts', en: 'Child Accounts' }], ['adr', { nl: 'Adressen', en: 'Addresses' }], ['best', { nl: 'Bestanden', en: 'Files' }],
    ['sc', { nl: 'Sales Cases', en: 'Sales Cases' }], ['det', { nl: 'Details', en: 'Details' }], ['con', { nl: 'Contract | Afspraken', en: 'Contract | Agreements' }]];
  function Account(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, tab = s.tab || 'sam';
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: CMD_ACC }),
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id' }, h('span', { className: 'rec__av rec__av--acc' }, 'SW'),
            h('div', null, h('div', { className: 'rec__name' }, ORG, h('small', null, isEn ? ' - Saved' : ' - Opgeslagen')), h('div', { className: 'rec__type' }, 'Account \u00b7 ', h('b', { className: 'acc__form' }, 'SKT - Account', h(D.Icon, { name: 'chevron-down', size: 12 }))))),
          h('div', { className: 'rec__hf' },
            h('div', { className: 'rec__f acc__owner' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('div', null, h('div', { className: 'rec__fv' }, h('a', null, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, 'AM NOA/ST'))),
            hf('SkillsTown', isEn ? 'Account origin' : 'Oorsprong account'), hf('---', 'AM Salta', true),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' }, h('a', null, 'Visser, Lotte')), h('div', { className: 'rec__fl' }, 'Learning Professional')),
            h('span', { className: 'rec__chev' }, h(D.Icon, { name: 'chevron-down' })))),
        h('div', { className: 'rec__tabs' },
          ACC_TABS.map(function (x) { return P(t === 'tab:' + x[0], h('span', { key: x[0], className: 'rec__tab' + (x[0] === tab ? ' is-on' : '') }, L(x[1], lang))); }),
          h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      tab === 'det' ? h(AccDetails, { lang: lang, t: t, fleur: s.fleur }) : h(AccSummary, { lang: lang }));
    function hf(v, l, empty) { return h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' + (empty ? ' is-empty' : '') }, v), h('div', { className: 'rec__fl' }, l)); }
  }
  function AccSummary(p) {
    var lang = p.lang, isEn = lang === 'en';
    return h('div', { className: 'acc__body' },
      h('div', { className: 'rec__col' },
        h('div', { className: 'sec acsec' }, h('div', { className: 'sec__t' }, isEn ? 'Account details' : 'Accountgegevens'),
          f(isEn ? 'Entity' : 'Entiteit', 'SkillsTown Direct', { icon: 'chevron-down' }), f(isEn ? 'Account name' : 'Accountnaam', ORG, { req: true }),
          f(isEn ? 'Relationship type' : 'Relatietype', 'Klant', { req: true, icon: 'chevron-down' }), f('Dealer', '', { icon: 'chevron-down' }),
          f(isEn ? 'Phone' : 'Telefoon', '085 555 2200', { req: true, icon: 'phone' }), f('Website', 'https://www.welzijnlindenhoven.example', { req: true, icon: 'globe' }),
          f(isEn ? 'Parent account' : 'Moederaccount', '', { icon: 'search' }), f(isEn ? 'Competitor' : 'Concurrent', '', { icon: 'search' }),
          f(isEn ? 'Collaboration status' : 'Status samenwerking', isEn ? 'Active' : 'Actief', { icon: 'chevron-down' }), f(isEn ? 'Open revenue' : 'Open omzet', '******'))),
      h('div', { className: 'rec__col' },
        h('div', { className: 'bz' }, h('div', { className: 'bz__t' }, isEn ? 'Particulars' : 'Bijzonderheden'),
          h('div', { className: 'bz__txt' }, isEn ? 'The neighbourhood teams, youth work and informal-care support fall under this account.' : 'De wijkteams, het jongerenwerk en de mantelzorgondersteuning vallen hieronder.')),
        h('div', { className: 'tl' }, h('div', { className: 'tl__h' }, 'Timeline'),
          h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
          h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'))));
  }
  function AccDetails(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t;
    var rows = [['Brouwer, Sem', 'L&D Adviseur', 'Mailing beheerders', '', 's.brouwer@welzijnlindenhoven.example'],
      ['El Amrani, Nadia', 'L&D Manager', 'Beslisser, Mailing beheerders', '06 5555 0182', 'nadia.elamrani@welzijnlindenhoven.example']];
    if (p.fleur) rows.push(['Jacobs, Fleur', 'L&D Adviseur', 'Mailing beheerders', '', 'f.jacobs@welzijnlindenhoven.example']);
    rows.push(['Peters, Wim', 'Algemeen management', 'Mailing beheerders', '06 5555 0347', 'w.peters@welzijnlindenhoven.example']);
    var tpl = '36px 300px 260px 300px 200px 1fr';
    return h('div', { className: 'acc__tab' },
      h('div', { className: 'sec acsec' }, h('div', { className: 'sec__h2' }, 'SLA'),
        h('div', { className: 'acc__adr2' },
          h('div', null, f(isEn ? 'Data processing agreement' : 'Verwerkersovereenkomst', isEn ? 'Yes' : 'Ja', { icon: 'chevron-down' }), f(isEn ? 'Renewal' : 'Verlenging', isEn ? 'Tacit' : 'Stilzwijgend', { icon: 'chevron-down' })),
          h('div', null, f(isEn ? 'SLA response time' : 'SLA Responsetijd', 'Standaard SkillsTown SLA', { icon: 'chevron-down' }), f(isEn ? 'Report data leaks within x time' : 'Data lekken melden binnen x tijd', 'Standaard SkillsTown SLA', { icon: 'chevron-down' })))),
      h('div', { className: 'asub', 'data-focus': 'det:contacts' },
        h('div', { className: 'asub__h' }, h('b', null, isEn ? 'Contacts' : 'Contactpersonen'),
          h('span', { className: 'asub__acts' },
            P(t === 'sub:new', h('span', null, h(D.Icon, { name: 'add', size: 16 }), isEn ? 'New Contact' : 'Contactpersoon maken')),
            h('span', null, h(D.Icon, { name: 'refresh', size: 16 }), isEn ? 'Refresh' : 'Vernieuwen'), h(D.Icon, { name: 'more', size: 16 }))),
        h('div', { className: 'asub__row is-head', style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })),
          [isEn ? 'Full Name \u2191' : 'Volledige naam \u2191', isEn ? 'Job title' : 'Functie', isEn ? 'Role' : 'Rol', isEn ? 'Mobile phone' : 'Mobiele telefoon', isEn ? 'Email' : 'E-mail'].map(function (c, i) { return h('span', { key: i }, c, h(D.Icon, { name: 'chevron-down', size: 12 })); })),
        rows.map(function (r) {
          return h('div', { key: r[0], className: 'asub__row' + (p.fleur && r[0] === 'Jacobs, Fleur' ? ' is-new' : ''), style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })),
            h('span', null, P(t === 'sub:' + r[0], h('a', null, r[0]))), h('span', null, r[1]), h('span', null, r[2]), h('span', null, r[3] ? h('a', null, r[3]) : ''), h('span', null, h('a', null, r[4])));
        }),
        h('div', { className: 'asub__foot' }, (isEn ? 'Rows: ' : 'Rijen: ') + rows.length)));
  }

  /* Het volledige nagebouwde scherm voor een stap */
  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.view === 'dash' ? h(DI.Dash, { lang: lang, t: t }) : s.view === 'list' || s.view === 'alist' ? h(List, { lang: lang, s: s, t: t })
      : s.view === 'acc' ? h(Account, { lang: lang, s: s, t: t }) : h(Contact, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'contacts' }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'netwerker', Screen: Screen };
})();
