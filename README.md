# Ouija de Atención al Cliente – Libro de Quejas Espectral

**Pabellón:** Pabellón 3 – Mundos Inventados
**Ingrediente improbable:** Botón de emergencia (y personaje que opina)

## El problema
Cuando en una casa desaparecen las llaves, se corta el Wi-Fi o se escuchan ruidos a las 3 AM, los humanos siempre culpan al fantasma del hogar pero nunca le dan un canal formal para responder.

## La solución
Una tabla Ouija invertida en espíritu donde el humano ingresa su queja y el fantasma de la casa responde con sarcasmo: la plancheta se agita sobre el tablero en una simulación y el veredicto aparece escrito arriba. Incluye soporte opcional para que el usuario ingrese su propia API Key de IA (con respaldo local automático) y un botón de emergencia de "Exorcismo" que cierra la sesión si el humano se arrepiente de invocarlo.

## Cómo probarlo
1. Clonar el repositorio, ejecutar `pnpm install` y luego `pnpm dev` (o abrir el enlace de la demo).
2. (Opcional) Pegar una API Key de Gemini o Groq en el campo superior; si se deja vacío, funciona con el motor local de respuestas.
3. Escribir un reclamo para el fantasma (ej: *"¿Dónde dejaste mis llaves?"*) y presionar **Invocar Respuesta**.
4. Observar cómo la plancheta se mueve por el tablero mientras el reclamo aparece abajo y, luego, el veredicto del fantasma aparece arriba. Probar el botón rojo **¡EXORCIZAR!** para activar el cierre de emergencia.

## Diseño de la interfaz
- **Tablero:** estilo Ouija clásico sobre pergamino envejecido, en español: **SÍ** y **NO** en las esquinas superiores, el abecedario en dos arcos (A–M y N–Z), la fila de números `1234567890` y **ADIÓS** al pie, con sol y luna decorativos en las esquinas. Se dibuja con SVG/CSS propio, sin usar imágenes de stock.
- **Simulación de la plancheta:** la plancheta no deletrea letra por letra. Recorre el tablero con un movimiento errático durante unos segundos y, al terminar, el texto aparece completo.
- **Respuesta del fantasma (arriba):** se muestra solo la última respuesta.
- **Mensaje del humano (abajo):** al enviar un reclamo también hay una simulación y el mensaje aparece debajo del tablero. Se muestra solo el último mensaje.
- **Sin historial:** cada nuevo reclamo reemplaza al anterior, y cada nueva respuesta reemplaza a la anterior.

## Herramientas de IA utilizadas
- Asistente de IA para ideación del proyecto, diseño de arquitectura por features, redacción del README y generación de código base en React/TypeScript.

## Documentación
- [Patrones de diseño](docs/patrones-de-diseno.md)
- [Diseño final de la pantalla](docs/diseno/README.md)
- [Fantasma volador](docs/diseno/fantasma.md)
- [Sonidos](docs/sonidos/README.md)
