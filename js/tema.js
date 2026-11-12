(function () {
  var d = document.documentElement, K = "kisora-tema";
  function sistema() { return matchMedia("(prefers-color-scheme: light)").matches ? "claro" : "oscuro"; }
  function leer() { try { var t = localStorage.getItem(K); return t === "claro" || t === "oscuro" ? t : sistema(); } catch (e) { return sistema(); } }
  function poner(t) {
    d.setAttribute("data-tema", t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === "claro" ? "#F8F5EF" : "#0B1827";
    var b = document.getElementById("tema");
    if (b) { b.setAttribute("aria-pressed", t === "claro"); b.setAttribute("aria-label", t === "claro" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"); }
  }
  poner(leer());
  document.addEventListener("DOMContentLoaded", function () {
    var c = document.querySelector(".mast .c"); if (!c) return;
    var b = document.createElement("button");
    b.id = "tema"; b.type = "button"; b.className = "tema";
    b.innerHTML = '<svg class="sol" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="luna" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    b.addEventListener("click", function () {
      var t = d.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
      try { localStorage.setItem(K, t); } catch (e) {}
      poner(t);
    });
    c.insertBefore(b, c.querySelector(".btn"));
    poner(d.getAttribute("data-tema"));
  });
})();
