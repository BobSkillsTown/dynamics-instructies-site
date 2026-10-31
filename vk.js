/* Dynamics-instructies \u2014 onderwerp 2: Verkoopkansen (nieuwe schermen). Alle gegevens zijn verzonnen. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h;

  var TOPIC = { nl: 'Verkoopkansen', en: 'Opportunities' };
  var OPPS = {
    korenaar: { kind: 'nk', company: 'Bakkerij De Korenaar', entity: 'SkillsTown Direct', contact: 'De Vries, Sanne', lead: 'De Vries, Sanne', when: '28-10-2026 10:02', close: '15-12-2026', revenue: '\u20ac 7.500,00', chance: '20', stage: '1-Discovery' },
    zorg: { kind: 'vl', company: 'Zorggroep Lindenhoven', entity: 'SkillsTown Connect', contact: 'Yilmaz, Elif', werk: '250', omzet: '\u20ac 38.000,00', sluit: '31-01-2027', kans: '50', start: '01-02-2027',
      prods: [['Kennisplatform', '200', '\u20ac 190,00', '\u20ac 38.000,00']], close: '31-01-2027', revenue: '\u20ac 38.000,00', chance: '50', stage: '1-Discovery' },
    gemeente: { kind: 'nk', company: 'Gemeente Lindenhoven', entity: 'SkillsTown (OA)', contact: 'Mulder, Petra', close: '28-02-2027', revenue: '\u20ac 24.000,00', chance: '40', stage: '3-Offerte' }
  };
  var PRODS = [['Kennisplatform', '40', '\u20ac 187,50', '\u20ac 7.500,00'], ['Implementatie begeleiding', '1', '\u20ac 1.250,00', '\u20ac 1.250,00']];
  var OPP_COLS = [
    { key: 'topic', label: { nl: 'Onderwerp', en: 'Topic' }, width: 330, link: true },
    { key: 'customer', label: { nl: 'Potenti\u00eble klant', en: 'Potential Customer' }, width: 230, link: true },
    { key: 'close', label: { nl: 'Verwachte sluitingsdatum', en: 'Est. Close Date' }, width: 190, sort: 'asc' },
    { key: 'revenue', label: { nl: 'Geschatte omzet (totale contractwaarde)', en: 'Est. Revenue (total contract value)' }, width: 290, align: 'end' },
    { key: 'chance', label: { nl: 'Slagingskans (%)', en: 'Probability (%)' }, width: 150, align: 'end' },
    { key: 'stage', label: { nl: 'Pijplijnstadium', en: 'Pipeline Phase' } }
  ];

  function S(extra) { return Object.assign({ view: 'opp', opp: 'korenaar' }, extra); }
  var G = { bron: 'Inbound', tbron: 'Demo aanvraag', werk: '40' };
  function SG(extra) { return S(Object.assign({}, G, extra)); }
  var KANS = { kans: true }, ALL = { kans: true, omzet: true, sluit: true, duur: true };
  function SZ(extra) { return Object.assign({ view: 'opp', opp: 'zorg', bron: 'Overig', tbron: 'Eigen netwerk', werk: '250' }, extra); }
  function SM(extra) { return Object.assign({ view: 'opp', opp: 'gemeente', bron: 'Outreach', tbron: 'Cold call', werk: '1.200', active: 2 }, extra); }
  var LIST = { view: 'list', rows: ['korenaar', 'zorg', 'gemeente'] };
  var NEXT = { nl: 'Klik op Volgende fase.', en: 'Click Next Stage.' };
  var NEXT_HINT = { nl: 'De blauwe knop onderaan het venster.', en: 'The blue button at the bottom of the window.' };

  var STEPS = [
    /* A. Openen */
    { n: 1, s: { view: 'dash', nav: 'dashboards' }, t: 'nav:opportunities',
      title: { nl: 'Open Verkoopkansen', en: 'Open Opportunities' },
      body: { nl: 'Na het kwalificeren van een lead staat de verkoopkans bij jouw kansen. Klik in het menu links op Verkoopkansen.', en: 'After qualifying a lead, the opportunity is among your opportunities. In the menu on the left, click Opportunities.' },
      hint: { nl: 'Verkoopkansen staat in het menu links onder het kopje Verkoop.', en: 'Opportunities is in the menu on the left, under the Sales heading.' } },
    { n: 2, s: LIST, t: 'cell:0:topic',
      title: { nl: 'Open de nieuwe verkoopkans', en: 'Open the new opportunity' },
      body: { nl: 'Bovenaan staat de kans die je net hebt gekwalificeerd. Klik op Bakkerij De Korenaar | Nieuwe Klant.', en: 'At the top is the opportunity you just qualified. Click Bakkerij De Korenaar | New Customer.' },
      hint: { nl: 'Klik op de blauwe tekst in de kolom Onderwerp.', en: 'Click the blue text in the Topic column.' } },
    /* B. Algemene informatie */
    { n: 3, s: S({}), t: 'field:bron',
      title: { nl: 'Bron', en: 'Source' },
      body: { nl: 'Op Algemene informatie vul je eerst in waar de klant vandaan komt. Klik op het veld Bron.', en: 'On General information you first fill in where the customer came from. Click the Source field.' },
      hint: { nl: 'Bron staat links, onder Contactpersoon.', en: 'Source is on the left, below Contact.' } },
    { n: 3, s: S({ bronMenu: true }), t: 'bron:Inbound',
      title: { nl: 'Kies Inbound', en: 'Choose Inbound' },
      body: { nl: 'Sanne kwam zelf naar ons toe via een webinar. Kies Inbound.', en: 'Sanne came to us herself through a webinar. Choose Inbound.' },
      hint: { nl: 'Inbound is de eerste keuze onder --Selecteren--.', en: 'Inbound is the first option below --Select--.' } },
    { n: 4, s: S({ bron: 'Inbound' }), t: 'field:tbron',
      title: { nl: 'Toelichting Bron', en: 'Source details' },
      body: { nl: 'Toelichting Bron is verplicht. Klik op het veld.', en: 'Source details is required. Click the field.' },
      hint: { nl: 'Het veld staat onder Bron en heeft een rood sterretje.', en: 'The field is below Source and has a red asterisk.' } },
    { n: 4, s: S({ bron: 'Inbound', tbronMenu: true }), t: 'tbron:Demo aanvraag',
      title: { nl: 'Kies Demo aanvraag', en: 'Choose Demo aanvraag' },
      body: { nl: 'Sanne vroeg in het webinar om een demo. Kies Demo aanvraag.', en: 'Sanne asked for a demo during the webinar. Choose Demo aanvraag.' },
      hint: { nl: 'Demo aanvraag staat onder Contactaanvraag NL.', en: 'Demo aanvraag is below Contactaanvraag NL.' } },
    { n: 5, s: S({ bron: 'Inbound', tbron: 'Demo aanvraag', unsaved: true }), t: 'field:werk',
      title: { nl: 'Aantal werknemers', en: 'Number of employees' },
      body: { nl: 'De omvang van de klant is vanaf het begin nodig voor een goede inschatting. Klik op Aantal werknemers.', en: 'The size of the customer is needed from the start for a good estimate. Click Number of employees.' },
      hint: { nl: 'Aantal werknemers staat onder Type.', en: 'Number of employees is below Type.' } },
    { n: 6, s: SG({ unsaved: true }), t: 'cmd:save',
      title: { nl: 'Opslaan', en: 'Save' },
      body: { nl: 'Bakkerij De Korenaar heeft 40 werknemers. Klik op Opslaan.', en: 'Bakkerij De Korenaar has 40 employees. Click Save.' },
      hint: { nl: 'Opslaan staat links in de opdrachtbalk.', en: 'Save is on the left of the command bar.' } },
    /* C. Nieuwe klant: fasen */
    { n: 7, s: SG({}), t: 'tab:1',
      title: { nl: 'Fase 1 - Discovery', en: 'Phase 1 - Discovery' },
      body: { nl: 'Elke fase heeft een tabblad met uitleg, criteria en velden. Klik op het tabblad Fase 1 - Discovery.', en: 'Each stage has a tab with an explanation, criteria and fields. Click the Phase 1 - Discovery tab.' },
      hint: { nl: 'De tabbladen staan onder de procesbalk.', en: 'The tabs are below the process bar.' } },
    { n: 8, s: SG({ tab: 1 }), t: 'tab:kans',
      title: { nl: 'Slagingskans', en: 'Probability' },
      body: { nl: 'In Discovery breng je de behoefte in kaart. Slagingskans (%) staat nu al in deze fase en is verplicht: zo staat elke kans vanaf het begin in de forecast. Klik op Slagingskans (%).', en: 'In Discovery you map out the need. Probability (%) is now in this stage and is required, so every opportunity is in the forecast from the start. Click Probability (%).' },
      hint: { nl: 'Slagingskans staat rechts, onder Verwachte sluitingsdatum.', en: 'Probability is on the right, below Est. Close Date.' } },
    { n: 9, s: SG({ tab: 1, scrolled: true, filled: KANS }), t: 'prod:add',
      title: { nl: 'Producten toevoegen', en: 'Add products' },
      body: { nl: 'Onderaan Fase 1 kies je de producten die de klant wil. Die zijn later de basis voor de definitieve kosten. Klik op Producten toevoegen.', en: 'At the bottom of Phase 1 you choose the products the customer wants. They are the basis for the final costs later on. Click Add products.' },
      hint: { nl: 'De knop staat rechtsboven in het blok Gewenste producten.', en: 'The button is at the top right of the Desired products block.' } },
    { n: 9, s: SG({ tab: 1, scrolled: true, filled: KANS, prodDlg: true, dlgSel: [] }), t: 'dlg:add:ABO012',
      title: { nl: 'Kennisplatform', en: 'Knowledge platform' },
      body: { nl: 'Sanne wil het Kennisplatform voor 40 medewerkers. Aantal en prijs staan al goed. Klik bij Kennisplatform op Toevoegen.', en: 'Sanne wants the Knowledge platform for 40 employees. Quantity and price are already correct. Click Add next to Kennisplatform.' },
      hint: { nl: 'Kennisplatform staat onderaan de lijst, met code ABO012.', en: 'Kennisplatform is near the bottom of the list, with code ABO012.' } },
    { n: 9, s: SG({ tab: 1, scrolled: true, filled: KANS, prodDlg: true, dlgSel: ['ABO012'] }), t: 'dlg:add:CON004',
      title: { nl: 'Implementatie begeleiding', en: 'Implementation support' },
      body: { nl: 'Er komt ook eenmalige implementatiebegeleiding bij. Klik bij Implementatie begeleiding op Toevoegen.', en: 'One-off implementation support is added as well. Click Add next to Implementatie begeleiding.' },
      hint: { nl: 'Implementatie begeleiding heeft code CON004.', en: 'Implementatie begeleiding has code CON004.' } },
    { n: 9, s: SG({ tab: 1, scrolled: true, filled: KANS, prodDlg: true, dlgSel: ['ABO012', 'CON004'] }), t: 'dlg:save',
      title: { nl: 'Opslaan in Verkoopkans', en: 'Save in Opportunity' },
      body: { nl: 'Beide producten zijn geselecteerd. Klik op Opslaan in Verkoopkans.', en: 'Both products are selected. Click Save in Opportunity.' },
      hint: { nl: 'De blauwe knop rechtsonder in het venster.', en: 'The blue button at the bottom right of the window.' } },
    { n: 10, s: SG({ tab: 1, scrolled: true, filled: KANS, prods: PRODS }), t: 'bpf:0',
      title: { nl: 'Discovery afronden', en: 'Finish Discovery' },
      body: { nl: 'De producten staan in de lijst. Rond Discovery af in de procesbalk: klik op Discovery.', en: 'The products are in the list. Finish Discovery in the process bar: click Discovery.' },
      hint: { nl: 'Discovery is de eerste cirkel in de procesbalk.', en: 'Discovery is the first circle in the process bar.' } },
    { n: 10, s: SG({ tab: 1, scrolled: true, filled: KANS, prods: PRODS, fly: 0 }), t: 'fly:omzet',
      title: { nl: 'Potenti\u00eble omzet per jaar', en: 'Potential revenue per year' },
      body: { nl: 'Type en Aantal werknemers staan al ingevuld. De potenti\u00eble omzet vul je zelf in: die wordt niet uit de producten berekend. Klik op het veld.', en: 'Type and Number of employees are already filled in. You fill in the potential revenue yourself: it is not calculated from the products. Click the field.' },
      hint: { nl: 'Het derde veld in het venster.', en: 'The third field in the window.' } },
    { n: 10, s: SG({ tab: 1, scrolled: true, filled: { kans: true, omzet: true }, prods: PRODS, fly: 0 }), t: 'fly:sluit',
      title: { nl: 'Verwachte sluitingsdatum', en: 'Est. close date' },
      body: { nl: 'Klik op Verwachte sluitingsdatum: wanneer verwacht je dat de klant tekent?', en: 'Click Est. Close Date: when do you expect the customer to sign?' },
      hint: { nl: 'Het veld onder Potenti\u00eble omzet per jaar.', en: 'The field below Potential revenue per year.' } },
    { n: 10, s: SG({ tab: 1, scrolled: true, filled: { kans: true, omzet: true, sluit: true }, prods: PRODS, fly: 0 }), t: 'fly:duur',
      title: { nl: 'Contractduur', en: 'Contract term' },
      body: { nl: 'Klik op Contractduur # Mnd om de verwachte looptijd in te vullen.', en: 'Click Contract term # months to fill in the expected term.' },
      hint: { nl: 'Het laatste veld in het venster.', en: 'The last field in the window.' } },
    { n: 10, s: SG({ tab: 1, scrolled: true, filled: ALL, prods: PRODS, fly: 0 }), t: 'fly:next',
      title: { nl: 'Volgende fase', en: 'Next Stage' },
      body: { nl: 'De behoefte is helder en de klant wil een demo. Klik op Volgende fase.', en: 'The need is clear and the customer wants a demo. Click Next Stage.' }, hint: NEXT_HINT },
    { n: 11, s: SG({ active: 1, tab: 1, filled: ALL, prods: PRODS }), t: 'tab:2',
      title: { nl: 'Fase 2 - Demo', en: 'Phase 2 - Demo' },
      body: { nl: 'De kans staat op Demo. Klik op het tabblad Fase 2 - Demo.', en: 'The opportunity is in Demo. Click the Phase 2 - Demo tab.' },
      hint: { nl: 'Het tabblad rechts naast Fase 1 - Discovery.', en: 'The tab to the right of Phase 1 - Discovery.' } },
    { n: 12, s: SG({ active: 1, tab: 2, filled: ALL, prods: PRODS }), t: 'bpf:1',
      title: { nl: 'Demo afronden', en: 'Finish Demo' },
      body: { nl: 'Je laat zien hoe de oplossing werkt. Praat de klant ook met andere aanbieders? Koppel dan een concurrent. Door naar Offerte mag als de klant een offerte wil. Klik in de procesbalk op Demo.', en: 'You show how the solution works. Is the customer also talking to other suppliers? Then link a competitor. You may move on to Quote when the customer wants a quote. In the process bar, click Demo.' },
      hint: { nl: 'Demo is de tweede cirkel in de procesbalk.', en: 'Demo is the second circle in the process bar.' } },
    { n: 12, s: SG({ active: 1, tab: 2, filled: ALL, prods: PRODS, fly: 1 }), t: 'fly:next',
      title: { nl: 'Volgende fase', en: 'Next Stage' }, body: NEXT, hint: NEXT_HINT },
    { n: 13, s: SG({ active: 2, tab: 2, filled: ALL, prods: PRODS }), t: 'tab:3',
      title: { nl: 'Fase 3 - Offerte', en: 'Phase 3 - Quote' },
      body: { nl: 'Klik op het tabblad Fase 3 - Offerte.', en: 'Click the Phase 3 - Quote tab.' },
      hint: { nl: 'Het tabblad rechts naast Fase 2 - Demo.', en: 'The tab to the right of Phase 2 - Demo.' } },
    { n: 14, s: SG({ active: 2, tab: 3, filled: ALL, prods: PRODS }), t: 'bpf:2',
      title: { nl: 'Offerte afronden', en: 'Finish Quote' },
      body: { nl: 'Je doet een formeel voorstel. Hier staat alleen nog Speciale condities; het aantal werknemers staat op Algemene informatie. Klik in de procesbalk op Offerte.', en: 'You make a formal proposal. Only Special conditions is left here; the number of employees is on General information. In the process bar, click Quote.' },
      hint: { nl: 'Offerte is de derde cirkel in de procesbalk.', en: 'Quote is the third circle in the process bar.' } },
    { n: 14, s: SG({ active: 2, tab: 3, filled: ALL, prods: PRODS, fly: 2 }), t: 'fly:next',
      title: { nl: 'Volgende fase', en: 'Next Stage' }, body: NEXT, hint: NEXT_HINT },
    { n: 15, s: SG({ active: 3, tab: 3, filled: ALL, prods: PRODS }), t: 'tab:4',
      title: { nl: 'Fase 4 - Onderhandeling', en: 'Phase 4 - Negotiation' },
      body: { nl: 'Klik op het tabblad Fase 4 - Onderhandeling.', en: 'Click the Phase 4 - Negotiation tab.' },
      hint: { nl: 'Het tabblad rechts naast Fase 3 - Offerte.', en: 'The tab to the right of Phase 3 - Quote.' } },
    { n: 16, s: SG({ active: 3, tab: 4, filled: ALL, prods: PRODS }), t: 'bpf:3',
      title: { nl: 'Bedragen komen uit de producten', en: 'Amounts come from the products' },
      body: { nl: 'Definitieve jaarlijkse kosten (ARR), eenmalige kosten en de TCV worden berekend uit de producten en zijn vergrendeld. Klopt een bedrag niet? Pas dan de producten aan. Klik in de procesbalk op Onderhandeling.', en: 'Final annual costs (ARR), one-off costs and the TCV are calculated from the products and are locked. Is an amount wrong? Then change the products. In the process bar, click Negotiation.' },
      hint: { nl: 'Onderhandeling is de vierde cirkel in de procesbalk.', en: 'Negotiation is the fourth circle in the process bar.' } },
    { n: 16, s: SG({ active: 3, tab: 4, filled: ALL, prods: PRODS, fly: 3 }), t: 'fly:next',
      title: { nl: 'Volgende fase', en: 'Next Stage' },
      body: { nl: 'De verplichte velden staan in dit voorbeeld al ingevuld en het contract is getekend. Klik op Volgende fase.', en: 'In this example the required fields are filled in and the contract is signed. Click Next Stage.' }, hint: NEXT_HINT },
    { n: 17, s: SG({ active: 4, tab: 4, filled: ALL, prods: PRODS }), t: 'tab:5',
      title: { nl: 'Fase 5 - Facturatie', en: 'Phase 5 - Invoicing' },
      body: { nl: 'De kans staat op Te Factureren. Klik op het tabblad Fase 5 - Facturatie.', en: 'The opportunity is in To Invoice. Click the Phase 5 - Invoicing tab.' },
      hint: { nl: 'Het tabblad rechts naast Fase 4 - Onderhandeling.', en: 'The tab to the right of Phase 4 - Negotiation.' } },
    { n: 18, s: SG({ active: 4, tab: 5, scrolled: true, filled: ALL, prods: PRODS }), info: true, focus: 'accsec',
      title: { nl: 'Controleer de factuurgegevens', en: 'Check the invoicing details' },
      body: { nl: 'Onderaan Fase 5 staan de factuurgegevens van het account. Controleer ze en vul aan wat ontbreekt. Let op: een wijziging hier geldt voor alle contracten van de klant. Daarna genereert Commercial Ops het contract en haalt de kans binnen namens jou.', en: 'At the bottom of Phase 5 are the account\u2019s invoicing details. Check them and fill in what is missing. Note: a change here applies to all of the customer\u2019s contracts. Commercial Ops then generates the contract and closes the opportunity as won on your behalf.' } },
    /* D. Verlenging */
    { n: 19, s: SG({ active: 4, tab: 5, filled: ALL, prods: PRODS }), t: 'nav:opportunities',
      title: { nl: 'Een verlenging', en: 'A renewal' },
      body: { nl: 'Nu een verlenging bij een bestaande klant. Klik in het menu op Verkoopkansen.', en: 'Now a renewal for an existing customer. In the menu, click Opportunities.' },
      hint: { nl: 'Verkoopkansen staat in het menu links onder Verkoop.', en: 'Opportunities is in the menu on the left, under Sales.' } },
    { n: 19, s: LIST, t: 'cell:1:topic',
      title: { nl: 'Open de verlenging', en: 'Open the renewal' },
      body: { nl: 'Open Zorggroep Lindenhoven | Verlenging.', en: 'Open Zorggroep Lindenhoven | Renewal.' },
      hint: { nl: 'Het is de tweede regel in de lijst.', en: 'It is the second row in the list.' } },
    { n: 20, s: SZ({}), info: true, focus: 'opp:title',
      title: { nl: 'Stilzwijgend verlengen: Ja of Nee', en: 'Tacit renewal: Yes or No' },
      body: { nl: 'Bij een verlenging kies je in Fase 2 altijd of het contract stilzwijgend verlengt. Ja: het contract loopt zonder nieuwe onderhandeling door en de kans springt naar Te Factureren. Nee: je onderhandelt opnieuw en doorloopt Offerte en Onderhandeling, net als bij een nieuwe klant. Zorggroep Lindenhoven verlengt stilzwijgend.', en: 'For a renewal you always choose in Phase 2 whether the contract renews tacitly. Yes: the contract continues without new negotiation and the opportunity jumps to To Invoice. No: you negotiate again and go through Quote and Negotiation, just like a new customer. Zorggroep Lindenhoven renews tacitly.' } },
    { n: 21, s: SZ({}), t: 'bpf:0',
      title: { nl: 'Discovery', en: 'Discovery' },
      body: { nl: 'Bij een verlenging staan de producten en bedragen van het lopende contract al ingevuld. Klik in de procesbalk op Discovery.', en: 'For a renewal the products and amounts of the running contract are already filled in. In the process bar, click Discovery.' },
      hint: { nl: 'Discovery is de eerste cirkel in de procesbalk.', en: 'Discovery is the first circle in the process bar.' } },
    { n: 21, s: SZ({ fly: 0 }), t: 'fly:next',
      title: { nl: 'Volgende fase', en: 'Next Stage' }, body: { nl: 'Alle velden zijn ingevuld. Klik op Volgende fase.', en: 'All fields are filled in. Click Next Stage.' }, hint: NEXT_HINT },
    { n: 22, s: SZ({ active: 1 }), t: 'tab:2',
      title: { nl: 'Fase 2 - In gesprek', en: 'Phase 2 - In discussion' },
      body: { nl: 'Het verlengingsgesprek is begonnen. Klik op het tabblad Fase 2 - In gesprek.', en: 'The renewal conversation has started. Click the Phase 2 - In discussion tab.' },
      hint: { nl: 'Het tabblad rechts naast Fase 1 - Lopend contract.', en: 'The tab to the right of Phase 1 - Running contract.' } },
    { n: 23, s: SZ({ active: 1, tab: 2 }), t: 'tab:stil',
      title: { nl: 'Stilzwijgend verlengen', en: 'Tacit renewal' },
      body: { nl: 'Dit veld is verplicht: je kiest altijd bewust Ja of Nee. De klant verlengt zonder nieuwe onderhandeling. Klik op Ja en kijk wat er met de procesbalk gebeurt.', en: 'This field is required: you always choose Yes or No on purpose. The customer renews without new negotiation. Click Yes and watch what happens to the process bar.' },
      hint: { nl: 'Ja is de linker knop naast Stilzwijgend verlengen.', en: 'Yes is the left button next to Tacit renewal.' } },
    { n: 24, s: SZ({ active: 4, skip: true, tab: 2, stil: 'ja' }), info: true, focus: 'bpf:4',
      title: { nl: 'Direct naar Te Factureren', en: 'Straight to To Invoice' },
      body: { nl: 'Omdat je Ja koos, springt de kans automatisch naar de laatste fase, Te Factureren. Je hoeft niet zelf door de procesbalk: Offerte en Onderhandeling worden overgeslagen. Commercial Ops neemt het vanaf hier over en verlengt het contract.', en: 'Because you chose Yes, the opportunity automatically jumps to the last stage, To Invoice. You do not have to go through the process bar yourself: Quote and Negotiation are skipped. Commercial Ops takes over from here and renews the contract.' } },
    /* E. Afsluiten als gemist */
    { n: 25, s: SZ({ active: 4, skip: true, tab: 2, stil: 'ja' }), t: 'nav:opportunities',
      title: { nl: 'Een kans die niet doorgaat', en: 'An opportunity that will not go ahead' },
      body: { nl: 'Gemeente Lindenhoven laat weten dat ze pas volgend jaar beslissen. Klik in het menu op Verkoopkansen.', en: 'Gemeente Lindenhoven tells you they will only decide next year. In the menu, click Opportunities.' },
      hint: { nl: 'Verkoopkansen staat in het menu links onder Verkoop.', en: 'Opportunities is in the menu on the left, under Sales.' } },
    { n: 25, s: LIST, t: 'cell:2:topic',
      title: { nl: 'Open Gemeente Lindenhoven', en: 'Open Gemeente Lindenhoven' },
      body: { nl: 'Open Gemeente Lindenhoven | Nieuwe Klant.', en: 'Open Gemeente Lindenhoven | New Customer.' },
      hint: { nl: 'Het is de derde regel in de lijst.', en: 'It is the third row in the list.' } },
    { n: 26, s: SM({}), t: 'cmd:lost',
      title: { nl: 'Afsluiten als gemist', en: 'Close as Lost' },
      body: { nl: 'Een kans die niet doorgaat, sluit je zelf af. Klik op Afsluiten als gemist.', en: 'You close an opportunity that will not go ahead yourself. Click Close as Lost.' },
      hint: { nl: 'De knop heeft een rood icoon en staat in de opdrachtbalk.', en: 'The button has a red icon and is in the command bar.' } },
    { n: 27, s: SM({ closeDlg: true }), t: 'close:reason',
      title: { nl: 'Kies de reden', en: 'Choose the reason' },
      body: { nl: 'Klik op het veld Reden van status.', en: 'Click the Status Reason field.' },
      hint: { nl: 'Reden van status is het eerste veld in het paneel rechts.', en: 'Status Reason is the first field in the panel on the right.' } },
    { n: 27, s: SM({ closeDlg: true, reasonMenu: true }), t: 'close:uitgesteld',
      title: { nl: 'Beslissing uitgesteld', en: 'Decision postponed' },
      body: { nl: 'Kies Beslissing uitgesteld naar volgend jaar.', en: 'Choose Decision postponed to next year.' },
      hint: { nl: 'Het is de eerste reden in de lijst.', en: 'It is the first reason in the list.' } },
    { n: 28, s: SM({ closeDlg: true, reason: 'uitgesteld' }), t: 'close:save',
      title: { nl: 'Opslaan en sluiten', en: 'Save & Close' },
      body: { nl: 'Werkelijke omzet staat op \u20ac 0,00 en de sluitingsdatum op vandaag. Klik op Opslaan en sluiten.', en: 'Actual Revenue is \u20ac 0.00 and the close date is today. Click Save & Close.' },
      hint: { nl: 'De blauwe knop staat rechtsonder in het paneel.', en: 'The blue button is at the bottom right of the panel.' } },
    { n: 29, s: SM({ closed: true }), info: true, focus: 'banner',
      title: { nl: 'De kans is gesloten', en: 'The opportunity is closed' },
      body: { nl: 'De verkoopkans is nu alleen-lezen met de status Verloren en staat niet meer in Mijn open verkoopkansen. Komt de klant volgend jaar terug? Dan kun je de kans opnieuw openen.', en: 'The opportunity is now read-only with status Lost and is no longer in My Open Opportunities. If the customer comes back next year, you can reopen it.' } }
  ];
  var TOTAL = 29;

  var QUIZ = [
    { q: { nl: 'Welk verplicht veld op Algemene informatie vul je zelf in na het kwalificeren?', en: 'Which required field on General information do you fill in yourself after qualifying?' },
      o: [{ nl: 'Type', en: 'Type' }, { nl: 'Toelichting Bron', en: 'Source details' }, { nl: 'Onderwerp', en: 'Topic' }, { nl: 'Entiteit', en: 'Entity' }], a: 1,
      x: { nl: 'Toelichting Bron is verplicht en vul je zelf in. Onderwerp wordt automatisch gevuld en Type en Entiteit komen mee uit de lead.', en: 'Source details is required and you fill it in yourself. Topic is filled automatically, and Type and Entity come over from the lead.' } },
    { q: { nl: 'Waar voeg je de producten toe die de klant wil?', en: 'Where do you add the products the customer wants?' },
      o: [{ nl: 'In Fase 1, via Producten toevoegen', en: 'In Phase 1, via Add products' }, { nl: 'In Fase 4, bij Definitieve jaarlijkse kosten', en: 'In Phase 4, at Final annual costs' }, { nl: 'Op het account', en: 'On the account' }, { nl: 'In Fase 5', en: 'In Phase 5' }], a: 0,
      x: { nl: 'Onderaan Fase 1 voeg je de gewenste producten toe. Die zijn de basis voor de bedragen in Fase 4.', en: 'At the bottom of Phase 1 you add the desired products. They are the basis for the amounts in Phase 4.' } },
    { q: { nl: 'Het bedrag bij Definitieve jaarlijkse kosten (ARR) klopt niet. Wat doe je?', en: 'The amount at Final annual costs (ARR) is wrong. What do you do?' },
      o: [{ nl: 'Het bedrag overtypen', en: 'Type over the amount' }, { nl: 'De producten aanpassen', en: 'Change the products' }, { nl: 'Commercial Ops mailen', en: 'Email Commercial Ops' }, { nl: 'Een nieuwe verkoopkans maken', en: 'Create a new opportunity' }], a: 1,
      x: { nl: 'ARR wordt berekend uit de producten en is vergrendeld. Pas de producten aan, dan klopt het bedrag weer.', en: 'ARR is calculated from the products and is locked. Change the products and the amount will be right again.' } },
    { q: { nl: 'Bij een verlenging kies je Stilzwijgend verlengen: Ja. Wat gebeurt er?', en: 'For a renewal you choose Tacit renewal: Yes. What happens?' },
      o: [{ nl: 'Niets, je doorloopt alle fasen', en: 'Nothing, you go through all stages' }, { nl: 'De kans springt naar Te Factureren; Offerte en Onderhandeling vervallen', en: 'The opportunity jumps to To Invoice; Quote and Negotiation are skipped' }, { nl: 'De kans wordt gesloten als gemist', en: 'The opportunity is closed as lost' }, { nl: 'Er wordt een nieuwe lead gemaakt', en: 'A new lead is created' }], a: 1,
      x: { nl: 'Bij een stilzwijgende verlenging is geen offerte of onderhandeling nodig. Commercial Ops neemt het in Te Factureren over.', en: 'A tacit renewal needs no quote or negotiation. Commercial Ops takes over in To Invoice.' } },
    { q: { nl: 'De klant stelt zijn beslissing uit tot volgend jaar. Wat doe je?', en: 'The customer postpones the decision until next year. What do you do?' },
      o: [{ nl: 'De kans laten staan zonder iets te doen', en: 'Leave the opportunity as it is' }, { nl: 'De kans verwijderen', en: 'Delete the opportunity' }, { nl: "Afsluiten als gemist met de reden 'Beslissing uitgesteld naar volgend jaar'", en: "Close as Lost with the reason 'Decision postponed to next year'" }, { nl: 'De kans terugzetten naar Discovery', en: 'Move the opportunity back to Discovery' }], a: 2,
      x: { nl: 'Zo blijft je pijplijn actueel en zie je later terug waarom de kans niet doorging. Verwijderen doe je niet: dan is de geschiedenis weg.', en: 'This keeps your pipeline up to date and shows later why the opportunity did not go ahead. Do not delete it: that removes the history.' } }
  ];

  var UI = {
    nl: { intro: 'In dit onderwerp breng je een verkoopkans verder in de nieuwe schermen: Bron en Toelichting Bron invullen, producten toevoegen, de fasen doorlopen, een verlenging stilzwijgend verlengen en een kans afsluiten als gemist.', parts: ['Openen vanuit de lijst', 'Algemene informatie', 'Nieuwe klant: fasen en producten', 'Verlenging', 'Afsluiten als gemist'], steps: '29 stappen', time: 'Ongeveer 20 minuten' },
    en: { intro: 'In this topic you take an opportunity further in the new screens: fill in Source and Source details, add products, go through the stages, renew a contract tacitly and close an opportunity as lost.', parts: ['Open from the list', 'General information', 'New customer: stages and products', 'Renewal', 'Close as lost'], steps: '29 steps', time: 'About 20 minutes' }
  };

  function OppList(p) {
    var lang = p.lang, isEn = lang === 'en';
    var rows = p.rows.map(function (k) {
      var d = OPPS[k], type = d.kind === 'vl' ? (isEn ? 'Renewal' : 'Verlenging') : (isEn ? 'New Customer' : 'Nieuwe Klant');
      return { topic: d.company + ' | ' + type, customer: d.company, close: d.close, revenue: d.revenue, chance: d.chance, stage: d.stage };
    });
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 } },
      h(D.CommandBar, { preset: 'list', lang: lang }),
      h('div', { className: 'dy-shell__card' },
        h(D.ViewSelector, { lang: lang, title: { nl: 'Mijn open verkoopkansen', en: 'My Open Opportunities' } }),
        h(D.DataGrid, { lang: lang, columns: OPP_COLS, rows: rows, highlight: p.t })));
  }

  function Screen(p) {
    var s = p.step.s, lang = p.lang, t = p.step.t;
    var content = s.view === 'dash' ? h(DI.Dash, { lang: lang, t: t }) : s.view === 'list' ? h(OppList, { lang: lang, rows: s.rows, t: t }) : h(DI.Opp, { lang: lang, t: t, d: OPPS[s.opp], s: s });
    return h(DI.Shell, { lang: lang, t: t, nav: s.nav || 'opportunities' }, content);
  }

  DI.topic = { title: TOPIC, steps: STEPS, total: TOTAL, quiz: QUIZ, ui: UI, badge: 'pijplijnprof', Screen: Screen };
})();
