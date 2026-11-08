// Envía el formulario al servicio de alta (alta.kisora.cl). Solo el correo es obligatorio.
const f = document.getElementById("alta"), estado = document.getElementById("estado");
f.addEventListener("submit", async (e) => {
  e.preventDefault(); estado.className = "";
  if (!f.correo.value.includes("@")) { estado.className = "err"; estado.textContent = "Escribe un correo válido."; f.correo.focus(); return; }
  const b = f.querySelector("button"); b.disabled = true; estado.textContent = "Enviando…";
  try {
    const r = await fetch("https://alta.kisora.cl/api/alta", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(f))) });
    const d = await r.json().catch(() => ({}));
    estado.textContent = r.ok ? "Listo. Revisa tu correo (y la carpeta de spam) y abre el enlace para crear tu prueba." : d.mensaje || "No pudimos crear tu prueba. Intenta de nuevo o escríbenos.";
    if (r.ok) f.reset(); else estado.className = "err";
  } catch { estado.className = "err"; estado.textContent = "No pudimos conectar. Intenta de nuevo en unos minutos."; }
  b.disabled = false;
});
