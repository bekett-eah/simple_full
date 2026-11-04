# Trámites del catálogo: mapeados y por mapear

Actualizado el 3 de noviembre de 2026. Son los 118 trámites del catálogo (src/data/catalogo-landing.js), en el mismo orden en que los tenemos en el sitio: primero las cuatro categorías del chat y después el resto del catálogo, por número. «Mapeado» quiere decir que su formulario real de SIMPLE está copiado en nuevoDiseño/formularios.js.

|                                                                                     | Cantidad |
| ----------------------------------------------------------------------------------- | -------- |
| ✅ Mapeado completo (hasta el pago o, si es gratis, hasta el último paso sin enviar) | 87       |
| 🟡 Mapeado en parte                                                                 | 8        |
| ⬜ Sin mapear                                                                        | 23       |
| **Total**                                                                           | **118**  |

Todo trámite que tiene formulario se puede hacer dentro de WhatsApp y del chatbot sin hacer nada más, porque los dos chats leen formularios.js. Los que no están mapeados se encuentran en los chats, pero se hacen en el portal de la institución. El 71 entra en los chats, aunque solo con su primera pantalla; el 116 llega hasta la verificación del DUI, el 44 y el 45, hasta donde el VMT pide un código de registro de transportista real, y el 108, hasta la elección de la asociación o federación.

## Pruebas en los tres canales (2 de noviembre de 2026)

Se recorrieron de forma automática los 59 formularios de entonces en los tres canales, con datos de prueba (nunca los de la cuenta real), hasta el pago o, si es gratis, hasta enviar, sin pagar ni enviar nada a la institución:

- **Formulario del sitio** (tramite.html): paso por paso, hasta el botón «Pagar» o «Enviar solicitud».
- **WhatsApp** (whatsapp.html): desde «Hola», respondiendo cada pregunta, hasta «Ir a pagar» o hasta la solicitud en proceso.
- **Chatbot** (el asistente con sesión): hasta «Confirmar y pagar» o «Confirmar y enviar».

Los 59 llegan al final en los tres. También se probaron las variantes que cambian los pasos: estudiante activo o no (86), para ti o para otra persona (76, 77, 78, 87 y 94), reposición por robo o por deterioro (15 y 16), cita nueva o para reponer una perdida (78), con expedientes en la PGR (94), consulta o capacitación (115) y pensión propia o de un tercero (116).

## Tercera ronda del 3 de noviembre de 2026: FONAT y FOSEP

Se leyeron con datos de prueba y archivos en blanco, sin enviar nada (ninguna página de confirmación final se abrió):

| N.º | Portal | Hasta dónde se leyó |
|---|---|---|
| 111 | FONAT (trámite 342) | Para quién es, nacionalidad y DUI o pasaporte del beneficiario; sus datos y contacto (y el representante legal si es extranjero); el siniestro vial con el consentimiento; los requisitos documentales y el resumen, el último paso |
| 118 | FOSEP (trámite 400) | Un solo paso: datos de la empresa, representante legal, contacto, los 15 grupos de códigos de especialización (259 opciones) y la experiencia en estudios de preinversión |

Lo que no se copió tal cual:

- En el 111, si el beneficiario es salvadoreño, el portal trae del RNPN los datos de su representante con el DUI; aquí solo hay una nota. Los documentos del paso de requisitos van en un paso aparte, que solo sale si el solicitante no ha presentado antes su solicitud en FONAT.
- En el 118, los estudios son una tabla de hasta 5 filas en el portal; aquí va un estudio y un campo para los demás. Los campos ocultos `check_*` del portal no se copiaron.

Pruebas: los 2 se recorrieron en los tres canales con 3 escenarios el 111 (para mí, para un tercero extranjero menor de edad y para un tercero salvadoreño mayor de edad) y 2 el 118 (inscrito y en proceso): 15 recorridos, todos hasta el final.

