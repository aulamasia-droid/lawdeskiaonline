import { useState, useEffect } from "react";
import { Scale, Brain, AlertTriangle, HelpCircle, ArrowRight, Lightbulb, FileText, Clock, TrendingUp, Gavel, DollarSign, Users } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
const Analisis = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

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
    // Resumen Ejecutivo - NUEVO
    {
      icon: FileText,
      title: "Resumen Ejecutivo del Caso",
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
    // Tipología Legal
    {
      icon: Scale,
      title: "Tipología Legal Detectada",
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
    // Cronología - NUEVO
    {
      icon: Clock,
      title: "Cronología de Hechos",
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
    // Ideas Clave
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
    // Partes Involucradas - NUEVO
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
    // Riesgos Potenciales
    {
      icon: AlertTriangle,
      title: "Riesgos Potenciales",
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
    // Cálculo de Daños - NUEVO
    {
      icon: DollarSign,
      title: "Desglose de Reclamación",
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
      </div>
    </AppLayout>
  );
};

export default Analisis;
