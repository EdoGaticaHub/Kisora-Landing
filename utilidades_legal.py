"""Genera legal/*.html desde legal-md/*.md:  python3 utilidades_legal.py  (requiere: pip install markdown)"""
import re, unicodedata
from pathlib import Path
import markdown

RAIZ = Path(__file__).resolve().parent
FECHA = "8 de noviembre de 2026"
DOCS = {"licencia": "Licencia de uso", "terminos": "Términos de servicio", "privacidad": "Política de privacidad"}
NOMBRES = {"licencia": "Contrato de licencia de uso", **{k: v for k, v in DOCS.items() if k != "licencia"}}

def slug(t):
    t = re.sub(r"^\d+\.\s*", "", t)
    t = unicodedata.normalize("NFD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")

PLANTILLA = """<!DOCTYPE html>
<html lang="es-CL">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{nombre} | Kisora</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/img/logo.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/landing.css">
</head>
<body>
<header class="mast"><div class="c"><a class="marca" href="/"><img src="/img/logo-horizontal.svg" width="112" height="30" alt="Kisora"></a><a class="btn s" href="/">Volver al inicio</a></div></header>
<main><section class="legal"><div class="c">
<nav class="crumb" aria-label="Ruta"><a href="/">Inicio</a> &gt; <span>Legal</span> &gt; <span aria-current="page">{nombre}</span></nav>
<h1>{titulo}</h1>
<p class="fecha">Actualizado el {fecha}</p>
<nav class="indice" aria-label="Índice"><h2>Contenido</h2><ol>{toc}</ol></nav>
{cuerpo}
<nav class="cruce" aria-label="Otros documentos legales"><h2>Otros documentos legales</h2><ul>{cruce}</ul></nav>
</div></section></main>
<footer class="pie"><div class="c"><p class="copy">© 2026 Kisora. Todos los derechos reservados.</p></div></footer>
</body>
</html>
"""

for k in DOCS:
    md = (RAIZ / "legal-md" / f"{k}.md").read_text(encoding="utf-8")
    md = md.replace("[POR DEFINIR: fecha de publicación]", FECHA).replace("contacto@kisora.cl", "kisora.contacto@zohomail.com")
    md = re.sub(r"^\*\*Última actualización:\*\*.*$", "", md, flags=re.M)
    md = re.sub(r"^---\s*$", "", md, flags=re.M)
    md = re.sub(r"([^\n-][^\n]*)\n(- )", r"\1\n\n\2", md)  # lista pegada al párrafo
    titulo = re.match(r"# (.+)", md).group(1)
    md = re.sub(r"^# .+\n", "", md)
    html = markdown.markdown(md, extensions=["tables", "sane_lists", "nl2br"])
    html = html.replace("<table>", '<div class="tabla"><table>').replace("</table>", "</table></div>")
    partes = re.split(r"(?=<h2>)", html)
    cuerpo, toc, vistos = partes[0], [], set()
    for p in partes[1:]:
        t = re.match(r"<h2>(.*?)</h2>", p).group(1)
        i = slug(t); assert i not in vistos, i; vistos.add(i)
        toc.append(f'<li><a href="#{i}">{re.sub(r"^\d+\.\s*", "", t)}</a></li>')
        cuerpo += f'<section id="{i}">\n{p.replace("<h2>", f"<h2>", 1)}</section>\n'
    cruce = "".join(f'<li><a href="/legal/{o}.html">{DOCS[o]}</a></li>' for o in DOCS if o != k)
    (RAIZ / "legal" / f"{k}.html").write_text(PLANTILLA.format(nombre=NOMBRES[k], titulo=titulo, fecha=FECHA, toc="".join(toc), cuerpo=cuerpo, cruce=cruce), encoding="utf-8")
    print("ok", k, len(toc))
