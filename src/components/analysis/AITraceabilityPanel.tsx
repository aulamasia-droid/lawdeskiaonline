import { Bot, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type RelevanceLevel = "alta" | "media" | "baja";

interface AITraceabilityPanelProps {
  title: string;
  reasoning: string;
  relevance: RelevanceLevel;
  matchedKeywords?: string[];
  confidence?: number;
}

const relevanceConfig = {
  alta: {
    label: "Relevancia Alta",
    className: "bg-accent/10 text-accent border-accent/30",
    icon: CheckCircle2,
  },
  media: {
    label: "Relevancia Media",
    className: "bg-warning/10 text-warning border-warning/30",
    icon: AlertCircle,
  },
  baja: {
    label: "Relevancia Baja",
    className: "bg-muted text-muted-foreground border-border",
    icon: AlertCircle,
  },
};

export const AITraceabilityPanel = ({
  title,
  reasoning,
  relevance,
  matchedKeywords = [],
  confidence,
}: AITraceabilityPanelProps) => {
  const config = relevanceConfig[relevance];
  const Icon = config.icon;

  return (
    <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Bot className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">Panel IA de Trazabilidad</span>
            <Sparkles className="w-3 h-3 text-accent" />
          </div>
          <h4 className="font-medium text-sm text-foreground">{title}</h4>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border",
          config.className
        )}>
          <Icon className="w-3 h-3" />
          {config.label}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {reasoning}
      </p>

      {matchedKeywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-muted-foreground">Términos coincidentes:</span>
          {matchedKeywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-0.5 rounded bg-accent/10 text-accent text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {confidence !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Confianza:</span>
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-xs font-medium text-accent">{confidence}%</span>
        </div>
      )}
    </div>
  );
};
