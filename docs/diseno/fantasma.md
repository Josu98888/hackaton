# Diseño – Fantasmas voladores

Tres fantasmitas semitransparentes que cruzan la pantalla de vez en cuando. Son puro ambiente: no tapan nada, no se pueden tocar y no cambian el funcionamiento de la app. Complementa el [diseño de la pantalla](README.md).

## Archivo
- [`fantasma.svg`](fantasma.svg): el fantasma. `viewBox="0 0 72 84"`. Es el mismo personaje de las esquinas del tablero, pero relleno. Los tres usan el mismo dibujo.

## Aspecto común
| Propiedad | Valor |
| --- | --- |
| Relleno del cuerpo | `#f0e2c0` |
| Contorno | `#fff8e6`, 2 px |
| Ojos y boca | `#14100c` |
| Opacidad máxima | 0.4, para que se lea el texto de atrás |

## Los tres fantasmas
El tamaño depende del ancho de la página: cada uno mide un porcentaje del ancho de la ventana (`vw`), con un mínimo y un máximo para que no quede ni invisible en un celular ni enorme en un monitor.

| | Fantasma 1 (grande) | Fantasma 2 (mediano) | Fantasma 3 (chico) |
| --- | --- | --- | --- |
| Ancho | `clamp(44px, 8vw, 110px)` | `clamp(36px, 6vw, 84px)` | `clamp(28px, 4.5vw, 60px)` |
| Opacidad | 0.35 | 0.3 | 0.25 |
| Altura del vuelo (`top`) | 38 % | 14 % | 72 % |
| Sentido | izquierda → derecha | derecha → izquierda | izquierda → derecha |
| Ciclo de cruce | 22 s | 28 s | 34 s |
| Desfase inicial (`animation-delay`) | 0 s | −9 s | −20 s |
| Ciclo de flotación | 2,6 s | 3,2 s | 2,1 s |

Ejemplos de tamaño del fantasma grande: 44 px en un celular de 390 px, 102 px en una página de 1280 px y 110 px (tope) desde 1375 px.

## Ubicación
- Van sobre toda la pantalla, en posición absoluta dentro del contenedor raíz (que necesita `position: relative` y `overflow: hidden`).
- `z-index: 5`, por encima del tablero y de la plancheta.
- `pointer-events: none`: los clics los atraviesan y llegan a los botones y campos.
- `aria-hidden="true"`: son decorativos.

## Movimiento
Cada fantasma combina dos animaciones, una en el contenedor y otra en el dibujo:

1. **Cruce** (contenedor): recorre la pantalla de lado a lado durante el 64 % del ciclo y espera fuera de pantalla el resto. Velocidad lineal, se repite siempre. Los desfases negativos hacen que no salgan los tres juntos.
2. **Flotación** (dibujo): sube y baja 16 px mientras se inclina entre −5° y 5°, con `ease-in-out`, se repite siempre.

```css
@keyframes fantasma-cruzar {
  0%   { left: -12%; }
  64%  { left: 106%; }
  100% { left: 106%; }
}
@keyframes fantasma-cruzar-inv {
  0%   { left: 106%; }
  64%  { left: -12%; }
  100% { left: -12%; }
}
@keyframes fantasma-flotar {
  0%, 100% { transform: translateY(-16px) rotate(-5deg); }
  50%      { transform: translateY(16px) rotate(5deg); }
}
.fantasma-vuelo   { animation: fantasma-cruzar 22s linear infinite; }
.fantasma-vuelo-2 { animation: fantasma-cruzar-inv 28s linear -9s infinite; }
.fantasma-vuelo-3 { animation: fantasma-cruzar 34s linear -20s infinite; }
.fantasma-cuerpo  { animation: fantasma-flotar 2.6s ease-in-out infinite; }
```

## Reglas
- Con `prefers-reduced-motion: reduce` los fantasmas no se muestran.
- En estado `EXORCISED` los fantasmas desaparecen (fueron despedidos) y vuelven al reiniciar la sesión.
- Máximo tres fantasmas.

## Variantes opcionales
- Variar la altura del vuelo en cada pasada.
- Acelerar los cruces mientras el estado es `SUMMONING` o `MANIFESTING`.
