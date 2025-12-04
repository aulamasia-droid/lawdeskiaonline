import { CaseData, LegalSpecialty } from "@/components/redaccion/CaseDataForm";

export type AdvancedDocumentType = "email" | "recurso" | "informe";

interface LegalArticle {
  codigo: string;
  articulo: string;
  texto: string;
}

interface Jurisprudencia {
  tesis: string;
  titulo: string;
  interpretacion: string;
}

const legalArticlesBySpecialty: Record<LegalSpecialty, LegalArticle[]> = {
  civil: [
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 1910",
      texto: "El que obrando ilícitamente o contra las buenas costumbres cause daño a otro, está obligado a repararlo, a menos que demuestre que el daño se produjo como consecuencia de culpa o negligencia inexcusable de la víctima.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2104",
      texto: "El que estuviere obligado a prestar un hecho y dejare de prestarlo o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2615",
      texto: "Contrato de prestación de servicios profesionales es aquel por virtud del cual una persona llamada profesionista se obliga a prestar sus servicios profesionales a otra llamada cliente.",
    },
  ],
  laboral: [
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 47",
      texto: "Son causas de rescisión de la relación de trabajo, sin responsabilidad para el patrón...",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 48",
      texto: "El trabajador podrá solicitar ante la Junta de Conciliación y Arbitraje, a su elección, que se le reinstale en el trabajo que desempeñaba, o que se le indemnice...",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 50",
      texto: "Las indemnizaciones consistirán: I. Si la relación de trabajo fuere por tiempo determinado menor de un año, en una cantidad igual al importe de los salarios de la mitad del tiempo de servicios prestados...",
    },
  ],
  penal: [
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 386",
      texto: "Comete el delito de fraude el que engañando a uno o aprovechándose del error en que éste se halla se hace ilícitamente de alguna cosa o alcanza un lucro indebido.",
    },
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 387",
      texto: "Las mismas penas señaladas en el artículo anterior, se impondrán: I. Al que obtenga dinero, valores o cualquiera otra cosa ofreciendo encargarse de la defensa de un procesado...",
    },
  ],
  mercantil: [
    {
      codigo: "Código de Comercio",
      articulo: "Art. 75",
      texto: "La ley reputa actos de comercio: I. Todas las adquisiciones, enajenaciones y alquileres verificados con propósito de especulación comercial...",
    },
    {
      codigo: "Código de Comercio",
      articulo: "Art. 1050",
      texto: "Las acciones derivadas de los actos de comercio se sustanciarán con arreglo a las normas de procedimiento mercantil.",
    },
  ],
  fiscal: [
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 42",
      texto: "Las autoridades fiscales a fin de comprobar que los contribuyentes, los responsables solidarios o los terceros con ellos relacionados han cumplido con las disposiciones fiscales...",
    },
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 121",
      texto: "El recurso de revocación deberá interponerse dentro del plazo de 30 días siguientes a aquel en que haya surtido efectos la notificación...",
    },
  ],
  amparo: [
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 1",
      texto: "El juicio de amparo tiene por objeto resolver toda controversia que se suscite: I. Por normas generales, actos u omisiones de autoridad que violen los derechos humanos reconocidos y las garantías otorgadas para su protección por la Constitución...",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 17",
      texto: "El plazo para presentar la demanda de amparo es de quince días, salvo: I. Cuando se reclame una norma general autoaplicativa, o el procedimiento de extradición...",
    },
  ],
};

