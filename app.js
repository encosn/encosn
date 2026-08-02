/* 중학교 정보 수업 활동 모음 — 화면 그리기
 *
 * data.js 의 window.CURRICULUM 하나를 읽어서
 *  · 메인페이지(index.html)      → 단원 카드 5개 + 선생님용 도구
 *  · 단원 페이지(unit1~5.html)   → 활동 목록 + 그 단원의 성취기준
 * 을 그린다. 어느 쪽을 그릴지는 <body> 에 data-unit 이 있는지로 판단한다.
 *
 * ES 모듈이 아닌 보통 <script src> 로 넣었다. 그래야 서버 없이
 * index.html 을 그냥 더블클릭해도 열린다.
 */
(function () {
  'use strict';

  var C = window.CURRICULUM;

  /* 요소를 하나 만든다. 글자는 textContent 로만 넣는다(HTML 로 해석되지 않게) */
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function unitById(no) {
    for (var i = 0; i < C.units.length; i++) {
      if (C.units[i].no === Number(no)) return C.units[i];
    }
    return null;
  }

  /* ── 활동 카드 하나 ─────────────────────────────────── */
  function activityCard(act) {
    var ready = act.status === 'ready' && act.url;
    var card = el('div', 'act-card' + (ready ? '' : ' soon'));

    card.appendChild(el('div', 'act-icon', act.emoji || '📘'));

    var body = el('div', 'act-body');
    body.appendChild(el('h3', 'act-title', act.title));
    if (act.desc) body.appendChild(el('p', 'act-desc', act.desc));

    if (act.standards && act.standards.length) {
      var codes = el('div', 'act-codes');
      act.standards.forEach(function (code) {
        codes.appendChild(el('span', 'code', '[' + code + ']'));
      });
      body.appendChild(codes);
    }
    card.appendChild(body);

    if (ready) {
      var btn = el('a', 'open-btn', '활동 열기 →');
      btn.href = act.url;
      // 활동 앱은 다른 주소에 있으므로 새 탭에서 연다 (수업 중 이 목록을 잃지 않게)
      btn.target = '_blank';
      btn.rel = 'noopener';
      card.appendChild(btn);
    } else {
      card.appendChild(el('span', 'soon-tag', '준비 중'));
    }
    return card;
  }

  /* ── 메인페이지 ─────────────────────────────────────── */
  function renderMain() {
    document.getElementById('siteTitle').textContent = C.site.title;
    document.getElementById('siteSub').textContent = C.site.subtitle;

    var grid = document.getElementById('unitGrid');

    C.units.forEach(function (u) {
      var card = el('a', 'unit-card');
      card.href = 'unit' + u.no + '.html';
      card.style.setProperty('--u', u.color);

      var top = el('div', 'unit-top');
      top.appendChild(el('span', 'unit-no', u.no + '단원'));
      top.appendChild(el('span', 'unit-emoji', u.emoji));
      card.appendChild(top);

      card.appendChild(el('h2', 'unit-name', u.name));
      card.appendChild(el('p', 'unit-summary', u.summary));

      var foot = el('div', 'unit-foot');
      var n = u.activities.length;
      foot.appendChild(el('span', 'badge' + (n ? ' has' : ''),
        n ? '활동 ' + n + '개' : '활동 준비 중'));
      foot.appendChild(el('span', 'badge', '성취기준 ' + u.standards.length + '개'));
      foot.appendChild(el('span', 'go', '들어가기 →'));
      card.appendChild(foot);

      grid.appendChild(card);
    });

    /* 선생님용 도구 (성취기준에 연결되지 않은 것) */
    var tools = document.getElementById('toolList');
    C.tools.forEach(function (t) { tools.appendChild(activityCard(t)); });
  }

  /* ── 단원 페이지 ────────────────────────────────────── */
  function renderUnit(no) {
    var u = unitById(no);
    if (!u) return;

    // 이 단원의 색을 페이지 전체에 넘긴다
    document.body.style.setProperty('--u', u.color);
    document.title = u.no + '단원 ' + u.name + ' — ' + C.site.title;

    document.getElementById('unitTitle').textContent =
      u.emoji + ' ' + u.no + '단원 · ' + u.name;
    document.getElementById('unitSummary').textContent = u.summary;

    var area = document.getElementById('actArea');
    if (u.activities.length === 0) {
      var empty = el('div', 'empty');
      empty.appendChild(el('span', 'big', '🛠️'));
      empty.appendChild(el('p', null, '이 단원의 활동은 아직 만드는 중이에요. 곧 올라옵니다!'));
      area.appendChild(empty);
    } else {
      var list = el('div', 'act-list');
      u.activities.forEach(function (a) { list.appendChild(activityCard(a)); });
      area.appendChild(list);
    }

    var stdList = document.getElementById('stdList');
    u.standards.forEach(function (s) {
      var li = el('li', 'std-item');
      li.appendChild(el('span', 'std-code', '[' + s.code + ']'));
      li.appendChild(el('span', 'std-text', s.text));
      stdList.appendChild(li);
    });
  }

  /* ── 시작 ───────────────────────────────────────────── */
  var unitNo = document.body.getAttribute('data-unit');
  if (unitNo) renderUnit(unitNo);
  else renderMain();
})();
