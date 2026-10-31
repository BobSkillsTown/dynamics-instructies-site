/* Dynamics-instructies \u2014 beheerpagina voor het scoreboard op GitHub Pages.
   Leest scores.json, voegt geplakte resultaatcodes toe en biedt het nieuwe bestand aan als download.
   Er wordt niets online opgeslagen: de beheerder uploadt het bestand zelf in GitHub. */
(function () {
  var C = window.DICodes;
  var state = { players: {}, updated: '', loaded: false, results: [] };
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function fmt(iso) { return iso ? new Date(iso).toLocaleString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '\u2013'; }

  function render() {
    $('updated').textContent = state.loaded ? fmt(state.updated) : 'nog niet geladen';
    var list = $('players'); list.textContent = '';
    var ids = Object.keys(state.players).sort(function (a, b) { return C.totals(state.players[b].topics).pts - C.totals(state.players[a].topics).pts; });
    $('count').textContent = ids.length + (ids.length === 1 ? ' collega' : ' collega\u2019s');
    if (!ids.length) list.appendChild(el('p', 'hub__muted', 'Nog geen scores.'));
    ids.forEach(function (id) {
      var p = state.players[id], t = C.totals(p.topics);
      var row = el('div', 'hub__mrow');
      row.appendChild(el('span', null, p.name));
      row.appendChild(el('span', null, t.pts + ' punten \u00b7 ' + t.done + '/7'));
      var b = el('button', 'dy-btn', 'Verwijderen'); b.type = 'button';
      b.onclick = function () { delete state.players[id]; state.dirty = true; render(); };
      row.appendChild(b);
      list.appendChild(row);
    });
    var res = $('results'); res.textContent = '';
    state.results.forEach(function (r) { res.appendChild(el('p', r.ok ? 'hub__muted' : 'hub__err', r.text)); });
    $('download').disabled = !state.dirty;
    $('dirty').hidden = !state.dirty;
  }

  function load() {
    fetch('scores.json?t=' + Date.now()).then(function (r) { return r.ok ? r.json() : { players: {} }; }).then(function (j) {
      state.players = (j && j.players) || {}; state.updated = (j && j.updated) || ''; state.loaded = true; render();
    }).catch(function () { state.loaded = true; render(); });
  }

  function process() {
    var lines = $('codes').value.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    state.results = lines.map(function (line) {
      var d = C.decode(line);
      if (!d) return { ok: false, text: '\u2717 Klopt niet: ' + line };
      var id = C.slug(d.name), old = state.players[id];
      state.players[id] = { name: d.name, topics: d.topics };
      state.dirty = true;
      return { ok: true, text: '\u2713 ' + d.name + ': ' + C.totals(d.topics).pts + ' punten' + (old ? ' (vervangt eerdere score)' : '') };
    });
    $('codes').value = '';
    render();
  }

  function download() {
    state.updated = new Date().toISOString();
    var json = JSON.stringify({ updated: state.updated, players: state.players }, null, 2) + '\n';
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = 'scores.json';
    document.body.appendChild(a); a.click(); a.remove();
    state.dirty = false; render();
  }

  $('process').onclick = process;
  $('download').onclick = download;
  load();
})();
