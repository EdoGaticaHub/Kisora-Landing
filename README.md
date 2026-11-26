# kisora-landing

Página pública de https://kisora.cl. Sitio estático: HTML, CSS y JS sin dependencias, sin build, sin cookies de seguimiento.

## Probar en local

```
python3 -m http.server 8080
```

Abrir http://localhost:8080 (las rutas son absolutas desde la raíz).

## Publicar

kisora.cl se publica con GitHub Pages: cada push a `main` ejecuta `.github/workflows/pages.yml`, que copia `index.html`, `probar.html`, `404.html`, `error.html`, `css`, `js`, `guias`, `legal`, `img`, `robots.txt` y `sitemap.xml` a `_site`. Una sola vez: Settings > Pages > Source: GitHub Actions; luego Custom domain: kisora.cl y Enforce HTTPS.

DNS de kisora.cl: registros A a 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153; www como CNAME a edogaticahub.github.io.

`desplegar.sh` (crea `kisora-web.zip`) y `Caddyfile.ejemplo` (bloque de Caddy sobre `/var/www/kisora`) son una alternativa de servidor propio; **no se usan para kisora.cl**.

## Legal

`legal/` (términos, privacidad, licencia) ya no es borrador: son los textos publicados, generados desde `legal-md/` con `utilidades_legal.py`. Falta la revisión de un abogado. Las tres páginas llevan `noindex`.

## Plazos

Plan `beta` (el de hoy): 90 días de prueba, 30 de gracia y 60 de solo lectura (decisión 25-11-2026, `docs/ROADMAP.md` del producto); luego se archiva y se elimina. **El producto aún no lo aplica:** `DIAS_PRUEBA` en `app/licencia.py` sigue en 30 y `app/tope_usuarios.py` en 5 usuarios; hasta cambiarlos, la prueba real dura 30 días. Al lanzar, manda el plan básico: 14 días de prueba, con la misma gracia y solo lectura. Quien active un plan antes de eso conserva sus datos (`activar_cliente.py`).

## Antes de anunciar (pendientes)

- [ ] **Consejo UX combinado (25-11-2026):** hecho el Doc A (CSS: paleta V3 unificada con la app, solo Inter sin Bricolage, radios 8/12 px, claro como valor base; `js/tema.js` sigue el tema del sistema si no hay preferencia guardada). Pendiente el Doc C (HTML): «Módulos» → «Tipos de obra», siglas de decreto expandidas, condensar secciones (#flujo, #terreno, funciones+integraciones), pricing visible antes del FAQ, narrativa de marca. Detalle en `Kisora-VSC/docs/ROADMAP.md` › Fase J › «Interfaz y landing».
- [ ] Buzón de contacto: hoy `legal/` y `probar.html` usan `kisora.contacto@zohomail.com`; migrar a `contacto@kisora.cl` cuando exista (cambiar en `utilidades_legal.py` y `probar.html`).
- [ ] Revisión de abogado de `legal/` (publicado, pero sin revisar por abogado).
- [ ] Planes y pago: la landing publica Starter $49.000, Profesional $89.000 y Empresa $149.000 al mes (CLP, más IVA; tabla de `docs/ROADMAP.md` › «Precios decididos»). Los límites de proyectos activos y almacenamiento y el «soporte prioritario» aún no los aplica el producto; el tope de usuarios es `tope.json` (hoy 5). Falta la pasarela de pago, aún sin elegir; el monto del descuento beta se informa al abrir la venta.
- [ ] «Servidores: Oracle Cloud, Santiago» y «Meta de 99 %» salen de `legal-md/`; confirmar que siguen siendo ciertos.
- [ ] Si se cambian los días de prueba, hay que cambiarlos en `index.html` (hero, ingreso, prueba, FAQ), `probar.html`, `guias/index.html`, `legal-md/terminos.md` y `legal-md/licencia.md` (luego `python3 utilidades_legal.py`), y en `DIAS_PRUEBA` de `app/licencia.py` del producto (ver «Plazos»). Al lanzar, quitar también el aviso «Kisora está en beta» (`.aviso-beta`).
- [ ] El formulario de `probar.html` depende de `https://alta.kisora.cl/api/alta`; verificar que esté en línea (y con CORS para kisora.cl) antes de anunciar.
- [ ] Imágenes: `img/app-*.webp` y `img/movil-*.webp` son capturas reales de la app con la base demo; fotos de obra (`img/*.webp`) son de Pexels y Unsplash (licencia gratuita). Al tener fotos propias, reemplazar `hero-claro` y `hero-oscuro` (1600×1067 y 800 de ancho) para mantener el diseño. Reemplazar por capturas reales cuando se quiera. `img/guia-*.webp` (guías paso a paso) son capturas reales de la app con la base demo (`utilidades/demo.py`).

## Guías

`guias/index.html` (tres guías con capturas reales de la app con la base demo, anotadas con recuadros numerados) y `guias/ejemplos/*.xlsx` (archivos de ejemplo con datos inventados que se descargan desde la guía 2). Si cambia la pantalla de carga del producto, rehacer las capturas `img/g2-*.webp` y `img/guia-*.webp`.

## Reglas

Sin frameworks ni CDN, fuentes del sistema, sin testimonios ni cifras inventadas, sin prometer lo que el producto no hace.

## Fuente única del texto legal

`legal-md/` es la fuente del texto público (términos, privacidad y licencia). El repo del producto (Kisora-VSC) solo guarda plantillas internas en `docs/legal/`; cualquier cambio al texto público se hace acá.
