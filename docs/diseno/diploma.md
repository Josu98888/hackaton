# Diseño – Diploma de Médium

Al terminar el exorcismo, la app le entrega al humano un diploma que lo certifica como médium. Es la consecuencia del botón de emergencia **¡EXORCIZAR!**, no una función aparte. Complementa el [diseño de la pantalla](README.md).

## Cuándo aparece
1. El humano presiona **¡EXORCIZAR!** → estado `EXORCISED`, la plancheta baja a ADIÓS y suena `muajaja`.
2. A los 1,5 s aparece el diploma en una ventana modal centrada, con una entrada suave (opacidad 0 → 1 y escala 0.95 → 1 en 300 ms).
3. El diploma se cierra con **Reiniciar sesión** o con la tecla Escape. Al cerrarlo sin reiniciar, la sesión sigue exorcizada.

## Contenido
Todo centrado, de arriba hacia abajo:

| Elemento | Texto | Estilo |
| --- | --- | --- |
| Sobretítulo | `HACKATÓN INTEGRAR · ORÁCULO ESPECTRAL` | Spectral 14 px, mayúsculas, espaciado 0.22em |
| Título | `Diploma de Médium` | Rye, 40 px |
| Línea 1 | `Se certifica que` | Spectral itálica, 18 px |
| Nombre | `el Humano de esta Casa` | Rye, 28 px, subrayado fino |
| Línea 2 | `exorcizó con éxito a su fantasma doméstico tras presentar N reclamos` | Spectral, 18 px |
| Línea 3 | `y queda habilitado para discutir con el más allá.` | Spectral, 18 px |
| Fecha y acta | `Dado el DD/MM/AAAA · Acta N.º 666-XXXX` | Spectral, 14 px |
| Firma | `El Fantasma (firma bajo protesta)` | Spectral itálica, 16 px, sobre una línea |
| Sello | Círculo con el fantasma de `fantasma.svg` y el texto `EXORCISMO APROBADO` | Rojo `#a3221b`, rotado −12° |

Datos dinámicos:
- **N**: cantidad de reclamos enviados en la sesión. Si es 0: `sin presentar un solo reclamo`. Si es 1: `tras presentar 1 reclamo`.
- **Fecha**: la del día.
- **XXXX**: cuatro dígitos al azar.

## Aspecto
- Fondo de la modal: negro al 70 % sobre toda la pantalla.
- Diploma: pergamino con el mismo degradado del tablero (`#f0dcae` → `#e2c98f` → `#b8935a`), texto en tinta `#2a1a0c`.
- Borde doble como el del tablero: una línea de 3 px y otra de 1 px, en tinta.
- Ancho máximo 640 px, proporción apaisada, padding 40 px (24 px en celular). Esquinas de 10 px.
- Sombra `0 18px 50px rgba(0,0,0,0.6)`.

## Botones (debajo del diploma)
- **Guardar diploma** (botón principal, `#e6cf9c` con texto `#2a1a0c`): abre la impresión del navegador (`window.print()`), mostrando solo el diploma, para guardarlo como PDF.
- **Reiniciar sesión** (botón secundario, borde `#c9b68a`, texto `#f0e2c0`): cierra el diploma y vuelve a `IDLE`.

## Accesibilidad
- La modal usa `role="dialog"`, `aria-modal="true"` y `aria-labelledby` apuntando al título.
- Al abrirse, el foco va a **Guardar diploma**; el foco no sale de la modal mientras está abierta.
- Con `prefers-reduced-motion: reduce`, aparece sin animación.
