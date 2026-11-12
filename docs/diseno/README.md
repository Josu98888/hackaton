# Diseño final – Hackatón Integrar · Libro de Quejas Espectral

Especificación visual de la pantalla principal. Esta carpeta no contiene código de la app: son la referencia y los recursos gráficos para implementarla.

## Archivos
- [`tablero.svg`](tablero.svg): tablero completo (título, SÍ, NO, abecedario en dos arcos, números, ADIÓS, sol, luna y fantasmas). Proporción 3:2, `viewBox="0 0 1200 800"`.
- [`plancheta.svg`](plancheta.svg): plancheta con ventana circular. `viewBox="0 0 120 150"`.

> El tablero usa fuentes web. Para que se vean, insertar el SVG **inline** en el componente (no como `<img>`) y cargar las fuentes en la página.

## Tipografías (Google Fonts)
- **Rye**: letras del tablero, título, respuesta del fantasma, botón de exorcismo.
- **Spectral** (400, 600, 400 itálica): textos de interfaz.

```
https://fonts.googleapis.com/css2?family=Rye&family=Spectral:ital,wght@0,400;0,600;1,400&display=swap
```

## Colores
| Uso | Color |
| --- | --- |
| Fondo de página | `#14100c` |
| Paneles y campos | `#1f1810` |
| Borde de paneles y campos | `#6b5636` |
| Texto principal | `#f0e2c0` |
| Texto destacado (títulos, respuesta) | `#f0dcae` |
| Texto secundario (etiquetas, ayuda) | `#c9b68a` |
| Pergamino del tablero (centro → borde) | `#f0dcae` → `#e2c98f` → `#b8935a` |
| Tinta del tablero | `#2a1a0c` |
| Botón principal (fondo / texto) | `#e6cf9c` / `#2a1a0c` |
| Botón de exorcismo (fondo / borde / texto) | `#a3221b` / `#e0736b` / `#ffffff` |
| Plancheta (relleno / contorno) | `#3a2413` / `#1c1108` |

## Estructura de la pantalla
Columna centrada, ancho máximo 960 px, separación de 20 px entre bloques, padding de página 28 px arriba y 20 px a los lados. De arriba hacia abajo:

1. **Encabezado** (fila que se apila en pantallas angostas)
   - Izquierda: sobretítulo `HACKATÓN INTEGRAR · PABELLÓN 3` (14 px, mayúsculas, espaciado 0.22em) y título `Libro de Quejas Espectral` (Rye, 30 px).
   - Derecha: campo de API Key (ver textos abajo), ancho hasta 320 px.
2. **Respuesta del fantasma (arriba del tablero)**: panel con borde sólido, etiqueta `EL FANTASMA RESPONDE` y el texto en Rye 30 px, centrado. Muestra solo la última respuesta. Usar `aria-live="polite"`.
3. **Tablero**: `tablero.svg` a ancho completo, esquinas redondeadas de 14 px y sombra `0 18px 50px rgba(0,0,0,0.6)`. La plancheta va encima, en posición absoluta.
4. **Estado**: una línea en itálica, 17 px, centrada.
5. **Reclamo del humano (abajo del tablero)**: panel con borde punteado, etiqueta `TU RECLAMO` y el texto a 22 px. Muestra solo el último mensaje.
6. **Formulario** (fila que se apila en pantallas angostas): campo de texto, botón `Invocar Respuesta` y botón `¡EXORCIZAR!`. Altura mínima de controles: 48 px.
7. **Aviso de exorcismo** (solo en estado `EXORCISED`): texto y botón `Reiniciar sesión`.

No hay historial: cada reclamo y cada respuesta reemplazan a los anteriores.

## Textos
**Tablero**
- Título: `HACKATÓN INTEGRAR`
- Subtítulo: `ORÁCULO ESPECTRAL`
- Lema: `Los espíritus de esta casa atienden reclamos`
- Casillas: `SÍ`, `NO`, `A–M`, `N–Z`, `1234567890`, `ADIÓS`

**Campo de API Key**
- Etiqueta (Rye, 17 px): `Abrí el Inframundo con tu API Key`
- Placeholder: `Clave de Gemini o Groq`
- Ayuda (itálica, 14 px): `Dejala para conversar con el fantasma más cercano. Sin clave, atiende el de guardia.`
- Campo de tipo `password`, sin autocompletar.

**Formulario**
- Etiqueta: `Escribí tu reclamo para el fantasma`
- Placeholder: `¿Quién cortó el Wi-Fi anoche?`
- Máximo 140 caracteres.

**Línea de estado**
| Estado | Texto |
| --- | --- |
| `IDLE` | El fantasma espera tu reclamo. |
| `WRITING` | Registrando el reclamo en el libro… |
| `SUMMONING` | Consultando al más allá… |
| `MANIFESTING` | El fantasma delibera su veredicto… |
| `EXORCISED` | Sesión exorcizada. |

**Aviso de exorcismo:** `El fantasma fue despedido. No se aceptan más reclamos en esta sesión.`

## Plancheta y simulación
- Tamaño: 12 % del ancho del tablero. Se posiciona por su centro con `left` y `top` en porcentaje del tablero, más una rotación.
- Reposo: `left 50%`, `top 60%`, rotación `0deg`.
- **Simulación** (no deletrea letras): cada 480 ms salta a un punto aleatorio con `left` entre 12 % y 88 %, `top` entre 34 % y 88 % y rotación entre −25° y 25°. Transición de 520 ms `ease-in-out` en posición y rotación.
- Respetar `prefers-reduced-motion`: sin transición.

**Secuencia de un turno** (duración de simulación `D`, por defecto 2 s)
1. Enviar reclamo → `WRITING`: se vacía el campo y empieza la simulación.
2. A los `D`: el reclamo aparece abajo → `SUMMONING`.
3. A los `D + 0,9 s` → `MANIFESTING` (la plancheta sigue moviéndose).
4. A los `2D + 0,9 s`: la respuesta aparece arriba, la plancheta vuelve a reposo → `IDLE`.

Mientras el estado no sea `IDLE`, el campo de reclamo y `Invocar Respuesta` están deshabilitados (opacidad 0.55).

**Exorcismo:** disponible en cualquier estado menos `EXORCISED`. Cancela la simulación y la consulta en curso, lleva la plancheta a la casilla ADIÓS (`left 50%`, `top 90%`), muestra `ADIÓS` como respuesta y bloquea nuevos reclamos hasta `Reiniciar sesión`.

## Accesibilidad
- Botones, campos y etiquetas reales (`<button>`, `<input>`, `<label>`).
- Foco visible: contorno de 3 px `#f0dcae` con separación de 2 px.
- La plancheta y los adornos del tablero son decorativos (`aria-hidden`).
