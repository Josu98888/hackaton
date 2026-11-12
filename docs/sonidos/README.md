# Sonidos – Libro de Quejas Espectral

Guía de sonido de la app. Esta carpeta no incluye los archivos de audio: hay que conseguirlos con licencia libre (ver [Fuentes](#fuentes-y-licencias)) y guardarlos con los nombres indicados.

## Lista de sonidos
| Momento | Sonido | Archivo sugerido | Duración | Volumen |
| --- | --- | --- | --- | --- |
| Empieza la simulación (`WRITING` y `MANIFESTING`) | Susurro o viento fantasmal, en loop | `public/sounds/susurro.mp3` | 3–5 s, loop | 0.25 |
| Aparece el reclamo del humano abajo | Rasguido de pluma sobre papel | `public/sounds/pluma.mp3` | menos de 1 s | 0.4 |
| Aparece la respuesta del fantasma arriba | Campanada grave o golpe seco de madera | `public/sounds/veredicto.mp3` | 1 s | 0.5 |
| Botón **¡EXORCIZAR!** | Risa "muajaja" que se va apagando | `public/sounds/muajaja.mp3` | 2–3 s | 0.7 |
| Pasa el fantasma volador (opcional) | "Uuuh" suave | `public/sounds/uuuh.mp3` | 1–2 s | 0.15 |

## Cuándo suena cada uno
1. **Enviar reclamo** → arranca `susurro` en loop junto con la plancheta.
2. **El reclamo aparece abajo** → suena `pluma`. El `susurro` sigue.
3. **La respuesta aparece arriba** → se corta el `susurro` con un fundido de 300 ms y suena `veredicto`.
4. **Exorcismo** → se corta todo lo que esté sonando y suena `muajaja` mientras la plancheta baja a ADIÓS.
5. **Reiniciar sesión** → sin sonido.

## Reglas
- **Botón de silenciar** siempre visible en el encabezado, con ícono de parlante y `aria-label` ("Silenciar sonidos" / "Activar sonidos"). Recordar la elección entre visitas.
- **Primer clic:** los navegadores bloquean el audio hasta que el usuario interactúa. El primer sonido se dispara recién con el clic en **Invocar Respuesta**; nada suena al cargar la página.
- **Sin superposición:** nunca dos efectos iguales a la vez. El exorcismo tiene prioridad y corta el resto.
- **Sin música de fondo permanente:** solo hay sonido durante la simulación y en los momentos de la tabla.
- **Precarga:** cargar los archivos al iniciar para que no haya demora en la demo.
- **Formato:** MP3 (o OGG), mono, livianos (menos de 100 KB cada uno).
- **Si un audio falla,** la app sigue funcionando igual, sin mostrar errores.
- **`prefers-reduced-motion`:** no afecta al sonido; el control es el botón de silenciar.

## Fuentes y licencias
Usar sonidos con licencia libre y anotar acá el origen de cada uno:

- [Freesound](https://freesound.org): revisar la licencia de cada sonido (CC0 no pide atribución; CC BY sí).
- [Pixabay – efectos de sonido](https://pixabay.com/sound-effects/): uso libre según su licencia.
- Grabación propia: el "muajaja" puede grabarlo alguien del equipo.

| Archivo | Origen | Licencia |
| --- | --- | --- |
| `susurro.mp3` | [COMPLETAR] | [COMPLETAR] |
| `pluma.mp3` | [COMPLETAR] | [COMPLETAR] |
| `veredicto.mp3` | [COMPLETAR] | [COMPLETAR] |
| `muajaja.mp3` | [COMPLETAR] | [COMPLETAR] |
| `uuuh.mp3` | [COMPLETAR] | [COMPLETAR] |
