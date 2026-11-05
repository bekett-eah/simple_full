# Insignia "Powered by Netlify": regresar los botones a su lugar

En el plan gratuito, Netlify pone la insignia **"Powered by Netlify"** abajo a la derecha de todas las páginas, encima de todo. Sin pagar no se puede quitar ni mover. Para que no tapara nada, el commit `d9d956b` subió estos elementos:

| Elemento | Archivo | Antes | Ahora |
|---|---|---|---|
| Botones del asistente y de WhatsApp (con el globo, la miniatura del video y su halo) | [web/app/asistente.css](../../web/app/asistente.css) (`.l2-fab`, `.l2-flotantes`) | `bottom: 16px` | `bottom: 72px` |
| Pasos de "Cómo funciona" sobre los botones | [web/app/Indexlogin.html](../../web/app/Indexlogin.html) (`.l2-pasos`) | `bottom: 84px` | `bottom: 140px` |
| Barra de escribir del asistente (panel abierto) | [web/app/asistente.css](../../web/app/asistente.css) (`.l2-form`) | `padding-bottom: 14px` | `padding-bottom: 70px` |
| Barra de escribir del chat de WhatsApp, solo en celular | [web/app/whatsapp.html](../../web/app/whatsapp.html) (`.wa-entrada`) | `padding-bottom: 10px` + zona segura | `padding-bottom: 66px` |

Todo depende de una sola variable, `--espacio-insignia: 56px`. Está en dos archivos: `web/app/asistente.css` y `web/app/whatsapp.html`. **Con `0px`, todo vuelve a medir exactamente lo que medía antes.**

## Cuándo regresarlos

Cuando el sitio se publique en un lugar donde no aparece la insignia:

- otro hosting (Vercel, GitHub Pages, un servidor propio, etc.);
- Netlify con plan de pago y la insignia apagada en *Project configuration → General → Powered by Netlify badge*.

Si la insignia sigue apareciendo, no los regreses, porque volvería a tapar los botones.

## Opción 1 (recomendada): poner la variable en 0

Ejecuta esto desde la raíz del repositorio. Funciona en Mac y en Linux.

```bash
# 1. Quitar el espacio reservado para la insignia
perl -pi -e 's/--espacio-insignia: 56px;/--espacio-insignia: 0px;/' web/app/asistente.css web/app/whatsapp.html

# 2. Subir la versión del CSS para que los navegadores no usen la copia guardada
perl -pi -e 's/asistente\.css\?v=(\d+)/"asistente.css?v=".($1+1)/e' web/index.html web/app/Indexlogin.html

# 3. Comprobar: deben salir dos líneas con "0px" y dos con la versión nueva
grep -n -- "--espacio-insignia:" web/app/asistente.css web/app/whatsapp.html
grep -n "asistente.css?v=" web/index.html web/app/Indexlogin.html
```

Se ve igual que antes del cambio, y el código queda listo para volver a activarlo.

## Opción 2: deshacer el commit tal cual

Esta opción borra la variable y los comentarios, y deja los archivos idénticos a como estaban antes:

```bash
git revert d9d956b
```

Si esas líneas se modificaron después, `git revert` puede marcar conflictos. En ese caso usa la opción 1.

## Volver a activarlo (si se regresa a Netlify gratuito)

```bash
perl -pi -e 's/--espacio-insignia: 0px;/--espacio-insignia: 56px;/' web/app/asistente.css web/app/whatsapp.html
perl -pi -e 's/asistente\.css\?v=(\d+)/"asistente.css?v=".($1+1)/e' web/index.html web/app/Indexlogin.html
```

Si con el tiempo la insignia cambia de tamaño, ajusta ese mismo número. 56px deja unos 17px libres entre la insignia y los botones.

## Revisarlo en local

```bash
python3 backend/servidor.py 8080
```

Abre `http://localhost:8080/index.html`. Los botones del asistente y de WhatsApp deben quedar a 16px del borde inferior. Entra con una ventana privada para ver otra vez la presentación animada: solo sale las dos primeras visitas.
