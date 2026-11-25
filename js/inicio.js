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
    if (foco !== null) t.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { ir(t); });
    t.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
      if (j < 0) return; e.preventDefault(); ir(tabs[(j + tabs.length) % tabs.length], true);
    });
  });
  ir(tabs[0], null); // null: al cargar no mueve la página
})();

// Menú «Ingresar»: se cierra con la cruz, al tocar fuera o con Escape.
(function () {
  var m = document.querySelector(".ing"); if (!m) return;
  function cerrar() { m.removeAttribute("open"); }
  m.querySelector(".ing-x").addEventListener("click", function () { cerrar(); m.querySelector("summary").focus(); });
  document.addEventListener("click", function (e) { if (!m.contains(e.target)) cerrar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && m.open) { cerrar(); m.querySelector("summary").focus(); } });
})();

// Quien ya ingresó una vez vuelve con un clic: «Ingresar» va directo a su acceso (el otro sigue en «Ingresa a tu cuenta»).
(function () {
  var K = "kisora_ingreso", m = document.querySelector(".ing"), v = null;
  try { v = localStorage.getItem(K); } catch (e) {}
  [].forEach.call(document.querySelectorAll('a[href^="https://clientes.kisora.cl/"]'), function (a) {
    a.addEventListener("click", function () {
      var r = a.getAttribute("href").split("/").pop();
      if (r === "empresas" || r === "individual") try { localStorage.setItem(K, r); } catch (e) {}
    });
  });
  if (!m || (v !== "empresas" && v !== "individual")) return;
  var a = document.createElement("a");
  a.className = "btn s"; a.href = "https://clientes.kisora.cl/" + v; a.textContent = "Ingresar";
  a.setAttribute("aria-label", v === "empresas" ? "Ingresar a tu cuenta de empresa" : "Ingresar a tu cuenta de independiente");
  m.replaceWith(a);
})();
