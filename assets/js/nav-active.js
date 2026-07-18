// 1) Undo the theme's "greedy nav" collapsing (it misjudges width when
//    the masthead uses flex + brand logo and pushes items into
//    .hidden-links, which we've hidden). Move them back and stop
//    future collapsing by no-op'ing updateNav.
// 2) Scroll-spy: add .is-active to the nav link whose section is in view.
(function () {
  function unlockNav() {
    var visible = document.querySelector('#site-nav .visible-links');
    var hidden  = document.querySelector('#site-nav .hidden-links');
    if (visible && hidden) {
      while (hidden.firstChild) visible.appendChild(hidden.firstChild);
      hidden.classList.add('hidden');
    }
    if (typeof window.updateNav === 'function') {
      window.updateNav = function () {};
    }
  }

  function initScrollSpy() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.greedy-nav .masthead__menu-item a')
    );
    if (!navLinks.length) return;

    var pairs = navLinks
      .map(function (a) {
        var href = a.getAttribute('href') || '';
        var idx = href.indexOf('#');
        if (idx === -1) return null;
        var id = href.slice(idx + 1);
        if (!id) return null;
        var target = document.getElementById(id);
        return target ? { link: a, target: target } : null;
      })
      .filter(Boolean);
    if (!pairs.length) return;

    function onScroll() {
      var y = window.scrollY + 120;
      var current = pairs[0];
      for (var i = 0; i < pairs.length; i++) {
        if (pairs[i].target.offsetTop <= y) current = pairs[i];
      }
      pairs.forEach(function (p) {
        p.link.classList.toggle('is-active', p === current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    var targets = document.querySelectorAll(
      '.page__content > h1, .page__content > p, .page__content > ul, ' +
      '.page__content > ol, .page__content > .paper-box, ' +
      '.page__content > .qr-cards, .page__content > .games-line, ' +
      '.page__content > .pub-note'
    );
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var reduce = window.matchMedia &&
                 window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      targets.forEach(function (el) {
        el.classList.add('reveal', 'is-revealed');
      });
      return;
    }

    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  function run() {
    unlockNav();
    // Rerun once after fonts settle and after the theme's own resize handler
    // has fired, in case another script moved items again.
    window.setTimeout(unlockNav, 100);
    window.setTimeout(unlockNav, 500);
    window.addEventListener('resize', unlockNav);
    initScrollSpy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
