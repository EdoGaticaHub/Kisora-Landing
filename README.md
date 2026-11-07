# kisora-landing

Página pública de https://kisora.cl. Sitio estático: HTML, CSS y JS sin dependencias, sin build, sin cookies de seguimiento.

## Probar en local

```
python3 -m http.server 8080
```

Abrir http://localhost:8080 (las rutas son absolutas desde la raíz).

## Publicar

Guía completa: `GUIA_PUBLICAR_LANDING.md` del proyecto (DNS, Caddy, verificación).

```
bash desplegar.sh          # crea kisora-web.zip
```

Subir el zip a la VM y copiarlo a `/var/www/kisora` (etapa 5 de la guía). Bloque de Caddy en `Caddyfile.ejemplo`.

## Antes de anunciar (pendientes)

- [ ] Que exista el buzón `contacto@kisora.cl` (MX en Cloudflare, Zoho). Todos los botones usan ese correo.
- [ ] Revisión de abogado de `legal/` (hoy dicen «Borrador pendiente de revisión legal»).
- [ ] Precio: la sección dice «Cotiza en 24 h». Cambiar cuando haya valores en UF.
- [ ] Si se cambian los días de prueba, hay que cambiarlos en `index.html` (hero, prueba, FAQ, CTA) y `legal/terminos.html`, y en `app/licencia.py` del producto (hoy 14 días, gracia 30, solo lectura 60).
- [ ] Cuando exista la demo en línea o el alta automática, reemplazar los `mailto:` de «Probar gratis».
- [ ] Capturas: salen de una demo con datos inventados (`utilidades/demo`, 1366×768, tema claro). Las de Compras, Proyectos y Pagos están recortadas arriba porque la captura completa mostraba filas tachadas y cabeceras superpuestas.

## Reglas

Sin frameworks ni CDN, fuentes del sistema, sin testimonios ni cifras inventadas, sin prometer lo que el producto no hace.

## Publicar con GitHub Pages

Cada push a `main` publica con `.github/workflows/pages.yml`. Una sola vez: Settings > Pages > Source: GitHub Actions; luego Custom domain: kisora.cl y Enforce HTTPS.

DNS de kisora.cl: registros A a 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153; www como CNAME a edogaticahub.github.io.
