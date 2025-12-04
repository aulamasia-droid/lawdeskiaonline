import { useState, useEffect } from "react";
import { Scale, Brain, AlertTriangle, HelpCircle, ArrowRight, Lightbulb } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground">
              <strong>Subtipo:</strong> Incumplimiento de Contrato de Obra
            </p>
            <p className="text-sm text-foreground">
              <strong>Materia específica:</strong> Obligaciones contractuales y responsabilidad civil
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
            </ul>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Alta compatibilidad con precedentes favorables</span>
          </div>
        </div>
      ),
    },
    {
      icon: Brain,
      title: "Ideas Clave del Caso",
      color: "primary",
      content: (
        <div className="space-y-4">
          <ul className="space-y-2">
            {[
              { text: "Contrato firmado el 15/03/2024 con cláusula de penalidad por retraso", importance: "alta" },
              { text: "Incumplimiento de plazos documentado (3 meses de retraso)", importance: "alta" },
              { text: "Daños materiales estimados en $45,000 MXN", importance: "alta" },
              { text: "Existe documentación fotográfica del estado de la obra", importance: "media" },
              { text: "El demandado ha reconocido parcialmente la demora por escrito", importance: "alta" },
              { text: "Pagos realizados: 60% del monto total convenido", importance: "media" },
              { text: "No existe cláusula de fuerza mayor invocable", importance: "media" },
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
              base sólida para reclamar daños y perjuicios conforme al Art. 2104 del CCF.
            </p>
          </div>
        </div>
      ),
    },
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
              className: "text-destructive",
              bgClass: "bg-destructive/10",
            },
            {
              level: "Medio",
              text: "Cláusula de arbitraje",
              detail: "El contrato incluye cláusula compromisoria que podría limitar la vía judicial. Revisar si cumple requisitos del Art. 1416 del Código de Comercio",
              className: "text-warning",
              bgClass: "bg-warning/10",
            },
            {
              level: "Bajo",
              text: "Posible reconvención",
              detail: "El demandado podría alegar cambios en especificaciones no documentados. Recopilar todas las comunicaciones previas",
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
              <p className="text-xs text-muted-foreground">{risk.detail}</p>
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
    {
      icon: HelpCircle,
      title: "Preguntas para Aclarar",
      color: "muted",
      content: (
        <div className="space-y-3">
          {[
            { question: "¿El cliente realizó pagos parciales durante el período de incumplimiento?", reason: "Determina si hubo aceptación tácita del retraso" },
            { question: "¿Existe comunicación escrita donde se solicite extensión de plazos?", reason: "Puede evidenciar mala fe o dolo" },
            { question: "¿Se ha intentado una mediación previa con la contraparte?", reason: "Requisito de procedibilidad en algunos estados" },
            { question: "¿El contrato especifica el foro competente para disputas?", reason: "Define la jurisdicción aplicable" },
            { question: "¿Se notificó formalmente el incumplimiento al contratista?", reason: "Necesario para constituir en mora según Art. 2104 CCF" },
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
                  className="analysis-block animate-slide-up"
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
