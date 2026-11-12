import type { SpiritResponseStrategy } from './SpiritResponseStrategy'

const RULES: Array<[string[], string]> = [
  [['llave'], 'Las llaves? Pregunta a tu memoria'],
  [['wifi', 'internet', 'router'], 'Reinicie su paciencia primero'],
  [['ruido', 'golpe', 'sonido', 'madrugada', '3 am'], 'Es mi horario laboral'],
  [['comida', 'nevera', 'heladera', 'hambre'], 'No fui yo comi nada'],
  [['frio', 'helado'], 'Es ambiente, no queja'],
  [['luz', 'foco', 'lampara', 'apag'], 'Facture a otro fantasma'],
  [['puerta', 'portazo'], 'Corriente de aire, obvio'],
  [['calor'], 'Soy fantasma no termostato'],
  [['plata', 'dinero', 'factura', 'alquiler'], 'Sin cuerpo no pago nada'],
]

const DEFAULTS = [
  'Su queja fue archivada',
  'Llame en horario de ultratumba',
  'No fui yo',
  'Tramite en proceso por siglos',
  'Complete el formulario 666',
]

export class LocalOracleStrategy implements SpiritResponseStrategy {
  async askSpirit(question: string): Promise<string> {
    const q = question.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    for (const [keys, reply] of RULES) {
      if (keys.some((k) => q.includes(k))) return reply
    }
    return DEFAULTS[Math.floor(Math.random() * DEFAULTS.length)]
  }
}