Pendiente del MOP: el 117 empieza con una nota legal que debe aceptar el usuario; el borrador 16405929 quedó abierto en el navegador de las pruebas. El 90 (ISBM) y el 106 (AMP) solo tienen enlace en simple.sv, que pide iniciar sesión allí, y no se pudo saber qué trámite de su portal corresponde.

## Segunda ronda del 3 de noviembre de 2026: ISSS, PGR, Imprenta Nacional, FOSOFAMILIA, CORSAIN e INDES

Se leyeron con datos de prueba y archivos en blanco, sin enviar ni pagar nada (ninguna página de confirmación final se abrió):

| N.º | Portal | Hasta dónde se leyó |
|---|---|---|
| 91 | ISSS (trámite 39) | Tipo de persona, DUI o NIT del patrono y a quién se presenta; el segundo paso (el último) muestra lo que el ISSS encontró y su Siguiente genera la constancia |
| 92 | ISSS (trámite 22) | Tipo de persona, documento del patrono y DUI del representante legal; igual que el 91, el segundo paso genera la solvencia |
| 93 | PGR (trámite 386) | Dónde vive la persona convocada (con la Procuraduría Auxiliar o el país y el consulado), datos de quien solicita o de quien ayuda, la cuota y de 1 a 5 beneficiarios, los motivos y de 1 a 5 convocados (laboral y contacto) y la declaración jurada, el último paso |
| 97 | Imprenta Nacional (trámite 334) | Solicitante a título personal o para un tercero, exención de pago, datos de la constancia y la declaración jurada; el pago es el del catálogo ($3.25) |
| 98 | Imprenta Nacional (trámite 65) | Igual que el 97 en el solicitante, el documento a publicar (PDF y, con descuento del 5 %, en Word) y la declaración jurada |
| 102 | FOSOFAMILIA (trámite 359) | Datos generales del cliente y, en el segundo paso (el último), los del negocio y del crédito |
| 107 | CORSAIN (trámite 50) | Un solo paso con los datos del solicitante |
| 108 | INDES (trámite 363) | Datos del solicitante, la declaración jurada (que debe aceptar el usuario) y la asociación, federación o institución, con las listas completas de 299 asociaciones y 48 federaciones |

Lo que no se copió tal cual:

- En el 93, la edad de quien solicita y de los beneficiarios la calcula el portal; aquí no se pide. Con DUI, el portal trae del RNPN el nombre del convocado; aquí tampoco se pide en ese caso. El teléfono del convocado es uno solo (nacional o del extranjero).
- En el 102 no se copió el mapa de geolocalización de la vivienda ni del negocio (opcionales en el portal).
- En el 97 y el 98, el pago depende de la exención: sin exención, el 97 cobra $3.25 y el 98 avisa que la Imprenta calcula el monto.

Pruebas: los 8 se recorrieron en los tres canales con 2 escenarios cada uno (48 recorridos), todos hasta el final.

Pendientes del ISBM: el 88 y el 89 empiezan con una declaración jurada y una cláusula antisoborno que debe aceptar el usuario; los borradores 16401953 y 16401956 quedaron abiertos en el navegador de las pruebas. El del INDES (16402321) quedó en su declaración jurada.

## Ronda del 3 de noviembre de 2026 (tarde): VMT, MAG, CEPA y CONAPINA

Se leyeron con datos de prueba y archivos en blanco, sin enviar ni pagar nada:

