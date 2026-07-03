/* ווידג'ט נגישות — כישורית */
(function () {
  'use strict';

  var lang = (document.documentElement.lang || 'he').slice(0, 2);
  var T = lang === 'en' ? {
    open: 'Accessibility menu',
    title: 'Accessibility',
    close: 'Close accessibility menu',
    reset: 'Reset accessibility settings',
    statement: 'Accessibility statement',
    privacy: 'Privacy policy'
  } : {
    open: 'תפריט נגישות',
    title: 'נגישות',
    close: 'סגירת תפריט נגישות',
    reset: 'איפוס הגדרות הנגישות',
    statement: 'הצהרת נגישות',
    privacy: 'מדיניות פרטיות'
  };

  function icon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  var FEATURES = [
    { cls: 'a11y-contrast', group: 'filter', he: 'ניגודיות גבוהה', en: 'High contrast',
      svg: icon('<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"/>') },
    { cls: 'a11y-invert', group: 'filter', he: 'ניגודיות הפוכה', en: 'Inverted colors',
      svg: icon('<path d="M12 3c-3 4.5-6 7-6 11a6 6 0 0 0 12 0c0-4-3-6.5-6-11Z"/><path d="M12 20a6 6 0 0 0 6-6h-6Z" fill="currentColor" stroke="none"/>') },
    { cls: 'a11y-grayscale', group: 'filter', he: 'גווני אפור', en: 'Grayscale',
      svg: icon('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 4v16M12 4v16M16 4v16" opacity="0.5"/>') },
    { cls: 'a11y-bigtext', he: 'טקסט גדול', en: 'Large text',
      svg: icon('<path d="M4 18 9 6h1.5l5 12"/><path d="M5.6 14h7.3"/><path d="M15 18l2.8-7h.8L21.5 18"/>') },
    { cls: 'a11y-spacing', he: 'ריווח טקסט', en: 'Text spacing',
      svg: icon('<path d="M4 6h16"/><path d="M7 12h10"/><path d="M4 18h16"/><path d="M2.5 9.5v5M21.5 9.5v5" opacity="0.6"/>') },
    { cls: 'a11y-lineheight', he: 'גובה שורה', en: 'Line height',
      svg: icon('<path d="M10 6h10"/><path d="M10 12h10"/><path d="M10 18h10"/><path d="M5 5v14"/><path d="m3 7 2-2 2 2M3 17l2 2 2-2"/>') },
    { cls: 'a11y-links', he: 'הדגשת קישורים', en: 'Highlight links',
      svg: icon('<path d="M9 12a4 4 0 0 1 4-4h2a4 4 0 0 1 0 8h-1"/><path d="M15 12a4 4 0 0 1-4 4H9a4 4 0 0 1 0-8h1"/>') },
    { cls: 'a11y-noanim', he: 'ביטול הנפשות', en: 'Stop animations',
      svg: icon('<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>') },
    { cls: 'a11y-noimg', he: 'הסתרת תמונות', en: 'Hide images',
      svg: icon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/><circle cx="9" cy="9" r="1.3"/><path d="M4 20 20 4"/>') },
    { cls: 'a11y-readable', he: 'פונט קריא', en: 'Readable font',
      svg: icon('<path d="M6 18 11 6h2l5 12"/><path d="M7.8 14h8.4"/>') },
    { cls: 'a11y-cursor', he: 'סמן גדול', en: 'Large cursor',
      svg: icon('<path d="m6 4 13 8-6 1.5L16 19l-3 1.4-3-5.6L6 18Z"/>') }
  ];

  var STORE = 'kishorit-a11y';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; }
    catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (e) {}
  }

  var active = load();
  function apply() {
    FEATURES.forEach(function (f) {
      document.documentElement.classList.toggle(f.cls, active.indexOf(f.cls) !== -1);
    });
  }
  apply();

  /* ---------- בניית הווידג'ט ---------- */
  var fab = document.createElement('button');
  fab.className = 'a11y-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', T.open);
  fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M12 8c-2.8 0-5.2-.5-7-1l-.6 1.9c1.7.5 3.6.9 5.6 1v3l-2.2 7 1.9.7 2.1-6.4h.4l2.1 6.4 1.9-.7-2.2-7v-3c2-.1 3.9-.5 5.6-1L19 7c-1.8.5-4.2 1-7 1Z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', T.title);

  var html = '<div class="a11y-head"><b>' + T.title + '</b>' +
    '<button class="a11y-close" type="button" aria-label="' + T.close + '">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>' +
    '</button></div><div class="a11y-grid">';
  FEATURES.forEach(function (f) {
    var on = active.indexOf(f.cls) !== -1;
    html += '<button class="a11y-tile" type="button" data-cls="' + f.cls + '" aria-pressed="' + on + '">' +
      f.svg + '<span>' + (lang === 'en' ? f.en : f.he) + '</span></button>';
  });
  var statementIcon = icon('<circle cx="12" cy="5" r="1.8"/><path d="M12 8c-2.6 0-4.8-.4-6.5-.9l-.5 1.8c1.6.5 3.3.8 5 1v2.8l-2 6.5 1.8.6 2-6h.4l2 6 1.8-.6-2-6.5V9.9c1.7-.2 3.4-.5 5-1l-.5-1.8C16.8 7.6 14.6 8 12 8Z"/>');
  var privacyIcon = icon('<path d="M12 3 5 6v5c0 4.5 3 8.2 7 9.5 4-1.3 7-5 7-9.5V6Z"/><path d="m9 12 2 2 4-4"/>');
  html += '</div><button class="a11y-reset" type="button">' + T.reset + '</button>' +
    '<div class="a11y-links">' +
    '<a href="accessibility.html">' + statementIcon + '<span>' + T.statement + '</span></a>' +
    '<a href="privacy.html">' + privacyIcon + '<span>' + T.privacy + '</span></a>' +
    '</div>';
  panel.innerHTML = html;

  document.body.appendChild(panel);
  document.body.appendChild(fab);

  function setOpen(open) {
    document.body.classList.toggle('a11y-open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  fab.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!document.body.classList.contains('a11y-open'));
  });
  panel.querySelector('.a11y-close').addEventListener('click', function () { setOpen(false); });
  panel.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); }
  });

  var groups = {};
  FEATURES.forEach(function (f) { if (f.group) { (groups[f.group] = groups[f.group] || []).push(f.cls); } });

  panel.querySelectorAll('.a11y-tile').forEach(function (tile) {
    tile.addEventListener('click', function () {
      var cls = tile.getAttribute('data-cls');
      var idx = active.indexOf(cls);
      if (idx === -1) {
        // מאפייני פילטר (ניגודיות/אפור/הפוך) — אחד בכל פעם
        var f = FEATURES.filter(function (x) { return x.cls === cls; })[0];
        if (f.group) {
          groups[f.group].forEach(function (other) {
            var i = active.indexOf(other);
            if (i !== -1) { active.splice(i, 1); }
            panel.querySelector('[data-cls="' + other + '"]').setAttribute('aria-pressed', 'false');
          });
        }
        active.push(cls);
        tile.setAttribute('aria-pressed', 'true');
      } else {
        active.splice(idx, 1);
        tile.setAttribute('aria-pressed', 'false');
      }
      save(active);
      apply();
    });
  });

  panel.querySelector('.a11y-reset').addEventListener('click', function () {
    active = [];
    save(active);
    apply();
    panel.querySelectorAll('.a11y-tile').forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
  });
})();
