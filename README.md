# Ouija de Atención al Cliente – Libro de Quejas Espectral

**Pabellón:** Pabellón 3 – Mundos Inventados
**Ingrediente improbable:** Botón de emergencia (y personaje que opina)

## El problema
Cuando en una casa desaparecen las llaves, se corta el Wi-Fi o se escuchan ruidos a las 3 AM, los humanos siempre culpan al fantasma del hogar pero nunca le dan un canal formal para responder.

## La solución
Una tabla Ouija invertida en espíritu donde el humano ingresa su queja y el fantasma de la casa responde moviendo la plancheta letra por letra con sarcasmo. Incluye soporte opcional para que el usuario ingrese su propia API Key de IA (con respaldo local automático) y un botón de emergencia de "Exorcismo" que cierra la sesión si el humano se arrepiente de invocarlo.

## Cómo probarlo
1. Clonar el repositorio, ejecutar `pnpm install` y luego `pnpm dev` (o abrir el enlace de la demo).
2. (Opcional) Pegar una API Key de Gemini o Groq en el campo superior; si se deja vacío, funciona con el motor local de respuestas.
3. Escribir un reclamo para el fantasma (ej: *"¿Dónde dejaste mis llaves?"*) y presionar **Invocar Respuesta**.
4. Observar cómo la plancheta deletrea el veredicto y probar el botón rojo **¡EXORCIZAR!** para activar el cierre de emergencia.

## Herramientas de IA utilizadas
- Asistente de IA para ideación del proyecto, diseño de arquitectura por features, redacción del README y generación de código base en React/TypeScript.

## Documentación
- [Patrones de diseño](docs/patrones-de-diseno.md)
