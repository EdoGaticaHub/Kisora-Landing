#!/usr/bin/env bash
# Arma kisora-web.zip con solo lo que se publica.
set -euo pipefail
cd "$(dirname "$0")"
rm -f kisora-web.zip
python3 - <<'PY'
import zipfile, pathlib
inc = ["index.html", "probar.html", "404.html", "robots.txt", "sitemap.xml", "css", "js", "img", "legal"]
with zipfile.ZipFile("kisora-web.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for i in inc:
        p = pathlib.Path(i)
        for f in ([p] if p.is_file() else sorted(p.rglob("*"))):
            if f.is_file():
                z.write(f, f.as_posix())
print("kisora-web.zip listo")
PY
