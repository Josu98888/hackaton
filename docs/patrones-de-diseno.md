# Patrones de Diseño – Ouija de Atención al Cliente

Esta arquitectura combina una estructura **Feature-First** con cuatro patrones de diseño clásicos adaptados a React/TypeScript para mantener el código desacoplado, fácil de explicar y libre de condicionales gigantes.

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

## 2. Command / Queue Pattern (Cola de Comandos)
* **Ubicación:** `src/features/ouija-board/hooks/usePlanchetteAnimation.ts`
* **Problema que resuelve:** Una respuesta como `"NO FUI YO"` no puede mostrarse de golpe; debe ejecutarse como una secuencia temporal de desplazamientos físicos de la plancheta por el tablero.
* **Cómo funciona:**
  * Cada carácter de la respuesta se transforma en un comando de movimiento con coordenadas destino `(x, y)` extraídas del mapa del tablero (`coordinates.ts`).
  * Los comandos se encolan y se ejecutan uno por uno mediante un temporizador controlado, iluminando la letra activa antes de pasar al siguiente comando de la cola.

---

## 3. State Pattern (Máquina de Estados Finitos)
* **Ubicación:** `src/app/App.tsx`
* **Problema que resuelve:** Evita estados inconsistentes o bugs visuales (por ejemplo, que el usuario envíe una nueva pregunta mientras la plancheta todavía está deletreando la anterior o después de haber exorcizado al fantasma).
* **Cómo funciona:**
  * La aplicación opera bajo cuatro estados explícitos y excluyentes:
    1. `IDLE`: Esperando el reclamo del humano.
    2. `SUMMONING`: Consultando al oráculo (IA o local).
    3. `SPELLING`: La plancheta está en movimiento deletreando la respuesta.
    4. `EXORCISED`: Estado terminal activado por el botón de emergencia; bloquea nuevos reclamos hasta reiniciar la sesión.

---

## 4. Facade Pattern (Patrón Fachada)
* **Ubicación:** `src/features/spirit-oracle/oracleService.ts`
* **Problema que resuelve:** La interfaz de usuario no debería saber cómo se valida una API Key, cómo se formatea el prompt, cómo se eliminan acentos/caracteres no soportados por el tablero Ouija ni cómo se maneja el fallback.
* **Cómo funciona:**
  * Expone una única función limpia hacia los componentes: `consultGhost(question: string, apiKey?: string)`.
  * Por dentro encapsula toda la orquestación: elige la estrategia, captura excepciones, normaliza el texto resultante (mayúsculas, sin tildes, longitud máxima) y entrega un string listo para que el tablero lo anime.

---

## Resumen de Flujo entre Patrones

1. La UI envía la pregunta a la **Fachada** (`oracleService`).
2. La **Fachada** delega la generación en la **Estrategia** activa (`AI` o `Local`) y sanitiza el texto.
3. La **Máquina de Estados** pasa a `SPELLING` y entrega el texto a la **Cola de Comandos** (`usePlanchetteAnimation`).
4. Si el usuario presiona el botón de pánico, la **Máquina de Estados** transiciona a `EXORCISED`, vacía la cola y envía la plancheta directo a `"ADIÓS"`.
