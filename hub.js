/* Dynamics-instructies \u2014 startpagina met alle onderwerpen, badges en het centrale scoreboard.
   Scores staan in de db van dit artifact: scores/<id> = { topics: { <onderwerp>: { best, attempts, perfectFirst, done } } }.
   Iedereen leest alle scores; ieder schrijft alleen het eigen document. Alleen ids worden opgeslagen, namen worden bij het tonen opgezocht. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  var BADGE = DI.BADGE, PTS = DI.PTS;
  var ORDER = ['pk', 'vk', 'ac', 'ct', 'at', 'vw', 'co'];
  var META = {
    pk: { icon: 'lead', desc: { nl: 'Een binnengekomen lead opvolgen: status bijwerken, kwalificeren of diskwalificeren.', en: 'Follow up an incoming lead: update the status, qualify or disqualify.' } },
    vk: { icon: 'opportunity', desc: { nl: 'Een verkoopkans door de fasen brengen, een verlenging en afsluiten als gemist.', en: 'Take an opportunity through the stages, a renewal and close as lost.' } },
    ac: { icon: 'account', desc: { nl: 'Een account opzoeken, bijwerken, aanmaken en de gerelateerde records bekijken.', en: 'Find, update and create an account and view its related records.' } },
    ct: { icon: 'contact', desc: { nl: 'Contactpersonen opzoeken, bijwerken en aanmaken vanuit het account.', en: 'Find, update and create contacts from the account.' } },
    at: { icon: 'activity', desc: { nl: 'Afspraak, taak of telefoongesprek: wanneer gebruik je wat en hoe leg je het vast.', en: 'Appointment, task or phone call: when to use which and how to record it.' } },
    vw: { icon: 'views', desc: { nl: 'Weergaven wisselen, filteren, sorteren, kolommen toevoegen en een eigen weergave opslaan.', en: 'Switch views, filter, sort, add columns and save your own view.' } },
    co: { icon: 'contract', desc: { nl: 'Contracten en contractregels bekijken via het account.', en: 'View contracts and contract lines through the account.' } }
  };
  var UI = {
    nl: { hello: 'Welkom', helloName: 'Welkom, ', intro: 'Leer werken met Dynamics 365 Sales in zeven korte onderwerpen. Je oefent in een nagebouwde omgeving met verzonnen gegevens; er verandert niets in het echte Dynamics. Elk onderwerp sluit af met een toets van 5 vragen.',
      cont: 'Ga verder met: ', allDone: 'Je hebt alle onderwerpen afgerond. Goed gedaan!', topicsH: 'Onderwerpen', badgesH: 'Mijn badges', back: 'Terug naar de startpagina',
      local: 'Je punten worden alleen in deze browser bewaard en tellen niet mee in het scoreboard.', readonly: 'Je kunt de instructies volgen, maar je punten worden niet bewaard. Vraag de eigenaar om je de rechten Bijdrager te geven.',
      loading: 'Scoreboard laden\u2026', slow: 'Het scoreboard is nog niet bereikbaar. Je kunt gewoon verder.', empty: 'Nog niemand op het scoreboard. Rond een onderwerp af en sta bovenaan!', notOn: 'Je staat er nog niet op: rond een onderwerp af.', colleague: 'Collega',
      howH: 'Zo verdien je punten', how: ['20 per goed antwoord (je beste score telt)', '100 per onderwerp dat je zonder overslaan afrondt', '50 extra voor een toets die in \u00e9\u00e9n keer foutloos is', '25 per badge'],
      codeH: 'Mijn resultaatcode', codeIntro: 'Wil je toch op het scoreboard? Vul je voornaam in, kopieer de code en stuur hem naar Bob Andringa (Teams of e-mail). De code groeit mee: na een nieuw onderwerp stuur je gewoon de nieuwe code.',
      nameL: 'Voornaam', copy: 'Kopieer code', copied: 'Gekopieerd', noProgress: 'Rond eerst een onderwerp af; dan verschijnt hier je code.', needName: 'Vul eerst je voornaam in.',
      enterH: 'Score invoeren', enterIntro: 'Plak hier de resultaatcode van een collega zonder Claude-account. Een nieuwere code met dezelfde voornaam vervangt de oude.', codeL: 'Resultaatcode',
      invalid: 'Deze code klopt niet. Controleer of hij helemaal is gekopieerd.', add: 'Toevoegen aan scoreboard', added: 'Toegevoegd aan het scoreboard.', failed: 'Opslaan lukte niet. Probeer het nog eens.',
      listH: 'Ingevoerde scores', remove: 'Verwijderen', ptsL: 'punten', doneL: 'onderwerpen afgerond',
      staticNote: 'Je punten staan in deze browser. Wil je op het scoreboard? Stuur je resultaatcode naar Bob Andringa.', updatedL: 'Scoreboard bijgewerkt op ', notOnStatic: 'Je staat er nog niet op: stuur je resultaatcode naar Bob Andringa.' },
    en: { hello: 'Welcome', helloName: 'Welcome, ', intro: 'Learn to work with Dynamics 365 Sales in seven short topics. You practise in a recreated environment with made-up data; nothing changes in the real Dynamics. Each topic ends with a 5-question quiz.',
      cont: 'Continue with: ', allDone: 'You have completed all topics. Well done!', topicsH: 'Topics', badgesH: 'My badges', back: 'Back to the start page',
      local: 'Your points are only kept in this browser and do not count for the scoreboard.', readonly: 'You can follow the instructions, but your points are not saved. Ask the owner to give you Contributor access.',
      loading: 'Loading scoreboard\u2026', slow: 'The scoreboard cannot be reached yet. You can carry on.', empty: 'Nobody on the scoreboard yet. Complete a topic and be first!', notOn: 'You are not on it yet: complete a topic.', colleague: 'Colleague',
      howH: 'How to earn points', how: ['20 per correct answer (your best score counts)', '100 per topic completed without skipping', '50 extra for a quiz without mistakes on the first try', '25 per badge'],
      codeH: 'My result code', codeIntro: 'Want to be on the scoreboard anyway? Enter your first name, copy the code and send it to Bob Andringa (Teams or email). The code grows with you: after a new topic, just send the new code.',
      nameL: 'First name', copy: 'Copy code', copied: 'Copied', noProgress: 'Complete a topic first; your code will then appear here.', needName: 'Enter your first name first.',
      enterH: 'Enter a score', enterIntro: 'Paste the result code of a colleague without a Claude account. A newer code with the same first name replaces the old one.', codeL: 'Result code',
      invalid: 'This code is not valid. Check that it was copied completely.', add: 'Add to scoreboard', added: 'Added to the scoreboard.', failed: 'Saving failed. Please try again.',
      listH: 'Entered scores', remove: 'Remove', ptsL: 'points', doneL: 'topics completed',
      staticNote: 'Your points are kept in this browser. Want to be on the scoreboard? Send your result code to Bob Andringa.', updatedL: 'Scoreboard updated on ', notOnStatic: 'You are not on it yet: send your result code to Bob Andringa.' }
  };

  /* ---------- Punten en badges ---------- */
  var totals = window.DICodes.totals;
  function topicPts(r) { return r ? (r.best || 0) * PTS.answer + (r.done ? PTS.done : 0) + (r.perfectFirst ? PTS.perfect : 0) : 0; }
  function clean(r) { return { best: r.best || 0, attempts: r.attempts || 0, perfectFirst: !!r.perfectFirst, done: !!r.done }; }
  /* Resultaatcodes en puntentelling: gedeeld met de beheerpagina (codes.js) */
  var encodeCode = window.DICodes.encode, decodeCode = window.DICodes.decode, slug = window.DICodes.slug;
  var LN = 'dynamics-instructies:naam';
  function loadName() { try { return localStorage.getItem(LN) || ''; } catch (e) { return ''; } }
  function saveName(v) { try { localStorage.setItem(LN, v); } catch (e) { /* geen opslag beschikbaar */ } }
  var LS = 'dynamics-instructies:scores';
  function loadLocal() { try { return JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch (e) { return {}; } }
  function saveLocal(t) { try { localStorage.setItem(LS, JSON.stringify(t)); } catch (e) { /* geen opslag beschikbaar */ } }

  /* ---------- De startpagina ---------- */
  function Hub() {
    var sl = useState('nl'), lang = sl[0], setLang = sl[1];
    var sr = useState(location.hash === '#scoreboard' ? 'board' : 'home'), route = sr[0], setRoute = sr[1];
    var sm = useState(loadLocal), mine = sm[0], setMine = sm[1];
    var sa = useState({}), all = sa[0], setAll = sa[1];
    var ss = useState('loading'), status = ss[0], setStatus = ss[1];
    var sn = useState({}), names = sn[0], setNames = sn[1];
    var su = useState(null), uid = su[0], setUid = su[1];
    var sme = useState(''), myName = sme[0], setMyName = sme[1];
    var api = useRef({ db: null, user: null, readonly: false });
    var smn = useState({}), manual = smn[0], setManual = smn[1];
    var so = useState(false), isOwner = so[0], setIsOwner = so[1];
    var sln = useState(loadName), localName = sln[0], setLocalName = sln[1];
    var scp = useState(false), copied = scp[0], setCopied = scp[1];
    var sci = useState(''), codeIn = sci[0], setCodeIn = sci[1];
    var smsg = useState(''), msg = smsg[0], setMsg = smsg[1];
    var sup = useState(''), updated = sup[0], setUpdated = sup[1];
    var ui = UI[lang], isEn = lang === 'en';

    useEffect(function () {
      var off = null, off2 = null, timer = null, stopped = false;
      (async function () {
        var c = window.claude;
        var db = c && c.use ? await c.use('db') : null;
        var user = c && c.use ? await c.use('user') : null;
        if (stopped) return;
        var id = user ? await user.id() : null;
        if (!db || !id) {
          /* Zonder Claude (bijv. GitHub Pages): scoreboard uit scores.json, door de beheerder bijgewerkt */
          setStatus('local');
          fetch('scores.json?t=' + Date.now()).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
            if (stopped || !j || !j.players) return;
            var m = {};
            Object.keys(j.players).forEach(function (k) { var v = j.players[k]; if (v && v.name && v.topics) m[k] = { name: String(v.name), topics: v.topics }; });
            setManual(m); setUpdated(j.updated || ''); setStatus('static');
          }).catch(function () { /* geen scores.json: alleen eigen punten */ });
          return;
        }
        api.current.db = db; api.current.user = user;
        setUid(id);
        var me = await user.me(); setMyName(me.name || '');
        setIsOwner(await user.isOwner());
        var can = await user.can('data.write');
        if (can === false) { api.current.readonly = true; setStatus('readonly'); }
        timer = setTimeout(function () { setStatus(function (s) { return s === 'loading' ? 'slow' : s; }); }, 10000);
        off = db.collection('scores').onSnapshot(function (snap) {
          var m = {};
          snap.docs.forEach(function (d) { var v = d.data(); if (v && v.topics) m[d.id] = v.topics; });
          setAll(m);
          if (m[id]) setMine(m[id]);
          if (!snap.metadata.fromCache) { clearTimeout(timer); setStatus(function (s) { return s === 'readonly' ? s : 'ok'; }); }
        }, function () { clearTimeout(timer); setStatus(function (s) { return s === 'readonly' ? s : 'slow'; }); });
        off2 = db.collection('manual').onSnapshot(function (snap) {
          var m = {};
          snap.docs.forEach(function (d) { var v = d.data(); if (v && v.topics && v.name) m[d.id] = { name: String(v.name), topics: v.topics }; });
          setManual(m);
        }, function () { /* zonder handmatige scores gaat het scoreboard gewoon door */ });
      })();
      return function () { stopped = true; if (off) off(); if (off2) off2(); clearTimeout(timer); };
    }, []);

    /* Namen bij de ids op het scoreboard: steeds opnieuw opzoeken, nooit opslaan */
    var ids = Object.keys(all).sort().join(',');
    useEffect(function () {
      var user = api.current.user; if (!user || !ids) return;
      user.profiles(ids.split(',')).then(function (ps) {
        var m = {}; Object.keys(ps).forEach(function (k) { m[k] = ((ps[k].name || '').trim().split(/\s+/)[0]) || ''; }); setNames(m);
      });
    }, [ids]);

    useEffect(function () { window.scrollTo(0, 0); }, [route]);

    function record(key, r) {
      var next = Object.assign({}, mine); next[key] = clean(r);
      setMine(next); saveLocal(next);
      var a = api.current;
      if (a.db && uid && !a.readonly) {
        a.db.doc('scores/' + uid).set({ topics: next, updated: Date.now() }).catch(function (e) {
          if (e && e.code === 'invalid_argument') { a.readonly = true; setStatus('readonly'); }
        });
      }
    }

    var my = totals(mine);
    var nextKey = ORDER.filter(function (k) { return !(mine[k] && mine[k].done); })[0];
    var board = Object.keys(all).map(function (id) { var tt = totals(all[id]); return { id: id, points: tt.pts, done: tt.done, badges: tt.badges }; })
      .concat(Object.keys(manual).map(function (id) { var tt = totals(manual[id].topics); return { id: 'm:' + id, label: manual[id].name, points: tt.pts, done: tt.done, badges: tt.badges }; }))
      .filter(function (e) { return e.points > 0; })
      .sort(function (a, b) { return b.points - a.points || b.done - a.done; })
      .map(function (e, i) { return { rank: i + 1, id: e.id, name: e.label || names[e.id] || ui.colleague, points: e.points, done: e.done, badges: e.badges.map(function (b) { return BADGE[b].icon; }) }; });
    var meId = status === 'static' ? (localName.trim() ? 'm:' + slug(localName.trim()) : null) : uid;
    var meEntry = board.filter(function (e) { return e.id === meId; })[0] || null;

    function open(k) { setRoute(k); }
    function home() { setRoute('home'); if (location.hash) history.replaceState(null, '', location.pathname + location.search); }
    function toBoard() { setRoute('board'); }

    if (DI.topics[route]) {
      var key = route, T = DI.topics[key];
      var base = mine[key] ? Object.assign({ badges: [] }, mine[key]) : null;
      return h(DI.TopicApp, {
        key: key, topic: T, lang: lang, onLang: setLang, initRec: base,
        points: function (r) { var t = Object.assign({}, mine); t[key] = r; return totals(t).pts; },
        award: function (oldR, newR) {
          var a = Object.assign({}, mine); a[key] = oldR; var b = Object.assign({}, mine); b[key] = newR;
          var before = totals(a).badges; return totals(b).badges.filter(function (x) { return before.indexOf(x) < 0; });
        },
        onRecord: function (r) { record(key, r); }, onHome: home, onScoreboard: toBoard
      });
    }

    var header = h('div', { className: 'ins__top' }, h(D.TrainerHeader, { lang: lang, onLang: setLang, points: my.pts, onHome: home, onScoreboard: toBoard }));
    var note = status === 'local' ? ui.local : status === 'readonly' ? ui.readonly : status === 'static' ? ui.staticNote : null;
    var showCode = status === 'local' || status === 'readonly' || status === 'static';
    var code = localName.trim() && my.pts > 0 ? encodeCode(localName, mine) : '';
    function copyCode() {
      var done = function () { setCopied(true); setTimeout(function () { setCopied(false); }, 2000); };
      try { navigator.clipboard.writeText(code).then(done, function () { selectCode(); }); } catch (e) { selectCode(); }
    }
    function selectCode() { var el = document.getElementById('hub-code'); if (el) { el.focus(); el.select(); } }
    var parsed = codeIn.trim() ? decodeCode(codeIn) : null;
    function addCode() {
      var db = api.current.db; if (!db || !parsed) return;
      db.doc('manual/' + slug(parsed.name)).set({ name: parsed.name, topics: parsed.topics, updated: Date.now() })
        .then(function () { setCodeIn(''); setMsg(ui.added); }, function () { setMsg(ui.failed); });
    }
    function removeManual(id) { var db = api.current.db; if (db) db.doc('manual/' + id).delete().catch(function () { setMsg(ui.failed); }); }
    var codeBlock = showCode ? h('section', { className: 'hub__box' },
      h('h2', null, ui.codeH), h('p', null, ui.codeIntro),
      h('label', { className: 'hub__field' }, h('span', null, ui.nameL),
        h('input', { type: 'text', value: localName, maxLength: 40, onChange: function (e) { setLocalName(e.target.value); saveName(e.target.value); } })),
      my.pts <= 0 ? h('p', { className: 'hub__muted' }, ui.noProgress) : !localName.trim() ? h('p', { className: 'hub__muted' }, ui.needName)
        : h('div', { className: 'hub__code' }, h('input', { id: 'hub-code', type: 'text', readOnly: true, value: code, onFocus: function (e) { e.target.select(); } }),
          h('button', { type: 'button', className: 'dy-btn dy-btn--primary', onClick: copyCode }, h(D.Icon, { name: copied ? 'checkmark' : 'open', size: 16 }), copied ? ui.copied : ui.copy))) : null;
    var ownerBlock = isOwner && api.current.db ? h('section', { className: 'hub__box' },
      h('h2', null, ui.enterH), h('p', null, ui.enterIntro),
      h('label', { className: 'hub__field' }, h('span', null, ui.codeL),
        h('input', { type: 'text', value: codeIn, placeholder: 'DI-\u2026', onChange: function (e) { setCodeIn(e.target.value); setMsg(''); } })),
      codeIn.trim() && !parsed ? h('p', { className: 'hub__err' }, ui.invalid) : null,
      parsed ? h('div', { className: 'hub__preview' }, h('b', null, parsed.name), ' \u00b7 ' + totals(parsed.topics).pts + ' ' + ui.ptsL + ' \u00b7 ' + totals(parsed.topics).done + '/7 ' + ui.doneL,
        h('button', { type: 'button', className: 'dy-btn dy-btn--primary', onClick: addCode }, ui.add)) : null,
      msg ? h('p', { className: 'hub__muted' }, msg) : null,
      Object.keys(manual).length ? h('div', { className: 'hub__manual' }, h('b', null, ui.listH),
        Object.keys(manual).sort().map(function (id) {
          var tt = totals(manual[id].topics);
          return h('div', { key: id, className: 'hub__mrow' }, h('span', null, manual[id].name), h('span', null, tt.pts + ' ' + ui.ptsL + ' \u00b7 ' + tt.done + '/7'),
            h('button', { type: 'button', className: 'dy-btn', onClick: function () { removeManual(id); } }, ui.remove));
        })) : null) : null;
    var lb = function (variant) {
      if (status === 'local') return null;
      return h('div', { className: 'hub__lb' },
        h(D.Leaderboard, { lang: lang, variant: variant, entries: board, me: meEntry, onOpen: variant === 'full' ? null : toBoard }),
        status === 'loading' && !board.length ? h('p', { className: 'hub__muted' }, ui.loading) : status === 'slow' && !board.length ? h('p', { className: 'hub__muted' }, ui.slow)
          : !board.length ? h('p', { className: 'hub__muted' }, ui.empty) : !meEntry ? h('p', { className: 'hub__muted' }, status === 'static' ? ui.notOnStatic : ui.notOn) : null,
        status === 'static' && updated ? h('p', { className: 'hub__muted' }, ui.updatedL + new Date(updated).toLocaleDateString(lang === 'en' ? 'en-GB' : 'nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })) : null);
    };

    if (route === 'board') {
      return h('div', { className: 'ins' }, header, h('main', { className: 'ins__main' },
        h('div', { className: 'hub hub--board' },
          h('button', { type: 'button', className: 'dy-btn hub__back', onClick: home }, h(D.Icon, { name: 'back', size: 16 }), ui.back),
          note ? h('p', { className: 'hub__note' }, h(D.Icon, { name: 'help', size: 16 }), note) : null,
          lb('full') || h('p', { className: 'hub__muted' }, ui.local))));
    }

    var badgeKeys = ['eerste', 'foutloos'].concat(ORDER.map(function (k) { return DI.topics[k].badge; })).concat(['halverwege', 'dynamicspro', 'perfectionist']);
    return h('div', { className: 'ins' }, header, h('main', { className: 'ins__main' },
      h('div', { className: 'hub' },
        h('section', { className: 'hub__hero' },
          h('div', null,
            h('h1', null, myName ? ui.helloName + myName.split(/\s+/)[0] : ui.hello),
            h('p', null, ui.intro),
            nextKey ? h('button', { type: 'button', className: 'dy-btn dy-btn--primary', onClick: function () { open(nextKey); } }, ui.cont + L(DI.topics[nextKey].title, lang), h(D.Icon, { name: 'arrow-right', size: 16 }))
              : h('p', { className: 'hub__done' }, h(D.Icon, { name: 'trophy', size: 16 }), ui.allDone)),
          h('div', { className: 'hub__how' }, h('b', null, ui.howH), h('ul', null, ui.how.map(function (x, i) { return h('li', { key: i }, x); })))),
        note ? h('p', { className: 'hub__note' }, h(D.Icon, { name: 'help', size: 16 }), note) : null,
        codeBlock, ownerBlock,
        h('div', { className: 'hub__grid' },
          h('section', { className: 'hub__topics' },
            h('h2', null, ui.topicsH),
            h('div', { className: 'hub__tiles' }, ORDER.map(function (k, i) {
              var T = DI.topics[k], r = mine[k];
              var st = r && r.done ? 'done' : r && r.attempts ? 'progress' : 'new';
              return h(D.TopicTile, { key: k, lang: lang, number: i + 1, icon: META[k].icon, title: T.title, description: META[k].desc, steps: T.total, questions: T.quiz.length,
                status: st, progress: st === 'progress' ? 0.5 : 0, points: topicPts(r), next: k === nextKey, onOpen: function () { open(k); } });
            }))),
          h('aside', { className: 'hub__side' },
            h(D.RouteOverview, { lang: lang, current: nextKey ? ORDER.indexOf(nextKey) : -1, onOpen: function (i) { open(ORDER[i]); },
              topics: ORDER.map(function (k) { return { title: DI.topics[k].title, status: mine[k] && mine[k].done ? 'done' : 'new' }; }) }),
            lb('compact'))),
        h('section', { className: 'hub__badges' },
          h('h2', null, ui.badgesH, h('span', { className: 'hub__count' }, my.badges.length + ' / ' + badgeKeys.length)),
          h('div', { className: 'hub__badgegrid' }, badgeKeys.map(function (b) {
            return h(D.AchievementBadge, { key: b, lang: lang, earned: my.badges.indexOf(b) >= 0, icon: BADGE[b].icon, title: BADGE[b].title, description: BADGE[b].description });
          }))))));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(Hub));
})();
