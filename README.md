# kisora-landing

Página pública de https://kisora.cl. Sitio estático: HTML, CSS y JS vanilla. Sin npm, sin CDN, sin fuentes externas, sin cookies de seguimiento.

## Probar

    python3 -m http.server 8080

Abrir http://localhost:8080 (las rutas son absolutas desde la raíz).

## Desplegar (GitHub Pages)

Cada push a `main` publica con `.github/workflows/pages.yml`. Una sola vez: Settings > Pages > Source: GitHub Actions; luego Custom domain: kisora.cl y Enforce HTTPS.

DNS de kisora.cl: registros A a 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153; www como CNAME a edogaticahub.github.io.

## Desplegar (VPS alternativo)

    ./desplegar.sh usuario@servidor [/var/www/kisora-landing]

Servidor: Caddy con `Caddyfile.ejemplo`.

## Capturas

Salen de una demo aislada de SIGEV-VSC (datos inventados):

    python -m utilidades.demo /tmp/demo.db
    # copiar a <carpeta>/kisora.db y levantar con KISORA_DATOS=<carpeta> KISORA_PUERTO=8765 python servidor.py

Playwright 1366x768, tema claro, convertidas a WebP de 1100 px de ancho.

## Pendiente

- Legales: son borradores; falta razón social, RUT y revisión legal.
- Captura de Personal (la pantalla actual tiene un campo de búsqueda sin estilo).
- Compras (lista de OC) y Pagos (lista) salen con defectos de cabecera fija; se usó Bodega y la parte alta de Pagos.
