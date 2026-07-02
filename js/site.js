document.querySelectorAll('.lang-menu').forEach(function (menu) {
  var btn = menu.querySelector('.lang-btn');
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
document.addEventListener('click', function () {
  document.querySelectorAll('.lang-menu.open').forEach(function (menu) {
    menu.classList.remove('open');
    menu.querySelector('.lang-btn').setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.lang-menu.open').forEach(function (menu) {
      menu.classList.remove('open');
      menu.querySelector('.lang-btn').setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelectorAll('.video-embed[data-vimeo]').forEach(function (box) {
  var poster = box.querySelector('.video-poster');
  if (!poster) { return; }
  poster.addEventListener('click', function () {
    var id = box.getAttribute('data-vimeo');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/' + id + '?app_id=122963&autoplay=1&title=0&portrait=0&byline=0&dnt=1';
    iframe.title = poster.getAttribute('data-title') || 'Video';
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    box.replaceChild(iframe, poster);
  });
});

var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
}
