# Sonidos – Libro de Quejas Espectral

Guía de sonido de la app. Los cinco audios ya están en [`public/sounds/`](../../public/sounds), listos para usar desde la app como `/sounds/<archivo>.mp3`.

## Lista de sonidos
| Momento | Sonido | Archivo | Duración | Volumen |
| --- | --- | --- | --- | --- |
| Empieza la simulación (`WRITING` y `MANIFESTING`) | Viento fantasmal, en loop | `public/sounds/susurro.mp3` | 4 s, loop | 0.25 |
| Aparece el reclamo del humano abajo | Rasguido de pluma sobre papel | `public/sounds/pluma.mp3` | 0,7 s | 0.4 |
| Aparece la respuesta del fantasma arriba | Golpe de madera con campanada grave | `public/sounds/veredicto.mp3` | 1,4 s | 0.5 |
| Botón **¡EXORCIZAR!** | Risa "muajaja" que se va apagando | `public/sounds/muajaja.mp3` | 3,8 s | 0.7 |
| Pasa un fantasma volador (opcional) | "Uuuh" suave | `public/sounds/uuuh.mp3` | 3 s | 0.15 |

Todos son MP3 mono de menos de 50 KB. El `susurro` está armado para repetirse sin corte; si el MP3 deja un silencio mínimo entre vueltas, superponer dos reproducciones con un fundido corto.

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
Los cinco audios incluidos fueron generados por síntesis para este proyecto (ruido filtrado, tonos y una voz sintética), sin usar grabaciones de terceros, así que no requieren atribución.

| Archivo | Origen |
| --- | --- |
| `susurro.mp3` | Síntesis propia |
| `pluma.mp3` | Síntesis propia |
| `veredicto.mp3` | Síntesis propia |
| `muajaja.mp3` | Síntesis propia (voz sintética, suena robótica) |
| `uuuh.mp3` | Síntesis propia (voz sintética) |

Si se reemplaza alguno por una grabación, usar sonidos con licencia libre y anotar el origen en la tabla:

- [Freesound](https://freesound.org): revisar la licencia de cada sonido (CC0 no pide atribución; CC BY sí).
- [Pixabay – efectos de sonido](https://pixabay.com/sound-effects/): uso libre según su licencia.
- Grabación propia: el "muajaja" puede grabarlo alguien del equipo con el celular.
