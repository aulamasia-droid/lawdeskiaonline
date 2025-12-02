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
        <div className="space-y-3">
          <div className="legal-badge bg-accent/10 text-accent">
            Derecho Civil
          </div>
          <p className="text-sm text-foreground">
            <strong>Subtipo:</strong> Incumplimiento de Contrato de Obra
          </p>
          <p className="text-sm text-muted-foreground">
            El caso presenta elementos típicos de una disputa contractual en el ámbito de la construcción, 
            con posibles implicaciones en daños y perjuicios.
          </p>
        </div>
      ),
    },
    {
      icon: Brain,
      title: "Ideas Clave del Caso",
      color: "primary",
      content: (
        <ul className="space-y-2">
          {[
            "Contrato firmado el 15/03/2024 con cláusula de penalidad",
            "Incumplimiento de plazos documentado (3 meses de retraso)",
            "Daños materiales estimados en $45,000 MXN",
            "Existe documentación fotográfica del estado de la obra",
            "El demandado ha reconocido parcialmente la demora",
          ].map((idea, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-foreground">{idea}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: AlertTriangle,
      title: "Riesgos Potenciales",
      color: "warning",
      content: (
        <div className="space-y-3">
          {[
            {
              level: "Alto",
              text: "Prescripción próxima - Quedan 45 días para presentar demanda",
              className: "text-destructive",
            },
            {
              level: "Medio",
              text: "Cláusula de arbitraje podría limitar opciones judiciales",
              className: "text-warning",
            },
            {
              level: "Bajo",
              text: "Posible reconvención por supuestos cambios en especificaciones",
              className: "text-muted-foreground",
            },
          ].map((risk, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className={cn("text-xs font-medium", risk.className)}>
                [{risk.level}]
              </span>
              <p className="text-sm text-foreground">{risk.text}</p>
            </div>
          ))}
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
            "¿El cliente realizó pagos parciales durante el período de incumplimiento?",
            "¿Existe comunicación escrita donde se solicite extensión de plazos?",
            "¿Se ha intentado una mediación previa con la contraparte?",
            "¿El contrato especifica el foro competente para disputas?",
          ].map((question, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="text-accent font-medium">Q{index + 1}.</span>
              <p className="text-sm text-foreground">{question}</p>
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