| N.º | Portal | Hasta dónde se leyó |
|---|---|---|
| 44 | VMT (trámite 232) | Nacionalidad y tipo de persona, el código del registro de transporte de carga, el vehículo (de su registro o arrendado, con los datos de la tarjeta), sus documentos y los materiales peligrosos. El código de prueba no pasa la validación, así que lo que sigue no se vio; el pago es el del catálogo según la clase del vehículo |
| 45 | VMT (trámite 309) | Igual que el 44 hasta el vehículo (de su registro, con características técnicas especiales o arrendado); después los ejes, los documentos y las dimensiones de la combinación, y la carga con su recorrido y escolta |
| 65 | MAG (trámite 298) | Primera vez, refrenda o reposición; para quién es, oficina, comprobante, domicilio y, según el caso, el diseño del fierro, la matrícula vencida o la nota de extravío |
| 79 | CEPA (trámite 190) | Tipo de persona y documento; datos del viaje, boleto o itinerario, maletas y mascotas |
| 80 | CEPA (trámite 280) | Solicitante, servicio de tiempo extraordinario con fechas y horas, y datos para la factura |
| 81 | CEPA (trámite 428) | Preformulario (cliente, tercero autorizado, instancia, instalación y entidad, con las listas completas de embajadas, arrendatarios, concesionarios e instituciones) y la planilla de personas, en tabla o en archivo, con la carpeta de documentos y la sucursal |
| 82 | CONAPINA (trámite 297) | Asistencia técnica y contacto: es todo lo que pide antes de que CONAPINA admita la solicitud |
| 83 | CONAPINA (trámite 458) | Tipo de autorización y calificación del lugar, solicitante natural o jurídico (con representantes y apoderados), establecimiento, requisitos de cada institución, director, facturación y declaración jurada |
| 84 | CONAPINA (trámite 281) | Información general y financiamiento, contacto, población participante y contenido técnico con la cobertura territorial |

Lo que no se copió tal cual:

- Las tablas del portal (vehículos, ejes, pasajeros, personas de la planilla, fuentes de financiamiento, objetivos) van como un elemento y un campo para los demás.
- En el 81, las listas de entidades dependen de la instancia y de la instalación a la vez; aquí la instalación depende de la instancia y la entidad, de la instalación. A los arrendatarios no se les ofrece la Oficina Central, porque el portal no tiene lista para esa combinación.
- En el 83 no se copió el mapa de geolocalización del CAPI.
- En SIMPLE, la página de confirmación final se pulsa sola al abrirse (`#boton-termino`). Por eso no se abrió ninguna: solo se leyeron. Las de VMT 35 a 43, 46 y 47 solo pasan al formulario del ciudadano; las de CEPA y CONAPINA envían la solicitud.

Pruebas: los 9 se recorrieron en los tres canales con 2 a 4 escenarios cada uno (79 recorridos), todos hasta el final.

Pendientes de VMT: 35 a 43, 46 y 47 empiezan con una nota legal o una declaración jurada que debe aceptar el usuario en el portal. Los borradores quedaron abiertos en el navegador de las pruebas.

## Ronda del 3 de noviembre de 2026: los 17 de la DGEHM (18 a 34)

Se leyeron en el portal de la DGEHM con datos de prueba y archivos en blanco, sin enviar nada (todos son gratis), y se copiaron en formularios.js:

| N.º | Portal | Hasta dónde se leyó |
|---|---|---|
| 18 a 26 | DGEHM (trámite 234) | Los nueve trámites de GLP son un solo formulario; cada uno trae elegido su producto. Hasta la declaración jurada: quién solicita (persona natural o jurídica), sus datos y documentos, el representante legal, la persona para recibir notificaciones y el apoderado (si los hay), el detalle del producto con sus documentos y la declaración |
| 27 a 34 | DGEHM (trámites 449 a 457) | Las ocho transferencias de funcionamiento piden lo mismo; cambia si preguntan el producto (27, 28, 30 y 31) o el nombre del local (28 y 29). Hasta la declaración jurada, con titular natural o jurídico, representante legal, apoderado y persona para notificaciones |

Lo que no se copió tal cual:

- La DGEHM verifica el DUI en el RNPN y el NIT de la empresa en el Registro de Comercio, y trae de ahí el nombre y los datos de la empresa. Con datos de prueba el portal responde que el DUI o el NIT son inválidos, así que esos datos no se vieron: en el rediseño, el nombre sale de la Identidad Digital y una nota explica qué trae la DGEHM con el NIT.
- En el portal el detalle del producto es una tabla a la que se agregan ítems; aquí va un ítem y un campo para los demás, como en el 72.
- Las preguntas del apoderado y de la persona para notificaciones van en el primer paso (en las transferencias, el portal las hace en pasos aparte).

