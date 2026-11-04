/* Recorrido automático de un trámite en los tres canales del rediseño, con datos de prueba, hasta el último botón
   (Pagar / Enviar solicitud, Ir a pagar o la solicitud en proceso, Confirmar y pagar / Confirmar y enviar) sin pulsarlo.
   Se inyecta en la página (Playwright: page.addScriptTag({ path })) y se llama con
     await __recorrer({ escenario: { campo: valor }, maxPasos })
   en tramite.html?n=N, whatsapp.html?n=N&hola=1 o Indexlogin.html?asistente=N (con localStorage['simple-sesion']='1').
   escenario: el valor que se elige en las preguntas de opciones (por nombre de campo); en las demás, la primera opción.
   Los textos se llenan con ciudadano.js o con el «por ejemplo» del campo; los archivos, con uno en blanco del formato
   que pide el campo. Devuelve { ok, final, pasos, registro } (registro: lo que se respondió, para revisar). */
(() => {
  const espera = ms => new Promise(r => setTimeout(r, ms));
  const M = () => window.MOTOR_TRAMITE;
  const CUENTA = () => window.CIUDADANO || {};
  const sinMarcas = s => String(s || '').replace(/[*_]/g, '').trim();
  const norm = s => sinMarcas(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

  function formulario() {
    const n = Number(new URLSearchParams(location.search).get('n') || new URLSearchParams(location.search).get('asistente') || window.__numeroRecorrido);
    return window.FORMULARIOS_TRAMITES?.[n];
  }
  function camposDe(f = formulario()) {
    return [f, ...(f?.pasos || [])].flatMap(p => p?.campos || []).filter(c => c.nombre);
  }
  const campoPorNombre = nombre => camposDe().find(c => c.nombre === nombre);
  const campoPorEtiqueta = etiqueta => camposDe().find(c => norm(c.etiqueta) === norm(etiqueta));

  // Valor de prueba que cumple las reglas del campo
  const dados = {};
  function valorDePrueba(c) {
    if (!c) return 'Dato de prueba';
    const ejemplo = s => (String(s || '').match(/por ejemplo:?\s*«?([^«»]+?)»?\s*$/i) || [])[1];
    const candidatos = [
      c.igualA ? dados[c.igualA] ?? CUENTA()[c.igualA] : null,
      CUENTA()[c.nombre],
      c.modo === 'email' ? CUENTA().correo_notificaciones || 'prueba@example.com' : null,
      c.modo === 'tel' ? '7000-1234' : null,
      ejemplo(c.ayuda), ejemplo(c.mensaje), c.placeholder,
      c.modo === 'numeric' ? '25' : null,
      c.patron?.startsWith("[A-Za-z") ? 'María López' : null,
      'Dato de prueba', '25', '15-07-2027'
    ].filter(v => v !== null && v !== undefined && v !== '');
    const respuestas = Object.fromEntries(Object.entries(dados).map(([k, v]) => [k, { valor: v }]));
    const valor = candidatos.find(v => !M() || !M().validar(c, String(v), respuestas)) ?? candidatos[0];
    dados[c.nombre] = String(valor);
    return String(valor);
  }

  // Archivo en blanco del primer formato que acepta el campo
  async function archivoDePrueba(acepta) {
    const ext = (String(acepta || '.pdf').split(',')[0] || '.pdf').replace('.', '').trim().toLowerCase();
    if (['png', 'jpg', 'jpeg'].includes(ext)) {
      const lienzo = document.createElement('canvas');
      lienzo.width = lienzo.height = 20;
      const blob = await new Promise(r => lienzo.toBlob(r, ext === 'png' ? 'image/png' : 'image/jpeg'));
      return new File([blob], `prueba.${ext}`, { type: blob.type });
    }
    const contenido = { pdf: '%PDF-1.4\n%%EOF\n', zip: 'PK\u0005\u0006' + '\0'.repeat(18) }[ext] || 'prueba';
    const tipos = { pdf: 'application/pdf', zip: 'application/zip', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
    return new File([contenido], `prueba.${ext}`, { type: tipos[ext] || 'application/octet-stream' });
  }
  async function ponerArchivo(input, acepta) {
    const dt = new DataTransfer();
    dt.items.add(await archivoDePrueba(acepta ?? input.accept));
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /* ----- Formulario del sitio (tramite.html) ----- */
  async function recorrerFormulario({ escenario = {}, maxPasos = 40 } = {}) {
    const registro = [];
    const form = document.getElementById('formulario');
    const visible = nodo => !nodo.closest('.l2-condicional:not(.abierto)') && !nodo.closest('[hidden]');
    for (let vuelta = 0; vuelta < maxPasos; vuelta++) {
      await espera(150);
      const caja = [...form.querySelectorAll('.l2-paso-campos')].find(c => !c.hidden);
      const titulo = document.getElementById('paso-titulo').textContent.trim();
      const boton = document.getElementById('siguiente');
      const textoBoton = boton.textContent.trim();
      if (/^(Pagar|Enviar solicitud)/.test(textoBoton) && caja?.querySelector('.l2-revision, .l2-pago') || /^Pagar/.test(textoBoton)) {
        return { ok: true, final: `${titulo} · ${textoBoton}`, pasos: vuelta, registro };
      }
      // Varias pasadas: elegir una opción puede abrir campos nuevos
      for (let pasada = 0; pasada < 4; pasada++) {
        let cambios = 0;
        const grupos = new Map();
        caja.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(i => { if (visible(i) && !i.disabled) grupos.set(i.name, [...(grupos.get(i.name) || []), i]); });
        for (const [nombre, opciones] of grupos) {
          if (opciones.some(o => o.checked)) continue;
          const quiero = escenario[nombre];
          const elegida = opciones.find(o => o.value === quiero) || opciones[0];
          elegida.click();
          registro.push(`${titulo} · ${nombre} = ${elegida.value}`);
          cambios++;
        }
        for (const s of caja.querySelectorAll('select')) {
          if (!visible(s) || s.disabled || s.value) continue;
          const quiero = escenario[s.name];
          const op = [...s.options].find(o => o.value && (o.value === quiero)) || [...s.options].find(o => o.value);
          if (!op) continue;
          s.value = op.value;
          s.dispatchEvent(new Event('input', { bubbles: true }));
          s.dispatchEvent(new Event('change', { bubbles: true }));
          registro.push(`${titulo} · ${s.name} = ${op.value}`);
          cambios++;
        }
        for (const t of caja.querySelectorAll('input:not([type=radio]):not([type=checkbox]):not([type=file]):not([type=hidden]), textarea')) {
          if (!visible(t) || t.disabled || t.readOnly || t.value.trim()) continue;
          const campo = campoPorNombre(t.name);
          if (campo?.opcional && !escenario[t.name]) continue;
          t.value = escenario[t.name] ?? valorDePrueba(campo);
          t.dispatchEvent(new Event('input', { bubbles: true }));
          t.dispatchEvent(new Event('change', { bubbles: true }));
          registro.push(`${titulo} · ${t.name} = ${t.value}`);
          cambios++;
        }
        for (const a of caja.querySelectorAll('input[type=file]')) {
          if (!visible(a) || a.disabled || a.files.length) continue;
          if (campoPorNombre(a.name)?.opcional) continue;
          await ponerArchivo(a);
          registro.push(`${titulo} · ${a.name} = ${a.files[0]?.name}`);
          cambios++;
        }
        if (!cambios) break;
        await espera(400);
      }
      boton.click();
      await espera(700);
      const errores = [...form.querySelectorAll('.con-error')].filter(e => visible(e) && e.getClientRects().length).map(e => sinMarcas(e.textContent).slice(0, 120));
      const tituloDespues = document.getElementById('paso-titulo').textContent.trim();
      if (errores.length && tituloDespues === titulo) return { ok: false, final: `Errores en «${titulo}»: ${errores.join(' | ')}`, pasos: vuelta, registro };
    }
    return { ok: false, final: 'Demasiados pasos', registro };
  }

  /* ----- WhatsApp (whatsapp.html) ----- */
  async function recorrerWhatsApp({ escenario = {}, maxPasos = 160 } = {}) {
    const registro = [];
    const mensajes = document.getElementById('mensajes');
    const texto = document.getElementById('texto');
    const adjuntar = document.getElementById('adjuntar');
    let ultimaPregunta = '';
    let repetidas = 0;
    for (let vuelta = 0; vuelta < maxPasos; vuelta++) {
      // Esperar a que el bot deje de escribir y espere algo
      for (let t = 0; t < 120; t++) {
        await espera(120);
        const escribiendo = mensajes.querySelector('.wa-escribiendo');
        const botones = [...mensajes.querySelectorAll('.wa-botones')].pop();
        const activos = botones && [...botones.querySelectorAll('button:not(:disabled), a')].length;
        if (!escribiendo && (activos || adjuntar.classList.contains('espera') || texto.placeholder !== 'Mensaje')) break;
      }
      const filas = [...mensajes.querySelectorAll('.wa-fila, [class*="wa-fila"]')];
      const ultimaBot = [...mensajes.querySelectorAll('.wa-burbuja')].pop();
      const mensaje = ultimaBot?.innerText || '';
      const pagar = mensajes.querySelector('a[data-pago]');
      if (pagar) return { ok: true, final: 'Ir a pagar · ' + sinMarcas(mensaje).split('\n')[0].slice(0, 120), pasos: vuelta, registro };
      if (/está \*?en proceso|esta en proceso|en proceso\*?\n/i.test(mensaje) || /en proceso/.test(mensaje) && /¡Listo!/.test(mensaje)) return { ok: true, final: 'En proceso · ' + mensaje.split('\n')[0].slice(0, 120), pasos: vuelta, registro };
      // La pregunta: la primera línea en negrita del último mensaje con botones o del último del bot
      const pregunta = (mensaje.match(/^\*?([^\n*]+)\*?/) || [])[1] || mensaje.split('\n')[0];
      if (pregunta === ultimaPregunta) { if (++repetidas > 3) return { ok: false, final: `Se repite: ${mensaje.slice(0, 200)}`, pasos: vuelta, registro }; } else { repetidas = 0; ultimaPregunta = pregunta; }
      const botones = [...mensajes.querySelectorAll('.wa-botones')].pop();
      const activos = botones ? [...botones.querySelectorAll('button:not(:disabled)')] : [];
      // La etiqueta es la última negrita del mensaje que corresponde a un campo (antes puede ir el título del paso)
      const negritas = [...(ultimaBot?.querySelectorAll('strong, b') || [])].map(b => b.textContent).reverse();
      const campo = negritas.map(campoPorEtiqueta).find(Boolean) || campoPorEtiqueta(sinMarcas(mensaje.split('\n')[0]));
      if (/^Revisa tu (solicitud|cita)/.test(mensaje)) {
        const enviar = activos.find(b => /Enviar solicitud|Confirmar cita/.test(b.textContent));
        registro.push('Revisión · ' + enviar?.textContent.trim());
        enviar?.click();
        continue;
      }
      if (adjuntar.classList.contains('espera')) {
        const input = document.getElementById('archivo');
        await ponerArchivo(input, campo?.acepta || input.accept);
        registro.push(`${campo?.nombre || pregunta} = archivo`);
        continue;
      }
      if (texto.placeholder !== 'Mensaje' && /Escríbelo abajo/.test(mensaje)) {
        const usar = activos.find(b => /^Usar /.test(b.textContent.trim()));
        if (usar) { registro.push(`${campo?.nombre || pregunta} = ${usar.textContent.trim()}`); usar.click(); continue; }
        const valor = escenario[campo?.nombre] ?? valorDePrueba(campo);
        texto.value = valor;
        texto.dispatchEvent(new Event('input', { bubbles: true }));
        document.getElementById('entrada').requestSubmit();
        registro.push(`${campo?.nombre || pregunta} = ${valor}`);
        continue;
      }
      const opciones = activos.filter(b => !/^Atrás$/.test(b.textContent.trim()));
      if (!opciones.length) return { ok: false, final: `Sin respuesta posible: ${mensaje.slice(0, 200)}`, pasos: vuelta, registro };
      const ver = opciones.find(b => /Ver opciones/.test(b.textContent));
      if (ver) {
        ver.click();
        await espera(200);
        const radios = [...document.querySelectorAll('#hoja-opciones input')];
        const textos = radios.map(r => r.closest('label').innerText.split('\n')[0].trim());
        const quiero = campo && escenario[campo.nombre] !== undefined ? M().opcionesDe({ numero: 0, respuestas: Object.fromEntries(Object.entries(dados).map(([k, v]) => [k, { valor: v }])) }, campo).find(o => o.valor === escenario[campo.nombre])?.texto : null;
        const i = Math.max(0, quiero ? textos.findIndex(t => t === quiero) : 0);
        radios[i].click();
        radios[i].dispatchEvent(new Event('change', { bubbles: true }));
        document.getElementById('hoja-enviar').click();
        if (campo) dados[campo.nombre] = radios[i].value;
        registro.push(`${campo?.nombre || pregunta} = ${textos[i]}`);
        continue;
      }
      let elegido = opciones.find(b => /^Empezar$/.test(b.textContent.trim())) || opciones[0];
      if (campo?.tipo === 'opciones' && escenario[campo.nombre] !== undefined) {
        const t = campo.opciones.find(o => o.valor === escenario[campo.nombre])?.texto;
        elegido = opciones.find(b => b.textContent.trim() === t) || elegido;
      }
      if (campo) dados[campo.nombre] = campo.opciones?.find(o => o.texto === elegido.textContent.trim())?.valor ?? elegido.textContent.trim();
      registro.push(`${campo?.nombre || pregunta} = ${elegido.textContent.trim()}`);
      elegido.click();
    }
    return { ok: false, final: 'Demasiadas preguntas', registro };
  }

  /* ----- Chatbot (asistente de Indexlogin.html) ----- */
  async function recorrerChatbot({ escenario = {}, maxPasos = 160 } = {}) {
    const registro = [];
    // Sin la IA: el modo básico pregunta una cosa a la vez y lo escrito es la respuesta de lo que falta
    if (!window.__sinIA) {
      const original = window.fetch;
      window.fetch = (url, ...resto) => (String(url).includes('/api/asistente') ? Promise.reject(new Error('sin IA en la prueba')) : original(url, ...resto));
      window.__sinIA = true;
    }
    const mensajes = document.getElementById('mensajes');
    const entrada = document.getElementById('texto-asistente');
    let anterior = '';
    let repetidas = 0;
    for (let vuelta = 0; vuelta < maxPasos; vuelta++) {
      for (let t = 0; t < 100; t++) { await espera(120); if (!mensajes.querySelector('.l2-escribiendo')) break; }
      await espera(150);
      const ultima = [...mensajes.querySelectorAll('.l2-fila-bot')].pop();
      const html = ultima?.innerHTML || '';
      const textoUltima = ultima?.innerText || '';
      if (html === anterior) { if (++repetidas > 3) return { ok: false, final: `Se repite: ${textoUltima.slice(0, 200)}`, pasos: vuelta, registro }; } else { repetidas = 0; anterior = html; }
      const confirmar = ultima?.querySelector('[onclick^="confirmarSolicitud"]');
      if (confirmar) return { ok: true, final: confirmar.textContent.trim(), pasos: vuelta, registro };
      const suyo = ultima?.querySelector('[onclick^="responderSiEsSuyo(true)"]');
      if (suyo) { suyo.click(); registro.push('¿Es a tu nombre? = sí'); continue; }
      const opciones = [...(ultima?.querySelectorAll('[onclick^="elegirOpcion"]') || [])];
      if (opciones.length) {
        const nombre = opciones[0].getAttribute('onclick').match(/elegirOpcion\('([^']+)'/)[1];
        const elegido = opciones.find(b => b.dataset.valor === escenario[nombre]) || opciones[0];
        dados[nombre] = elegido.dataset.valor;
        registro.push(`${nombre} = ${elegido.dataset.valor}`);
        elegido.click();
        continue;
      }
      const lista = ultima?.querySelector('select.l2-chat-select');
      if (lista) {
        const nombre = lista.id.replace(/^lista-/, '');
        const op = [...lista.options].find(o => o.value && o.value === escenario[nombre]) || [...lista.options].find(o => o.value);
        lista.value = op.value;
        dados[nombre] = op.value;
        lista.dispatchEvent(new Event('change', { bubbles: true }));
        registro.push(`${nombre} = ${op.value}`);
        continue;
      }
      const adjunto = ultima?.querySelector('[onclick^="adjuntarArchivo"]');
      if (adjunto) {
        const nombre = adjunto.getAttribute('onclick').match(/adjuntarArchivo\('([^']+)'/)[1];
        const clic = HTMLInputElement.prototype.click;
        HTMLInputElement.prototype.click = function () {
          if (this.type !== 'file') return clic.call(this);
          HTMLInputElement.prototype.click = clic;
          ponerArchivo(this, this.accept);
        };
        adjunto.click();
        registro.push(`${nombre} = archivo`);
        await espera(300);
        continue;
      }
      const seguro = ultima?.querySelector('form.l2-campo-seguro');
      if (seguro) {
        const nombre = seguro.getAttribute('onsubmit').match(/guardarSeguro\('([^']+)'/)[1];
        seguro.valor.value = escenario[nombre] ?? valorDePrueba(campoPorNombre(nombre));
        registro.push(`${nombre} = ${seguro.valor.value}`);
        seguro.requestSubmit();
        continue;
      }
      // Un dato que se escribe abajo: el de la etiqueta que se pregunta
      const etiqueta = ultima?.querySelector('.l2-campo-chat strong')?.textContent;
      if (etiqueta) {
        const campo = /^Nombre completo$/.test(etiqueta) && !campoPorEtiqueta(etiqueta) ? { nombre: 'nombre', patron: "[A-Za-z]" } : campoPorEtiqueta(etiqueta);
        const valor = escenario[campo?.nombre] ?? (campo?.nombre === 'nombre' ? 'Juan Carlos Pérez Gómez' : valorDePrueba(campo));
        entrada.value = valor;
        entrada.dispatchEvent(new Event('input', { bubbles: true }));
        entrada.form.requestSubmit();
        registro.push(`${campo?.nombre || etiqueta} = ${valor}`);
        continue;
      }
      // Antes de empezar: cómo quiere hacer el trámite (aquí en el chat)
      const aqui = [...(ultima?.querySelectorAll('button') || [])].find(b => /chat|aquí|empezar|seguir/i.test(b.textContent));
      if (aqui) { registro.push('Inicio = ' + aqui.textContent.trim()); aqui.click(); continue; }
      return { ok: false, final: `Sin respuesta posible: ${textoUltima.slice(0, 300)}`, pasos: vuelta, registro };
    }
    return { ok: false, final: 'Demasiados mensajes', registro };
  }

  window.__recorrer = (opciones = {}) => {
    Object.keys(dados).forEach(k => delete dados[k]);
    if (document.getElementById('formulario') && document.getElementById('siguiente')) return recorrerFormulario(opciones);
    if (document.getElementById('hoja-opciones')) return recorrerWhatsApp(opciones);
    return recorrerChatbot(opciones);
  };
})();