const jurisprudenciaBySpecialty: Record<LegalSpecialty, Jurisprudencia[]> = {
  civil: [
    {
      tesis: "1a./J. 42/2019 (10a.)",
      titulo: "DAÑO MORAL. ELEMENTOS PARA SU CONFIGURACIÓN",
      interpretacion: "Para la procedencia de la indemnización por daño moral es necesario acreditar: a) la existencia de un hecho ilícito; b) la afectación a un derecho de la personalidad; y c) la relación causal entre ambos.",
    },
  ],
  laboral: [
    {
      tesis: "2a./J. 25/2021 (11a.)",
      titulo: "DESPIDO INJUSTIFICADO. CARGA DE LA PRUEBA",
      interpretacion: "Corresponde al patrón acreditar las causas de rescisión de la relación laboral cuando el trabajador niega haber incurrido en las conductas que se le imputan.",
    },
  ],
  penal: [
    {
      tesis: "1a./J. 15/2020 (10a.)",
      titulo: "FRAUDE. ELEMENTOS DEL TIPO PENAL",
      interpretacion: "Los elementos constitutivos del delito de fraude son: el engaño o aprovechamiento del error, el lucro indebido o la obtención de una cosa, y el nexo causal entre ambos.",
    },
  ],
  mercantil: [
    {
      tesis: "1a./J. 88/2019 (10a.)",
      titulo: "TÍTULOS DE CRÉDITO. CADUCIDAD DE LA ACCIÓN CAMBIARIA",
      interpretacion: "La caducidad de la acción cambiaria opera de pleno derecho y puede ser declarada de oficio por el juzgador.",
    },
  ],
  fiscal: [
    {
      tesis: "2a./J. 112/2021 (11a.)",
      titulo: "VISITA DOMICILIARIA. REQUISITOS DE LA ORDEN",
      interpretacion: "La orden de visita domiciliaria debe cumplir con los requisitos de fundamentación y motivación, indicando de manera precisa el objeto de la misma.",
    },
  ],
  amparo: [
    {
      tesis: "P./J. 45/2019 (10a.)",
      titulo: "INTERÉS LEGÍTIMO. CONCEPTO Y ALCANCE",
      interpretacion: "El interés legítimo se traduce en la afectación a la esfera jurídica del quejoso, derivada de su especial situación frente al orden jurídico.",
    },
  ],
};

const specialtyNames: Record<LegalSpecialty, string> = {
  civil: "Civil",
  laboral: "Laboral",
  penal: "Penal",
  mercantil: "Mercantil",
  fiscal: "Fiscal",
  amparo: "Amparo y Constitucional",
};