Pruebas: los 17 se recorrieron en los tres canales con dos escenarios cada uno (persona natural con DUI, apoderado y notificaciones; y persona jurídica con el representante con pasaporte, sin apoderado ni notificaciones, rescindiendo el contrato y cambiando la denominación del local). Los 102 recorridos llegan al final. Se corrigieron campos con el mismo nombre y reglas distintas (la capacidad de los reguladores, adjuntos y los datos de exportación y reexportación de GLP a granel), que hacían fallar la validación en el formulario del sitio. El recorrido automático quedó en pruebas/recorrido-canales.js para los trámites que faltan.

## Ronda del 2 de noviembre de 2026: 11 trámites nuevos

Se leyeron en los portales reales, con datos de prueba y sin enviar nada (todos son gratis), y se copiaron en formularios.js:

| N.º | Portal | Hasta dónde se leyó |
|---|---|---|
| 66 y 67 | MAG (trámite 58) | Los tres pasos: solicitante, producto y factura con documentos. Es el mismo formulario; cada trámite trae elegido su tipo de exoneración |
| 68 | MAG (trámite 340) | Los tres pasos: DUI del representante, verificación y datos de la asamblea con su agenda |
| 70 | MARN (trámite 224) | Los cuatro pasos: indicaciones, datos personales, investigación y servicios LIDAR |
| 72 | MARN (trámite 332) | Los cuatro pasos, hasta la declaración jurada sin marcarla |
| 76 y 77 | ISRI (trámites 71 y 60) | Los dos pasos, para ti y para otra persona |
| 78 | ISRI (trámite 328) | Los tres pasos, para ti y para otra persona (mayor o menor de edad) |
| 94 | PGR (trámite 348) | Los dos pasos, para ti y para otra persona |
| 115 | Superintendencia de Competencia (trámite 364) | Consulta (un paso) y capacitación (tres pasos, con su planilla) |
| 116 | INABVE (trámite 406) | En parte: el portal verifica el DUI en su registro de pensionados y la cuenta de prueba no lo es |

Quedan pendientes en esta parte del catálogo:

- **69** (MARN): su primer paso es una nota legal que tienes que aceptar tú en tu Chrome. Igual que el 103.
- **56 a 60** (ISP): su portal no acepta Identidad Digital y pide un usuario propio del ISP.

En los portales, las tablas en las que se agregan filas (las personas y playas del 72, la planilla del 115) se pasaron a una fila con un campo aparte para las demás. El mapa de ubicación del 72 se pide como dirección.


Lo que las pruebas encontraron y ya se corrigió:

- WhatsApp cobraba el precio del catálogo cuando el formulario no tiene paso de pago. Pasaba en la fianza (1) y en la póliza (2), donde la AAC calcula el monto al revisar. Además cobraba en 99 y 101 aunque el pago no correspondiera a lo respondido. Ahora usa la misma regla que el chatbot.
- WhatsApp aceptaba cualquier archivo. Ahora pide el formato del campo (por ejemplo, Excel en 55 y 105) y hasta 5 MB, como el chatbot.
- En la lista de pasos de 1 y 2 ya no se promete un enlace de pago: dice que la AAC indica el monto cuando revisa la solicitud.
- En el formulario del sitio, una condición sobre una pregunta de varias opciones solo miraba la primera casilla marcada. En el LIDAR (70), si eliges dos productos, ahora aparecen los datos de los dos.
- El motor usa los nombres que empiezan con «cita_» para agendar citas y no guardaba la pregunta «¿Es para reponer una cita perdida?» del 78 en el chatbot. Se le cambió el nombre y quedó anotado en formularios.js.
- La hora de 68 y 115 aceptaba como máximo 8 caracteres y no dejaba escribir «2:45 p. m.». Ahora acepta 11.

