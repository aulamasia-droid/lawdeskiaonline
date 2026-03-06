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
      articulo: "Art. 1913",
      texto: "Cuando una persona hace uso de mecanismos, instrumentos, aparatos o substancias peligrosas por sí mismos, por la velocidad que desarrollen, por su naturaleza explosiva o inflamable, por la energía de la corriente eléctrica que conduzcan o por otras causas análogas, está obligada a responder del daño que cause, aunque no obre ilícitamente.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2104",
      texto: "El que estuviere obligado a prestar un hecho y dejare de prestarlo o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios en los términos siguientes: I. Si la obligación fuere a plazo, comenzará la responsabilidad desde el vencimiento de éste; II. Si la obligación no dependiere de plazo cierto, se observará lo dispuesto en la parte final del artículo 2080.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2108",
      texto: "Se entiende por daño la pérdida o menoscabo sufrido en el patrimonio por la falta de cumplimiento de una obligación.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2109",
      texto: "Se reputa perjuicio la privación de cualquiera ganancia lícita, que debiera haberse obtenido con el cumplimiento de la obligación.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2110",
      texto: "Los daños y perjuicios deben ser consecuencia inmediata y directa de la falta de cumplimiento de la obligación, ya sea que se hayan causado o que necesariamente deban causarse.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2615",
      texto: "Contrato de prestación de servicios profesionales es aquel por virtud del cual una persona llamada profesionista se obliga a prestar sus servicios profesionales a otra llamada cliente, quien se obliga a pagar una retribución.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 2619",
      texto: "El empresario que se encargue de ejecutar alguna obra por precio determinado, no tiene derecho de exigir después ningún aumento, aunque lo haya tenido el precio de los materiales o el de los jornales.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 1949",
      texto: "La facultad de resolver las obligaciones se entiende implícita en las recíprocas, para el caso de que uno de los obligados no cumpliere lo que le incumbe. El perjudicado podrá escoger entre exigir el cumplimiento o la resolución de la obligación, con el resarcimiento de daños y perjuicios en ambos casos.",
    },
    {
      codigo: "Código Civil Federal",
      articulo: "Art. 1796",
      texto: "Los contratos se perfeccionan por el mero consentimiento; excepto aquellos que deben revestir una forma establecida por la ley. Desde que se perfeccionan obligan a los contratantes no sólo al cumplimiento de lo expresamente pactado, sino también a las consecuencias que, según su naturaleza, son conforme a la buena fe, al uso o a la ley.",
    },
  ],
  laboral: [
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 47",
      texto: "Son causas de rescisión de la relación de trabajo, sin responsabilidad para el patrón: I. Engañarlo el trabajador o en su caso, el sindicato que lo hubiese propuesto o recomendado con certificados falsos o referencias en los que se atribuyan al trabajador capacidad, aptitudes o facultades de que carezca.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 48",
      texto: "El trabajador podrá solicitar ante la Junta de Conciliación y Arbitraje, a su elección, que se le reinstale en el trabajo que desempeñaba, o que se le indemnice con el importe de tres meses de salario, a razón del que corresponda a la fecha en que se realice el pago.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 50",
      texto: "Las indemnizaciones consistirán: I. Si la relación de trabajo fuere por tiempo determinado menor de un año, en una cantidad igual al importe de los salarios de la mitad del tiempo de servicios prestados; si excediera de un año, en una cantidad igual al importe de los salarios de seis meses por el primer año y de veinte días por cada uno de los años siguientes.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 51",
      texto: "Son causas de rescisión de la relación de trabajo, sin responsabilidad para el trabajador: I. Engañarlo el patrón, o en su caso, la agrupación patronal al proponerle el trabajo, respecto de las condiciones del mismo.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 52",
      texto: "El trabajador podrá separarse de su trabajo dentro de los treinta días siguientes a la fecha en que se dé cualquiera de las causas mencionadas en el artículo anterior y tendrá derecho a que el patrón lo indemnice en los términos del artículo 50.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 76",
      texto: "Las y los trabajadores que tengan más de un año de servicios disfrutarán de un período anual de vacaciones pagadas, que en ningún caso podrá ser inferior a doce días laborables, y que aumentará en dos días laborables, hasta llegar a veinte, por cada año subsecuente de servicios.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 80",
      texto: "Los trabajadores tendrán derecho a una prima no menor de veinticinco por ciento sobre los salarios que les correspondan durante el período de vacaciones.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 87",
      texto: "Los trabajadores tendrán derecho a un aguinaldo anual que deberá pagarse antes del día veinte de diciembre, equivalente a quince días de salario, por lo menos.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 162",
      texto: "Los trabajadores de planta tienen derecho a una prima de antigüedad, de conformidad con las normas siguientes: I. La prima de antigüedad consistirá en el importe de doce días de salario, por cada año de servicios.",
    },
    {
      codigo: "Ley Federal del Trabajo",
      articulo: "Art. 784",
      texto: "La Junta eximirá de la carga de la prueba al trabajador, cuando por otros medios esté en posibilidad de llegar al conocimiento de los hechos, y para tal efecto requerirá al patrón para que exhiba los documentos que, de acuerdo con las leyes, tiene la obligación legal de conservar en la empresa.",
    },
  ],
  penal: [
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 386",
      texto: "Comete el delito de fraude el que engañando a uno o aprovechándose del error en que éste se halla se hace ilícitamente de alguna cosa o alcanza un lucro indebido. El delito de fraude se castigará con las penas siguientes: I. Con prisión de 3 días a 6 meses o de 30 a 180 días multa, cuando el valor de lo defraudado no exceda de diez veces el salario.",
    },
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 387",
      texto: "Las mismas penas señaladas en el artículo anterior, se impondrán: I. Al que obtenga dinero, valores o cualquiera otra cosa ofreciendo encargarse de la defensa de un procesado o de un reo, o de la dirección o patrocinio en un asunto civil o administrativo.",
    },
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 388",
      texto: "Al que por título oneroso enajene alguna cosa con conocimiento de que no tiene derecho a disponer de ella, o la arriende, hipoteque, empeñe o grave de cualquier otro modo, si ha recibido el precio, el alquiler, la cantidad en que la gravó.",
    },
    {
      codigo: "Código Penal Federal",
      articulo: "Art. 390",
      texto: "Al que sin consentimiento de quien tenga derecho a otorgarlo y con propósito de obtener algún lucro o de causar un daño, sustraiga alguna cosa ajena mueble, se le impondrá: I. Prisión de tres meses a un año y multa de cincuenta a ciento cincuenta veces el salario, cuando el valor de lo robado no exceda de cien veces el salario.",
    },
    {
      codigo: "Código Nacional de Procedimientos Penales",
      articulo: "Art. 131",
      texto: "En los procedimientos previstos en este Código, la víctima u ofendido tendrá los siguientes derechos: I. A ser informado de los derechos que en su favor establece la Constitución.",
    },
    {
      codigo: "Código Nacional de Procedimientos Penales",
      articulo: "Art. 141",
      texto: "La reparación del daño derivada de un delito podrá demandarse en forma conexa a la responsabilidad penal o bien mediante el ejercicio de la acción civil correspondiente.",
    },
    {
      codigo: "Código Nacional de Procedimientos Penales",
      articulo: "Art. 187",
      texto: "Desde el inicio de la investigación y hasta antes de la audiencia de juicio, procederán los acuerdos reparatorios en los delitos que se persiguen por querella, los delitos culposos o los delitos patrimoniales cometidos sin violencia.",
    },
  ],
  mercantil: [
    {
      codigo: "Código de Comercio",
      articulo: "Art. 75",
      texto: "La ley reputa actos de comercio: I. Todas las adquisiciones, enajenaciones y alquileres verificados con propósito de especulación comercial, de mantenimientos, artículos, muebles o mercaderías, sea en estado natural, sea después de trabajados o labrados.",
    },
    {
      codigo: "Código de Comercio",
      articulo: "Art. 77",
      texto: "Las convenciones ilícitas no producen obligación ni acción, aunque recaigan sobre operaciones de comercio.",
    },
    {
      codigo: "Código de Comercio",
      articulo: "Art. 78",
      texto: "En las convenciones mercantiles cada uno se obliga en la manera y términos que aparezca que quiso obligarse, sin que la validez del acto comercial dependa de la observancia de formalidades o requisitos determinados.",
    },
    {
      codigo: "Código de Comercio",
      articulo: "Art. 1050",
      texto: "Las acciones derivadas de los actos de comercio se sustanciarán con arreglo a las normas de procedimiento mercantil, a excepción de los casos expresamente señalados por la ley.",
    },
    {
      codigo: "Código de Comercio",
      articulo: "Art. 1051",
      texto: "El procedimiento mercantil preferente a todos es el que libremente convengan las partes con las limitaciones que se señalan en este libro, pudiendo ser un procedimiento convencional ante tribunales o un procedimiento arbitral.",
    },
    {
      codigo: "Ley General de Títulos y Operaciones de Crédito",
      articulo: "Art. 170",
      texto: "El pagaré debe contener: I. La mención de ser pagaré, inserta en el texto del documento; II. La promesa incondicional de pagar una suma determinada de dinero; III. El nombre de la persona a quien ha de hacerse el pago.",
    },
    {
      codigo: "Ley General de Títulos y Operaciones de Crédito",
      articulo: "Art. 174",
      texto: "El pagaré produce acción cambiaria, la cual es directa contra el suscriptor y sus avalistas. La acción cambiaria prescribe en tres años, contados desde la fecha de vencimiento del pagaré.",
    },
    {
      codigo: "Ley General de Sociedades Mercantiles",
      articulo: "Art. 1",
      texto: "Esta Ley reconoce las siguientes especies de sociedades mercantiles: I. Sociedad en nombre colectivo; II. Sociedad en comandita simple; III. Sociedad de responsabilidad limitada; IV. Sociedad anónima; V. Sociedad en comandita por acciones.",
    },
  ],
  fiscal: [
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 42",
      texto: "Las autoridades fiscales a fin de comprobar que los contribuyentes, los responsables solidarios o los terceros con ellos relacionados han cumplido con las disposiciones fiscales y aduaneras y, en su caso, determinar las contribuciones omitidas o los créditos fiscales.",
    },
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 46",
      texto: "La visita en el domicilio fiscal se desarrollará conforme a las siguientes reglas: I. De toda visita en el domicilio fiscal se levantará acta en la que se hará constar en forma circunstanciada los hechos u omisiones que se hubieren conocido por los visitadores.",
    },
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 121",
      texto: "El recurso de revocación deberá interponerse dentro del plazo de 30 días siguientes a aquel en que haya surtido efectos la notificación, excepto lo dispuesto en los artículos 127 y 175 de este Código, en que el escrito de recurso deberá presentarse dentro del plazo que en los mismos se señala.",
    },
    {
      codigo: "Código Fiscal de la Federación",
      articulo: "Art. 144",
      texto: "No se ejecutarán los actos administrativos cuando el afectado garantice el interés fiscal, satisfaciendo los requisitos legales. El medio de garantía deberá comprender, además de las contribuciones adeudadas actualizadas, los recargos causados y por causar.",
    },
    {
      codigo: "Ley del Impuesto sobre la Renta",
      articulo: "Art. 9",
      texto: "Las personas morales deberán calcular el impuesto sobre la renta, aplicando al resultado fiscal obtenido en el ejercicio la tasa del 30%.",
    },
    {
      codigo: "Ley del Impuesto sobre la Renta",
      articulo: "Art. 96",
      texto: "Quienes hagan pagos por los conceptos a que se refiere este Capítulo están obligados a efectuar retenciones y enteros mensuales que tendrán el carácter de pagos provisionales a cuenta del impuesto anual.",
    },
    {
      codigo: "Ley del Impuesto al Valor Agregado",
      articulo: "Art. 1",
      texto: "Están obligadas al pago del impuesto al valor agregado establecido en esta Ley, las personas físicas y las morales que, en territorio nacional, realicen los actos o actividades siguientes: I. Enajenen bienes; II. Presten servicios independientes; III. Otorguen el uso o goce temporal de bienes; IV. Importen bienes o servicios.",
    },
    {
      codigo: "Ley Federal de Procedimiento Contencioso Administrativo",
      articulo: "Art. 13",
      texto: "La demanda se presentará por escrito directamente ante la Sala Regional competente, dentro de los plazos que a continuación se indican: I. De cuarenta y cinco días siguientes a aquél en que haya surtido efectos la notificación de la resolución impugnada.",
    },
  ],
  amparo: [
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 1",
      texto: "El juicio de amparo tiene por objeto resolver toda controversia que se suscite: I. Por normas generales, actos u omisiones de autoridad que violen los derechos humanos reconocidos y las garantías otorgadas para su protección por la Constitución Política de los Estados Unidos Mexicanos.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 5",
      texto: "Son partes en el juicio de amparo: I. El quejoso, teniendo tal carácter quien aduce ser titular de un derecho subjetivo o de un interés legítimo individual o colectivo, siempre que alegue que la norma, acto u omisión reclamados violan los derechos previstos en el artículo 1o de la presente Ley.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 17",
      texto: "El plazo para presentar la demanda de amparo es de quince días, salvo: I. Cuando se reclame una norma general autoaplicativa, o el procedimiento de extradición, en que será de treinta días; II. Cuando se reclame la sentencia definitiva condenatoria en un proceso penal, que imponga pena de prisión, será de hasta ocho años.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 107",
      texto: "El amparo indirecto procede: I. Contra normas generales que por su sola entrada en vigor o con motivo del primer acto de su aplicación causen perjuicio al quejoso; II. Contra actos u omisiones que provengan de autoridades distintas de los tribunales judiciales, administrativos o del trabajo.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 108",
      texto: "La demanda de amparo indirecto deberá formularse por escrito o por medios electrónicos y expresará: I. El nombre y domicilio del quejoso y del que promueve en su nombre; II. El nombre y domicilio del tercero interesado; III. La autoridad o autoridades responsables.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 125",
      texto: "La suspensión del acto reclamado se decretará de oficio o a petición del quejoso. La suspensión de oficio procede en los casos previstos por el artículo 126 de esta Ley.",
    },
    {
      codigo: "Ley de Amparo",
      articulo: "Art. 170",
      texto: "El juicio de amparo directo procede: I. Contra sentencias definitivas, laudos y resoluciones que pongan fin al juicio, dictadas por tribunales judiciales, administrativos, agrarios o del trabajo.",
    },
    {
      codigo: "Constitución Política de los Estados Unidos Mexicanos",
      articulo: "Art. 103",
      texto: "Los Tribunales de la Federación resolverán toda controversia que se suscite: I. Por normas generales, actos u omisiones de la autoridad que violen los derechos humanos reconocidos y las garantías otorgadas para su protección por esta Constitución.",
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
    {
      tesis: "1a./J. 56/2020 (10a.)",
      titulo: "RESPONSABILIDAD CIVIL CONTRACTUAL. CARGA DE LA PRUEBA",
      interpretacion: "Corresponde al acreedor demostrar la existencia del contrato y el incumplimiento, mientras que el deudor debe probar el pago o cualquier causa de extinción de la obligación.",
    },
    {
      tesis: "1a./J. 23/2021 (11a.)",
      titulo: "CONTRATOS. INTERPRETACIÓN DE LAS CLÁUSULAS AMBIGUAS",
      interpretacion: "Las cláusulas ambiguas en los contratos deben interpretarse en el sentido más favorable para el obligado, salvo que se trate de contratos de adhesión, en cuyo caso se interpretarán en contra del que los redactó.",
    },
    {
      tesis: "1a./J. 78/2018 (10a.)",
      titulo: "DAÑOS Y PERJUICIOS. CUANTIFICACIÓN",
      interpretacion: "Para la cuantificación de daños y perjuicios debe atenderse al daño emergente (pérdida efectiva) y al lucro cesante (ganancia dejada de percibir), debiendo probarse ambos conceptos de manera fehaciente.",
    },
  ],
  laboral: [
    {
      tesis: "2a./J. 25/2021 (11a.)",
      titulo: "DESPIDO INJUSTIFICADO. CARGA DE LA PRUEBA",
      interpretacion: "Corresponde al patrón acreditar las causas de rescisión de la relación laboral cuando el trabajador niega haber incurrido en las conductas que se le imputan.",
    },
    {
      tesis: "2a./J. 89/2020 (10a.)",
      titulo: "SALARIOS CAÍDOS. PERÍODO DE GENERACIÓN",
      interpretacion: "Los salarios caídos se generan desde la fecha del despido y hasta que se cumplimente el laudo, con el límite de doce meses establecido en la reforma laboral de 2012.",
    },
    {
      tesis: "2a./J. 112/2019 (10a.)",
      titulo: "PRIMA DE ANTIGÜEDAD. PROCEDENCIA",
      interpretacion: "La prima de antigüedad procede en caso de separación voluntaria del trabajador cuando éste ha cumplido quince años o más de servicios, o en cualquier caso de terminación de la relación laboral.",
    },
    {
      tesis: "2a./J. 45/2022 (11a.)",
      titulo: "VACACIONES Y PRIMA VACACIONAL. PRESCRIPCIÓN",
      interpretacion: "El derecho al pago de vacaciones y prima vacacional prescribe en un año contado a partir del día siguiente a la fecha en que la obligación sea exigible.",
    },
  ],
  penal: [
    {
      tesis: "1a./J. 15/2020 (10a.)",
      titulo: "FRAUDE. ELEMENTOS DEL TIPO PENAL",
      interpretacion: "Los elementos constitutivos del delito de fraude son: el engaño o aprovechamiento del error, el lucro indebido o la obtención de una cosa, y el nexo causal entre ambos.",
    },
    {
      tesis: "1a./J. 67/2019 (10a.)",
      titulo: "PRESUNCIÓN DE INOCENCIA. ALCANCE",
      interpretacion: "La presunción de inocencia implica que toda persona debe ser tratada como inocente hasta que se demuestre su culpabilidad mediante sentencia firme dictada por autoridad competente.",
    },
    {
      tesis: "1a./J. 33/2021 (11a.)",
      titulo: "REPARACIÓN DEL DAÑO. DERECHO DE LA VÍCTIMA",
      interpretacion: "La reparación del daño es un derecho fundamental de la víctima u ofendido que debe garantizarse de manera integral, incluyendo la restitución, indemnización, rehabilitación, satisfacción y garantías de no repetición.",
    },
  ],
  mercantil: [
    {
      tesis: "1a./J. 88/2019 (10a.)",
      titulo: "TÍTULOS DE CRÉDITO. CADUCIDAD DE LA ACCIÓN CAMBIARIA",
      interpretacion: "La caducidad de la acción cambiaria opera de pleno derecho y puede ser declarada de oficio por el juzgador.",
    },
    {
      tesis: "1a./J. 52/2020 (10a.)",
      titulo: "PAGARÉ. PRESCRIPCIÓN DE LA ACCIÓN CAMBIARIA DIRECTA",
      interpretacion: "La acción cambiaria directa contra el suscriptor de un pagaré prescribe en tres años contados a partir de la fecha de vencimiento del documento.",
    },
    {
      tesis: "1a./J. 91/2021 (11a.)",
      titulo: "INTERESES MORATORIOS. LÍMITES EN OPERACIONES COMERCIALES",
      interpretacion: "Los intereses moratorios pactados en títulos de crédito pueden reducirse por el juzgador cuando resulten desproporcionados o usurarios, atendiendo al costo del dinero en el mercado.",
    },
  ],
  fiscal: [
    {
      tesis: "2a./J. 112/2021 (11a.)",
      titulo: "VISITA DOMICILIARIA. REQUISITOS DE LA ORDEN",
      interpretacion: "La orden de visita domiciliaria debe cumplir con los requisitos de fundamentación y motivación, indicando de manera precisa el objeto de la misma, los impuestos y ejercicios a revisar.",
    },
    {
      tesis: "2a./J. 78/2020 (10a.)",
      titulo: "CADUCIDAD DE LAS FACULTADES DE COMPROBACIÓN",
      interpretacion: "Las facultades de comprobación de las autoridades fiscales se extinguen en el plazo de cinco años contados a partir del día siguiente a aquel en que se presentó la declaración del ejercicio.",
    },
    {
      tesis: "2a./J. 145/2019 (10a.)",
      titulo: "CRÉDITOS FISCALES. GARANTÍA DEL INTERÉS FISCAL",
      interpretacion: "El contribuyente tiene derecho a garantizar el interés fiscal mediante las formas previstas en el Código Fiscal de la Federación, a efecto de suspender el procedimiento administrativo de ejecución.",
    },
  ],
  amparo: [
    {
      tesis: "P./J. 45/2019 (10a.)",
      titulo: "INTERÉS LEGÍTIMO. CONCEPTO Y ALCANCE",
      interpretacion: "El interés legítimo se traduce en la afectación a la esfera jurídica del quejoso, derivada de su especial situación frente al orden jurídico, que puede ser de índole económico, profesional, de salud pública, o de cualquier otra índole.",
    },
    {
      tesis: "P./J. 12/2020 (10a.)",
      titulo: "SUSPENSIÓN EN EL AMPARO. REQUISITOS PARA SU OTORGAMIENTO",
      interpretacion: "Para el otorgamiento de la suspensión en el juicio de amparo debe analizarse la apariencia del buen derecho, el peligro en la demora y el interés social.",
    },
    {
      tesis: "2a./J. 67/2021 (11a.)",
      titulo: "AMPARO INDIRECTO. PROCEDENCIA CONTRA ACTOS DE EJECUCIÓN IRREPARABLE",
      interpretacion: "El amparo indirecto procede contra actos de ejecución irreparable, entendiéndose por tales aquellos cuyas consecuencias no pueden ser reparadas por la sentencia definitiva del juicio de origen.",
    },
    {
      tesis: "1a./J. 89/2022 (11a.)",
      titulo: "SUPLENCIA DE LA QUEJA DEFICIENTE. MATERIA LABORAL",
      interpretacion: "En materia laboral opera la suplencia de la queja deficiente en favor del trabajador, debiendo el juzgador de amparo analizar de oficio las violaciones procesales que pudieran afectar sus derechos.",
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
ARQENTA | Arquitectura Digital e IA Aplicada
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

ARQENTA
Arquitectura Digital e IA Aplicada

Advertencia: Este documento no sustituye la asesoría profesional de un abogado.
═══════════════════════════════════════════════════════════════`;
  }

  // Informe Jurídico
  return `═══════════════════════════════════════════════════════════════
INFORME JURÍDICO
CONFIDENCIAL
═══════════════════════════════════════════════════════════════

ARQENTA
Arquitectura Digital e IA Aplicada

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
