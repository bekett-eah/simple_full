# Simple.sv · rediseño del lado ciudadano

Prototipo del rediseño de Simple.sv, la ventanilla en línea del Gobierno de El Salvador: landing, flujo de trámites, simulación de WhatsApp y asistente con IA.

## Inicio rápido

```bash
python3 backend/servidor.py 8080 127.0.0.1     # publica solo web/
# → http://localhost:8080/index.html
```

Con IA (opcional, Python 3.10+ y `ANTHROPIC_API_KEY` en `~/.zshrc`):

```bash
python3.13 -m pip install -r requirements.txt
python3.13 backend/servidor.py 8080 0.0.0.0
```

Más comandos (red local, segundo plano, variables): [docs/comandos-servidor.md](docs/comandos-servidor.md).

## Estructura

```
.
├── web/                      ← lo ÚNICO que publica el servidor
│   ├── index.html            landing (usa <base href="app/">)
│   ├── app/                  páginas, scripts y estilos del prototipo
│   │   └── img/              imágenes de los 118 trámites y del asistente
│   ├── sitio-actual/         login, identidad digital y capturas del sitio actual
│   ├── src/                  compartido: styles/, data/ (catálogo), assets/brand/
│   └── assets/
│       ├── landing/          imágenes del carrusel
│       └── videos/           videos que reproduce la landing
├── backend/
│   ├── servidor.py           servidor estático con Range + POST /api/asistente
│   └── asistente_ia.py       intérprete de IA del asistente
├── bd/                       esquema SQL, semilla y base de conocimiento (+ generadores)
├── pruebas/                  pruebas de Node y Python, evaluación del intérprete
├── docs/
│   ├── comandos-servidor.md
│   ├── asistente-ia-tramites.md
│   ├── tramites/             catálogo de 118 trámites, instituciones, mapeo
│   ├── diseno/               guía de diseño y prompts del rediseño
│   ├── reuniones/            actas en PDF
│   └── notas-obsidian/
├── herramientas/
│   ├── scrapper/             extractor del catálogo de simple.sv (Python)
│   ├── videos/               generadores de los videos (HTML + GSAP + render.py)
│   └── skills/               skills de diseño de terceros
├── recursos/                 material fuente que no se publica (imágenes y video originales)
├── qa/evidencia-localhost/   capturas y mapa de URLs de la última auditoría QA
├── otros/FondoVivo/          app de macOS aparte (no es parte de Simple.sv)
├── registros/                bitácoras en tiempo de ejecución (no se versiona)
└── privado/                  credenciales locales (no se versiona)
```

## Pruebas

```bash
node --test pruebas/*.test.mjs             # motor de trámites e intérprete
python3 -m unittest discover -s pruebas    # servidor e IA con cliente simulado
node pruebas/evaluar_local.mjs             # comprensión en modo básico
```

## Datos derivados

`bd/base_conocimiento.json` y `bd/semilla_tramites.sql` se generan desde `web/src/data/catalogo-landing.js`, `web/app/*.js` y `docs/tramites/catalogo_118_tramites_simple_sv.md`:

```bash
node bd/generar_base_conocimiento.mjs
node bd/generar_semilla.mjs
```

## Convenciones

- Todo lo que ve el navegador vive en `web/`; nada fuera de esa carpeta se publica.
- Nombres de carpetas y archivos nuevos en minúsculas, con guiones y sin espacios ni tildes.
- Claves y credenciales: en variables de entorno o en `privado/`, nunca en el repositorio.
- Dependencias de Node (`node_modules`) y entornos de Python (`.venv`) no se versionan: `npm install` o `python3 -m venv .venv` en cada herramienta.