## Judiciales (2)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 99 | Constancia de antecedentes penales | MJSP | ✅ Hasta el pago, en línea y con cita | ✅ Los tres |
| 100 | Constancia de antecedentes policiales | PNC | ✅ Hasta el pago ($3.50) | ✅ Los tres |

## DUI y partidas (4)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 73 | Certificación de partidas | RNPN | ✅ Hasta el pago | ✅ Los tres |
| 74 | Certificación de registro de DUI y no DUI | RNPN | 🟡 Hasta «Ingresar solicitud»: el pago del RNPN llega después de su revisión | ✅ Los tres |
| 75 | Constancia de homónimo | RNPN | 🟡 Hasta «Ingresar solicitud»: el pago del RNPN llega después de su revisión | ✅ Los tres |
| 113 | Constancia de no restricción migratoria | Dirección General de Migración y Extranjería | 🟡 4 de 5 variantes, hasta el paso de datos | ✅ Los tres |

## Agua y hogar (7)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 61 | Cambio de nombre del titular de la cuenta | ANDA | ✅ Hasta la etapa de pago | ✅ Los tres |
| 62 | Constancia de no servicio de agua potable y/o alcantarillado | ANDA | ✅ Hasta la etapa de pago | ✅ Los tres |
| 63 | Factibilidad para una vivienda | ANDA | ✅ Hasta la etapa de pago | ✅ Los tres |
| 64 | Solvencia de cuenta de agua potable y/o alcantarillado | ANDA | ✅ Hasta la etapa de pago | ✅ Los tres |
| 101 | Consulta y pago de préstamos FSV | FSV | ✅ Hasta el pago (con préstamos de ejemplo: la cuenta no tiene) | ✅ Los tres |
| 105 | Certificado de inscripción para el registro del desarrollador parcelario | MINVIVIENDA | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 109 | Estado de cuenta del Fondo Especial de Contribuciones (FEC) | FONAVIPO | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |

## Educación y títulos (8)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 48 | Ampliación de servicios educativos | MINEDUCYT | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 49 | Auténtica de documentos académicos | MINEDUCYT | ✅ Hasta adjuntar documentos, sin enviar (gratis) | ✅ Los tres |
| 50 | Boleta de resultados PAES / AVANZO | MINEDUCYT | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 51 | Cambio de domicilio centros educativos | MINEDUCYT | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 52 | Certificación de registro de notas de educación básica y media | MINEDUCYT | ✅ Completo (gratis) | ✅ Los tres |
| 53 | Certificación de registro de título de educación media | MINEDUCYT | ✅ Completo (gratis) | ✅ Los tres |
| 54 | Creación, nominación y funcionamiento de centros educativos | MINEDUCYT | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 55 | Prospectos escolares | MINEDUCYT | ✅ Completo (gratis) | ✅ Los tres |

## Resto del catálogo (97)

