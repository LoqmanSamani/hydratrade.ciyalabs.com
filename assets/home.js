/* HydraTrade homepage. Scroll reveal, chapter art crossfade and mobile menu after
   Tooplate 2164 Compass (https://www.tooplate.com/view/2164-compass); theme toggle. */

(function () {
    'use strict';

    var root = document.documentElement;

    /* ------------------------------------------------ scroll reveal */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { revealObserver.observe(el); });
    }
    // never leave text hidden, whatever the observer does
    setTimeout(function () {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }, 3000);

    /* ------------------------------------------------ chapter art follows the chapter in view */
    var slides = document.querySelectorAll('.route-bg img');
    var chapters = document.querySelectorAll('.chapter[data-chapter]');
    if ('IntersectionObserver' in window) {
        var chapterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var key = entry.target.getAttribute('data-chapter');
                // a chapter without art (or the next report) keeps the art of the one before it
                var match = document.querySelector('.route-bg img[data-slide="' + key + '"]');
                if (!match) return;
                slides.forEach(function (s) { s.classList.toggle('active', s === match); });
            });
        }, { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' });
        chapters.forEach(function (ch) { chapterObserver.observe(ch); });
    }

    /* ------------------------------------------------ mobile menu */
    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.querySelector('.nav-links--mobile');
    var closeBtn = document.querySelector('.nav-close');

    function setMenu(open) {
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        drawer.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
    }

    toggle.addEventListener('click', function () {
        setMenu(!drawer.classList.contains('open'));
    });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) setMenu(false);
    });

    /* ------------------------------------------------ nav background once past the cover */
    var nav = document.querySelector('.nav-bar');
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------ theme */
    var btn = document.getElementById('theme');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function current() {
        return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
    }

    function label() {
        btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }

    btn.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try {
            localStorage.setItem('ht-theme', next);
        } catch (e) {}
        label();
    });
    label();
})();
