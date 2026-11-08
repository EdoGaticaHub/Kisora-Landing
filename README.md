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

- [ ] Buzón de contacto: hoy `legal/` y `probar.html` usan `kisora.contacto@zohomail.com`; migrar a `contacto@kisora.cl` cuando exista (cambiar en `utilidades_legal.py` y `probar.html`).
- [ ] Revisión de abogado de `legal/` (textos comerciales sin revisar por abogado).
- [ ] Precio: la sección dice «Cotiza en 24 h». Cambiar cuando haya valores en UF.
- [ ] Si se cambian los días de prueba, hay que cambiarlos en `index.html` (hero, prueba, FAQ, CTA) y `legal/terminos.html`, y en `app/licencia.py` del producto (hoy 14 días, gracia 30, solo lectura 60).
- [ ] El formulario de `probar.html` depende de `https://alta.kisora.cl/api/alta`; verificar que esté en línea (y con CORS para kisora.cl) antes de anunciar.
- [ ] Imágenes: pantallas de `img/*.svg` son mockups ilustrativos (generados, datos inventados); fotos de obra (`img/*.webp`) son de Unsplash. Reemplazar por capturas reales cuando se quiera.
- [ ] «Probar gratis», «Acceder» y `legal/` apuntan a `/en-construccion.html`. Reactivar enlaces (`app.kisora.cl`, contacto) cuando estén listos.

## Reglas

Sin frameworks ni CDN, fuentes del sistema, sin testimonios ni cifras inventadas, sin prometer lo que el producto no hace.

## Publicar con GitHub Pages

Cada push a `main` publica con `.github/workflows/pages.yml`. Una sola vez: Settings > Pages > Source: GitHub Actions; luego Custom domain: kisora.cl y Enforce HTTPS.

DNS de kisora.cl: registros A a 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153; www como CNAME a edogaticahub.github.io.
