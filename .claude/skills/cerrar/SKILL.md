---
name: cerrar
description: Cierra un build de Kisora. Arma el bloque de cierre a partir de la decisión en bruto, lo muestra para aprobar y recién ahí escribe docs/PENDIENTES.md, 144_ControlCambios, 99_VERSION y 983_DecisionesCerradas, más el commit.
---

# /cerrar — cierre de build Kisora

Se invoca `/cerrar <decisión en bruto>`. El texto en bruto es lo que el
usuario escribió sobre lo que se hizo en esta conversación: puede venir
desordenado, en una frase o en varias.

Este skill **no escribe nada directamente**. Arma un bloque, lo muestra
completo, espera la aprobación (o las correcciones) del usuario, y solo
entonces corre `utilidades/cerrar.py`, que es quien realmente escribe los cuatro
archivos y hace el commit.

## Paso 1 — Build y fecha

El número de build **nunca se inventa**: sale de `docs/PENDIENTES.md`.

1. Lee `docs/PENDIENTES.md` y busca el build más alto en un encabezado
   `## ... — Build XXXX` (o `Build XXXX` suelto en el texto, como el
   `Estado al ... — Build 0415` actual). El build de este cierre es ese
   número **+ 1**, con cuatro dígitos (`0415` → `0416`).
2. Fecha de hoy: `date +%F` (formato `AAAA-MM-DD`). No la preguntes, no la
   inventes de memoria.

## Paso 2 — Armar el bloque de cierre

Con el número de build, la fecha y el texto en bruto del usuario, redacta
las cuatro líneas del formato ya definido en `docs/PENDIENTES.md`:

- **Decidido**: qué se resolvió, en una frase.
- **Va a**: qué archivo o qué hoja del Excel lo recibe.
- **Abierto**: qué quedó sin resolver. Si no quedó nada abierto, dilo
  explícitamente ("Nada"), no lo dejes en blanco.
- **Siguiente**: la próxima tarea concreta.

Luego propone tres campos más, para el Excel (no van a docs/PENDIENTES.md):

- **Área** (columna de `144_ControlCambios`): léela en vivo, no de memoria —

  ```
  python3 -c "
  import openpyxl
  from collections import Counter
  wb = openpyxl.load_workbook('ejemplos/data/Kisora_Maestro.xlsx', read_only=True, data_only=True)
  ws = wb['144_ControlCambios']
  c = Counter(r[1] for r in ws.iter_rows(min_row=2, values_only=True) if r[1])
  for area, n in c.most_common():
      print(n, area)
  "
  ```

  Elige la que más se parezca a lo decidido (misma regla del destino BODEGA,
  Build 0411: propones por criterio, el usuario corrige y su corrección
  manda). No inventes una categoría nueva salvo que ninguna de las
  existentes calce ni de lejos — y en ese caso dilo, no la impongas
  calladamente.

- **Motivo** (por qué se decidió esto — va a `144_ControlCambios.Motivo` y a
  `983_DecisionesCerradas.Detalle`): una frase corta con el porqué, no una
  repetición de "Decidido".

- **¿Cierra decisión?** (si esta build agrega o cambia una regla de diseño
  del tipo que vive en `983_DecisionesCerradas`, o si es solo trabajo
  técnico/avance sin una decisión nueva). Sí solo si de verdad hay una regla
  nueva que no se vuelve a discutir — no cualquier cambio de código cuenta.

- **¿Cierra un Hito completo?** (la versión sube por Hito, no en cada build —
  decidido con el usuario, Build 0436). Si este build es el que termina un
  Hito entero (todas sus tareas, no solo la última pendiente visible),
  proponle al usuario el número de versión nuevo y pídeselo confirmado antes
  de mostrar el bloque; si no cierra un Hito, no propongas nada — el campo
  `version_nueva` queda fuera del bloque y 99_VERSION sigue igual.

- **Módulo y prompt** (solo si el build es uno de los 6 prompts de un módulo
  de `docs/PLAN_MODULOS.md`): clave del módulo y número 1-6. Se agregan al
  bloque y al JSON como `"modulo"` y `"prompt"`; `utilidades/cerrar.py` marca
  el casillero en la tabla «Avance por módulo». Si no es prompt de módulo, se
  omiten. La línea «Siguiente» debe nombrar el próximo prompt del módulo.
