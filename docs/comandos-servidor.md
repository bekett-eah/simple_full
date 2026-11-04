# Comandos para exponer el sitio

`backend/servidor.py` funciona igual que `python3 -m http.server`, pero acepta peticiones por partes (Range). Safari, en Mac y en iPhone, las necesita para reproducir el video de la landing.

Publica **solo la carpeta `web/`**: `bd/`, `docs/`, `backend/`, `registros/` y `privado/` nunca salen a la red. Se puede ejecutar desde cualquier carpeta; los comandos de abajo suponen que estás en la raíz del repositorio.

## Iniciar (red local)

```bash
python3 backend/servidor.py 8080 0.0.0.0
```

## Iniciar en segundo plano

```bash
nohup python3 backend/servidor.py 8080 0.0.0.0 > registros/servidor.log 2>&1 &
```

## Ver tu IP local

```bash
ipconfig getifaddr en0
```

Luego abre `http://<tu-ip>:8080/index.html` desde el celular o desde otro equipo de la misma WiFi.

## Verificar que está corriendo

```bash
lsof -iTCP:8080 -sTCP:LISTEN -P -n
```

## Detenerlo

```bash
kill $(lsof -tiTCP:8080 -sTCP:LISTEN)
```

En primer plano basta con `Ctrl + C`.

## Solo localhost (sin exponerlo a la red)

```bash
python3 backend/servidor.py 8080 127.0.0.1
```

## Servir otra carpeta

El tercer argumento cambia la carpeta publicada (por defecto `web/`). Por ejemplo, para previsualizar o renderizar los videos (`render.py` recibe una URL):

```bash
python3 backend/servidor.py 8081 127.0.0.1 herramientas/videos
# → http://localhost:8081/video-banners/index.html
```

Después de renderizar, copia los `.mp4`, `.webm` y `-poster.jpg` que usa la landing a `web/assets/videos/`.

## Asistente con IA

`backend/servidor.py` también atiende `POST /api/asistente` (`backend/asistente_ia.py`): la IA que entiende lo que escribe el ciudadano. Sin el paquete `anthropic` o sin clave, el asistente sigue funcionando en **modo básico** (frases cortas, una cosa a la vez).

El paquete `anthropic` pide Python 3.10 o superior; el `python3` que trae macOS es el 3.9. Instala uno nuevo (por ejemplo, el de python.org) y usa ese en los comandos (`python3.13` en este ejemplo).

La clave se crea en la Consola de Claude (platform.claude.com → API Keys) y se cobra por uso, aparte de la suscripción de claude.ai. Guárdala una sola vez en `~/.zshrc`, nunca dentro del repositorio ni en un `.js` o `.html`.

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc   # una sola vez, con tu clave
source ~/.zshrc
python3.13 -m pip install -r requirements.txt
python3.13 backend/servidor.py 8080 0.0.0.0
```

La IA solo responde si abres el sitio desde el servidor (`http://localhost:8080/...`); con doble clic (`file://`) el chat queda en modo básico.

Opcionales: `SIMPLE_MODELO` (por defecto `claude-opus-5-5`), `SIMPLE_ESFUERZO` (por defecto `high`; `medium` o `low` responden más rápido y gastan menos) y `SIMPLE_IA=0` para apagarla. La bitácora (solo metadatos, nunca lo que escribe el ciudadano) queda en `registros/asistente.jsonl`, que el servidor no publica y git no versiona.

Si cambian el catálogo o los formularios, regenera lo que lee la IA:

```bash
node bd/generar_base_conocimiento.mjs
node bd/generar_semilla.mjs
```

Para ver el asistente: `http://localhost:8080/app/Indexlogin.html` (con sesión), la landing `index.html` (sin sesión) y `app/whatsapp.html?hola=1`. Las métricas de las pruebas están en `app/metricas.html`. Con `?simular=fallo` en la dirección, el envío a la institución falla a propósito.

## Pruebas

```bash
node --test pruebas/*.test.mjs                 # motor de trámites e intérprete (gratis)
python3 -m unittest discover -s pruebas        # servidor e IA con un cliente simulado (gratis)
node pruebas/evaluar_local.mjs                 # comprensión en modo básico (gratis)
python3 pruebas/evaluar_asistente.py --confirmo-costo   # comprensión con la IA real: gasta créditos
```

## Notas

- Si el puerto 8080 está ocupado, cambia el número, por ejemplo `8081`.
- Si el celular no conecta, revisa el firewall de macOS en Ajustes del Sistema → Red → Firewall.
- Abrir la página con doble clic (`file://`) también funciona, pero en ese modo el video no se puede adelantar y el asistente no usa la IA.
