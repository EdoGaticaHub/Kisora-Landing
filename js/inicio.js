// Pestañas de «Plataforma»: sin JS se ven todas las pantallas una bajo otra.
(function () {
  var d = document.documentElement; d.classList.add("js");
  var tabs = [].slice.call(document.querySelectorAll('.k-tabs [role=tab]'));
  if (!tabs.length) return;
  function ir(t, foco) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
    if (foco) t.focus();
    t.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { ir(t); });
    t.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
      if (j < 0) return; e.preventDefault(); ir(tabs[(j + tabs.length) % tabs.length], true);
    });
  });
  // Los pasos del flujo abren su pantalla en «Plataforma».
  [].forEach.call(document.querySelectorAll("[data-ir]"), function (a) {
    a.addEventListener("click", function () { var t = document.getElementById("t-" + a.getAttribute("data-ir")); if (t) ir(t); });
  });
  ir(tabs[0]);
})();
