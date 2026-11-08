"""Genera legal/*.html desde los .md de SIGEV-VSC/docs/legal.

    python3 utilidades_legal.py [ruta/a/docs/legal] [legal.local.json]

Datos personales (RUT, domicilio, ciudad) viven en legal.local.json, que no se versiona.
Lo que falte sale como «[por completar]» y el script lo avisa.
"""
import json, re, sys
from datetime import date
from pathlib import Path
import markdown

RAIZ = Path(__file__).resolve().parent
ORIGEN = Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ.parent / "SIGEV-VSC" / "docs" / "legal"
JSON = Path(sys.argv[2]) if len(sys.argv) > 2 else RAIZ / "legal.local.json"
DOCS = [  # (fuente, salida, título del menú, descripción)
    ("01_terminos_beta.md", "terminos", "Términos de servicio", "Condiciones de uso de la Beta pública de Kisora."),
    ("02_politica_privacidad.md", "privacidad", "Política de privacidad", "Qué datos personales trata Kisora, para qué y qué derechos tiene usted."),
    ("03_acuerdo_encargo_tratamiento.md", "encargo", "Acuerdo de encargo de tratamiento", "Condiciones con que Kisora trata los datos que la empresa cliente carga al sistema."),
]
datos = {"NOMBRE": "Eduardo Gatica Guzmán", "CORREO": "contacto@kisora.cl", "FECHA": date.today().strftime("%d-%m-%Y")}
if JSON.exists():
    datos.update(json.loads(JSON.read_text(encoding="utf-8")))
faltan = set()

def rellenar(m):
    v = str(datos.get(m.group(1), "")).strip()
    if v:
        return v
    faltan.add(m.group(1))
    return "[por completar]"

PLANTILLA = """<!DOCTYPE html>
<html lang="es-CL">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo} | Kisora</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="https://kisora.cl/legal/{slug}.html">
<link rel="icon" href="/img/logo.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/landing.css">
</head>
<body>
<a class="saltar" href="#doc">Saltar al contenido</a>
<header class="mast"><div class="c"><a class="marca" href="/"><img src="/img/logo.svg" width="30" height="30" alt="">Kisora</a><a class="btn s" href="/">Volver al inicio</a></div></header>
<main class="legal"><div class="c lg">
<aside class="lnav" aria-label="Documentos legales">
<h2>Documentos legales</h2>
<ul>{menu}</ul>
<h2>En este documento</h2>
<ol>{toc}</ol>
</aside>
<article id="doc" class="doc">
<p class="tag">Legal</p>
{cuerpo}
</article>
</div></main>
<footer class="pie"><div class="c"><p class="copy">© 2026 Kisora. Todos los derechos reservados. <a href="mailto:contacto@kisora.cl" style="display:inline">contacto@kisora.cl</a></p></div></footer>
</body>
</html>
"""

for fuente, slug, titulo, desc in DOCS:
    md = re.sub(r"\{\{(\w+)\}\}", rellenar, (ORIGEN / fuente).read_text(encoding="utf-8"))
    md = re.sub(r"^---\s*$", "", md, flags=re.M)  # separadores: el diseño ya separa
    cuerpo = markdown.markdown(md, extensions=["tables", "toc", "sane_lists", "nl2br"], extension_configs={"toc": {"permalink": False}})
    cuerpo = cuerpo.replace("<table>", '<div class="tabla"><table>').replace("</table>", "</table></div>")
    cuerpo = re.sub(r"<p><strong>Última actualización:</strong>(.*?)</p>", r'<p class="act">Última actualización:\1</p>', cuerpo)
    cuerpo = cuerpo.replace("[por completar]", '<span class="pend">[por completar]</span>')
    toc = "".join(f'<li><a href="#{i}">{t}</a></li>' for i, t in re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', cuerpo))
    menu = "".join(
        f'<li><a href="/legal/{s}.html"{" aria-current=\"page\"" if s == slug else ""}>{t}</a></li>' for _, s, t, _ in DOCS
    )
    (RAIZ / "legal" / f"{slug}.html").write_text(
        PLANTILLA.format(titulo=titulo, desc=desc, slug=slug, menu=menu, toc=toc, cuerpo=cuerpo), encoding="utf-8")
    print("ok", slug)
if faltan:
    print("Faltan en legal.local.json:", ", ".join(sorted(faltan)))
