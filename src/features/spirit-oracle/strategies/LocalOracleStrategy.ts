import type { SpiritResponseStrategy } from './SpiritResponseStrategy'

const RULES: Array<[string[], string[]]> = [
  [['llave'], ['Las llaves están donde las dejaste, genio', 'Las usé para abrir el más allá', 'Fijate en el bolsillo, humano distraído']],
  [['wifi', 'internet', 'router'], ['Lo corté yo. Andá a tocar pasto', 'Pagá la factura y después hablamos', 'Estoy bajando películas del inframundo']],
  [['ruido', 'golpe', 'sonido', 'madrugada', '3 am'], ['Son las 3 AM. Es mi horario laboral', 'Ensayo con mi banda de cadenas', 'Si te molesta, mudate vos']],
  [['comida', 'nevera', 'heladera', 'hambre'], ['No tengo estómago. Fue tu compañero', 'Estaba vencida, te hice un favor', 'Hacé las compras, vago']],
  [['frio', 'helado'], ['Soy un fantasma, el frío viene incluido', 'Abrigate, no soy tu estufa']],
  [['luz', 'foco', 'lampara', 'apag'], ['Ahorro energía. De nada', 'La oscuridad me queda mejor', 'Cambiá el foco, no es tan difícil']],
  [['puerta', 'portazo'], ['El portazo fue a propósito', 'Sí, cerré la puerta. Con cariño']],
  [['calor'], ['Soy fantasma, no aire acondicionado']],
  [['plata', 'dinero', 'factura', 'alquiler'], ['Yo no pago alquiler hace 200 años', 'Muerto no paga deudas, humano']],
]

const DEFAULTS = [
  'Su queja fue archivada en la basura',
  'Llame en horario de ultratumba',
  'No fui yo. Y si fui, no me arrepiento',
  'Trámite en proceso. Vuelva en un siglo',
  'Complete el formulario 666 por triplicado',
  'Qué queja tan aburrida, humano',
  'Me reí tanto que casi revivo',
]

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)]

export class LocalOracleStrategy implements SpiritResponseStrategy {
  async askSpirit(question: string): Promise<string> {
    const q = question.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    for (const [keys, replies] of RULES) {
      if (keys.some((k) => q.includes(k))) return pick(replies)
    }
    return pick(DEFAULTS)
  }
}
