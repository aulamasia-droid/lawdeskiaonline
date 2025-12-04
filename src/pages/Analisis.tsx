import { useState, useEffect } from "react";
import { Scale, Brain, AlertTriangle, HelpCircle, ArrowRight, Lightbulb, FileText, Clock, TrendingUp, Gavel, DollarSign, Users, BookOpen, FileSearch, Download, Bot, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { LegalSourceCard } from "@/components/analysis/LegalSourceCard";
import { DocumentViewerModal } from "@/components/analysis/DocumentViewerModal";
import { EvidenceStatusBadge, EvidenceStatus } from "@/components/analysis/EvidenceStatusBadge";
import { AITraceabilityPanel, RelevanceLevel } from "@/components/analysis/AITraceabilityPanel";
import { generateLegalPdf } from "@/lib/generateLegalPdf";
import { toast } from "sonner";
import { ProfessionalLegalDisclaimer } from "@/components/legal/ProfessionalLegalDisclaimer";

// Datos de fuentes legales con trazabilidad
const legalSources = [
  {
    id: "1",
    type: "articulo" as const,
    title: "De los Efectos de las Obligaciones",
    code: "Art. 2104 Código Civil Federal",
    reference: "Libro IV, Segunda Parte, Título Primero",
    status: "disponible" as EvidenceStatus,
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf",
    aiReasoning: "Este artículo es fundamental para su caso ya que establece la obligación de cumplir con lo prometido en el contrato. La cláusula de penalidad por retraso se ampara directamente en este fundamento.",
    relevance: "alta" as RelevanceLevel,
    matchedKeywords: ["incumplimiento", "obligaciones", "contrato", "mora"],
    confidence: 94,
    excerpt: "El que estuviere obligado a prestar un hecho y dejare de prestarlo, o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios...",
    documentContent: `<h2>Artículo 2104 - Código Civil Federal</h2>
<p><strong>Capítulo II - De los Efectos de las Obligaciones</strong></p>
<p>El que estuviere obligado a prestar un hecho y dejare de prestarlo, o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios en los términos siguientes:</p>
<ul>
<li>I. Si la obligación fuere a plazo, comenzará la responsabilidad desde el vencimiento de éste;</li>
<li>II. Si la obligación no dependiere de plazo cierto, se observará lo dispuesto en la parte final del artículo 2080.</li>
</ul>
<p>El que contraviene una obligación de no hacer pagará daños y perjuicios por el solo hecho de la contravención.</p>`,
  },
  {
    id: "2",
    type: "articulo" as const,
    title: "De los Daños y Perjuicios",
    code: "Art. 2108-2109 Código Civil Federal",
    reference: "Libro IV, Segunda Parte, Título Primero, Capítulo III",
    status: "disponible" as EvidenceStatus,
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf",
    aiReasoning: "Define qué se entiende por daño y perjuicio en materia civil. Esencial para cuantificar la reclamación de $45,000 MXN en daños materiales y $25,000 MXN en lucro cesante.",
    relevance: "alta" as RelevanceLevel,
    matchedKeywords: ["daño", "perjuicio", "pérdida", "ganancia"],
    confidence: 91,
    excerpt: "Se entiende por daño la pérdida o menoscabo sufrido en el patrimonio por la falta de cumplimiento de una obligación. Se reputa perjuicio la privación de cualquiera ganancia lícita...",
  },
  {
    id: "3",
    type: "jurisprudencia" as const,
    title: "CONTRATOS CIVILES. INCUMPLIMIENTO. CARGA DE LA PRUEBA",
    code: "Tesis: 1a./J. 45/2019",
    reference: "Primera Sala SCJN, Décima Época",
    status: "disponible" as EvidenceStatus,
    url: "https://sjf.scjn.gob.mx/SJFSem/Paginas/SemanarioIndex.aspx",
    aiReasoning: "Esta jurisprudencia establece que la carga de la prueba recae en quien alega el incumplimiento. El reconocimiento parcial del demandado fortalece su posición conforme a este criterio.",
    relevance: "alta" as RelevanceLevel,
    matchedKeywords: ["carga de la prueba", "incumplimiento", "contrato civil"],
    confidence: 88,
    excerpt: "En los contratos civiles, quien alegue el incumplimiento de las obligaciones debe probarlo, salvo que el demandado reconozca los hechos constitutivos de la acción...",
  },
  {
    id: "4",
    type: "jurisprudencia" as const,
    title: "DAÑOS Y PERJUICIOS. CUANTIFICACIÓN EN CONTRATOS DE OBRA",
    code: "Tesis: I.4o.C.89 C (10a.)",
    reference: "Cuarto Tribunal Colegiado en Materia Civil, CDMX",
    status: "parcial" as EvidenceStatus,
    url: "https://sjf.scjn.gob.mx/SJFSem/Paginas/SemanarioIndex.aspx",
    aiReasoning: "Criterio relevante para la cuantificación de daños en contratos de construcción. Establece parámetros para calcular el lucro cesante por retraso en entrega de obra.",
    relevance: "media" as RelevanceLevel,
    matchedKeywords: ["cuantificación", "obra", "retraso", "daños"],
    confidence: 76,
  },
  {
    id: "5",
    type: "articulo" as const,
    title: "Contrato de Obra a Precio Alzado",
    code: "Art. 2615-2620 Código Civil Federal",
    reference: "Libro IV, Segunda Parte, Título X",
    status: "disponible" as EvidenceStatus,
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/2_110121.pdf",
    aiReasoning: "Regula específicamente los contratos de obra como el de su caso. El Art. 2619 permite rescindir el contrato si hay vicios o defectos que hagan la obra impropia.",
    relevance: "alta" as RelevanceLevel,
    matchedKeywords: ["obra", "precio alzado", "rescisión", "constructor"],
    confidence: 92,
  },
  {
    id: "6",
    type: "doctrina" as const,
    title: "Prescripción de Acciones Civiles por Incumplimiento",
    code: "Art. 1161 Código Civil Federal",
    reference: "Jurisprudencia Aplicable 2020-2024",
    status: "no-disponible" as EvidenceStatus,
    aiReasoning: "Referencia doctrinal sobre plazos de prescripción. Importante considerar el plazo de 2 años para acciones derivadas de contratos civiles.",
    relevance: "media" as RelevanceLevel,
    matchedKeywords: ["prescripción", "plazo", "acción civil"],
    confidence: 65,
  },
];

const Analisis = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<typeof legalSources[0] | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleViewDocument = (source: typeof legalSources[0]) => {
    setSelectedDocument(source);
    setIsDocumentModalOpen(true);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateLegalPdf({
        caseTitle: "Incumplimiento de Contrato de Obra - María González vs Construcciones del Valle",
        caseSummary: "Cliente (acreedor) contrató servicios de construcción por $125,000 MXN con fecha de entrega 15/06/2024. A la fecha existe un retraso de 3 meses con obra inconclusa. Pagos realizados: 60% ($75,000 MXN). El contratista ha reconocido parcialmente la demora por escrito. Existe documentación fotográfica del estado actual y testigos disponibles. Prescripción aplicable: 2 años desde el incumplimiento (Art. 1161 CCF).",
        aiSummary: "Caso de incumplimiento contractual con alta viabilidad jurídica (78%). El cliente contrató servicios de construcción que no fueron entregados en tiempo y forma. Existe documentación sólida que respalda la reclamación, incluyendo el contrato original, evidencia del retraso y reconocimiento parcial del demandado. Se recomienda iniciar acción legal antes del vencimiento de prescripción. Monto total reclamable: $127,500 MXN incluyendo daños materiales, penalidades contractuales, lucro cesante y gastos periciales.",
        traceabilityText: "He identificado 6 fuentes legales relevantes para su caso de incumplimiento contractual. El Art. 2104 CCF establece la responsabilidad por incumplimiento de obligaciones, mientras que los Arts. 2108-2109 CCF definen daños y perjuicios. La tesis 1a./J. 45/2019 de la SCJN establece criterios sobre carga de la prueba en contratos civiles. Los Arts. 2615-2620 CCF regulan específicamente los contratos de obra a precio alzado aplicables a este caso. La selección de fuentes se basó en coincidencia de palabras clave como 'incumplimiento', 'contrato de obra', 'daños y perjuicios' y análisis de precedentes similares en jurisdicciones civiles de México.",
        confidencePercentage: 87,
        legalSources: legalSources.map(source => ({
          type: source.type,
          title: source.title,
          code: source.code,
          reference: source.reference,
          status: source.status,
          url: source.url,
          aiReasoning: source.aiReasoning,
          relevance: source.relevance,
          confidence: source.confidence,
        })),
      });
      toast.success("✅ Informe descargado exitosamente.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("❌ Hubo un error al generar el informe. Intenta nuevamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const analysisBlocks = [
    // A) Resumen Ejecutivo
    {
      icon: FileText,
      title: "A) Resumen Ejecutivo del Caso",
      color: "accent",
      fullWidth: true,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">Probabilidad de Éxito</span>
              </div>
              <p className="text-2xl font-serif text-foreground">78%</p>
              <p className="text-xs text-muted-foreground mt-1">Basado en precedentes similares</p>
            </div>
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-success" />
                <span className="text-xs font-medium text-success">Monto Reclamable</span>
              </div>
              <p className="text-2xl font-serif text-foreground">{formatCurrency(127500)}</p>
              <p className="text-xs text-muted-foreground mt-1">Incluye daños, perjuicios y penalidades</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-xs font-medium text-warning">Tiempo Estimado</span>
              </div>
              <p className="text-2xl font-serif text-foreground">8-14 meses</p>
              <p className="text-xs text-muted-foreground mt-1">Proceso judicial ordinario civil</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>Síntesis:</strong> Caso de incumplimiento contractual con alta viabilidad jurídica. El cliente (acreedor) 
              contrató servicios de construcción que no fueron entregados en tiempo y forma. Existe documentación sólida 
              que respalda la reclamación, incluyendo el contrato original, evidencia del retraso y reconocimiento parcial 
              del demandado. Se recomienda iniciar acción legal antes del vencimiento de prescripción.
            </p>
          </div>
        </div>
      ),
    },
    // C) Tipología Legal
    {
      icon: Scale,
      title: "C) Tipología Legal Detectada",
      color: "accent",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="legal-badge bg-accent/10 text-accent">
              Derecho Civil
            </div>
            <div className="legal-badge bg-primary/10 text-primary">
              Contratos
            </div>
            <div className="legal-badge bg-warning/10 text-warning">
              Responsabilidad Civil
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              <strong>Subtipo:</strong> Incumplimiento de Contrato de Obra
            </p>
            <p className="text-sm text-foreground">
              <strong>Materia específica:</strong> Obligaciones contractuales y responsabilidad civil
            </p>
            <p className="text-sm text-foreground">
              <strong>Vía procesal:</strong> Juicio Ordinario Civil
            </p>
            <p className="text-sm text-foreground">
              <strong>Jurisdicción:</strong> Juzgado Civil del domicilio del demandado
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            El caso presenta elementos típicos de una disputa contractual en el ámbito de la construcción, 
            con posibles implicaciones en daños y perjuicios por incumplimiento de obligaciones de hacer.
          </p>
          <div className="p-3 rounded-lg bg-secondary/50 space-y-2">
            <p className="text-xs font-medium text-accent">Fundamento Legal Aplicable:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Art. 1824-1848 Código Civil Federal (Efectos de las Obligaciones)</li>
              <li>• Art. 2615-2620 CCF (Contrato de Obra a Precio Alzado)</li>
              <li>• Art. 1910 CCF (Responsabilidad Civil)</li>
              <li>• Art. 2104-2118 CCF (Incumplimiento de Obligaciones)</li>
              <li>• Art. 2108-2109 CCF (Daños y Perjuicios)</li>
            </ul>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Alta compatibilidad con precedentes favorables</span>
          </div>
        </div>
      ),
    },
    // D) Cronología
    {
      icon: Clock,
      title: "D) Cronología de Hechos",
      color: "primary",
      content: (
        <div className="space-y-3">
          {[
            { date: "15/03/2024", event: "Firma del contrato de obra", type: "inicio" },
            { date: "15/04/2024", event: "Primer pago (30% - $37,500 MXN)", type: "pago" },
            { date: "15/05/2024", event: "Segundo pago (30% - $37,500 MXN)", type: "pago" },
            { date: "15/06/2024", event: "Fecha límite de entrega (incumplida)", type: "critico" },
            { date: "01/07/2024", event: "Primera notificación de retraso al contratista", type: "accion" },
            { date: "15/07/2024", event: "Respuesta del contratista reconociendo demora", type: "evidencia" },
            { date: "15/09/2024", event: "3 meses de retraso acumulado", type: "critico" },
            { date: "01/10/2024", event: "Documentación fotográfica del estado de obra", type: "evidencia" },
            { date: "30/01/2025", event: "Fecha límite de prescripción (2 años)", type: "critico" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className={cn(
                  "w-3 h-3 rounded-full shrink-0",
                  item.type === "critico" && "bg-destructive",
                  item.type === "pago" && "bg-success",
                  item.type === "evidencia" && "bg-accent",
                  item.type === "accion" && "bg-warning",
                  item.type === "inicio" && "bg-primary"
                )} />
                {index < 8 && <div className="w-0.5 h-6 bg-border" />}
              </div>
              <div className="flex-1 pb-2">
                <p className="text-xs text-muted-foreground">{item.date}</p>
                <p className="text-sm text-foreground">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    // E) Fundamentos Jurídicos Aplicables
    {
      icon: BookOpen,
      title: "E) Fundamentos Jurídicos Aplicables",
      color: "accent",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Marco normativo aplicable al caso, con citas textuales y comentarios jurídicos contextualizados.
          </p>
          {[
            {
              article: "Art. 2104 Código Civil Federal",
              title: "Incumplimiento de obligaciones de hacer",
              citation: "\"El que estuviere obligado a prestar un hecho y dejare de prestarlo, o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios...\"",
              comment: "Fundamento central para la acción. El contratista tenía obligación de entregar la obra en fecha convenida (15/06/2024) y no lo hizo.",
              applicability: "alta"
            },
            {
              article: "Art. 2108-2109 CCF",
              title: "Definición de daños y perjuicios",
              citation: "\"Se entiende por daño la pérdida o menoscabo sufrido en el patrimonio por la falta de cumplimiento de una obligación. Se reputa perjuicio la privación de cualquiera ganancia lícita...\"",
              comment: "Permite reclamar tanto el daño emergente ($45,000 MXN en reparaciones) como el lucro cesante ($25,000 MXN en rentas no percibidas).",
              applicability: "alta"
            },
            {
              article: "Art. 2615-2620 CCF",
              title: "Contrato de obra a precio alzado",
              citation: "\"Si se conviene en que la obra deba ejecutarse a satisfacción del propietario, se entiende reservada la aprobación, a falta de conformidad...\"",
              comment: "Regula específicamente los contratos de construcción. El Art. 2619 permite rescindir si existen vicios o defectos que hagan la obra impropia para su uso.",
              applicability: "alta"
            },
            {
              article: "Art. 1910 CCF",
              title: "Responsabilidad civil extracontractual",
              citation: "\"El que obrando ilícitamente o contra las buenas costumbres cause daño a otro, está obligado a repararlo...\"",
              comment: "Fundamento subsidiario para reclamar daños si se acredita ilicitud en la conducta del contratista.",
              applicability: "media"
            },
            {
              article: "Art. 1161 CCF",
              title: "Prescripción de acciones civiles",
              citation: "\"Se prescriben en dos años... las acciones para exigir la responsabilidad civil por injurias ya de palabra, ya por escrito, y las que tienen por objeto exigir la responsabilidad de personas que ejercen una profesión...\"",
              comment: "⚠️ URGENTE: El plazo de prescripción de 2 años vence el 30/01/2025. Debe interponerse demanda antes de esa fecha.",
              applicability: "alta"
            },
          ].map((item, index) => (
            <div key={index} className={cn(
              "p-4 rounded-lg border",
              item.applicability === "alta" ? "bg-accent/5 border-accent/20" : "bg-secondary/50 border-border"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  item.applicability === "alta" ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"
                )}>
                  {item.applicability === "alta" ? "Alta aplicabilidad" : "Media aplicabilidad"}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">{item.article}</p>
              <p className="text-xs text-accent mb-2">{item.title}</p>
              <blockquote className="text-xs text-muted-foreground italic border-l-2 border-accent/30 pl-3 mb-2">
                {item.citation}
              </blockquote>
              <p className="text-xs text-foreground">
                <strong className="text-accent">Comentario jurídico:</strong> {item.comment}
              </p>
            </div>
          ))}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-medium text-primary mb-2">📚 Jurisprudencia Aplicable:</p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">Tesis 1a./J. 45/2019 SCJN:</strong> "CONTRATOS CIVILES. INCUMPLIMIENTO. CARGA DE LA PRUEBA" - 
                Establece que quien alega el incumplimiento debe probarlo, salvo reconocimiento del demandado.
              </li>
              <li>
                <strong className="text-foreground">Tesis I.4o.C.89 C (10a.):</strong> "DAÑOS Y PERJUICIOS. CUANTIFICACIÓN EN CONTRATOS DE OBRA" - 
                Criterio para calcular daños en contratos de construcción por retraso en entrega.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    // F) Argumentación Profesional
    {
      icon: Gavel,
      title: "F) Argumentación Profesional",
      color: "primary",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            Desarrollo argumentativo con estructura IRAC (Issue, Rule, Application, Conclusion).
          </p>
          
          {/* ISSUE */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">I - ISSUE</span>
              <span className="text-xs text-muted-foreground">Cuestión jurídica</span>
            </div>
            <p className="text-sm text-foreground">
              ¿Procede la acción de cumplimiento forzoso de contrato y el pago de daños y perjuicios contra Construcciones del Valle S.A. de C.V. 
              derivado del incumplimiento del contrato de obra celebrado el 15/03/2024?
            </p>
          </div>

          {/* RULE */}
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-bold">R - RULE</span>
              <span className="text-xs text-muted-foreground">Regla de derecho aplicable</span>
            </div>
            <p className="text-sm text-foreground mb-2">
              Conforme al artículo 2104 del Código Civil Federal, quien estuviere obligado a prestar un hecho y dejare de prestarlo, 
              o no lo prestare conforme a lo convenido, será responsable de los daños y perjuicios.
            </p>
            <p className="text-sm text-foreground">
              Los artículos 2108 y 2109 del mismo ordenamiento definen el daño como la pérdida patrimonial y el perjuicio como la 
              privación de ganancia lícita que debía obtenerse.
            </p>
          </div>

          {/* APPLICATION */}
          <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-warning/20 text-warning text-xs font-bold">A - APPLICATION</span>
              <span className="text-xs text-muted-foreground">Aplicación al caso concreto</span>
            </div>
            <div className="space-y-2 text-sm text-foreground">
              <p>
                <strong>1. Existencia del vínculo contractual:</strong> El contrato de fecha 15/03/2024 establece claramente las obligaciones 
                del contratista: entregar la obra terminada a más tardar el 15/06/2024, con una cláusula de penalidad del 2% mensual por retraso.
              </p>
              <p>
                <strong>2. Incumplimiento acreditado:</strong> Han transcurrido 3 meses desde la fecha de entrega pactada sin que el demandado 
                haya cumplido con su obligación. El propio demandado reconoció la demora por escrito el 15/07/2024.
              </p>
              <p>
                <strong>3. Daños y perjuicios cuantificables:</strong> Se acreditan daños materiales por $45,000 MXN (costo de terminación), 
                penalidad contractual por $7,500 MXN, y lucro cesante por $25,000 MXN (rentas no percibidas durante el retraso).
              </p>
              <p>
                <strong>4. Nexo causal:</strong> Los daños son consecuencia directa e inmediata del incumplimiento contractual del demandado.
              </p>
            </div>
          </div>

          {/* CONCLUSION */}
          <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-success/20 text-success text-xs font-bold">C - CONCLUSION</span>
              <span className="text-xs text-muted-foreground">Conclusión jurídica</span>
            </div>
            <p className="text-sm text-foreground">
              <strong>PROCEDE</strong> la acción de cumplimiento forzoso y el pago de daños y perjuicios. Los elementos de la acción 
              se encuentran acreditados: (i) existencia del contrato, (ii) incumplimiento imputable al demandado, (iii) daños y perjuicios 
              cuantificados, y (iv) nexo causal entre el incumplimiento y los daños. La probabilidad de éxito se estima en <strong>78%</strong> 
              con base en precedentes judiciales similares y la solidez probatoria del caso.
            </p>
          </div>
        </div>
      ),
    },
    // Ideas Clave (reorganizado)
    {
      icon: Brain,
      title: "Ideas Clave del Caso",
      color: "primary",
      content: (
        <div className="space-y-4">
          <ul className="space-y-2">
            {[
              { text: "Contrato firmado el 15/03/2024 con cláusula de penalidad por retraso (2% mensual)", importance: "alta" },
              { text: "Incumplimiento de plazos documentado (3 meses de retraso)", importance: "alta" },
              { text: "Daños materiales estimados en $45,000 MXN", importance: "alta" },
              { text: "Penalidad contractual acumulada: $7,500 MXN (3 meses x 2%)", importance: "alta" },
              { text: "Existe documentación fotográfica del estado de la obra", importance: "media" },
              { text: "El demandado ha reconocido parcialmente la demora por escrito", importance: "alta" },
              { text: "Pagos realizados: 60% del monto total convenido ($75,000 MXN)", importance: "media" },
              { text: "Monto pendiente retenido: $50,000 MXN (sujeto a entrega)", importance: "media" },
              { text: "No existe cláusula de fuerza mayor invocable", importance: "media" },
              { text: "Testigos disponibles: 2 vecinos y 1 perito en construcción", importance: "alta" },
            ].map((idea, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className={cn(
                  "w-2 h-2 rounded-full mt-2 shrink-0",
                  idea.importance === "alta" ? "bg-accent" : "bg-muted-foreground"
                )} />
                <span className="text-foreground">{idea.text}</span>
              </li>
            ))}
          </ul>
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-xs font-medium text-accent mb-2">Análisis de Lexi:</p>
            <p className="text-xs text-muted-foreground">
              El reconocimiento parcial de la demora por parte del demandado fortalece significativamente 
              la posición del cliente. Combinado con la cláusula de penalidad contractual, existe una 
              base sólida para reclamar daños y perjuicios conforme al Art. 2104 del CCF. La retención 
              del 40% del pago puede utilizarse como herramienta de negociación.
            </p>
          </div>
        </div>
      ),
    },
    // Partes Involucradas
    {
      icon: Users,
      title: "Partes Involucradas",
      color: "muted",
      content: (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <p className="text-xs font-medium text-success mb-2">ACTOR (Cliente)</p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground"><strong>Nombre:</strong> María González Pérez</p>
              <p className="text-muted-foreground"><strong>Calidad:</strong> Propietaria del inmueble / Acreedora</p>
              <p className="text-muted-foreground"><strong>Domicilio:</strong> Av. Reforma 234, Col. Centro, CDMX</p>
              <p className="text-muted-foreground"><strong>Interés jurídico:</strong> Cumplimiento de contrato y pago de daños</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="text-xs font-medium text-destructive mb-2">DEMANDADO</p>
            <div className="space-y-1 text-sm">
              <p className="text-foreground"><strong>Nombre:</strong> Construcciones del Valle S.A. de C.V.</p>
              <p className="text-muted-foreground"><strong>Representante:</strong> Juan López Martínez (Administrador Único)</p>
              <p className="text-muted-foreground"><strong>Domicilio:</strong> Calle Industria 567, Col. Industrial, CDMX</p>
              <p className="text-muted-foreground"><strong>Calidad:</strong> Contratista / Deudor</p>
            </div>
          </div>
        </div>
      ),
    },
    // G) Riesgos Procesales
    {
      icon: AlertTriangle,
      title: "G) Riesgos Procesales",
      color: "warning",
      content: (
        <div className="space-y-4">
          {[
            {
              level: "Alto",
              text: "Prescripción próxima",
              detail: "Quedan 45 días para presentar demanda según Art. 1161 CCF (prescripción de 2 años para acciones derivadas de contratos)",
              mitigation: "Presentar demanda inmediatamente o enviar requerimiento notarial que interrumpa prescripción",
              className: "text-destructive",
              bgClass: "bg-destructive/10",
            },
            {
              level: "Medio",
              text: "Cláusula de arbitraje",
              detail: "El contrato incluye cláusula compromisoria que podría limitar la vía judicial. Revisar si cumple requisitos del Art. 1416 del Código de Comercio",
              mitigation: "Analizar validez de la cláusula; si es inválida, proceder por vía judicial",
              className: "text-warning",
              bgClass: "bg-warning/10",
            },
            {
              level: "Medio",
              text: "Solvencia del demandado",
              detail: "Verificar situación financiera de la empresa demandada para asegurar ejecutabilidad de sentencia",
              mitigation: "Solicitar medidas cautelares (embargo preventivo) junto con la demanda",
              className: "text-warning",
              bgClass: "bg-warning/10",
            },
            {
              level: "Bajo",
              text: "Posible reconvención",
              detail: "El demandado podría alegar cambios en especificaciones no documentados. Recopilar todas las comunicaciones previas",
              mitigation: "Preparar pruebas de que no hubo modificaciones al proyecto original",
              className: "text-muted-foreground",
              bgClass: "bg-secondary",
            },
          ].map((risk, index) => (
            <div key={index} className={cn("p-3 rounded-lg", risk.bgClass)}>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-xs font-bold", risk.className)}>
                  [{risk.level}]
                </span>
                <p className="text-sm font-medium text-foreground">{risk.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{risk.detail}</p>
              <p className="text-xs text-accent"><strong>Mitigación:</strong> {risk.mitigation}</p>
            </div>
          ))}
          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
            <p className="text-xs font-medium text-warning mb-1">⚠️ Acción recomendada urgente:</p>
            <p className="text-xs text-muted-foreground">
              Iniciar procedimiento de mediación o presentar demanda antes del vencimiento del plazo de prescripción.
            </p>
          </div>
        </div>
      ),
    },
    // B) Monto Reclamable / Daño Patrimonial
    {
      icon: DollarSign,
      title: "B) Monto Reclamable / Desglose",
      color: "accent",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              { concept: "Daños materiales directos", amount: 45000, description: "Costo de reparación y terminación de obra" },
              { concept: "Penalidad contractual", amount: 7500, description: "2% mensual x 3 meses de retraso" },
              { concept: "Lucro cesante", amount: 25000, description: "Renta dejada de percibir durante el retraso" },
              { concept: "Daño moral", amount: 15000, description: "Afectación emocional documentada" },
              { concept: "Gastos periciales", amount: 8000, description: "Honorarios de perito en construcción" },
              { concept: "Gastos y costas", amount: 27000, description: "Honorarios legales estimados (15%)" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                <div>
                  <p className="text-sm text-foreground">{item.concept}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <p className="text-sm font-medium text-foreground">{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="font-medium text-foreground">Total Reclamable</p>
            <p className="text-xl font-serif text-accent">{formatCurrency(127500)}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            * Montos sujetos a prueba en juicio. El monto final dependerá de la valoración judicial.
          </p>
        </div>
      ),
    },
    // H) Recomendación Estratégica
    {
      icon: Lightbulb,
      title: "H) Recomendación Estratégica",
      color: "accent",
      fullWidth: true,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Caminos jurídicos viables y acciones recomendadas con base en el análisis del expediente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opción Principal */}
            <div className="p-4 rounded-lg bg-success/5 border-2 border-success/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-bold">RECOMENDADA</span>
              </div>
              <h4 className="font-medium text-foreground mb-2">1. Demanda Civil Ordinaria</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• <strong>Vía:</strong> Juicio Ordinario Civil</li>
                <li>• <strong>Acción:</strong> Cumplimiento forzoso + daños y perjuicios</li>
                <li>• <strong>Juzgado:</strong> Civil del domicilio del demandado</li>
                <li>• <strong>Tiempo estimado:</strong> 8-14 meses</li>
                <li>• <strong>Probabilidad de éxito:</strong> 78%</li>
              </ul>
              <p className="text-xs text-success">
                ✅ Mayor monto recuperable. Medidas cautelares disponibles.
              </p>
            </div>

            {/* Opción Alternativa 1 */}
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded bg-warning/20 text-warning text-xs font-bold">ALTERNATIVA</span>
              </div>
              <h4 className="font-medium text-foreground mb-2">2. Mediación/Conciliación</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• <strong>Vía:</strong> Centro de Mediación Privado o PROFECO</li>
                <li>• <strong>Objetivo:</strong> Acuerdo extrajudicial vinculante</li>
                <li>• <strong>Tiempo estimado:</strong> 1-3 meses</li>
                <li>• <strong>Costo:</strong> Menor que litigio</li>
              </ul>
              <p className="text-xs text-warning">
                ⚠️ Requiere voluntad de ambas partes. Puede interrumpir prescripción.
              </p>
            </div>
          </div>

          {/* Acciones Inmediatas */}
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <h4 className="font-medium text-destructive mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              ACCIONES INMEDIATAS (Urgentes)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded bg-background/50">
                <p className="text-sm font-medium text-foreground mb-1">1. Requerimiento Notarial</p>
                <p className="text-xs text-muted-foreground">
                  Notificar formalmente al demandado exigiendo cumplimiento. Interrumpe prescripción y constituye en mora.
                </p>
                <p className="text-xs text-accent mt-1">Plazo: Inmediato</p>
              </div>
              <div className="p-3 rounded bg-background/50">
                <p className="text-sm font-medium text-foreground mb-1">2. Asegurar Pruebas</p>
                <p className="text-xs text-muted-foreground">
                  Documentar estado actual de la obra con perito. Resguardar comunicaciones escritas y recibos de pago.
                </p>
                <p className="text-xs text-accent mt-1">Plazo: 7 días</p>
              </div>
              <div className="p-3 rounded bg-background/50">
                <p className="text-sm font-medium text-foreground mb-1">3. Preparar Demanda</p>
                <p className="text-xs text-muted-foreground">
                  Redactar escrito de demanda con fundamentos y solicitud de embargo preventivo sobre bienes del demandado.
                </p>
                <p className="text-xs text-accent mt-1">Plazo: 15 días</p>
              </div>
              <div className="p-3 rounded bg-background/50">
                <p className="text-sm font-medium text-foreground mb-1">4. Presentar antes de prescripción</p>
                <p className="text-xs text-muted-foreground">
                  La demanda debe presentarse antes del 30/01/2025 para evitar la prescripción de la acción.
                </p>
                <p className="text-xs text-destructive mt-1 font-medium">⏰ Quedan 45 días</p>
              </div>
            </div>
          </div>

          {/* Advertencia Legal */}
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground italic">
              <strong className="text-foreground">Nota:</strong> Las recomendaciones estratégicas se basan en el análisis del expediente proporcionado 
              y en precedentes judiciales similares. El resultado final dependerá de factores procesales, la valoración de pruebas 
              por el juzgador y la conducta procesal de las partes. Se recomienda validar la estrategia con un abogado litigante certificado.
            </p>
          </div>
        </div>
      ),
    },
    // Preguntas para Aclarar
    {
      icon: HelpCircle,
      title: "Preguntas para Aclarar",
      color: "muted",
      content: (
        <div className="space-y-3">
          {[
            { question: "¿El cliente realizó pagos parciales durante el período de incumplimiento?", reason: "Determina si hubo aceptación tácita del retraso" },
            { question: "¿Existe comunicación escrita donde se solicite extensión de plazos?", reason: "Puede evidenciar mala fe o dolo del contratista" },
            { question: "¿Se ha intentado una mediación previa con la contraparte?", reason: "Requisito de procedibilidad en algunos estados" },
            { question: "¿El contrato especifica el foro competente para disputas?", reason: "Define la jurisdicción aplicable al caso" },
            { question: "¿Se notificó formalmente el incumplimiento al contratista?", reason: "Necesario para constituir en mora según Art. 2104 CCF" },
            { question: "¿El cliente cuenta con seguro de construcción?", reason: "Podría cubrir parte de los daños reclamados" },
            { question: "¿Existen otros afectados por el mismo contratista?", reason: "Posibilidad de acción colectiva o evidencia de patrón" },
          ].map((item, index) => (
            <div 
              key={index} 
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer space-y-1"
            >
              <div className="flex items-start gap-2">
                <span className="text-accent font-medium text-sm">Q{index + 1}.</span>
                <p className="text-sm text-foreground">{item.question}</p>
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                <span className="text-accent/70">Relevancia:</span> {item.reason}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Análisis con IA</p>
          <h1 className="text-3xl font-serif text-foreground">
            {isAnalyzing ? "Analizando caso..." : "Tu análisis está listo"}
          </h1>
          {!isAnalyzing && (
            <p className="text-muted-foreground">
              Revisa las estrategias sugeridas y los puntos clave identificados.
            </p>
          )}
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="legal-card space-y-6 animate-pulse-subtle">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Brain className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Legal Copilot procesando...</p>
                <p className="text-sm text-muted-foreground">
                  Identificando tipología, riesgos y estrategias
                </p>
              </div>
              <span className="text-2xl font-serif text-accent">{progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-100 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Analysis Blocks */}
        {!isAnalyzing && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysisBlocks.map((block, index) => (
                <div
                  key={block.title}
                  className={cn(
                    "analysis-block animate-slide-up",
                    block.fullWidth && "lg:col-span-2"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      block.color === "accent" && "bg-accent/10",
                      block.color === "primary" && "bg-primary/10",
                      block.color === "warning" && "bg-warning/10",
                      block.color === "muted" && "bg-secondary"
                    )}>
                      <block.icon className={cn(
                        "w-5 h-5",
                        block.color === "accent" && "text-accent",
                        block.color === "primary" && "text-primary",
                        block.color === "warning" && "text-warning",
                        block.color === "muted" && "text-muted-foreground"
                      )} />
                    </div>
                    <h3 className="font-serif text-lg text-foreground">{block.title}</h3>
                  </div>
                  {block.content}
                </div>
              ))}
            </div>

            {/* Fuentes Legales con Trazabilidad */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "800ms" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FileSearch className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-foreground">Fuentes Legales con Trazabilidad</h2>
                    <p className="text-sm text-muted-foreground">Documentos verificados con acceso directo a fuentes oficiales</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <EvidenceStatusBadge status="disponible" size="sm" />
                  <span className="text-xs text-muted-foreground">4</span>
                  <EvidenceStatusBadge status="parcial" size="sm" />
                  <span className="text-xs text-muted-foreground">1</span>
                  <EvidenceStatusBadge status="no-disponible" size="sm" />
                  <span className="text-xs text-muted-foreground">1</span>
                </div>
              </div>

              {/* AI Summary Panel */}
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm text-foreground">🤖 Resumen de Trazabilidad IA</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      He identificado <strong className="text-accent">6 fuentes legales relevantes</strong> para su caso de incumplimiento contractual. 
                      El <strong>Art. 2104 CCF</strong> y la tesis <strong>1a./J. 45/2019</strong> de la SCJN son las más relevantes, con 94% y 88% de confianza respectivamente. 
                      La mayoría de los documentos están <span className="text-[hsl(var(--evidence-disponible))]">verificados y accesibles</span> desde fuentes oficiales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Source Cards Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {legalSources.map((source) => (
                  <LegalSourceCard
                    key={source.id}
                    type={source.type}
                    title={source.title}
                    code={source.code}
                    reference={source.reference}
                    status={source.status}
                    url={source.url}
                    aiReasoning={source.aiReasoning}
                    relevance={source.relevance}
                    matchedKeywords={source.matchedKeywords}
                    confidence={source.confidence}
                    excerpt={source.excerpt}
                    documentContent={source.documentContent}
                    onViewDocument={source.status === "disponible" ? () => handleViewDocument(source) : undefined}
                  />
                ))}
              </div>

              {/* Download Report Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isGeneratingPdf ? "Generando informe..." : "Descargar informe con fuentes legales (PDF)"}
                </Button>
              </div>
            </div>

            {/* Professional Legal Disclaimer */}
            <ProfessionalLegalDisclaimer />

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => navigate("/nuevo-caso")}>
                ← Editar caso
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={() => navigate("/redaccion")}>
                  Redactar documento
                </Button>
                <Button 
                  variant="accent" 
                  onClick={() => navigate("/sugerencias")}
                  className="gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  Ver sugerencias legales
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Document Viewer Modal */}
        <DocumentViewerModal
          isOpen={isDocumentModalOpen}
          onClose={() => setIsDocumentModalOpen(false)}
          title={selectedDocument?.title || ""}
          documentContent={selectedDocument?.documentContent}
          sourceUrl={selectedDocument?.url}
        />
      </div>
    </AppLayout>
  );
};

export default Analisis;
