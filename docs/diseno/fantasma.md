# Diseño – Fantasma volador

Un fantasmita semitransparente que cruza la pantalla de vez en cuando. Es puro ambiente: no tapa nada, no se puede tocar y no cambia el funcionamiento de la app. Complementa el [diseño de la pantalla](README.md).

## Archivo
- [`fantasma.svg`](fantasma.svg): el fantasma. `viewBox="0 0 72 84"`. Es el mismo personaje de las esquinas del tablero, pero relleno.

## Aspecto
| Propiedad | Valor |
| --- | --- |
| Relleno del cuerpo | `#f0e2c0` |
| Contorno | `#fff8e6`, 2 px |
| Ojos y boca | `#14100c` |
| **Opacidad** | **0.35** (nunca más de 0.4, para que se lea el texto de atrás) |
| Ancho | `clamp(48px, 7vw, 84px)` |

## Ubicación
- Va sobre toda la pantalla, en posición absoluta dentro del contenedor raíz (que necesita `position: relative` y `overflow: hidden`).
- Altura del vuelo: `top: 38%`, a la altura del tablero.
- `z-index: 5`, por encima del tablero y de la plancheta.
- `pointer-events: none`: los clics lo atraviesan y llegan a los botones y campos.
- `aria-hidden="true"`: es decorativo.

## Movimiento
Son dos animaciones combinadas, una en el contenedor y otra en el dibujo:

1. **Cruce** (contenedor): va de izquierda a derecha, de `left: -12%` a `left: 106%`. El ciclo dura 22 s: cruza durante los primeros 14 s y espera fuera de pantalla los 8 s restantes. Velocidad lineal, se repite siempre.
2. **Flotación** (dibujo): sube y baja 16 px mientras se inclina entre −5° y 5°. Ciclo de 2,6 s, `ease-in-out`, se repite siempre.

```css
@keyframes fantasma-cruzar {
  0%   { left: -12%; }
  64%  { left: 106%; }
  100% { left: 106%; }
}
@keyframes fantasma-flotar {
  0%, 100% { transform: translateY(-16px) rotate(-5deg); }
  50%      { transform: translateY(16px) rotate(5deg); }
}
.fantasma-vuelo  { animation: fantasma-cruzar 22s linear infinite; }
.fantasma-cuerpo { animation: fantasma-flotar 2.6s ease-in-out infinite; }
```

## Reglas
- Con `prefers-reduced-motion: reduce` el fantasma no se muestra.
- En estado `EXORCISED` el fantasma desaparece (fue despedido) y vuelve al reiniciar la sesión.
- Un solo fantasma a la vez.

## Variantes opcionales
- Alternar el sentido en cada pasada (de derecha a izquierda, espejando el dibujo con `scaleX(-1)`).
- Variar la altura del vuelo entre 20 % y 70 % en cada pasada.
- Acelerar el cruce (8 s) mientras el estado es `SUMMONING` o `MANIFESTING`.
