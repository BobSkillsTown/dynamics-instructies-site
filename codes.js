/* Dynamics-instructies \u2014 resultaatcodes en puntentelling, gedeeld door de startpagina en de beheerpagina.
   Code: DI-<per onderwerp: beste score + vlaggen (1 = afgerond, 2 = foutloos)>-<controle>-<voornaam>.
   Het controlegetal vangt tikfouten af, geen fraude. */
(function () {
  var ORDER = ['pk', 'vk', 'ac', 'ct', 'at', 'vw', 'co'];
  var TOPIC_BADGE = { pk: 'leadjager', vk: 'pijplijnprof', ac: 'relatiebeheerder', ct: 'netwerker', at: 'planner', vw: 'lijstmeester', co: 'contractkenner' };
  var PTS = { answer: 20, done: 100, perfect: 50, badge: 25 };

  function fnv(str) { var x = 0x811c9dc5; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; } return x; }
  function check(d, nm) { return ('000' + (fnv(d + '|' + nm) % 46656).toString(36).toUpperCase()).slice(-3); }
  function cleanName(nm) { return String(nm || '').trim().replace(/\s+/g, ' ').slice(0, 40); }

  function encode(name, topics) {
    topics = topics || {};
    var d = ORDER.map(function (k) { var r = topics[k] || {}; return String(r.best || 0) + String((r.done ? 1 : 0) + (r.perfectFirst ? 2 : 0)); }).join('');
    var nm = cleanName(name);
    return 'DI-' + d + '-' + check(d, nm) + '-' + nm;
  }
  function decode(str) {
    var m = /^DI-([0-9]{14})-([0-9A-Za-z]{3})-(.+)$/.exec(String(str || '').trim());
    if (!m) return null;
    var d = m[1], nm = cleanName(m[3]);
    if (!nm || check(d, nm) !== m[2].toUpperCase()) return null;
    var t = {}, ok = true;
    ORDER.forEach(function (k, i) {
      var b = +d[2 * i], f = +d[2 * i + 1];
      if (b > 5 || f > 3) ok = false;
      if (b || f) t[k] = { best: b, attempts: 1, done: !!(f & 1), perfectFirst: !!(f & 2) };
    });
    return ok ? { name: nm, topics: t } : null;
  }
  function slug(nm) { return String(nm).toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '').slice(0, 40) || ('naam' + fnv(String(nm))); }

  /* Punten en badges uit de voortgang per onderwerp */
  function totals(topics) {
    topics = topics || {};
    var pts = 0, badges = [], done = 0, perfectAny = false, allFive = true;
    ORDER.forEach(function (k) {
      var r = topics[k] || {};
      pts += (r.best || 0) * PTS.answer + (r.done ? PTS.done : 0) + (r.perfectFirst ? PTS.perfect : 0);
      if (r.done) { done++; badges.push(TOPIC_BADGE[k]); }
      if (r.perfectFirst) perfectAny = true;
      if ((r.best || 0) < 5) allFive = false;
    });
    if (done >= 1) badges.unshift('eerste');
    if (perfectAny) badges.splice(done >= 1 ? 1 : 0, 0, 'foutloos');
    if (done >= 4) badges.push('halverwege');
    if (done === ORDER.length) badges.push('dynamicspro');
    if (allFive) badges.push('perfectionist');
    return { pts: pts + badges.length * PTS.badge, badges: badges, done: done };
  }

  window.DICodes = { ORDER: ORDER, PTS: PTS, encode: encode, decode: decode, slug: slug, totals: totals };
})();