### Ya mapeados (74)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 1 | Anotación/inscripción de fianza | AAC | ✅ Hasta enviar: la AAC calcula el pago al revisar (hasta $300.00) | ✅ Los tres |
| 2 | Anotación/inscripción de pólizas de seguro | AAC | ✅ Hasta enviar: la AAC calcula el pago al revisar ($60.00 más $1.00 por millar) | ✅ Los tres |
| 3 | Anotación/inscripción de tarifas | AAC | ✅ Hasta el pago ($100.00) | ✅ Los tres |
| 4 | Certificación de expedientes de aeronaves | AAC | ✅ Hasta el pago ($20.00) | ✅ Los tres |
| 5 | Certificación extractada de documentos anotados/inscritos | AAC | ✅ Hasta el pago ($20.00) | ✅ Los tres |
| 6 | Certificación literal de documentos anotados/inscritos | AAC | ✅ Hasta el pago ($20.00) | ✅ Los tres |
| 7 | Extensión de permiso de aprendiz técnico en mantenimiento de aeronaves | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 8 | Extensión de permiso de piloto estudiante | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 9 | Modificación o actualización de especificaciones y limitaciones de operación (Opspecs) | AAC | ✅ Hasta enviar (sin costo indicado) | ✅ Los tres |
| 10 | Renovación de licencia de técnico de mantenimiento de aeronaves TMA | AAC | ✅ Hasta el pago ($25.00 o $35.00) | ✅ Los tres |
| 11 | Renovación de licencia piloto privado avión | AAC | ✅ Hasta el pago ($30.00 a $50.00) | ✅ Los tres |
| 12 | Renovación de permiso de aprendiz de técnico de mantenimiento de aeronaves TMA | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 13 | Renovación de permiso de piloto estudiante | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 14 | Reposición de licencia piloto privado avión | AAC | ✅ Hasta el pago ($20.00) | ✅ Los tres |
| 15 | Reposición de licencia técnico mantenimiento de aeronaves TMA | AAC | ✅ Hasta el pago ($15.00) | ✅ Los tres |
| 16 | Reposición de permiso de aprendiz de técnico de mantenimiento de aeronaves TMA | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 17 | Reposición de permiso de piloto estudiante | AAC | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 18 | Autorización para comercializar cilindros portátiles para envasado de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 19 | Autorización para comercializar reguladores de baja presión para GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 20 | Autorización para exportar GLP a granel | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 21 | Autorización para exportar cilindros portátiles para envasado de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 22 | Autorización para importación de accesorios para cilindros portátiles para GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 23 | Autorización para importación de válvulas para cilindros de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 24 | Autorización para importar cilindros portátiles para envasado de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 25 | Autorización para importar reguladores de baja presión para GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 26 | Autorización para reexportar GLP a granel | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 27 | Transferencia de funcionamiento de depósito de aprovisionamiento | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 28 | Transferencia de funcionamiento de estación de servicio | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 29 | Transferencia de funcionamiento de planta de envasado de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 30 | Transferencia de funcionamiento de tanque para consumo privado | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 31 | Transferencia de funcionamiento de tanque para consumo privado temporal | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 32 | Transferencia de funcionamiento de fábrica de cilindros para envasado | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 33 | Transferencia de funcionamiento de taller de reparación y mantenimiento de cilindros de GLP | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 34 | Transferencia de funcionamiento de taller para instalación de GLP vehicular | DGEHM | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 44 | Permiso especial para el transporte de materiales peligrosos nacional e internacional | VMT | 🟡 Hasta los materiales: el portal valida el código del registro de transportista y con uno de prueba no deja ver lo que sigue; pago del catálogo ($39.55 o $56.50) | ✅ Los tres |
| 45 | Permiso especial para el transporte de objetos que sobrepasen el peso y/o dimensiones establecidas en la ley nacional e internacional (autorización de transporte de cargas mayores a las permitidas) | VMT | 🟡 Hasta la carga y el recorrido: el portal valida el código del registro de transportista y con uno de prueba no deja ver lo que sigue; pago del catálogo ($39.55) | ✅ Los tres |
| 65 | Matrícula de fierro para herrar ganado | MAG | ✅ Hasta el último paso, sin enviar: el MAG revisa y después indica el pago | ✅ Los tres |
| 66 | Nota de exoneración de visado de importación de productos agrícolas | MAG | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 67 | Nota de exoneración de visado de importación de productos utilizados en alimentación animal | MAG | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 68 | Notificación de asamblea general | MAG | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 70 | Información LIDAR para la investigación científica y el desarrollo experimental para los sectores de educación superior y gobierno | MARN | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 71 | Información gratuita de fenómenos naturales | MARN | 🟡 Solo la primera pantalla (datos personales) | ✅ Los tres |
| 72 | Permiso de incubación y recolección de huevos de tortuga marina | MARN | ✅ Hasta la declaración jurada, sin enviar (gratis) | ✅ Los tres |
| 76 | Constancia de horarios de atención en los servicios de rehabilitación | ISRI | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 77 | Constancia médica | ISRI | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 78 | Otorgamiento de cita médica | ISRI | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 79 | Servicio VIP en el Aeropuerto Internacional de El Salvador | CEPA | ✅ Hasta el último paso, sin enviar: CEPA confirma la disponibilidad y el pago ($55.00 por persona) | ✅ Los tres |
| 80 | Servicio extraordinario en el Puerto de Acajutla | CEPA | ✅ Hasta el último paso, sin enviar: CEPA indica el costo según el servicio | ✅ Los tres |
| 81 | Solicitud de carnet de identificación para el ingreso a las instalaciones de las empresas de CEPA | CEPA | ✅ Hasta la sucursal de retiro, sin enviar (preformulario y planilla) | ✅ Los tres |
| 82 | Acreditación de programas y registro de miembros de la REA | CONAPINA | ✅ Hasta el último paso de la primera etapa, sin enviar: lo demás lo habilita CONAPINA al admitir la solicitud | ✅ Los tres |
| 83 | Autorización y renovación para el funcionamiento de centros de atención a la primera infancia (CAPI) | CONAPINA | ✅ Hasta la declaración jurada, sin enviar | ✅ Los tres |
| 84 | Registro de proyectos de atención de primera infancia, niñez y adolescencia | CONAPINA | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 85 | Certificación de notas para graduados de ENA | ENA | ✅ Hasta el pago ($10.00) | ✅ Los tres |
| 86 | Constancia de estudios | ENA | ✅ Hasta el pago ($5.00; en el portal llega en la etapa siguiente) | ✅ Los tres |
| 87 | Reingreso para la carrera de agrónomo en grado técnico | ENA | ✅ Hasta el pago ($5.00) | ✅ Los tres |
| 91 | Constancia de no inscrito para persona natural o jurídica como patrono en el ISSS | ISSS | ✅ Hasta el último paso, sin enviar (gratis): el ISSS verifica el documento del patrono | ✅ Los tres |
| 92 | Solvencia patronal de régimen salud | ISSS | ✅ Hasta el último paso, sin enviar (gratis): el ISSS verifica el documento del patrono | ✅ Los tres |
| 93 | Fijación de cuota alimenticia a obligados nacionales y residentes en el extranjero | PGR | ✅ Hasta la declaración jurada, sin enviar (gratis), con 1 a 5 beneficiarios y convocados | ✅ Los tres |
| 94 | Solvencia de pensión alimenticia de la PGR | PGR | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 95 | Homónimos para registros de armas de fuego | MDN | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 96 | Solicitud para la devolución de armas de fuego de persona natural | MDN | ✅ Hasta el pago ($11.00) | ✅ Los tres |
| 97 | Solicitud de constancia de publicación en el Diario Oficial | DIN | ✅ Hasta el pago ($3.25; sin pago si tienes exención) | ✅ Los tres |
| 98 | Solicitud de publicación en Diario Oficial | DIN | ✅ Hasta la declaración jurada, sin enviar: el costo depende de las tarifas del Diario Oficial y la Imprenta lo avisa al revisar | ✅ Los tres |
| 102 | Solicitud de crédito | FOSOFAMILIA | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 104 | Solvencia IAIP | IAIP | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 107 | Estado de cuenta | CORSAIN | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 108 | Certificación de inscripción de federaciones y asociaciones deportivas | INDES | 🟡 Hasta la elección de la asociación o federación: lo que sigue se ve cuando aceptes la declaración jurada | ✅ Los tres |
| 110 | Constancia del Tribunal de Ética Gubernamental | TEG | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 111 | Ingreso a programas de rehabilitación | FONAT | ✅ Hasta el resumen, el último paso, sin enviar (gratis) | ✅ Los tres |
| 112 | Constancia de cierre de casos | Defensoría del Consumidor | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 114 | Historial de pago de seguros de carácter voluntario | CME-MINED | ✅ Hasta el último paso, sin enviar (gratis) | ✅ Los tres |
| 115 | Capacitación o consulta sobre derecho de competencia | Superintendencia de Competencia | ✅ Hasta el último paso, sin enviar (gratis), en consulta y en capacitación | ✅ Los tres |
| 116 | Constancia de pensión de veteranos, excombatientes y beneficiarios | INABVE | 🟡 Hasta la verificación del DUI: la cuenta de prueba no es de un pensionado y no deja ver el resumen de la pensión | ✅ Los tres |
| 118 | Formulario de inscripción registro nacional de consultores | FOSEP | ✅ Hasta el último paso, sin enviar (gratis): su único paso envía la inscripción | ✅ Los tres |

