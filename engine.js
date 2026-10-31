/* Dynamics-instructies \u2014 motor voor \u00e9\u00e9n onderwerp: start, stappen met uitlegballon, toets en resultaat.
   Het onderwerp registreert zich als window.DI.topic: { title, steps, total, quiz, ui, badge, Screen }.
   Losse pagina: de motor start zelf. Met window.DI.hub start de startpagina (hub.js) een onderwerp via DI.TopicApp. */
(function () {
  var DI = window.DI, D = DI.D, h = DI.h, L = DI.L, CW = DI.CW, CH = DI.CH, rectIn = DI.rectIn, place = DI.place;
  var useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useRef = React.useRef;
  var T = DI.topic;
  var PTS = { answer: 20, done: 100, perfect: 50, badge: 25 };
  var UI = {
    nl: { start: 'Starten', quiz: 'Toets van 5 vragen', note: 'Je oefent in een nagebouwde Dynamics-omgeving met verzonnen gegevens. Er verandert niets in het echte Dynamics.', toQuiz: 'Naar de toets', next: 'Verder', tip: 'Klik op de plek die de ballon aanwijst. Een foute klik kost geen punten.', skipped: 'Je hebt stappen overgeslagen. Doe het onderwerp nog eens zonder overslaan voor de bonus van 100 punten.', again: 'Onderwerp opnieuw doen',
      toStart: 'Startpagina', leaveH: 'Terug naar de startpagina?', leaveP: 'Je bent nog bezig. Je voortgang in dit onderwerp gaat verloren; punten krijg je pas na de toets.', stay: 'Nee, verder', leave: 'Ja, terug' },
    en: { start: 'Start', quiz: '5-question quiz', note: 'You practise in a recreated Dynamics environment with made-up data. Nothing changes in the real Dynamics.', toQuiz: 'Go to the quiz', next: 'Continue', tip: 'Click where the callout points. A wrong click costs no points.', skipped: 'You skipped steps. Do the topic again without skipping for the 100-point bonus.', again: 'Do the topic again',
      toStart: 'Start page', leaveH: 'Back to the start page?', leaveP: 'You are still busy. Your progress in this topic will be lost; you only get points after the quiz.', stay: 'No, continue', leave: 'Yes, go back' }
  };
  var BADGE = {
    eerste: { icon: 'star', title: { nl: 'Eerste stap', en: 'First step' }, description: { nl: 'Je eerste onderwerp afgerond.', en: 'Completed your first topic.' } },
    foutloos: { icon: 'fire', title: { nl: 'Foutloos', en: 'Flawless' }, description: { nl: 'Een toets in \u00e9\u00e9n keer foutloos.', en: 'A quiz without mistakes on the first try.' } },
    leadjager: { icon: 'ribbon', title: { nl: 'Leadjager', en: 'Lead hunter' }, description: { nl: 'Potenti\u00eble klanten afgerond.', en: 'Completed Leads.' } },
    pijplijnprof: { icon: 'trophy', title: { nl: 'Pijplijnprof', en: 'Pipeline pro' }, description: { nl: 'Verkoopkansen afgerond.', en: 'Completed Opportunities.' } },
    relatiebeheerder: { icon: 'account', title: { nl: 'Relatiebeheerder', en: 'Relationship keeper' }, description: { nl: 'Accounts afgerond.', en: 'Completed Accounts.' } },
    netwerker: { icon: 'contact', title: { nl: 'Netwerker', en: 'Networker' }, description: { nl: 'Contactpersonen afgerond.', en: 'Completed Contacts.' } },
    planner: { icon: 'appointment', title: { nl: 'Planner', en: 'Planner' }, description: { nl: 'Activiteiten afgerond.', en: 'Completed Activities.' } },
    lijstmeester: { icon: 'views', title: { nl: 'Lijstmeester', en: 'List master' }, description: { nl: 'Weergaven afgerond.', en: 'Completed Views.' } },
    contractkenner: { icon: 'contract', title: { nl: 'Contractkenner', en: 'Contract expert' }, description: { nl: 'Contracten afgerond.', en: 'Completed Contracts.' } },
    halverwege: { icon: 'flag', title: { nl: 'Halverwege', en: 'Halfway' }, description: { nl: '4 van de 7 onderwerpen afgerond.', en: 'Completed 4 of the 7 topics.' } },
    dynamicspro: { icon: 'trophy', title: { nl: 'Dynamics-pro', en: 'Dynamics pro' }, description: { nl: 'Alle 7 onderwerpen afgerond.', en: 'Completed all 7 topics.' } },
    perfectionist: { icon: 'flash', title: { nl: 'Perfectionist', en: 'Perfectionist' }, description: { nl: 'Alle toetsen foutloos.', en: 'All quizzes without mistakes.' } }
  };

  /* ---------- De instructie ---------- */
  /* p (alleen vanuit de startpagina): topic, lang, onLang, initRec, points(rec), award(oud, nieuw), onRecord(rec), onHome */
  function App(p) {
    p = p || {};
    if (p.topic) T = p.topic;
    var st = useState('nl'), lang = p.lang || st[0], setLang = p.onLang || st[1];
    var sp = useState('intro'), phase = sp[0], setPhase = sp[1];
    var si = useState(0), idx = si[0], setIdx = si[1];
    var sw = useState(0), wrong = sw[0], setWrong = sw[1];
    var sk = useState(0), shake = sk[0], setShake = sk[1];
    var ss = useState({}), skipped = ss[0], setSkipped = ss[1];
    var sq = useState({ i: 0, ans: [], sel: null }), quiz = sq[0], setQuiz = sq[1];
    var sr = useState(p.initRec || { best: 0, attempts: 0, perfectFirst: false, done: false, badges: [] }), rec = sr[0], setRec = sr[1];
    var swd = useState(window.innerWidth), vw = swd[0], setVw = swd[1];
    var ui = Object.assign({}, UI[lang], T.ui[lang]);

    useEffect(function () { function r() { setVw(window.innerWidth); } window.addEventListener('resize', r); return function () { window.removeEventListener('resize', r); }; }, []);
    useEffect(function () { window.scrollTo(0, 0); }, [phase]);

    var step = T.steps[idx];
    function go(n) { setWrong(0); setShake(0); setIdx(n); }
    function next() { if (idx < T.steps.length - 1) go(idx + 1); else setPhase('quiz'); }
    function back() { if (idx > 0) go(idx - 1); }
    function skip() { var o = Object.assign({}, skipped); o[idx] = true; setSkipped(o); next(); }
    function miss() { setWrong(function (w) { return w + 1; }); setShake(function (k) { return k + 1; }); }
    function onStageClick(e) {
      if (e.target.closest('.stage__coach')) return;
      if (e.target.closest('.dy-mstep') && !e.target.closest('.dy-mstep__crop')) return;
      e.preventDefault();
      if (step.info) return;
      if (e.target.closest('.dy-pulse--on')) next(); else miss();
    }

    function pointsOf(r) { return p.points ? p.points(r) : r.best * PTS.answer + (r.done ? PTS.done : 0) + (r.perfectFirst ? PTS.perfect : 0) + r.badges.length * PTS.badge; }
    var points = pointsOf(rec);
    function home() { if (p.onHome) p.onHome(); else setPhase('intro'); }
    /* Vanuit de startpagina: midden in de stappen of de toets eerst bevestigen */
    var sc = useState(false), confirmOpen = sc[0], setConfirm = sc[1];
    function leave() { if (p.onHome && (phase === 'steps' || phase === 'quiz')) setConfirm(true); else home(); }
    function leaveScoreboard() { if (phase === 'steps' || phase === 'quiz') setConfirm('board'); else p.onScoreboard(); }
    var header = h('div', { className: 'ins__top' + (p.onHome ? ' ins__top--hub' : '') },
      p.onHome ? h('button', { type: 'button', className: 'ins__back', onClick: leave }, h(D.Icon, { name: 'back', size: 16 }), h('span', null, ui.toStart)) : null,
      h(D.TrainerHeader, {
        lang: lang, onLang: setLang, topic: T.title, points: points,
        step: phase === 'steps' ? step.n : undefined, total: T.total, onHome: leave, onScoreboard: p.onScoreboard ? leaveScoreboard : undefined
      }));
    var confirmBox = confirmOpen ? h('div', { className: 'ins__dim', role: 'dialog', 'aria-modal': true },
      h('div', { className: 'ins__confirm' },
        h('h2', null, ui.leaveH), h('p', null, ui.leaveP),
        h('div', { className: 'card__foot' },
          h('button', { type: 'button', className: 'dy-btn', onClick: function () { setConfirm(false); } }, ui.stay),
          h('button', { type: 'button', className: 'dy-btn dy-btn--primary', onClick: function () { var to = confirmOpen; setConfirm(false); if (to === 'board') p.onScoreboard(); else home(); } }, ui.leave)))) : null;

    var body;
    if (phase === 'intro') {
      body = h('section', { className: 'card' },
        h('h1', null, L(T.title, lang)), h('p', null, ui.intro),
        h('div', { className: 'card__meta' }, h('span', null, h(D.Icon, { name: 'task', size: 16 }), ui.steps), h('span', null, h(D.Icon, { name: 'help', size: 16 }), ui.quiz), h('span', null, h(D.Icon, { name: 'timer', size: 16 }), ui.time)),
        h('ol', { className: 'card__parts' }, ui.parts.map(function (x, i) { return h('li', { key: i }, h('b', null, String.fromCharCode(65 + i)), h('span', null, x)); })),
        h('p', { className: 'card__note' }, ui.note),
        h('div', { className: 'card__foot' }, h('button', { type: 'button', className: 'dy-btn dy-btn--primary', onClick: function () { setSkipped({}); go(0); setPhase('steps'); } }, ui.start, h(D.Icon, { name: 'arrow-right', size: 16 }))));
    } else if (phase === 'steps') {
      body = vw < 640 ? h(MobileView, { key: 'm' + idx, step: step, lang: lang, wrong: wrong, shake: shake, onClick: onStageClick, back: back, skip: skip, next: next, ui: ui, isLast: idx === T.steps.length - 1 })
        : h(DesktopView, { key: 'd' + idx, step: step, lang: lang, wrong: wrong, shake: shake, onClick: onStageClick, back: back, skip: skip, next: next, ui: ui, idx: idx, isLast: idx === T.steps.length - 1 });
    } else if (phase === 'quiz') {
      var q = T.quiz[quiz.i];
      body = h('div', { className: 'ins__wrap', style: { display: 'flex', justifyContent: 'center' } }, h(D.QuizQuestion, {
        lang: lang, index: quiz.i + 1, total: T.quiz.length, topic: T.title, question: q.q, selected: quiz.sel,
        options: q.o.map(function (o, i) { return { id: String(i), label: o }; }),
        onSelect: function (id) { setQuiz(Object.assign({}, quiz, { sel: id })); },
        onNext: function () {
          var ans = quiz.ans.concat([+quiz.sel]);
          if (quiz.i < T.quiz.length - 1) { setQuiz({ i: quiz.i + 1, ans: ans, sel: null }); return; }
          var score = ans.filter(function (a, i) { return a === T.quiz[i].a; }).length;
          var noSkip = Object.keys(skipped).length === 0;
          var r = Object.assign({}, rec);
          var newBadges = [];
          r.attempts += 1;
          r.prevPoints = points;
          r.best = Math.max(r.best, score);
          if (p.award) {
            if (noSkip) r.done = true;
            if (r.attempts === 1 && score === T.quiz.length) r.perfectFirst = true;
            newBadges = p.award(rec, r);
          } else {
            if (noSkip && !r.done) { r.done = true; ['eerste', T.badge].forEach(function (b) { if (r.badges.indexOf(b) < 0) { r.badges = r.badges.concat([b]); newBadges.push(b); } }); }
            if (r.attempts === 1 && score === T.quiz.length) { r.perfectFirst = true; if (r.badges.indexOf('foutloos') < 0) { r.badges = r.badges.concat(['foutloos']); newBadges.push('foutloos'); } }
          }
          r.last = { score: score, ans: ans, newBadges: newBadges, noSkip: noSkip, isBest: rec.attempts > 0 && score > rec.best };
          setRec(r); setQuiz({ i: 0, ans: [], sel: null }); setPhase('result');
          if (p.onRecord) p.onRecord({ best: r.best, attempts: r.attempts, perfectFirst: r.perfectFirst, done: r.done });
        }
      }));
    } else {
      var last = rec.last;
      var nb = last.newBadges[0];
      body = h('div', { className: 'ins__wrap', style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' } },
        h(D.QuizResult, {
          lang: lang, topic: T.title, score: last.score, total: T.quiz.length, points: Math.max(0, points - (rec.prevPoints || 0)), isBest: last.isBest,
          newBadge: nb ? Object.assign({ date: new Date().toLocaleDateString('nl-NL') }, BADGE[nb], { title: L(BADGE[nb].title, lang), description: L(BADGE[nb].description, lang) }) : null,
          items: T.quiz.map(function (q, i) { return { ok: last.ans[i] === q.a, question: q.q, given: q.o[last.ans[i]], correct: q.o[q.a], explanation: q.x }; }),
          onRetry: function () { setPhase('quiz'); },
          onHome: home
        }),
        last.newBadges.length > 1 ? h('div', { className: 'dy-row', style: { justifyContent: 'center' } }, last.newBadges.slice(1).map(function (b) { return h(D.AchievementBadge, { key: b, earned: true, lang: lang, icon: BADGE[b].icon, title: BADGE[b].title, description: BADGE[b].description }); })) : null,
        !last.noSkip ? h('p', { className: 'card__note', style: { maxWidth: '640px', textAlign: 'center' } }, ui.skipped) : null,
        h('button', { type: 'button', className: 'dy-btn', onClick: function () { setSkipped({}); go(0); setPhase('steps'); } }, ui.again));
    }
    return h('div', { className: 'ins' }, header, h('main', { className: 'ins__main' }, body), confirmBox);
  }

  function coachProps(p) {
    var step = p.step, lang = p.lang, ui = p.ui;
    var body = step.info ? h('div', null, L(step.body, lang), h('div', { className: 'coach-go' }, h('button', { type: 'button', onClick: p.next }, p.isLast ? ui.toQuiz : ui.next, h(D.Icon, { name: 'arrow-right', size: 16 })))) : null;
    return {
      lang: lang, title: step.title, body: step.info ? null : step.body, children: body, step: step.n, total: T.total,
      hint: !step.info && p.wrong >= 3 ? step.hint : null, shakeKey: p.shake, onBack: p.back, onSkip: step.info ? p.next : p.skip
    };
  }

  function DesktopView(p) {
    var wrapRef = useRef(null), canRef = useRef(null), coachRef = useRef(null);
    var sc = useState(1), scale = sc[0], setScale = sc[1];
    var sp = useState(null), pos = sp[0], setPos = sp[1];
    useLayoutEffect(function () {
      function measure() {
        var w = wrapRef.current ? wrapRef.current.clientWidth : CW;
        var s = Math.min(1, w / CW, Math.max(0.4, (window.innerHeight - 110) / CH)); setScale(s);
      }
      measure(); window.addEventListener('resize', measure); return function () { window.removeEventListener('resize', measure); };
    }, []);
    useLayoutEffect(function () {
      var can = canRef.current; if (!can) return;
      var el = can.querySelector(p.step.info ? '[data-focus="' + p.step.focus + '"]' : '.dy-pulse--on');
      var coach = coachRef.current;
      if (!el) { if (!pos) setPos({ placement: 'bottom', left: 400, top: 200, beak: 40 }); return; }
      var r = rectIn(el, can, scale);
      var np = place(r, CW, coach ? coach.offsetHeight : 180, p.step.side);
      if (!pos || np.left !== pos.left || np.top !== pos.top || np.beak !== pos.beak || np.placement !== pos.placement) setPos(np);
    });
    var props = coachProps(p);
    if (pos) { props.placement = pos.placement; props.beakOffset = pos.beak; }
    return h('div', { className: 'ins__wrap', ref: wrapRef },
      h('div', { className: 'stage', style: { width: Math.round(CW * scale) + 'px', height: Math.round(CH * scale) + 'px' }, onClickCapture: p.onClick },
        h('div', { ref: canRef, className: 'stage__canvas', style: { transform: 'scale(' + scale + ')' } },
          h(T.Screen, { step: p.step, lang: p.lang }),
          h('div', { ref: coachRef, className: 'stage__coach', style: { left: (pos ? pos.left : -9999) + 'px', top: (pos ? pos.top : 0) + 'px' } }, h(D.Coachmark, props)))),
      h('p', { className: 'stage__tip', style: { width: Math.round(CW * scale) + 'px' } }, p.ui.tip));
  }

  function MobileView(p) {
    var boxRef = useRef(null);
    var sf = useState({ x: 200, y: 40, w: 440, h: 160 }), focus = sf[0], setFocus = sf[1];
    useLayoutEffect(function () {
      var n = 0, id = 0;
      function tick() { if (!measure() && n++ < 30) id = requestAnimationFrame(tick); }
      tick();
      window.addEventListener('resize', tick);
      return function () { cancelAnimationFrame(id); window.removeEventListener('resize', tick); };
    }, [p.step, focus.x, focus.y, focus.w]);
    function measure() {
      var box = boxRef.current; if (!box) return false;
      var can = box.querySelector('.dy-mstep__canvas'); if (!can) return false;
      var el = can.querySelector(p.step.info ? '[data-focus="' + p.step.focus + '"]' : '.dy-pulse--on'); if (!el) return false;
      var m = can.style.transform.match(/scale\(([\d.]+)\)/); var s = m ? +m[1] : 0; if (!s) return false;
      var a = el.getBoundingClientRect(), b = can.getBoundingClientRect();
      var ex = (a.left - b.left) / s, ey = (a.top - b.top) / s, ew = a.width / s, eh = a.height / s;
      var fw = Math.max(360, Math.min(560, ew + 200)), fh = Math.max(150, eh + 110);
      var nf = { x: Math.max(0, Math.min(CW - fw, ex + ew / 2 - fw / 2)), y: Math.max(0, Math.min(CH - fh, ey + eh / 2 - fh / 2)), w: fw, h: fh };
      if (Math.abs(nf.x - focus.x) > 1 || Math.abs(nf.y - focus.y) > 1 || Math.abs(nf.w - focus.w) > 1) setFocus(nf);
      return true;
    }
    var props = coachProps(p);
    var body = props.children || L(p.step.body, p.lang);
    return h('div', { ref: boxRef, onClickCapture: p.onClick },
      h(D.MobileStep, { lang: p.lang, topic: T.title, step: p.step.n, total: T.total, title: p.step.title, body: body, hint: props.hint,
        screen: h('div', { style: { width: CW + 'px', height: CH + 'px', background: 'var(--canvas)' } }, h(T.Screen, { step: p.step, lang: p.lang })),
        canvasWidth: CW, focus: focus, onBack: p.back, onSkip: props.onSkip }),
      h('p', { className: 'stage__tip', style: { textAlign: 'center' } }, p.lang === 'en' ? 'Tap where the step tells you to, inside the screen crop.' : 'Tik in de uitsnede op de plek die de stap noemt.'));
  }

  DI.TopicApp = App; DI.BADGE = BADGE; DI.PTS = PTS;
  if (!DI.hub) ReactDOM.createRoot(document.getElementById('app')).render(h(App));
})();
