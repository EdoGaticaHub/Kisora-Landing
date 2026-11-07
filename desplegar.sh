#!/usr/bin/env bash
# Sube el sitio al servidor por rsync. Uso: ./desplegar.sh usuario@servidor [/ruta/remota]
set -euo pipefail
destino="${1:?Uso: ./desplegar.sh usuario@servidor [/ruta/remota]}"
ruta="${2:-/var/www/kisora-landing}"
cd "$(dirname "$0")"
rsync -avz --delete \
  --exclude '.git' --exclude '.gitignore' --exclude 'README.md' \
  --exclude 'Caddyfile.ejemplo' --exclude 'desplegar.sh' \
  ./ "$destino:$ruta/"
echo "Listo: https://kisora.cl"