### Por mapear (23)

| N.º | Trámite | Institución | Estado | Probado en formulario, WhatsApp y chatbot |
|---|---|---|---|---|
| 35 | Apostillado de certificación de licencia de conducir | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 36 | Apostillado de constancia de récord de licencia de conducir | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 37 | Autorización de fianza moral | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 38 | Autorización de realización de emisión de gases | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 39 | Certificación de tarifario | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 40 | Constancia de capacidad | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 41 | Constancia de modificación a la capacidad | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 42 | Constancia para la obtención de la exención de IVA | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 43 | Modificación física de vehículo de transporte de carga | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 46 | Registro de transportista de carga nacional e internacional | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 47 | Renovación de registro de transportistas de carga nacional e internacional | VMT | ⬜ Sin mapear | No: en el portal de la institución |
| 56 | Constancia de afiliación y beneficio | ISP | ⬜ Su portal no acepta Identidad Digital: pide un usuario y contraseña propios del ISP. Sin mapear | No: en el portal de la institución |
| 57 | Constancia de beneficiario inscrito | ISP | ⬜ Su portal no acepta Identidad Digital: pide un usuario y contraseña propios del ISP. Sin mapear | No: en el portal de la institución |
| 58 | Constancia de cotizante no pensionado | ISP | ⬜ Su portal no acepta Identidad Digital: pide un usuario y contraseña propios del ISP. Sin mapear | No: en el portal de la institución |
| 59 | Constancia de número de afiliación | ISP | ⬜ Su portal no acepta Identidad Digital: pide un usuario y contraseña propios del ISP. Sin mapear | No: en el portal de la institución |
| 60 | Constancia de pensionado | ISP | ⬜ Su portal no acepta Identidad Digital: pide un usuario y contraseña propios del ISP. Sin mapear | No: en el portal de la institución |
| 69 | Certificación técnica para fines judiciales y de seguros | MARN | ⬜ Leído el primer paso (nota legal): falta que aceptes la nota en tu Chrome para ver el resto. Sin mapear | No: en el portal de la institución |
| 88 | Ayuda económica por la adquisición de anteojos | ISBM | ⬜ Leído el primer paso (declaración jurada y cláusula antisoborno): falta que la aceptes en el navegador de las pruebas. Sin mapear | No: en el portal de la institución |
| 89 | Beneficio de ayuda económica para gastos funerarios | ISBM | ⬜ Leído el primer paso (declaración jurada y cláusula antisoborno): falta que la aceptes en el navegador de las pruebas. Sin mapear | No: en el portal de la institución |
| 90 | Reembolsos por gastos médico-hospitalarios | ISBM | ⬜ Sin mapear | No: en el portal de la institución |
| 103 | Solvencia municipal y pago de impuestos municipales de los distritos de alcaldía Santa Ana Oeste | Alcaldía Santa Ana Oeste | ⬜ Leído el primer paso (nota legal): falta que aceptes la nota en tu Chrome para ver el resto. Sin mapear | No: en el portal de la institución |
| 106 | Autorización y registro de agentes marítimos | AMP | ⬜ Sin mapear | No: en el portal de la institución |
| 117 | Constancia de competencia | MOP | ⬜ Leído el primer paso (nota legal): falta que aceptes la nota en tu Chrome para ver el resto. Sin mapear | No: en el portal de la institución |
