(function () {
  function toggleTheme() {
    var html = document.documentElement;
    html.classList.toggle("dark");
    html.classList.toggle("light");
    var isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateToggleIcons(isDark);
  }

  function updateToggleIcons(isDark) {
    document.querySelectorAll("#theme-toggle, #theme-toggle-mobile span").forEach(function (el) {
      el.textContent = isDark ? "light_mode" : "dark_mode";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var isDark = document.documentElement.classList.contains("dark");
    updateToggleIcons(isDark);

    var toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);

    var toggleMobile = document.getElementById("theme-toggle-mobile");
    if (toggleMobile) toggleMobile.addEventListener("click", toggleTheme);

    var mobileBtn = document.getElementById("mobile-menu-btn");
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        mobileBtn.textContent = mobileMenu.classList.contains("hidden") ? "menu" : "close";
      });
    }

    initTocHighlight();
  });

  function initTocHighlight() {
    var tocNav = document.getElementById("toc-nav");
    var aboutTocLinks = document.querySelectorAll(".toc-link");

    var tocLinks = tocNav
      ? tocNav.querySelectorAll("a[href^='#']")
      : aboutTocLinks;

    if (!tocLinks.length) return;

    var headings = [];
    tocLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;
      var id = href.replace("#", "");
      var el = document.getElementById(id);
      if (el) headings.push({ el: el, link: link });
    });

    if (!headings.length) return;

    function onScroll() {
      var scrollPos = window.scrollY + 160;
      var current = headings[0];
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].el.offsetTop <= scrollPos) {
          current = headings[i];
        }
      }
      tocLinks.forEach(function (l) { l.classList.remove("active"); });
      if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
