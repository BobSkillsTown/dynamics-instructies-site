/* Dynamics-instructies \u2014 onderwerp 3: Accounts. Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, P = DI.P, CmdBar = DI.CmdBar;

  /* ---------- Verzonnen gegevens ---------- */
  var TOPIC = { nl: 'Accounts', en: 'Accounts' };
  var REL_OPTIONS = ['Alliance Partner', 'Cold Prospect', 'Concurrent', 'Hot Prospect', 'Klant', 'Klant bij NCOI Label', 'Klant bij concurrent', 'Klant Studio', 'Klant via Reseller', 'Label',
    'Leverancier', 'Marketing relatie', 'Migratie', 'Oud Reseller', 'Oud klant', 'Partner', 'Portal', 'Prospect', 'Referral Partner', 'Reseller', 'Reseller Prospect', 'Suspect', 'STAP Klant', 'STAP Prospect'];
  var BRANCHE_OPTIONS = ['Agrosector', 'Automotive', 'Beroeps-/brancheverenging', 'Bouw/installatie/infrastructuur', 'Detailhandel/retail', 'Financi\u00eble dienstverlening', 'Food', 'Gas/Olie/Energie',
    'Groothandel', 'Horeca/catering', 'Sport/recreatie/cultuur', 'ICT/media/communicatie', 'Industrie', 'Kinderopvang', 'Onderwijs', 'Onderwijs - Primair'];
  var LIST = [
    ['Aalberts Kinderopvang', 'SkillsTown Direct', 'Klant', 'Actief', 'Ja', '0251 555 120', 'Castricum'],
    ['Bakkerij De Korenaar', 'SkillsTown Direct', 'Prospect', '', '', '030 555 0142', 'Utrecht'],
    ['Breedveld Logistiek', 'SkillsTown Direct', 'Cold Prospect', '', '', '0345 555 210', 'Culemborg'],
    ['Breedveld Makelaars', 'SkillsTown Connect', 'Prospect', '', '', '0344 555 388', 'Tiel'],
    ['Co\u00f6peratie Zuiderzorg', 'SkillsTown (OA)', 'Klant', 'Actief', 'Ja', '0418 555 900', 'Zaltbommel'],
    ['De Groene Schakel', 'SkillsTown Connect', 'Partner', '', '', '026 555 4410', 'Arnhem'],
    ['Gemeente Lindenhoven', 'SkillsTown Direct', 'Prospect', '', '', '14 0555', 'Lindenhoven'],
    ['Hoveniersbedrijf Ter Meer', 'SkillsTown Direct', 'Cold Prospect', '', '', '0546 555 071', 'Almelo'],
    ['Jeugdzorg Rivierenland', 'SkillsTown Connect', 'Klant via Reseller', 'Actief', '', '0488 555 300', 'Elst'],
    ['Kinderopvang Het Speelhuis', 'SkillsTown Direct', 'Klant', 'Actief', 'Ja', '073 555 6120', 'Vught'],
    ['Stichting Welzijn Lindenhoven', 'SkillsTown Direct', 'Klant', 'Actief', 'Ja', '085 555 2200', 'Lindenhoven'],
    ['Van Dijk Installatietechniek B.V.', 'SkillsTown Direct', 'Prospect', '', '', '0413 555 017', 'Veghel'],
    ['Zorggroep Lindenhoven', 'SkillsTown (OA)', 'Klant', 'Actief', 'Ja', '085 555 7300', 'Lindenhoven']
  ];
  var ACC = {
    bv: { name: 'Breedveld Logistiek', initials: 'BL', entity: 'SkillsTown Direct', rel: 'Cold Prospect', tel: '0345 555 210', web: 'https://www.breedveld-logistiek.example', status: '',
      when: '12-10-2026 10:21', tl: [{ i: 'phone', b: { nl: 'Telefoongesprek van: Jansen, Eva', en: 'Phone call from: Jansen, Eva' }, x: { nl: 'Kennismaking Breedveld Logistiek', en: 'Introduction Breedveld Logistiek' }, d: '29-10-2026 15:40' }],
      bz: { nl: '30-10-2026 - Eerste gesprek met Joost Kramer (HR). Interesse in e-learning voor 120 chauffeurs; demo volgt in november.', en: '30-10-2026 - First call with Joost Kramer (HR). Interested in e-learning for 120 drivers; demo to follow in November.' } },
    lind: { name: 'Stichting Welzijn Lindenhoven', initials: 'SW', entity: 'SkillsTown Direct', rel: 'Klant', tel: '085 555 2200', web: 'https://www.welzijnlindenhoven.example', status: 'Actief', lp: 'Visser, Lotte',
      bz: { nl: 'De wijkteams, het jongerenwerk en de mantelzorgondersteuning vallen hieronder.', en: 'The neighbourhood teams, youth work and informal-care support fall under this account.' },
      tl: [{ i: 'email', b: { nl: 'E-mail van: Jansen, Eva', en: 'Email from: Jansen, Eva' }, x: { nl: 'Planning kwartaaloverleg', en: 'Planning quarterly meeting' }, d: '27-10-2026 09:12' }] }
  };
  var CHILDREN = [
    ['Welzijn Lindenhoven - Jongerenwerk', 'SkillsTown Direct', 'Klant', 'Actief', '085 555 2210', 'Lindenhoven'],
    ['Welzijn Lindenhoven - Mantelzorg', 'SkillsTown Direct', 'Klant', 'Actief', '085 555 2230', 'Lindenhoven'],
    ['Welzijn Lindenhoven - Wijkteams', 'SkillsTown Direct', 'Klant', 'Actief', '085 555 2220', 'Oosterbeek']
  ];

  /* ---------- Stappen ----------
     s = schermtoestand, t = doel (klikken = verder), info = leesstap met knop. n = stapnummer (1\u201330). */
  var BV = { view: 'acc', acc: 'bv' };
  function S(o) { return Object.assign({}, BV, o); }
  var BV_DONE = { rel: 'Prospect', bz: true, adr: true, lp: 'Mulder, Daan' };
  var NEW = { view: 'new' };
  function N(o) { return Object.assign({}, NEW, o); }
  var NEW_FULL = { naam: true, rel: 'Cold Prospect', tel: true, scrolled: true, branche: 'Industrie', werk: true };
  var LIND = { view: 'acc', acc: 'lind' };

  var STEPS = [
    { n: 1, s: { view: 'dash', nav: 'dashboards' }, t: 'nav:accounts',
      title: { nl: 'Open Accounts', en: 'Open Accounts' },
      body: { nl: 'Een account is een organisatie: een klant, prospect of partner. Klik in het menu links op Accounts.', en: 'An account is an organisation: a customer, prospect or partner. In the menu on the left, click Accounts.' },
      hint: { nl: 'Accounts staat in het menu links onder het kopje Relaties.', en: 'Accounts is in the menu on the left, under the Customers heading.' } },
    { n: 2, s: { view: 'list' }, t: 'keyword',
      title: { nl: 'Zoek een account in de lijst', en: 'Find an account in the list' },
      body: { nl: 'Dit is de weergave Actieve accounts. Elke rij is een organisatie, met onder meer de Entiteit, het Relatietype en de Status samenwerking. Je zoekt Breedveld Logistiek: klik op Filteren op trefwoord.', en: 'This is the Active Accounts view. Each row is an organisation, showing among other things the Entity, the Relationship type and the Collaboration status. You are looking for Breedveld Logistiek: click Filter by keyword.' },
      hint: { nl: 'Filteren op trefwoord staat rechtsboven de lijst.', en: 'Filter by keyword is at the top right of the list.' } },
    { n: 3, s: { view: 'list', kw: 'Breedveld' }, t: 'cell:0:name',
      title: { nl: 'Open het account', en: 'Open the account' },
      body: { nl: 'Breedveld is ingetypt. De lijst toont nu alleen de accounts met dat woord in de naam. Klik op Breedveld Logistiek.', en: 'Breedveld has been typed. The list now only shows accounts with that word in the name. Click Breedveld Logistiek.' },
      hint: { nl: 'Klik op de blauwe naam in de kolom Accountnaam.', en: 'Click the blue name in the Account Name column.' } },
    { n: 4, s: S({}), t: 'field:rel',
      title: { nl: 'Het accountformulier', en: 'The account form' },
      body: { nl: 'Bovenin staat de kop met onder meer de accountmanager en de Learning Professional, daaronder de tabbladen. Op Samenvatting staan links de Accountgegevens en rechts Bijzonderheden en de tijdlijn. Je hebt voor het eerst echt contact gehad met Breedveld. Klik op Relatietype.', en: 'At the top is the header with, among others, the account manager and the Learning Professional, with the tabs below it. On Summary you see the Account details on the left and Particulars and the timeline on the right. You have had real contact with Breedveld for the first time. Click Relationship type.' },
      hint: { nl: 'Relatietype staat links in Accountgegevens, onder Accountnaam.', en: 'Relationship type is on the left in Account details, below Account name.' } },
    { n: 5, s: S({ relMenu: true }), t: 'opt:Prospect',
      title: { nl: 'Kies Prospect', en: 'Choose Prospect' },
      body: { nl: 'Na het eerste echte contact wordt een Cold Prospect een Prospect. Kies Prospect.', en: 'After the first real contact, a Cold Prospect becomes a Prospect. Choose Prospect.' },
      hint: { nl: 'Prospect staat in de lijst onder Portal.', en: 'Prospect is in the list below Portal.' } },
    { n: 6, s: S({ rel: 'Prospect', unsaved: true }), info: true, focus: 'fld:status',
      title: { nl: 'Status samenwerking', en: 'Collaboration status' },
      body: { nl: 'Status samenwerking (Actief of Opgezegd) past Commercial Ops aan, niet jij. Dit veld laat je dus staan.', en: 'Collaboration status (Active or Cancelled) is changed by Commercial Ops, not by you. So you leave this field as it is.' } },
    { n: 7, s: S({ rel: 'Prospect', unsaved: true }), t: 'bz',
      title: { nl: 'Leg vast wat je hebt besproken', en: 'Record what you discussed' },
      body: { nl: 'In Bijzonderheden schrijf je wat belangrijk is voor dit account. Dat is vrije tekst: er zijn geen vaste regels. Klik in het tekstvak; je notitie wordt ingetypt.', en: 'In Particulars you write what matters for this account. It is free text: there are no fixed rules. Click in the text box; your note is typed in.' },
      hint: { nl: 'Bijzonderheden staat rechts, boven de tijdlijn.', en: 'Particulars is on the right, above the timeline.' } },
    { n: 8, s: S({ rel: 'Prospect', bz: true, unsaved: true }), t: 'tab:adr',
      title: { nl: 'Naar de adressen', en: 'Go to the addresses' },
      body: { nl: 'Je notitie staat erin. Klik nu op het tabblad Adressen.', en: 'Your note is in. Now click the Addresses tab.' },
      hint: { nl: 'Adressen staat in de rij tabbladen, rechts van Onderliggende Accounts.', en: 'Addresses is in the row of tabs, to the right of Child Accounts.' } },
    { n: 9, s: S({ rel: 'Prospect', bz: true, unsaved: true, tab: 'adr' }), t: 'adr:straat',
      title: { nl: 'Vul de adressen in', en: 'Fill in the addresses' },
      body: { nl: 'Links staat het bezoekadres, rechts het factuuradres met het e-mailadres voor facturen. Klik op Straat + Hnr. bij Bezoekadres. In deze instructie worden beide adressen daarna voor je ingevuld.', en: 'The visiting address is on the left, the invoice address with the email address for invoices on the right. Click Street + No. under Visiting address. In this instruction both addresses are then filled in for you.' },
      hint: { nl: 'Straat + Hnr. is het eerste veld van Bezoekadres.', en: 'Street + No. is the first field of Visiting address.' } },
    { n: 10, s: S({ rel: 'Prospect', bz: true, adr: true, unsaved: true, tab: 'adr' }), t: 'hdr:chev',
      title: { nl: 'Open de kop', en: 'Expand the header' },
      body: { nl: 'De adressen zijn ingevuld. Nu koppel je een Learning Professional aan het account. Dat doe je in de kop: klap hem open met het pijltje rechtsboven.', en: 'The addresses are filled in. Now you link a Learning Professional to the account. You do that in the header: expand it with the arrow at the top right.' },
      hint: { nl: 'Het pijltje staat helemaal rechts, naast Learning Professional.', en: 'The arrow is at the far right, next to Learning Professional.' } },
    { n: 11, s: S({ rel: 'Prospect', bz: true, adr: true, unsaved: true, tab: 'adr', fly: true }), t: 'fly:lp',
      title: { nl: 'Klik op Learning Professional', en: 'Click Learning Professional' },
      body: { nl: 'In de kop staan AM NOA/ST (de accountmanager en eigenaar van het account), Actief contract, Oorsprong account, AM Salta en Learning Professional. Klik op het veld Learning Professional.', en: 'The header holds AM NOA/ST (the account manager and owner of the account), Active contract, Account origin, AM Salta and Learning Professional. Click the Learning Professional field.' },
      hint: { nl: 'Learning Professional is het onderste veld.', en: 'Learning Professional is the bottom field.' } },
    { n: 12, s: S({ rel: 'Prospect', bz: true, adr: true, unsaved: true, tab: 'adr', fly: true, lpMenu: true }), t: 'lp:Mulder, Daan',
      title: { nl: 'Kies de Learning Professional', en: 'Choose the Learning Professional' },
      body: { nl: 'Kies Mulder, Daan. AM NOA/ST wijzig je op dezelfde manier, bijvoorbeeld als je een account aan een collega overdraagt.', en: 'Choose Mulder, Daan. You change AM NOA/ST the same way, for example when you hand an account over to a colleague.' },
      hint: { nl: 'Mulder, Daan staat bovenaan de lijst.', en: 'Mulder, Daan is at the top of the list.' } },
    { n: 13, s: S(Object.assign({ unsaved: true, tab: 'adr' }, BV_DONE)), t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Je hebt het Relatietype, Bijzonderheden, de adressen en de Learning Professional aangepast. Klik op Opslaan.', en: 'You changed the Relationship type, Particulars, the addresses and the Learning Professional. Click Save.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk.', en: 'Save is on the left of the command bar.' } },
    { n: 14, s: S(Object.assign({ tab: 'adr' }, BV_DONE)), t: 'nav:accounts',
      title: { nl: 'Een nieuw account maken', en: 'Create a new account' },
      body: { nl: 'Breedveld Logistiek is opgeslagen. Nu maak je een nieuw account aan voor Westvliet Groep. Klik in het menu op Accounts.', en: 'Breedveld Logistiek has been saved. Now you create a new account for Westvliet Groep. In the menu, click Accounts.' },
      hint: { nl: 'Accounts staat in het menu links onder Relaties.', en: 'Accounts is in the menu on the left, under Customers.' } },
    { n: 15, s: { view: 'list' }, t: 'cmd:new',
      title: { nl: 'Klik op Maken', en: 'Click New' },
      body: { nl: 'Klik in de opdrachtbalk boven de lijst op Maken.', en: 'In the command bar above the list, click New.' },
      hint: { nl: 'Maken staat in de opdrachtbalk, met het plusteken.', en: 'New is in the command bar, with the plus sign.' } },
    { n: 16, s: N({}), t: 'new:naam',
      title: { nl: 'Het nieuwe formulier', en: 'The new form' },
      body: { nl: 'Velden met een rood sterretje zijn verplicht. In de opdrachtbalk staan ook Zoek in Handelsregister en Bepaal BTW nummer: die hoef je niet te gebruiken. De Entiteit laat je staan zoals hij is. Klik op Accountnaam; de naam wordt ingetypt.', en: 'Fields with a red asterisk are required. The command bar also has Search Trade Register and Determine VAT number: you do not need to use them. Leave the Entity as it is. Click Account name; the name is typed in.' },
      hint: { nl: 'Accountnaam staat onder Entiteit.', en: 'Account name is below Entity.' } },
    { n: 17, s: N({ naam: true }), t: 'field:rel',
      title: { nl: 'Kies het Relatietype', en: 'Choose the Relationship type' },
      body: { nl: 'Westvliet Groep is ingevuld. Je hebt nog geen echt contact gehad, dus het wordt een Cold Prospect. Klik op Relatietype.', en: 'Westvliet Groep has been filled in. You have not had real contact yet, so it becomes a Cold Prospect. Click Relationship type.' },
      hint: { nl: 'Relatietype staat onder Accountnaam.', en: 'Relationship type is below Account name.' } },
    { n: 18, s: N({ naam: true, relMenu: true }), t: 'opt:Cold Prospect',
      title: { nl: 'Kies Cold Prospect', en: 'Choose Cold Prospect' },
      body: { nl: 'Kies Cold Prospect.', en: 'Choose Cold Prospect.' },
      hint: { nl: 'Cold Prospect staat bovenaan, onder Alliance Partner.', en: 'Cold Prospect is near the top, below Alliance Partner.' } },
    { n: 19, s: N({ naam: true, rel: 'Cold Prospect' }), t: 'new:tel',
      title: { nl: 'Telefoon en website', en: 'Phone and website' },
      body: { nl: 'Telefoon en Website zijn ook verplicht. Klik op Telefoon; in deze instructie worden Telefoon en Website daarna ingevuld.', en: 'Phone and Website are required too. Click Phone; in this instruction Phone and Website are then filled in.' },
      hint: { nl: 'Telefoon staat onder Dealer.', en: 'Phone is below Dealer.' } },
    { n: 20, s: N({ naam: true, rel: 'Cold Prospect', tel: true, scrolled: true }), t: 'new:branche',
      title: { nl: 'Verder naar Details', en: 'On to Details' },
      body: { nl: 'Telefoon en Website zijn ingevuld. Verder naar beneden staat het blok Details, met nog twee verplichte velden. Klik op Branche.', en: 'Phone and Website are filled in. Further down is the Details block, with two more required fields. Click Industry.' },
      hint: { nl: 'Branche is het eerste veld van Details.', en: 'Industry is the first field of Details.' } },
    { n: 21, s: N({ naam: true, rel: 'Cold Prospect', tel: true, scrolled: true, brMenu: true }), t: 'br:Industrie',
      title: { nl: 'Kies de branche', en: 'Choose the industry' },
      body: { nl: 'Westvliet Groep is een productiebedrijf. Kies Industrie.', en: 'Westvliet Groep is a manufacturer. Choose Industrie (Industry).' },
      hint: { nl: 'Industrie staat in de lijst onder ICT/media/communicatie.', en: 'Industrie is in the list below ICT/media/communicatie.' } },
    { n: 22, s: N({ naam: true, rel: 'Cold Prospect', tel: true, scrolled: true, branche: 'Industrie' }), t: 'new:werk',
      title: { nl: 'Aantal werknemers', en: 'Number of employees' },
      body: { nl: 'Aantal werknemers is ook verplicht. Klik op het veld; 85 wordt ingevuld.', en: 'Number of employees is required too. Click the field; 85 is filled in.' },
      hint: { nl: 'Aantal werknemers staat onder Jaaromzet.', en: 'Number of employees is below Annual revenue.' } },
    { n: 23, s: N(NEW_FULL), t: 'new:pc',
      title: { nl: 'Primaire contactpersoon', en: 'Primary contact' },
      body: { nl: 'Het laatste verplichte veld is Prim. contactpersoon. Klik op het veld.', en: 'The last required field is Primary contact. Click the field.' },
      hint: { nl: 'Prim. contactpersoon staat onderaan, onder Details.', en: 'Primary contact is at the bottom, below Details.' } },
    { n: 24, s: N(Object.assign({ pcMenu: true }, NEW_FULL)), t: 'pc:Kramer, Joost', side: 'right',
      title: { nl: 'Kies de contactpersoon', en: 'Choose the contact' },
      body: { nl: 'Je ziet contactpersonen die al in Dynamics staan. Staat de persoon er nog niet in? Dan maak je hem aan met + Nieuwe Contactpersoon onderaan; dat leer je bij het onderwerp Contactpersonen. Joost Kramer staat er al: kies Kramer, Joost.', en: 'You see contacts that are already in Dynamics. Is the person not there yet? Then you create them with + New Contact at the bottom; you will learn that in the Contacts topic. Joost Kramer is already there: choose Kramer, Joost.' },
      hint: { nl: 'Kramer, Joost staat bovenaan de lijst.', en: 'Kramer, Joost is at the top of the list.' } },
    { n: 25, s: N(Object.assign({ pc: true }, NEW_FULL)), t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Alle verplichte velden zijn ingevuld. Klik op Opslaan.', en: 'All required fields are filled in. Click Save.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk.', en: 'Save is on the left of the command bar.' } },
    { n: 26, s: N(Object.assign({ pc: true, saved: true }, NEW_FULL)), t: 'hdr:search',
      title: { nl: 'Zoeken met de zoekbalk', en: 'Search with the search bar' },
      body: { nl: 'Westvliet Groep is opgeslagen. Een account vind je ook met de zoekbalk bovenin, vanaf elk scherm. Klik op de zoekbalk; Lindenhoven wordt ingetypt.', en: 'Westvliet Groep has been saved. You can also find an account with the search bar at the top, from any screen. Click the search bar; Lindenhoven is typed in.' },
      hint: { nl: 'De zoekbalk staat midden in de blauwe balk bovenaan.', en: 'The search bar is in the middle of the blue bar at the top.' } },
    { n: 27, s: N(Object.assign({ pc: true, saved: true, search: true }, NEW_FULL)), t: 'res:lind',
      title: { nl: 'Open het zoekresultaat', en: 'Open the search result' },
      body: { nl: 'De zoekbalk toont accounts en contactpersonen met Lindenhoven in de naam. Klik op Stichting Welzijn Lindenhoven.', en: 'The search bar shows accounts and contacts with Lindenhoven in the name. Click Stichting Welzijn Lindenhoven.' },
      hint: { nl: 'Het is het eerste resultaat onder Accounts.', en: 'It is the first result under Accounts.' } },
    { n: 28, s: LIND, t: 'tab:sub',
      title: { nl: 'Onderliggende accounts', en: 'Child accounts' },
      body: { nl: 'Stichting Welzijn Lindenhoven is een moederaccount: er vallen andere accounts onder. Klik op het tabblad Onderliggende Accounts.', en: 'Stichting Welzijn Lindenhoven is a parent account: other accounts fall under it. Click the Child Accounts tab.' },
      hint: { nl: 'Onderliggende Accounts staat rechts van Samenvatting.', en: 'Child Accounts is to the right of Summary.' } },
    { n: 29, s: Object.assign({ tab: 'sub' }, LIND), t: 'tab:det',
      title: { nl: 'Naar Details', en: 'Go to Details' },
      body: { nl: 'Hier zie je de accounts die onder dit account vallen. Bij die accounts staat Stichting Welzijn Lindenhoven in het veld Moederaccount. Klik nu op het tabblad Details.', en: 'Here you see the accounts that fall under this account. Those accounts have Stichting Welzijn Lindenhoven in the Parent account field. Now click the Details tab.' },
      hint: { nl: 'Details staat rechts van Sales Cases.', en: 'Details is to the right of Sales Cases.' } },
    { n: 30, s: Object.assign({ tab: 'det' }, LIND), t: 'tab:con',
      title: { nl: 'Contactpersonen en verkoopkansen', en: 'Contacts and opportunities' },
      body: { nl: 'Op Details staan, onder de SLA-afspraken, de contactpersonen van dit account en de recente verkoopkansen. Met een klik op een naam open je de contactpersoon of verkoopkans. Klik nu op het tabblad Contract | Afspraken.', en: 'On Details, below the SLA agreements, you find the contacts of this account and the recent opportunities. Click a name to open the contact or opportunity. Now click the Contract | Agreements tab.' },
      hint: { nl: 'Contract | Afspraken staat rechts van Details.', en: 'Contract | Agreements is to the right of Details.' } },
    { n: 30, s: Object.assign({ tab: 'con' }, LIND), info: true, focus: 'con',
      title: { nl: 'Contracten en contractregels', en: 'Contracts and contract lines' },
      body: { nl: 'Op Contract | Afspraken bekijk je de contracten en contractregels van het account. Hoe contracten werken, leer je in het onderwerp Contracten.', en: 'On Contract | Agreements you view the contracts and contract lines of the account. You will learn how contracts work in the Contracts topic.' } }
  ];
  var TOTAL = 30;

  /* ---------- Toets ---------- */
  var QUIZ = [
    { q: { nl: 'Wie past de Status samenwerking van een account aan?', en: 'Who changes the Collaboration status of an account?' },
      o: [{ nl: 'Jij als accountmanager', en: 'You, as the account manager' }, { nl: 'Commercial Ops', en: 'Commercial Ops' }, { nl: 'De Learning Professional', en: 'The Learning Professional' }, { nl: 'Dynamics doet dat automatisch', en: 'Dynamics does it automatically' }], a: 1,
      x: { nl: 'Status samenwerking (Actief of Opgezegd) wordt door Commercial Ops aangepast. Jij laat dit veld staan.', en: 'Collaboration status (Active or Cancelled) is changed by Commercial Ops. You leave this field as it is.' } },
    { q: { nl: 'Hoe maak je een nieuw account aan?', en: 'How do you create a new account?' },
      o: [{ nl: 'Via Potenti\u00eble klanten, knop Nieuw', en: 'Through Leads, New button' }, { nl: 'Via het tabblad Details van een ander account', en: 'Through the Details tab of another account' }, { nl: 'Menu Accounts, knop Maken', en: 'Accounts menu, New button' }, { nl: 'Door de naam in de zoekbalk te typen', en: 'By typing the name in the search bar' }], a: 2,
      x: { nl: 'Je opent Accounts in het menu en klikt in de opdrachtbalk op Maken.', en: 'You open Accounts in the menu and click New in the command bar.' } },
    { q: { nl: 'Je hebt voor het eerst echt contact gehad met een Cold Prospect. Wat pas je aan?', en: 'You have had real contact with a Cold Prospect for the first time. What do you change?' },
      o: [{ nl: 'Relatietype naar Prospect', en: 'Relationship type to Prospect' }, { nl: 'Status samenwerking naar Actief', en: 'Collaboration status to Active' }, { nl: 'Relatietype naar Klant', en: 'Relationship type to Customer (Klant)' }, { nl: 'Niets, dat gaat vanzelf', en: 'Nothing, it happens automatically' }], a: 0,
      x: { nl: 'Na het eerste echte contact zet je het Relatietype van Cold Prospect op Prospect en sla je op.', en: 'After the first real contact you change the Relationship type from Cold Prospect to Prospect and save.' } },
    { q: { nl: 'Je maakt een nieuw account aan, maar de contactpersoon staat nog niet in Dynamics. Wat doe je bij Prim. contactpersoon?', en: 'You are creating a new account, but the contact is not in Dynamics yet. What do you do at Primary contact?' },
      o: [{ nl: 'Het veld leeg laten en opslaan', en: 'Leave the field empty and save' }, { nl: 'In het opzoekveld kiezen voor + Nieuwe Contactpersoon', en: 'Choose + New Contact in the lookup field' }, { nl: 'De naam in Bijzonderheden zetten', en: 'Put the name in Particulars' }, { nl: 'Eerst een potenti\u00eble klant aanmaken', en: 'Create a lead first' }], a: 1,
      x: { nl: 'Prim. contactpersoon is verplicht. Kies een bestaande contactpersoon, of maak er een aan met + Nieuwe Contactpersoon in het opzoekveld.', en: 'Primary contact is required. Choose an existing contact, or create one with + New Contact in the lookup field.' } },
    { q: { nl: 'Waar vind je de contractregels van een account?', en: 'Where do you find the contract lines of an account?' },
      o: [{ nl: 'Op het tabblad Details', en: 'On the Details tab' }, { nl: 'Op het tabblad Adressen', en: 'On the Addresses tab' }, { nl: 'Op het tabblad Sales Cases', en: 'On the Sales Cases tab' }, { nl: 'Op het tabblad Contract | Afspraken', en: 'On the Contract | Agreements tab' }], a: 3,
      x: { nl: 'Contracten en contractregels staan op het tabblad Contract | Afspraken.', en: 'Contracts and contract lines are on the Contract | Agreements tab.' } }
  ];
  var UI = {
    nl: { intro: 'In dit onderwerp leer je een account opzoeken, de gegevens bijwerken, een nieuw account maken en de gerelateerde records bekijken.', parts: ['Opzoeken en openen via de lijst', 'Gegevens bijwerken', 'Nieuw account maken', 'Gerelateerde records via de zoekbalk'], steps: '30 stappen', time: 'Ongeveer 15 minuten' },
    en: { intro: 'In this topic you learn to find an account, update its details, create a new account and view the related records.', parts: ['Find and open via the list', 'Update details', 'Create a new account', 'Related records via the search bar'], steps: '30 steps', time: 'About 15 minutes' }
  };

  /* ---------- Opdrachtbalken ---------- */
  var CMD_ACC = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'org', i: 'assign', l: { nl: 'Organigram openen', en: 'Open Org Chart' } },
    { k: 'deactivate', i: 'error-circle', l: { nl: 'Deactiveren', en: 'Deactivate' } }, { k: 'connect', i: 'contact', l: { nl: 'Verbinding maken', en: 'Connect' }, chev: true },
    { k: 'mlist', i: 'report', l: { nl: 'Toevoegen aan marketinglijst', en: 'Add to Marketing List' } }, { k: 'assign', i: 'assign', l: { nl: 'Toewijzen', en: 'Assign' } },
    { k: 'delete', i: 'delete', l: { nl: 'Verwijderen', en: 'Delete' } }, { k: 'refresh', i: 'refresh', l: { nl: 'Vernieuwen', en: 'Refresh' } }
  ];
  var CMD_NEW = [
    { k: 'save', i: 'save', l: { nl: 'Opslaan', en: 'Save' } }, { k: 'saveclose', i: 'save-close', l: { nl: 'Opslaan en sluiten', en: 'Save & Close' } },
    { k: 'new', i: 'add', c: 'var(--cmd-new)', l: { nl: 'Nieuw', en: 'New' } }, { k: 'flow', i: 'flow', l: { nl: 'Stroom', en: 'Flow' }, chev: true },
    { k: 'kvk', i: 'search', l: { nl: 'Zoek in Handelsregister', en: 'Search Trade Register' } }, { k: 'btw', i: 'report', l: { nl: 'Bepaal BTW nummer', en: 'Determine VAT number' } }
  ];

  var TABS = [['sam', { nl: 'Samenvatting', en: 'Summary' }], ['sub', { nl: 'Onderliggende Accounts', en: 'Child Accounts' }], ['adr', { nl: 'Adressen', en: 'Addresses' }], ['best', { nl: 'Bestanden', en: 'Files' }],
    ['sc', { nl: 'Sales Cases', en: 'Sales Cases' }], ['det', { nl: 'Details', en: 'Details' }], ['con', { nl: 'Contract | Afspraken', en: 'Contract | Agreements' }]];

  /* ---------- Velden ---------- */
  /* f(label, value, o): o = { req, t, target, icon, link, empty, focus, menu, cls, focusKey } */
  function f(label, value, o) {
    o = o || {};
    var val = h('span', { className: 'fld__v' + (value ? '' : ' is-empty') + (o.focus ? ' is-focus' : '') + (o.cls ? ' ' + o.cls : '') },
      value ? (o.link ? h('a', null, value) : value) : (o.blank ? '' : '---'), o.icon ? h(D.Icon, { name: o.icon, size: 16 }) : null);
    return h('div', { className: 'fld acf', key: label, 'data-focus': o.focusKey },
      h('span', { className: 'fld__l' }, label, o.req ? h('i', null, '*') : null, o.lock ? h(D.Icon, { name: 'lock', size: 16 }) : null),
      h('div', { className: 'acf__v' }, o.target ? P(o.t === o.target, val, true) : val, o.menu || null));
  }
  function ddMenu(opts, sel, t, pre, cls) {
    return h('div', { className: 'dd acdd' + (cls ? ' ' + cls : '') },
      opts.map(function (o) {
        var on = o === sel;
        return P(t === pre + o, h('span', { key: o, className: 'dd__o' + (on ? ' is-sel' : '') }, on ? h(D.Icon, { name: 'checkmark', size: 16 }) : h('span', { className: 'dd__sp' }), o), true);
      }),
      h('span', { className: 'acdd__bar', 'aria-hidden': true }));
  }
  function lookupMenu(lang, items, t, pre, foot, up) {
    var isEn = lang === 'en';
    return h('div', { className: 'lk' + (up ? ' lk--up' : '') },
      h('div', { className: 'lk__h' }, isEn ? 'Recent records' : 'Recente records'),
      items.map(function (it) {
        return P(t === pre + it[0], h('span', { key: it[0], className: 'lk__o' }, h(D.Avatar, { name: it[0], tone: it[2] || 1 }), h('span', null, h('b', null, it[0]), h('small', null, it[1]))), true);
      }),
      h('div', { className: 'lk__foot' }, foot ? h('span', { className: 'lk__new' }, h(D.Icon, { name: 'add', size: 16 }), foot) : h('span'), h('span', null, isEn ? 'Advanced lookup' : 'Geavanceerd zoeken')));
  }

  /* Subrasters (lijsten in een tabblad) */
  function Sub(title, actions, cols, rows, o) {
    o = o || {};
    var tpl = '36px ' + cols.map(function (c) { return c[1] || '1fr'; }).join(' ');
    return h('div', { className: 'asub', 'data-focus': o.focusKey },
      h('div', { className: 'asub__h' }, h('b', null, title), h('span', { className: 'asub__acts' }, actions.map(function (a, i) { return h('span', { key: i }, a[0] ? h(D.Icon, { name: a[0], size: 16 }) : null, a[1]); }), h(D.Icon, { name: 'more', size: 16 }))),
      h('div', { className: 'asub__row is-head', style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })), cols.map(function (c, i) { return h('span', { key: i }, c[0], h(D.Icon, { name: 'chevron-down', size: 12 })); })),
      rows.map(function (r, ri) {
        return h('div', { key: ri, className: 'asub__row', style: { gridTemplateColumns: tpl } }, h('span', null, h(D.Icon, { name: 'checkbox', size: 16 })),
          r.map(function (v, i) { var c = cols[i]; return h('span', { key: i, className: c[3] ? 'is-end' : '' }, c[2] && v ? h('a', null, v) : v); }));
      }),
      h('div', { className: 'asub__foot' }, (o.lang === 'en' ? 'Rows: ' : 'Rijen: ') + rows.length));
  }

  /* ---------- Lijst Actieve accounts ---------- */
  var LIST_COLS = [
    { key: 'name', label: { nl: 'Accountnaam', en: 'Account Name' }, width: 300, link: true, sort: 'asc' },
    { key: 'entity', label: { nl: 'Entiteit', en: 'Entity' }, width: 220 },
    { key: 'rel', label: { nl: 'Relatietype', en: 'Relationship type' }, width: 190 },
    { key: 'status', label: { nl: 'Status samen...', en: 'Collaboration...' }, width: 150 },
    { key: 'sso', label: { nl: 'Heeft SSO', en: 'Has SSO' }, width: 120 },
    { key: 'tel', label: { nl: 'Telefoonnummer 1', en: 'Phone 1' }, width: 190 },
    { key: 'city', label: { nl: 'Adres 2: plaats', en: 'Address 2: City' } },
    { key: 'score', label: { nl: 'Klantprofiel score', en: 'Customer profile score' }, width: 170 }
  ];
  function List(p) {
    var lang = p.lang, t = p.t, kw = p.s.kw;
    var rows = LIST.filter(function (r) { return !kw || r[0].indexOf(kw) >= 0; })
      .map(function (r) { return { name: r[0], entity: r[1], rel: r[2], status: r[3] === 'Actief' && lang === 'en' ? 'Active' : r[3], sso: r[4] === 'Ja' && lang === 'en' ? 'Yes' : r[4], tel: r[5], city: r[6], score: '' }; });
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', newLabel: 'create', lang: lang, highlight: t === 'cmd:new' ? 'new' : null }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: { nl: 'Actieve accounts', en: 'Active Accounts' }, highlight: t === 'keyword' ? 'keyword' : null, keyword: kw || '' }),
        h(D.DataGrid, { lang: lang, columns: LIST_COLS, rows: rows, highlight: t, total: kw ? rows.length : 412 })));
  }

  /* ---------- Accountformulier (bestaand en nieuw) ---------- */
  function Account(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, isNew = s.view === 'new';
    var d = isNew ? { name: 'Westvliet Groep', initials: 'WG', entity: 'SkillsTown (OA)', rel: '', tel: '010 555 3870', web: 'https://www.westvliet.example' } : ACC[s.acc];
    var tab = s.tab || 'sam';
    var lp = s.lp || d.lp || '';
    var title = isNew && !s.saved ? (isEn ? 'New Account' : 'Nieuw: Account') : d.name;
    var stateTxt = isNew && !s.saved ? (isEn ? ' - Unsaved' : ' - Niet-opgeslagen') : s.unsaved ? (isEn ? ' - Unsaved' : ' - Niet opgeslagen') : (isEn ? ' - Saved' : ' - Opgeslagen');
    var chev = h('button', { type: 'button', className: 'rec__chev' + (s.fly ? ' is-open' : '') }, h(D.Icon, { name: s.fly ? 'chevron-up' : 'chevron-down' }));
    var body;
    if (tab === 'sam') body = h(Summary, { s: s, d: d, lang: lang, t: t, isNew: isNew });
    else if (tab === 'adr') body = h(Addresses, { s: s, lang: lang, t: t });
    else if (tab === 'sub') body = h('div', { className: 'acc__tab' }, Sub(isEn ? 'Child accounts' : 'Onderliggende Accounts',
      [['add', isEn ? 'New Account' : 'Account maken'], ['open', isEn ? 'Add Existing Account' : 'Bestaande Account toevoegen'], ['refresh', isEn ? 'Refresh' : 'Vernieuwen']],
      [[isEn ? 'Account Name \u2191' : 'Accountnaam \u2191', '340px', true], [isEn ? 'Entity' : 'Entiteit', '220px'], [isEn ? 'Relationship type' : 'Relatietype', '180px'], [isEn ? 'Collaboration status' : 'Status samenwerking', '200px'], [isEn ? 'Phone 1' : 'Telefoonnummer 1', '200px', true], [isEn ? 'Address 2: City' : 'Adres 2: plaats', '1fr']],
      CHILDREN.map(function (r) { return [r[0], r[1], r[2], isEn ? 'Active' : r[3], r[4], r[5]]; }), { lang: lang }));
    else if (tab === 'det') body = h(DetailsTab, { lang: lang });
    else body = h(ContractTab, { lang: lang });
    return h('div', { className: 'rec' },
      h(CmdBar, { lang: lang, t: t, items: isNew ? CMD_NEW : CMD_ACC }),
      h('div', { className: 'rec__head' },
        h('div', { className: 'rec__top' },
          h('div', { className: 'rec__id' }, h('span', { className: 'rec__av rec__av--acc' }, isNew && !s.saved ? h(D.Icon, { name: 'account', size: 20 }) : d.initials),
            h('div', null, h('div', { className: 'rec__name' }, title, h('small', null, stateTxt)), h('div', { className: 'rec__type' }, 'Account \u00b7 ', h('b', { className: 'acc__form' }, 'SKT - Account', h(D.Icon, { name: 'chevron-down', size: 12 }))))),
          h('div', { className: 'rec__hf' },
            h('div', { className: 'rec__f acc__owner' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('div', null, h('div', { className: 'rec__fv' }, h('a', null, 'Jansen, Eva')), h('div', { className: 'rec__fl' }, 'AM NOA/ST'))),
            hf('SkillsTown', isEn ? 'Account origin' : 'Oorsprong account'), hf('---', 'AM Salta', true),
            h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' + (lp ? '' : ' is-empty') }, lp ? h('a', null, lp) : '---'), h('div', { className: 'rec__fl' }, 'Learning Professional')),
            P(t === 'hdr:chev', chev))),
        s.fly ? h('div', { className: 'fly acfly' },
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, 'AM NOA/ST', h('i', null, '*')), h('span', { className: 'fld__v' }, h('span', { className: 'acfly__pick' }, h(D.Avatar, { name: 'Jansen, Eva' }), h('a', null, 'Jansen, Eva'), h(D.Icon, { name: 'dismiss', size: 12 })), h(D.Icon, { name: 'search', size: 16 }))),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Active contract' : 'Actief contract'), h('span', { className: 'tgl' }, h('span', { className: 'tgl__k' }), isEn ? 'No' : 'Nee')),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, isEn ? 'Account origin' : 'Oorsprong account'), h('span', { className: 'fld__v' }, 'SkillsTown', h(D.Icon, { name: 'chevron-down', size: 16 }))),
          h('div', { className: 'fld' }, h('span', { className: 'fld__l' }, 'AM Salta'), h('span', { className: 'fld__v is-empty' }, '---', h(D.Icon, { name: 'search', size: 16 }))),
          h('div', { className: 'fld acf' }, h('span', { className: 'fld__l' }, 'Learning Professional'),
            h('div', { className: 'acf__v' }, P(t === 'fly:lp', h('span', { className: 'fld__v' + (lp ? '' : ' is-empty') + (s.lpMenu ? ' is-focus' : '') }, lp ? h('a', null, lp) : '---', h(D.Icon, { name: 'search', size: 16 })), true),
              s.lpMenu ? lookupMenu(lang, [['Mulder, Daan', 'Learning Professional', 2], ['Visser, Lotte', 'Learning Professional', 3], ['de Boer, Femke', 'Learning Professional', 4]], t, 'lp:') : null))) : null,
        h('div', { className: 'rec__tabs' },
          TABS.map(function (x) { return P(t === 'tab:' + x[0], h('span', { key: x[0], className: 'rec__tab' + (x[0] === tab ? ' is-on' : '') }, L(x[1], lang))); }),
          h('span', { className: 'rec__tab' }, isEn ? 'Related' : 'Gerelateerd', h(D.Icon, { name: 'chevron-down', size: 16 })))),
      body);
    function hf(v, l, empty) { return h('div', { className: 'rec__f' }, h('div', { className: 'rec__fv' + (empty ? ' is-empty' : '') }, v), h('div', { className: 'rec__fl' }, l)); }
  }

  function Summary(p) {
    var s = p.s, d = p.d, lang = p.lang, isEn = lang === 'en', t = p.t, isNew = p.isNew;
    var rel = s.rel || d.rel;
    var relWin = t === 'opt:Prospect' ? REL_OPTIONS.slice(9, 21) : REL_OPTIONS.slice(0, 12);
    var naam = !isNew || s.naam ? d.name : '';
    var tel = !isNew || s.tel ? d.tel : '', web = !isNew || s.tel ? d.web : '';
    var left;
    if (isNew && s.scrolled) {
      left = h('div', { className: 'rec__col' },
        h('div', { className: 'sec acsec' }, h('div', { className: 'sec__t' }, 'Details'),
          f(isEn ? 'Industry' : 'Branche', s.branche, { req: true, t: t, target: 'new:branche', icon: 'chevron-down', focus: s.brMenu, menu: s.brMenu ? ddMenu(BRANCHE_OPTIONS, s.branche, t, 'br:') : null }),
          f(isEn ? 'Annual revenue' : 'Jaaromzet', ''),
          f(isEn ? 'Number of employees' : 'Aantal werknemers', s.werk ? '85' : '', { req: true, t: t, target: 'new:werk' }),
          f(isEn ? 'Stock exchange listing' : 'Beursnotering', '', { icon: 'chevron-down' }),
          f(isEn ? 'Customer profile score' : 'Klantprofiel score', ''),
          f('Broker', '', { icon: 'chevron-down' }),
          f(isEn ? 'LMS supplier' : 'LMS Leverancier', '', { icon: 'chevron-down' }),
          f(isEn ? 'Training budget (C/D)' : 'Opleidingsbudget (C/D)', '', { icon: 'chevron-down' }),
          f(isEn ? 'Contract end date' : 'Einddatum contract', '', { lock: true })),
        h('div', { className: 'sec acsec' },
          f(isEn ? 'Primary contact' : 'Prim. contactpersoon', s.pc ? 'Kramer, Joost' : '', { req: true, t: t, target: 'new:pc', link: true, icon: 'search', focus: s.pcMenu,
            menu: s.pcMenu ? lookupMenu(lang, [['Kramer, Joost', 'j.kramer@westvliet.example', 2], ['Bos, Ilse', 'i.bos@westvliet.example', 3], ['Kramer, Jolien', 'jolien.kramer@vliet-advies.example', 4]], t, 'pc:', isEn ? 'New Contact' : 'Nieuwe Contactpersoon', true) : null })));
    } else {
      left = h('div', { className: 'rec__col' },
        h('div', { className: 'sec acsec' }, h('div', { className: 'sec__t' }, isEn ? 'Account details' : 'Accountgegevens'),
          f(isEn ? 'Entity' : 'Entiteit', d.entity, { icon: 'chevron-down' }),
          f(isEn ? 'Account name' : 'Accountnaam', naam, { req: true, t: t, target: 'new:naam' }),
          f(isEn ? 'Relationship type' : 'Relatietype', rel, { req: true, t: t, target: 'field:rel', icon: 'chevron-down', focus: s.relMenu, menu: s.relMenu ? ddMenu(relWin, rel, t, 'opt:') : null }),
          f('Dealer', '', { icon: 'chevron-down' }),
          f(isEn ? 'Phone' : 'Telefoon', tel, { req: true, t: t, target: 'new:tel', icon: 'phone' }),
          f('Website', web, { req: true, icon: 'globe' }),
          f(isEn ? 'Parent account' : 'Moederaccount', '', { icon: 'search' }),
          f(isEn ? 'Competitor' : 'Concurrent', '', { icon: 'search' }),
          isNew ? null : f(isEn ? 'Competitor end date' : 'Einddatum Concurrent', '', { icon: 'appointment' }),
          f(isEn ? 'Collaboration status' : 'Status samenwerking', d.status === 'Actief' && isEn ? 'Active' : d.status, { icon: 'chevron-down', focusKey: 'fld:status' }),
          f(isEn ? 'Open revenue' : 'Open omzet', '******', { lock: true }),
          h('div', { className: 'acsec__upd' }, h('span', null, isEn ? 'Last updated:' : 'Laatst bijgewerkt:'), h('span', null, isNew && !s.saved ? (isEn ? 'Not available' : 'Niet beschikbaar') : '30-10-2026 10:24'))));
    }
    var bzTxt = !isNew && (s.bz || s.acc === 'lind') ? L(d.bz, lang) : '';
    var bzBox = h('div', { className: 'bz__txt' }, bzTxt || null);
    var tlItems = isNew ? null : d.tl;
    return h('div', { className: 'acc__body' },
      left,
      h('div', { className: 'rec__col' },
        h('div', { className: 'bz' }, h('div', { className: 'bz__t' }, isEn ? 'Particulars' : 'Bijzonderheden'),
          h('div', { className: 'bz__bar', 'aria-hidden': true },
            h('span', { className: 'bz__font' }, 'Segoe UI', h(D.Icon, { name: 'chevron-down', size: 12 })), h('span', { className: 'bz__size' }, '11', h(D.Icon, { name: 'chevron-down', size: 12 })),
            h('b', null, 'B'), h('i', null, 'I'), h('u', null, 'U'), h('s', null, 'S'), h('span', { className: 'bz__mark' }, 'A'), h(D.Icon, { name: 'more', size: 16 })),
          P(t === 'bz', bzBox, true)),
        h('div', { className: 'tl' },
          h('div', { className: 'tl__h' }, 'Timeline', h('span', { className: 'tl__icons' }, h(D.Icon, { name: 'add', size: 16 }), h(D.Icon, { name: 'filter', size: 16 }), h(D.Icon, { name: 'refresh', size: 16 }), h(D.Icon, { name: 'more', size: 16 }))),
          isNew && !s.saved ? h('div', { className: 'tl__almost' }, h(D.Icon, { name: 'timer', size: 20 }), h('b', null, isEn ? 'Almost there' : 'Bijna klaar'), h('span', null, isEn ? 'Select Save to see your timeline.' : 'Selecteer Opslaan om uw tijdlijn weer te geven.'))
            : h(React.Fragment, null,
              h('div', { className: 'tl__in' }, h(D.Icon, { name: 'search', size: 16 }), D.t('searchtimeline', lang)),
              h('div', { className: 'tl__in' }, h(D.Icon, { name: 'note', size: 16 }), isEn ? 'Enter a note...' : 'Een notitie invoeren...'),
              (tlItems || []).map(function (it, i) { return h('div', { key: i, className: 'tl__item' }, h('div', null, (isEn ? 'Created on: ' : 'Gemaakt op: ') + it.d), h('b', null, L(it.b, lang)), h('div', null, L(it.x, lang))); })))));
  }

  function Addresses(p) {
    var s = p.s, lang = p.lang, isEn = lang === 'en', t = p.t, a = s.adr;
    return h('div', { className: 'acc__adr' },
      h('div', { className: 'sec acsec' }, h('div', { className: 'sec__h2' }, isEn ? 'Visiting address' : 'Bezoekadres'),
        f(isEn ? 'Street + No.' : 'Straat + Hnr.', a ? 'Industrieweg 14' : '', { t: t, target: 'adr:straat' }),
        f(isEn ? 'Addition / Extra' : 'Toevoeging / Extra', ''),
        f(isEn ? 'Postal code' : 'Postcode', a ? '4104 AB' : ''),
        f(isEn ? 'City' : 'Plaats', a ? 'Culemborg' : ''),
        f(isEn ? 'Country' : 'Land', a ? 'Nederland' : '')),
      h('div', { className: 'sec acsec' }, h('div', { className: 'sec__h2' }, isEn ? 'Invoice address' : 'Factuuradres'),
        h('div', { className: 'acc__adr2' },
          h('div', null,
            f(isEn ? 'Attn.' : 'T.a.v.', a ? (isEn ? 'Accounts payable' : 'Crediteurenadministratie') : ''),
            f(isEn ? 'Street' : 'Straat', a ? 'Industrieweg' : ''),
            f(isEn ? 'House number addition' : 'Huisnummer toevoeging', a ? '14' : ''),
            f(isEn ? 'Postal code' : 'Postcode', a ? '4104 AB' : ''),
            f(isEn ? 'PO box' : 'Postbus', ''),
            f(isEn ? 'City' : 'Plaats', a ? 'Culemborg' : '')),
          h('div', null,
            f(isEn ? 'Country' : 'Land', a ? 'Nederland' : ''),
            f(isEn ? 'Invoice address: Email' : 'Factuuradres : E-mail', a ? 'facturen@breedveld-logistiek.example' : '', { icon: 'email' }),
            f(isEn ? 'Debtor number' : 'Debiteurnummer', ''),
            f(isEn ? 'Indexation account Y/N' : 'Indexering Account J/N', '', { icon: 'chevron-down' }),
            f(isEn ? 'Apply VAT?' : 'BTW Toepassen?', '', { icon: 'chevron-down' }),
            f(isEn ? 'Extra information' : 'Extra informatie', '')))));
  }

  function DetailsTab(p) {
    var lang = p.lang, isEn = lang === 'en';
    return h('div', { className: 'acc__tab' },
      h('div', { className: 'sec acsec acc__sla' }, h('div', { className: 'sec__h2' }, 'SLA'),
        h('div', { className: 'acc__adr2' },
          h('div', null, f(isEn ? 'Data processing agreement' : 'Verwerkersovereenkomst', isEn ? 'Yes' : 'Ja', { icon: 'chevron-down' }), f(isEn ? 'Renewal' : 'Verlenging', isEn ? 'Tacit' : 'Stilzwijgend', { icon: 'chevron-down' })),
          h('div', null, f(isEn ? 'SLA response time' : 'SLA Responsetijd', 'Standaard SkillsTown SLA', { icon: 'chevron-down' }), f(isEn ? 'Report data leaks within x time' : 'Data lekken melden binnen x tijd', 'Standaard SkillsTown SLA', { icon: 'chevron-down' })))),
      Sub(isEn ? 'Contacts' : 'Contactpersonen', [['add', isEn ? 'New Contact' : 'Contactpersoon maken'], ['refresh', isEn ? 'Refresh' : 'Vernieuwen']],
        [[isEn ? 'Full Name \u2191' : 'Volledige naam \u2191', '300px', true], [isEn ? 'Job title' : 'Functie', '260px'], [isEn ? 'Role' : 'Rol', '260px'], [isEn ? 'Mobile phone' : 'Mobiele telefoon', '220px', true], [isEn ? 'Email' : 'E-mail', '1fr', true]],
        [['Brouwer, Sem', isEn ? 'L&D Advisor' : 'L&D Adviseur', isEn ? 'Mailing administrators' : 'Mailing beheerders', '', 's.brouwer@welzijnlindenhoven.example'],
          ['El Amrani, Nadia', isEn ? 'HR Business Partner' : 'HR Business Partner', isEn ? 'Decision maker' : 'Beslisser', '06 5555 0182', 'n.elamrani@welzijnlindenhoven.example'],
          ['Peters, Wim', isEn ? 'Team lead neighbourhood teams' : 'Teamleider wijkteams', isEn ? 'Mailing administrators' : 'Mailing beheerders', '06 5555 0347', 'w.peters@welzijnlindenhoven.example']], { lang: lang, focusKey: 'det:contacts' }),
      Sub(isEn ? 'Recent Opportunities' : 'Recente Verkoopkansen', [['add', isEn ? 'New Opportunity' : 'Verkoopkans maken'], ['refresh', isEn ? 'Refresh' : 'Vernieuwen']],
        [[isEn ? 'Topic' : 'Onderwerp', '380px', true], [isEn ? 'Est. revenue' : 'Geschatte omzet', '180px', false, true], [isEn ? 'Est. close date \u2193' : 'Verwachte sluitingsdatum \u2193', '240px'], ['Status', '140px'], [isEn ? 'Contact' : 'Contactpersoon', '1fr', true]],
        [['Stichting Welzijn Lindenhoven | ' + (isEn ? 'Renewal' : 'Verlenging'), '\u20ac 18.400,00', '31-3-2027', isEn ? 'Open' : 'Open', 'El Amrani, Nadia']], { lang: lang }));
  }

  function ContractTab(p) {
    var lang = p.lang, isEn = lang === 'en';
    return h('div', { className: 'acc__tab' },
      h('div', { className: 'sec acsec acc__afs' }, h('div', { className: 'sec__h2' }, isEn ? 'Agreements' : 'Afspraken'),
        h('div', { className: 'acc__adr3' },
          f(isEn ? 'Invoice every X months' : 'Facturatie frequentie iedere X mnd', '12', { icon: 'chevron-down' }),
          f(isEn ? 'Cost centre stated' : 'Kostenpl.vermeld.', ''),
          f(isEn ? 'Renewal' : 'Verlenging', isEn ? 'Tacit' : 'Stilzwijgend', { icon: 'chevron-down' }))),
      h('div', { className: 'acc__con', 'data-focus': 'con' },
        Sub(isEn ? 'Contracts' : 'Contracten', [['add', isEn ? 'New Contract OA' : 'Contract OA maken'], ['open', isEn ? 'Add Existing Contract OA' : 'Bestaande Contract OA toevoegen'], ['refresh', isEn ? 'Refresh' : 'Vernieuwen']],
          [[isEn ? 'Start date \u2193' : 'Start datum \u2193', '160px'], [isEn ? 'End date' : 'Eind datum', '160px'], [isEn ? 'Total contract value' : 'Totale contractwaarde', '220px', false, true], [isEn ? 'Total contract value (incl. indexation)' : 'Totale contractwaarde (incl. indexatie)', '320px', false, true], [isEn ? 'Indexation %' : 'Indexatiepercentage', '200px', false, true], [isEn ? 'Contract status' : 'Contractstatus', '1fr']],
          [['1-4-2026', '31-3-2027', '\u20ac 18.400,00', '18.952,00', '3,00', isEn ? 'Active' : 'Actief'], ['1-4-2025', '31-3-2026', '\u20ac 17.900,00', '17.900,00', '0,00', isEn ? 'Ended' : 'Afgerond']], { lang: lang }),
        Sub(isEn ? 'Contract lines' : 'Contractregels', [['add', isEn ? 'New Contract line OA' : 'Contractregel OA maken'], ['open', isEn ? 'Add Existing Contract line' : 'Bestaande Contractregel toevoegen']],
          [[isEn ? 'Invoice date \u2193' : 'Factuurdatum \u2193', '160px'], [isEn ? 'Title' : 'Titel', '280px'], [isEn ? '# licences' : '# licenties', '140px', false, true], [isEn ? 'Description' : 'Beschrijving', '1fr'], [isEn ? 'Total price' : 'Totaal Prijs', '170px', false, true], [isEn ? 'Invoice sent' : 'Datum factuur', '170px']],
          [['1-4-2026', 'SkillsTown abonnement', '160', isEn ? 'Licence costs 1-4-2026 to 31-3-2027' : 'Licentiekosten 1-4-2026 t/m 31-3-2027', '\u20ac 18.952,00', '7-4-2026'],
            ['1-4-2025', 'SkillsTown abonnement', '150', isEn ? 'Licence costs 1-4-2025 to 31-3-2026' : 'Licentiekosten 1-4-2025 t/m 31-3-2026', '\u20ac 16.650,00', '4-4-2025'],
            ['1-4-2025', 'Implementatie begeleiding', '1', isEn ? 'One-off implementation support' : 'Eenmalige implementatiebegeleiding', '\u20ac 1.250,00', '4-4-2025']], { lang: lang })));
  }

  /* Kopbalk met zoekbalk die een doel kan zijn en zoekresultaten kan tonen */
  function Header(p) {
    var lang = p.lang, isEn = lang === 'en', t = p.t, open = p.search;
    var box = h('div', { className: 'dy-hdr__search' + (open ? ' is-typed' : '') }, h(D.Icon, { name: 'search', size: 16 }), h('span', null, open ? 'Lindenhoven' : D.t('search', lang)));
    function res(key, icon, name, sub) {
      return P(t === 'res:' + key, h('span', { key: key, className: 'hres__o' }, h('span', { className: 'hres__ic' }, h(D.Icon, { name: icon, size: 16 })), h('span', null, h('b', null, name), h('small', null, sub))), true);
    }
    return h('header', { className: 'dy-hdr' },
      h('button', { className: 'dy-hdr__waffle', type: 'button', 'aria-label': 'Apps' }, h(D.Icon, { name: 'waffle' })),
      h('span', { className: 'dy-hdr__product' }, 'Dynamics 365'),
      h('span', { className: 'dy-hdr__sep', 'aria-hidden': true }),
      h('span', { className: 'dy-hdr__app' }, 'SkillsTown: Sales'),
      h('div', { className: 'hsearch' }, P(t === 'hdr:search', box, true),
        open ? h('div', { className: 'hres' },
          h('div', { className: 'hres__g' }, 'Accounts'),
          res('lind', 'account', 'Stichting Welzijn Lindenhoven', 'SkillsTown Direct \u00b7 085 555 2200'),
          res('gem', 'account', 'Gemeente Lindenhoven', 'SkillsTown Direct \u00b7 14 0555'),
          res('zorg', 'account', 'Zorggroep Lindenhoven', 'SkillsTown (OA) \u00b7 085 555 7300'),
          h('div', { className: 'hres__g' }, isEn ? 'Contacts' : 'Contactpersonen'),
          res('elif', 'contact', 'Yilmaz, Elif', 'Zorggroep Lindenhoven'),
          h('div', { className: 'hres__more' }, isEn ? 'Show more results' : 'Meer resultaten weergeven')) : null),
      h('div', { className: 'dy-hdr__right' },
        ['lightbulb', 'add', 'alert', 'settings', 'help'].map(function (i) { return h('button', { key: i, className: 'dy-hdr__btn', type: 'button' }, h(D.Icon, { name: i })); }),
        h('span', { className: 'dy-hdr__me' }, 'EJ')));
  }

  /* Het volledige nagebouwde scherm voor een stap */
  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.view === 'dash' ? h(DI.Dash, { lang: lang, t: t }) : s.view === 'list' ? h(List, { lang: lang, s: s, t: t }) : h(Account, { lang: lang, s: s, t: t });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'accounts', header: h(Header, { lang: lang, t: t, search: s.search }) }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'relatiebeheerder', Screen: Screen };
})();
