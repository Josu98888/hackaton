type Props = { name: string; claims: string; date: string; acta: string }

export function DiplomaArt({ name, claims, date, acta }: Props) {
  return (
<svg className="diploma-svg" viewBox="0 0 800 560" aria-labelledby="diploma-titulo">
<title id="diploma-titulo">Diploma de Médium</title>
<rect x="10" y="10" width="780" height="480" rx="16" fill="#c9a06a" stroke="#2a1a0c" strokeWidth="5" />
<path d="M100 60 H700 A40 40 0 0 0 740 100 V430 A40 40 0 0 0 700 470 H100 A40 40 0 0 0 60 430 V100 A40 40 0 0 0 100 60 Z" fill="#f3e0b8" stroke="#2a1a0c" strokeWidth="5" strokeLinejoin="round" />
<rect x="190" y="92" width="420" height="62" rx="31" fill="none" stroke="#2a1a0c" strokeWidth="4" />
<text x="400" y="134" textAnchor="middle" fontFamily="Rye, serif" fontSize="30" textLength="350" lengthAdjust="spacingAndGlyphs" fill="#2a1a0c">DIPLOMA DE MÉDIUM</text>
<text x="400" y="192" textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="18" fill="#2a1a0c">Se certifica que</text>
<text id="diploma-nombre" x="400" y="230" textAnchor="middle" fontFamily="Rye, serif" fontSize="26" fill="#2a1a0c">{name}</text>
<line x1="220" y1="243" x2="580" y2="243" stroke="#2a1a0c" strokeWidth="2" strokeLinecap="round" />
<text x="400" y="278" textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontSize="18" fill="#2a1a0c">exorcizó con éxito a su fantasma doméstico</text>
<text id="diploma-reclamos" x="400" y="304" textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontSize="18" fill="#2a1a0c">{claims}</text>
<text x="400" y="330" textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontSize="18" fill="#2a1a0c">y queda habilitado para discutir con el más allá.</text>
<text x="112" y="388" fontFamily="Spectral, Georgia, serif" fontSize="14" fill="#2a1a0c">Dado el <tspan id="diploma-fecha">{date}</tspan> · Acta N.º <tspan id="diploma-acta">{acta}</tspan></text>
<line x1="112" y1="424" x2="360" y2="424" stroke="#2a1a0c" strokeWidth="2" strokeLinecap="round" />
<text x="112" y="446" fontFamily="Spectral, Georgia, serif" fontStyle="italic" fontSize="15" fill="#2a1a0c">El Fantasma (firma bajo protesta)</text>
<g aria-hidden="true">
<path d="M584 445 L556 546 L581 527 L600 549 L624 452 Z" fill="#8a1d17" stroke="#2a1a0c" strokeWidth="4" strokeLinejoin="round" />
<path d="M600 452 L624 549 L643 527 L668 546 L640 445 Z" fill="#8a1d17" stroke="#2a1a0c" strokeWidth="4" strokeLinejoin="round" />
<polygon points="684.0,398.0 671.1,408.4 679.7,422.6 664.0,428.0 667.2,444.3 650.6,444.0 648.0,460.4 632.5,454.4 624.5,468.9 612.0,458.0 599.5,468.9 591.5,454.4 576.0,460.4 573.4,444.0 556.8,444.3 560.0,428.0 544.3,422.6 552.9,408.4 540.0,398.0 552.9,387.6 544.3,373.4 560.0,368.0 556.8,351.7 573.4,352.0 576.0,335.6 591.5,341.6 599.5,327.1 612.0,338.0 624.5,327.1 632.5,341.6 648.0,335.6 650.6,352.0 667.2,351.7 664.0,368.0 679.7,373.4 671.1,387.6" fill="#a3221b" stroke="#2a1a0c" strokeWidth="4" strokeLinejoin="round" />
<circle cx="612" cy="398" r="48" fill="#a3221b" stroke="#2a1a0c" strokeWidth="3" />
<circle cx="612" cy="398" r="41" fill="none" stroke="#f0dcae" strokeWidth="2" />
<g transform="translate(597 368) scale(0.84)">
<path d="M0 40 V18 a18 18 0 0 1 36 0 V40 l-6 -6 l-6 6 l-6 -6 l-6 6 l-6 -6 z" fill="#f0dcae" stroke="#2a1a0c" strokeWidth="2" strokeLinejoin="round" />
<circle cx="12" cy="17" r="2.6" fill="#2a1a0c" /><circle cx="24" cy="17" r="2.6" fill="#2a1a0c" /><ellipse cx="18" cy="26" rx="3" ry="4" fill="#2a1a0c" />
</g>
<text x="612" y="422" textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontWeight="600" fontSize="10" letterSpacing="1.5" fill="#f0dcae">APROBADO</text>
</g>
</svg>

  )
}