- **Roadmap** (opcional): `cerrar.py` marca ✅ en `docs/ROADMAP.md` la fila que
  empieza con `**NNNN —` del build. Si la fila no lleva el número, agrega al
  JSON `"roadmap"` con un texto único de esa fila. Si nada calza, no marca y
  lo avisa; nunca bloquea el cierre.

## Paso 2B — Que el build no quede huérfano

Antes de mostrar el bloque, busca el número del build (y su tema) en
`docs/ROADMAP.md`, `docs/PLAN_PRODUCTO_GENERAL.md`, `docs/PLAN_MODULOS.md` y la
guía que aplique (`docs/GUIA_*.md`, si el build pertenece a una). Por cada
documento donde el build **no tenga fila o sección** y le corresponda estar:

1. Propón la sección o fila nueva: misma tabla/formato de las vecinas, en la
   fase o guía que mejor calce (si ninguna calza, una sección nueva con nombre
   claro; dilo, no la impongas callado). Nada de datos inventados: lo que falte va «—».
2. Agrégala al bloque del Paso 3 en una línea **Docs nuevos**: `archivo → fila/sección propuesta`.
3. Con el bloque aprobado, **créalas con Edit antes de correr `utilidades/cerrar.py`**
   (marcadas ✅ el build actual): el `git add -A` del cierre las incluye en el
   mismo commit. Así `cerrar.py` ya las encuentra y las marca.
4. `docs/PENDIENTES.md` lo escribe `cerrar.py`; si el build abre un tema nuevo
   (algo que no estaba en «Abierto» ni «Siguiente»), déjalo reflejado ahí en las líneas Abierto/Siguiente.

Si el build ya está en todos los documentos que le corresponden, la línea
queda «Docs nuevos: ninguno».

## Paso 3 — Mostrar y esperar aprobación

Muestra **un solo bloque**, así:

```
## AAAA-MM-DD — Build XXXX
Decidido: ...
Va a: ...
Abierto: ...
Siguiente: ...

Área: ...
Motivo: ...
Detalle: ...
¿Cierra decisión? (va a 983_DecisionesCerradas): Sí/No
¿Cierra un Hito? (solo si aplica): Sí, versión nueva X.XX / No
Módulo y prompt (solo si aplica): clave / 1-6
Docs nuevos (Paso 2B): ninguno / archivo → fila o sección propuesta
```

No corras `utilidades/cerrar.py` todavía. Si el usuario corrige algo, rehaz el bloque
con la corrección y muéstralo de nuevo — la corrección del usuario manda
siempre sobre la propuesta. Solo sigue al paso 4 cuando el usuario apruebe
explícitamente ese bloque, tal cual quedó.

## Paso 4 — Escribir y cerrar

Con el bloque aprobado (sin cambios de última hora), arma el JSON y corre
`utilidades/cerrar.py`:

```
cat > bloque.json <<'JSON'
{
  "build": "XXXX",
  "fecha": "AAAA-MM-DD",
  "decidido": "...",
  "va_a": "...",
  "abierto": "...",
  "siguiente": "...",
  "area": "...",
  "motivo": "...",
  "detalle": "...",
  "cierra_decision": true
}
JSON
```

Si el bloque aprobado cierra un Hito, agrega también `"version_nueva": "X.XX"` al
JSON (ese campo es opcional: si no cierra Hito, se omite entero, no se manda
vacío).

```
python -m utilidades.cerrar bloque.json --si
```

El `--si` es porque la aprobación real ya la dio el usuario en el chat, en
el Paso 3: `utilidades/cerrar.py` también pide confirmar por consola antes de
commitear, y ese prompt no tiene quién lo responda en una sesión sin
terminal. Con `--si` se lo salta y commitea directo. Si en algún momento
corrés `utilidades/cerrar.py` a mano, fuera de esta skill, sin haber mostrado el
bloque antes, no le pases `--si`: dejá que pregunte.

`utilidades/cerrar.py` también marca ✅ la fila del build en la tabla de
`docs/PLAN_PRODUCTO_GENERAL.md` y deja «☐ siguiente» en la próxima pendiente;
si el build no tiene fila en el plan, avisa y sigue.

`utilidades/cerrar.py` valida las cabeceras del Excel antes de escribir nada; si algo
no calza, se detiene y dice cuál hoja cambió — en ese caso, párate ahí y
avisa al usuario, no fuerces una escritura distinta a mano.

Si todo sale bien, `utilidades/cerrar.py` imprime el
mensaje del commit. Muéstraselos al usuario tal cual salieron — no los
reformules.