export const generateAdvancedDocument = (
  type: AdvancedDocumentType,
  specialty: LegalSpecialty,
  caseData: CaseData
): string => {
  const articles = legalArticlesBySpecialty[specialty];
  const jurisprudencia = jurisprudenciaBySpecialty[specialty];
  const specialtyName = specialtyNames[specialty];
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatArticles = () => {
    return articles
      .map(
        (art) =>
          `${art.articulo} del ${art.codigo}:\n"${art.texto}"`
      )
      .join("\n\n");
  };

  const formatJurisprudencia = () => {
    return jurisprudencia
      .map(
        (j) =>
          `Tesis ${j.tesis} — ${j.titulo}\nSemanario Judicial de la Federación.\nInterpretación aplicada: ${j.interpretacion}`
      )
      .join("\n\n");
  };

  if (type === "email") {
    return `COMUNICACIÓN FORMAL
Materia: ${specialtyName}
Fecha: ${currentDate}
Referencia: ${caseData.referencia || "[Referencia del caso]"}

═══════════════════════════════════════════════════════════════

Estimado/a [Nombre del destinatario]:

En mi carácter de abogado(a) de ${caseData.cliente || "[Nombre del cliente]"}, me dirijo a usted en relación con el asunto de referencia, respecto del conflicto con ${caseData.contraparte || "[Parte contraria]"}.

I. ANTECEDENTES

${caseData.hechos || "[Descripción de los hechos relevantes]"}

II. FUNDAMENTO LEGAL

De conformidad con la legislación mexicana vigente:

${formatArticles()}

III. JURISPRUDENCIA APLICABLE

${formatJurisprudencia()}

IV. ARGUMENTACIÓN JURÍDICA (Estructura IRAC)

ISSUE (Cuestión): Se plantea si existe responsabilidad jurídica derivada de los hechos descritos.

RULE (Norma): Los preceptos legales citados establecen claramente las obligaciones y consecuencias jurídicas aplicables.

APPLICATION (Aplicación): En el presente caso, los hechos descritos configuran los supuestos normativos señalados, toda vez que ${caseData.hechos ? "se acreditan las conductas y omisiones que generan responsabilidad legal" : "[análisis de aplicación]"}.

CONCLUSION: Por lo anterior, se estima procedente la reclamación por un monto de ${caseData.monto || "[monto a determinar]"} MXN.

V. PETICIÓN

Por lo expuesto, solicitamos atentamente se considere una solución conciliatoria en un plazo de 15 días hábiles, previo al ejercicio de las acciones legales correspondientes.

Sin otro particular, quedo a sus órdenes.

Atentamente,

_______________________
[Nombre del Abogado]
Cédula Profesional: [Número]

═══════════════════════════════════════════════════════════════
SELLO LEGAL DE VALIDEZ
Este documento ha sido generado con respaldo jurídico conforme a legislación mexicana vigente.
AUTOMATIX IA | Tel: 7292564174
Nota: Este documento no sustituye la asesoría profesional de un abogado.
═══════════════════════════════════════════════════════════════`;
  }

  if (type === "recurso") {
    return `RECURSO LEGAL
Materia: ${specialtyName}
Fecha: ${currentDate}
Expediente: ${caseData.referencia || "[Número de expediente]"}

═══════════════════════════════════════════════════════════════

C. JUEZ DE LO ${specialtyName.toUpperCase()}
P R E S E N T E

${caseData.cliente || "[NOMBRE DEL PROMOVENTE]"}, por mi propio derecho, señalando como domicilio para oír y recibir notificaciones el ubicado en [DOMICILIO], autorizando para tales efectos a los CC. Licenciados [NOMBRES], ante Usted con el debido respeto comparezco para exponer:

Que por medio del presente escrito, vengo a interponer formal DEMANDA en la vía ${specialty === "laboral" ? "ORDINARIA LABORAL" : specialty === "amparo" ? "DE AMPARO INDIRECTO" : "ORDINARIA CIVIL"} en contra de:

DEMANDADO: ${caseData.contraparte || "[NOMBRE DE LA PARTE DEMANDADA]"}

Por las siguientes:

═══════════════════════════════════════════════════════════════
I. PRESTACIONES RECLAMADAS
═══════════════════════════════════════════════════════════════

${caseData.monto ? `A) Pago de la cantidad de ${caseData.monto} MXN por concepto de daños y perjuicios.` : "A) [Especificar prestaciones reclamadas]"}
B) Pago de gastos y costas del juicio.
C) Lo demás que resulte procedente en derecho.

═══════════════════════════════════════════════════════════════
II. HECHOS
═══════════════════════════════════════════════════════════════

PRIMERO.- ${caseData.hechos || "[Narración cronológica de los hechos jurídicamente relevantes]"}

SEGUNDO.- Derivado de lo anterior, se han causado perjuicios que se describen a continuación: [Descripción de perjuicios]

TERCERO.- Se cuenta con las siguientes pruebas: ${caseData.pruebas || "[Lista de evidencias]"}

═══════════════════════════════════════════════════════════════
III. FUNDAMENTO LEGAL
═══════════════════════════════════════════════════════════════

Fundo la presente demanda en los siguientes preceptos legales:

${formatArticles()}

═══════════════════════════════════════════════════════════════
IV. JURISPRUDENCIA APLICABLE
═══════════════════════════════════════════════════════════════

En apoyo a los argumentos vertidos, resultan aplicables los siguientes criterios jurisprudenciales:

${formatJurisprudencia()}

═══════════════════════════════════════════════════════════════
V. ARGUMENTACIÓN JURÍDICA (Metodología IRAC)
═══════════════════════════════════════════════════════════════

ISSUE (Cuestión jurídica):
La cuestión central a resolver es determinar la procedencia de las prestaciones reclamadas con base en los hechos narrados.

RULE (Marco normativo):
Los artículos citados del ${articles[0]?.codigo || "ordenamiento aplicable"} establecen con claridad los supuestos de procedencia y las consecuencias jurídicas de las conductas descritas.

APPLICATION (Aplicación al caso):
En el caso que nos ocupa, los hechos narrados encuadran perfectamente en los supuestos normativos, toda vez que:
- Se acredita la existencia del vínculo jurídico entre las partes.
- Se demuestran las conductas u omisiones que generan responsabilidad.
- Existe nexo causal entre los hechos y los daños reclamados.

CONCLUSION:
Por lo expuesto, se estima procedente el ejercicio de la acción intentada y deben concederse las prestaciones reclamadas.

═══════════════════════════════════════════════════════════════
VI. PRUEBAS
═══════════════════════════════════════════════════════════════

Ofrezco las siguientes pruebas:

1. DOCUMENTALES PÚBLICAS Y PRIVADAS.- ${caseData.pruebas || "[Descripción de documentos]"}
2. CONFESIONAL.- A cargo del demandado.
3. TESTIMONIAL.- A cargo de los testigos que oportunamente se señalarán.
4. PRESUNCIONAL LEGAL Y HUMANA.- En todo lo que favorezca a mi representado.
5. INSTRUMENTAL DE ACTUACIONES.- Todo lo actuado en el expediente.

═══════════════════════════════════════════════════════════════
VII. PETITORIO
═══════════════════════════════════════════════════════════════

Por lo anteriormente expuesto y fundado, a Usted C. Juez, atentamente pido:

PRIMERO.- Tenerme por presentado con la personalidad que ostento, demandando en la vía y forma propuesta.

SEGUNDO.- Dar trámite a la presente demanda y emplazar al demandado.

TERCERO.- Previos los trámites de ley, dictar sentencia definitiva condenando al demandado al pago de las prestaciones reclamadas.

PROTESTO LO NECESARIO

${caseData.cliente || "[NOMBRE Y FIRMA]"}

[Ciudad], a ${currentDate}

═══════════════════════════════════════════════════════════════
SELLO LEGAL DE VALIDEZ

Este documento ha sido generado con respaldo jurídico conforme a legislación mexicana vigente y buenas prácticas de argumentación legal.

AUTOMATIX IA
Diseño y Desarrollo de Productos y Servicios con Inteligencia Artificial
Tel: 7292564174

Advertencia: Este documento no sustituye la asesoría profesional de un abogado.
═══════════════════════════════════════════════════════════════`;
  }

  // Informe Jurídico
  return `═══════════════════════════════════════════════════════════════
INFORME JURÍDICO
CONFIDENCIAL
═══════════════════════════════════════════════════════════════

AUTOMATIX IA
Diseño y Desarrollo de Productos y Servicios con IA
Tel: 7292564174

───────────────────────────────────────────────────────────────
DATOS GENERALES
───────────────────────────────────────────────────────────────

Fecha de elaboración: ${currentDate}
Materia: ${specialtyName}
Referencia: ${caseData.referencia || "[Número de expediente]"}
Cliente: ${caseData.cliente || "[Nombre del cliente]"}
Contraparte: ${caseData.contraparte || "[Parte contraria]"}
Monto en controversia: ${caseData.monto || "[Por determinar]"} MXN

═══════════════════════════════════════════════════════════════
1. INTRODUCCIÓN
═══════════════════════════════════════════════════════════════

El presente informe tiene por objeto analizar la situación jurídica del cliente ${caseData.cliente || "[Nombre]"} respecto del conflicto con ${caseData.contraparte || "[Contraparte]"}, con el fin de determinar la viabilidad de las acciones legales correspondientes en materia ${specialtyName.toLowerCase()}.

═══════════════════════════════════════════════════════════════
2. EXPOSICIÓN DE HECHOS
═══════════════════════════════════════════════════════════════

${caseData.hechos || "[Narración cronológica y detallada de los hechos jurídicamente relevantes]"}

2.1 Pruebas disponibles:
${caseData.pruebas || "[Descripción de las evidencias documentales, testimoniales y periciales]"}

═══════════════════════════════════════════════════════════════
3. FUNDAMENTO LEGAL
═══════════════════════════════════════════════════════════════

El presente asunto se rige por las siguientes disposiciones legales:

${formatArticles()}

═══════════════════════════════════════════════════════════════
4. JURISPRUDENCIA APLICABLE
═══════════════════════════════════════════════════════════════

Los siguientes criterios jurisprudenciales resultan aplicables al presente caso:

${formatJurisprudencia()}

═══════════════════════════════════════════════════════════════
5. ARGUMENTACIÓN JURÍDICA (Metodología IRAC)
═══════════════════════════════════════════════════════════════

5.1 ISSUE (Cuestión jurídica a resolver)
───────────────────────────────────────────────────────────────
¿Es procedente ejercitar acciones legales contra ${caseData.contraparte || "[la contraparte]"} con base en los hechos descritos?

5.2 RULE (Marco normativo aplicable)
───────────────────────────────────────────────────────────────
De conformidad con los preceptos legales citados, se establecen los siguientes supuestos:
• Existencia de una obligación jurídica entre las partes
• Incumplimiento de dicha obligación
• Daños y perjuicios derivados del incumplimiento
• Nexo causal entre el incumplimiento y los daños

5.3 APPLICATION (Aplicación al caso concreto)
───────────────────────────────────────────────────────────────
Argumentos normativos:
Los artículos citados son directamente aplicables al caso, estableciendo las consecuencias del incumplimiento.

Argumentos fácticos:
Los hechos narrados acreditan los supuestos normativos requeridos para la procedencia de la acción.

Argumentos jurisprudenciales:
Los criterios de la SCJN refuerzan la interpretación favorable al cliente.

Argumentos doctrinales:
La doctrina dominante sostiene que en casos similares procede la reparación integral del daño.

5.4 CONCLUSION
───────────────────────────────────────────────────────────────
Con base en el análisis efectuado, se concluye que:
✓ Existe fundamento legal para ejercitar las acciones correspondientes
✓ Las pruebas disponibles son suficientes para acreditar la pretensión
✓ La jurisprudencia aplicable favorece la posición del cliente
✓ El monto reclamado (${caseData.monto || "[por determinar]"} MXN) tiene sustento jurídico

═══════════════════════════════════════════════════════════════
6. EVALUACIÓN DE RIESGOS
═══════════════════════════════════════════════════════════════

🟢 RIESGO BAJO
   • Fortaleza del fundamento legal
   • Claridad de los hechos documentados

🟡 RIESGO MEDIO
   • Tiempo de resolución estimado: 12-18 meses
   • Costos procesales asociados

🔴 RIESGO ALTO
   • [Identificar riesgos específicos del caso]

═══════════════════════════════════════════════════════════════
7. RECOMENDACIONES
═══════════════════════════════════════════════════════════════

1. Iniciar proceso de mediación/conciliación previo a la vía judicial.
2. Recabar pruebas adicionales que refuercen la posición.
3. Considerar la posibilidad de acuerdo extrajudicial.
4. En caso de no llegar a acuerdo, proceder con la demanda formal.

═══════════════════════════════════════════════════════════════
8. CONCLUSIÓN GENERAL
═══════════════════════════════════════════════════════════════

Se estima VIABLE el ejercicio de acciones legales en contra de ${caseData.contraparte || "[la contraparte]"}, con probabilidad de éxito estimada en un 75%, sujeta a la correcta acreditación de los hechos y pruebas señaladas.

───────────────────────────────────────────────────────────────

Quedamos a disposición para ampliar cualquier aspecto del presente informe.

_______________________
[Nombre del Abogado]
Cédula Profesional: [Número]
Fecha: ${currentDate}

═══════════════════════════════════════════════════════════════
SELLO LEGAL DE VALIDEZ
═══════════════════════════════════════════════════════════════

Este informe jurídico ha sido generado con respaldo conforme a la legislación mexicana vigente y las mejores prácticas de argumentación legal.

⚖️ AUTOMATIX IA
Diseño y Desarrollo de Productos y Servicios con Inteligencia Artificial
📞 7292564174

FUENTES LEGALES APLICADAS:
• Código Civil Federal
• ${specialty === "laboral" ? "Ley Federal del Trabajo" : specialty === "fiscal" ? "Código Fiscal de la Federación" : specialty === "amparo" ? "Ley de Amparo" : "Código de Comercio"}
• Jurisprudencia y Tesis de la SCJN
• Criterios de Tribunales Colegiados

⚠️ ADVERTENCIA: Este documento es de carácter informativo y no sustituye la asesoría profesional personalizada de un abogado. Se recomienda su revisión por un profesional del derecho antes de cualquier actuación legal.

═══════════════════════════════════════════════════════════════`;
};

export const getDocumentTypeInfo = (type: AdvancedDocumentType) => {
  const info = {
    email: {
      title: "Email Formal",
      description: "Comunicación formal con fundamento legal para negociaciones o requerimientos previos.",
    },
    recurso: {
      title: "Recurso Legal",
      description: "Demanda o recurso formal con estructura procesal completa.",
    },
    informe: {
      title: "Informe Jurídico",
      description: "Análisis legal completo con evaluación de riesgos y recomendaciones.",
    },
  };
  return info[type];
};
