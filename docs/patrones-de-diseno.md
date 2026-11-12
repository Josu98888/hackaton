# Patrones de Diseño – Ouija de Atención al Cliente

Esta arquitectura combina una estructura **Feature-First** con tres patrones de diseño clásicos (Strategy, State y Facade) y un custom hook de simulación, adaptados a React/TypeScript para mantener el código desacoplado, fácil de explicar y libre de condicionales gigantes.

---

## 1. Strategy Pattern (Patrón Estrategia)
* **Ubicación:** `src/features/spirit-oracle/`
* **Problema que resuelve:** El sistema necesita responder preguntas tanto usando una API externa de IA (si el usuario ingresó su API Key) como de forma local/offline (si no hay clave o falla internet), sin llenar el componente visual de `if/else`.
* **Cómo funciona:**
  * Se define una interfaz común `SpiritResponseStrategy` con un único método `askSpirit(question: string): Promise<string>`.
  * **Estrategia A (`AiOracleStrategy`):** Realiza el `fetch` hacia la API de Gemini o Groq con el *system prompt* del fantasma burócrata.
  * **Estrategia B (`LocalOracleStrategy`):** Evalúa palabras clave y devuelve respuestas sarcásticas prearmadas al instante.
  * El contexto selecciona la estrategia adecuada en tiempo de ejecución y, si la IA falla por red o clave inválida, cambia automáticamente a la estrategia local.

---

## 2. Custom Hook de Simulación (reemplaza a la Cola de Comandos)
* **Ubicación:** `src/features/ouija-board/hooks/usePlanchetteSimulation.ts`
* **Problema que resuelve:** El texto no debe aparecer de golpe ni deletrearse letra por letra; la plancheta tiene que "trabajar" sobre el tablero durante unos segundos antes de que se revele el mensaje completo.
* **Cómo funciona:**
  * El hook expone `simulate(durationMs): Promise<void>` y `cancel()`. Mientras corre, mueve la plancheta por puntos aleatorios dentro del tablero con un movimiento errático; no depende del contenido del texto.
  * Se usa dos veces por turno: al enviar el reclamo (el mensaje del humano aparece **abajo** al terminar) y al recibir el veredicto (la respuesta del fantasma aparece **arriba** al terminar).
  * La interfaz guarda solo `lastHumanMessage` y `lastGhostAnswer`; no hay historial y cada valor nuevo reemplaza al anterior.
  * Ya no hace falta el mapa de coordenadas por letra (`coordinates.ts`): el tablero es decorativo y solo se necesita la posición de la casilla **ADIÓS** para el exorcismo.

---

## 3. State Pattern (Máquina de Estados Finitos)
* **Ubicación:** `src/app/App.tsx`
* **Problema que resuelve:** Evita estados inconsistentes o bugs visuales (por ejemplo, que el usuario envíe una nueva pregunta mientras la plancheta todavía está en plena simulación o después de haber exorcizado al fantasma).
* **Cómo funciona:**
  * La aplicación opera bajo cinco estados explícitos y excluyentes:
    1. `IDLE`: Esperando el reclamo del humano.
    2. `WRITING`: Simulación del reclamo; al terminar, el mensaje del humano aparece abajo.
    3. `SUMMONING`: Consultando al oráculo (IA o local).
    4. `MANIFESTING`: Simulación del veredicto; al terminar, la respuesta del fantasma aparece arriba y se vuelve a `IDLE`.
    5. `EXORCISED`: Estado terminal activado por el botón de emergencia; bloquea nuevos reclamos hasta reiniciar la sesión.

---

## 4. Facade Pattern (Patrón Fachada)
* **Ubicación:** `src/features/spirit-oracle/oracleService.ts`
* **Problema que resuelve:** La interfaz de usuario no debería saber cómo se valida una API Key, cómo se formatea el prompt, cómo se limpia y recorta la respuesta ni cómo se maneja el fallback.
* **Cómo funciona:**
  * Expone una única función limpia hacia los componentes: `consultGhost(question: string, apiKey?: string)`.
  * Por dentro encapsula toda la orquestación: elige la estrategia, captura excepciones, normaliza el texto resultante (mayúsculas, longitud máxima; las tildes y la Ñ se conservan porque el texto ya no se deletrea sobre el tablero) y entrega un string listo para mostrarse arriba.

---

## Resumen de Flujo entre Patrones

1. El humano envía su reclamo: la **Máquina de Estados** pasa a `WRITING`, corre la **Simulación** (`usePlanchetteSimulation`) y el mensaje aparece abajo, reemplazando al anterior.
2. En `SUMMONING`, la UI envía la pregunta a la **Fachada** (`oracleService`), que delega la generación en la **Estrategia** activa (`AI` o `Local`) y normaliza el texto.
3. La **Máquina de Estados** pasa a `MANIFESTING`, corre otra **Simulación** y la respuesta aparece arriba, reemplazando a la anterior.
4. Si el usuario presiona el botón de pánico, la **Máquina de Estados** transiciona a `EXORCISED`, cancela la simulación y la consulta en curso, y envía la plancheta directo a la casilla **ADIÓS**.
