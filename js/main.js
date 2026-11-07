(function () {
  var raiz = document.documentElement, $ = function (id) { return document.getElementById(id); };
  var nav = $("nav"), ham = $("ham"), menu = $("menu");

  function actual() { return raiz.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  var bt = $("tema");
  if (bt) bt.addEventListener("click", function () {
    var n = actual() === "dark" ? "light" : "dark";
    raiz.dataset.theme = n;
    try { localStorage.setItem("tema", n); } catch (e) {}
  });

  if (nav) {
    var onScroll = function () { nav.classList.toggle("c", window.scrollY > 20); };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  if (ham && menu) {
    var cerrar = function () { menu.classList.remove("ab"); ham.setAttribute("aria-expanded", "false"); ham.setAttribute("aria-label", "Abrir menú"); };
    ham.addEventListener("click", function () {
      var ab = menu.classList.toggle("ab");
      ham.setAttribute("aria-expanded", String(ab));
      ham.setAttribute("aria-label", ab ? "Cerrar menú" : "Abrir menú");
    });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") cerrar(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  }

  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  function activar(t, foco) {
    tabs.forEach(function (x) {
      var s = x === t;
      x.setAttribute("aria-selected", String(s));
      x.tabIndex = s ? 0 : -1;
      $(x.getAttribute("aria-controls")).hidden = !s;
    });
    if (foco) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { activar(t); });
    t.addEventListener("keydown", function (e) {
      var k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault();
      activar(tabs[(k + tabs.length) % tabs.length], true);
    });
  });
})();
