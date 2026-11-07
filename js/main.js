(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Navbar compacta al hacer scroll
  var nav = $("#navbar");
  function alScroll() { nav.classList.toggle("scrolled", window.scrollY > 60); }
  window.addEventListener("scroll", alScroll, { passive: true });
  alScroll();

  // Menú móvil
  var tog = $("#nav-toggle"), links = $("#nav-links");
  function cerrar() { links.classList.remove("abierto"); tog.setAttribute("aria-expanded", "false"); }
  tog.addEventListener("click", function () {
    var abre = !links.classList.contains("abierto");
    links.classList.toggle("abierto", abre);
    tog.setAttribute("aria-expanded", String(abre));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", cerrar); });

  // Tema claro/oscuro manual
  var raiz = document.documentElement;
  try { var guardado = localStorage.getItem("tema"); if (guardado) raiz.dataset.tema = guardado; } catch (e) {}
  $("#btn-tema").addEventListener("click", function () {
    var oscuro = raiz.dataset.tema ? raiz.dataset.tema === "oscuro"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var nuevo = oscuro ? "claro" : "oscuro";
    raiz.dataset.tema = nuevo;
    try { localStorage.setItem("tema", nuevo); } catch (e) {}
  });

  // Tabs de módulos
  var tabs = $$('[role="tab"]');
  function elegir(t) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", String(on));
      x.tabIndex = on ? 0 : -1;
      $("#" + x.getAttribute("aria-controls")).hidden = !on;
    });
    t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { elegir(t); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { e.preventDefault(); elegir(tabs[(i + d + tabs.length) % tabs.length]); }
    });
  });

  // Aparición suave
  var items = $$(".tarjeta, .plan, .prueba, details");
  if ("IntersectionObserver" in window) {
    items.forEach(function (el) { el.classList.add("reveal"); });
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    items.forEach(function (el) { obs.observe(el); });
  }
})();
