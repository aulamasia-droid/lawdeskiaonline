import { useState } from "react";
import { CheckCircle, BookOpen, Scale, Check, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Strategy {
  id: string;
  title: string;
  description: string;
  successRate: number;
  selected: boolean;
}

interface Article {
  code: string;
  number: string;
  title: string;
  relevance: "alta" | "media" | "baja";
}

interface Jurisprudence {
  id: string;
  title: string;
  court: string;
  year: number;
  outcome: "favorable" | "desfavorable" | "parcial";
}

const Sugerencias = () => {
  const navigate = useNavigate();
  
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: "1",
      title: "Demanda por incumplimiento contractual",
      description: "Acción directa basada en las cláusulas violadas del contrato, solicitando cumplimiento forzoso y daños.",
      successRate: 78,
      selected: false,
    },
    {
      id: "2",
      title: "Resolución del contrato + indemnización",
      description: "Solicitar la terminación del contrato por incumplimiento grave, más compensación por daños y perjuicios.",
      successRate: 85,
      selected: false,
    },
    {
      id: "3",
      title: "Medida cautelar de retención de pagos",
      description: "Asegurar fondos pendientes mientras se resuelve el litigio principal.",
      successRate: 62,
      selected: false,
    },
  ]);

  const articles: Article[] = [
    { code: "Código Civil", number: "1489", title: "Condición resolutoria tácita", relevance: "alta" },
    { code: "Código Civil", number: "1556", title: "Indemnización de perjuicios", relevance: "alta" },
    { code: "Código Civil", number: "1558", title: "Lucro cesante", relevance: "media" },
    { code: "Código de Procedimiento Civil", number: "254", title: "Medidas precautorias", relevance: "media" },
  ];

  const jurisprudence: Jurisprudence[] = [
    {
      id: "1",
      title: "Constructora Norte vs. Inmobiliaria Sur",
      court: "Corte Suprema",
      year: 2023,
      outcome: "favorable",
    },
    {
      id: "2",
      title: "Proyectos ABC vs. Cliente XYZ",
      court: "Corte de Apelaciones",
      year: 2022,
      outcome: "favorable",
    },
    {
      id: "3",
      title: "Edificadora Delta vs. Consorcio Alfa",
      court: "Tribunal Arbitral",
      year: 2023,
      outcome: "parcial",
    },
  ];

  const toggleStrategy = (id: string) => {
    setStrategies(prev => prev.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ));
  };

  const saveSelections = () => {
    const selected = strategies.filter(s => s.selected);
    if (selected.length === 0) {
      toast({
        title: "Sin selección",
        description: "Selecciona al menos una estrategia para continuar.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Estrategias guardadas",
      description: `${selected.length} estrategia(s) seleccionada(s) para el caso.`,
    });
    navigate("/redaccion");
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Sugerencias legales</p>
          <h1 className="text-3xl font-serif text-foreground">
            ¿Quieres mejorar este argumento?
          </h1>
          <p className="text-muted-foreground">
            Aquí hay 3 ideas legales basadas en el análisis de tu caso.
          </p>
        </div>

        {/* Strategies */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-foreground flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Estrategias Sugeridas
          </h2>
          <div className="grid gap-4">
            {strategies.map((strategy, index) => (
              <div
                key={strategy.id}
                onClick={() => toggleStrategy(strategy.id)}
                className={cn(
                  "legal-card cursor-pointer border-2 transition-all duration-250",
                  strategy.selected 
                    ? "border-success bg-success/5" 
                    : "border-transparent hover:border-accent/30"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                    strategy.selected 
                      ? "border-success bg-success text-success-foreground" 
                      : "border-border"
                  )}>
                    {strategy.selected && <Check className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{strategy.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {strategy.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ width: `${strategy.successRate}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {strategy.successRate}% éxito
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Relevant Articles */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Artículos Relevantes del Código
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <div key={`${article.code}-${article.number}`} className="analysis-block">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{article.code}</p>
                    <p className="font-medium text-foreground">
                      Art. {article.number} - {article.title}
                    </p>
                  </div>
                  <span className={cn(
                    "legal-badge",
                    article.relevance === "alta" && "bg-success/10 text-success",
                    article.relevance === "media" && "bg-warning/10 text-warning",
                    article.relevance === "baja" && "bg-secondary text-muted-foreground"
                  )}>
                    {article.relevance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jurisprudence */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-foreground flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            Jurisprudencia Referencial
          </h2>
          <div className="space-y-3">
            {jurisprudence.map((case_) => (
              <div key={case_.id} className="analysis-block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{case_.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {case_.court} · {case_.year}
                    </p>
                  </div>
                  <span className={cn(
                    "legal-badge",
                    case_.outcome === "favorable" && "bg-success/10 text-success",
                    case_.outcome === "parcial" && "bg-warning/10 text-warning",
                    case_.outcome === "desfavorable" && "bg-destructive/10 text-destructive"
                  )}>
                    {case_.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => navigate("/analisis")}>
            ← Volver al análisis
          </Button>
          <Button 
            variant="accent" 
            onClick={saveSelections}
            className="gap-2"
          >
            Usar estrategias seleccionadas
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Sugerencias;
