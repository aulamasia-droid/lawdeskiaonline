import { FileText, ExternalLink, Eye, Scale, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvidenceStatusBadge, EvidenceStatus } from "./EvidenceStatusBadge";
import { AITraceabilityPanel, RelevanceLevel } from "./AITraceabilityPanel";
import { cn } from "@/lib/utils";

interface LegalSourceCardProps {
  type: "articulo" | "jurisprudencia" | "doctrina";
  title: string;
  code?: string;
  reference: string;
  status: EvidenceStatus;
  url?: string;
  aiReasoning: string;
  relevance: RelevanceLevel;
  matchedKeywords?: string[];
  confidence?: number;
  excerpt?: string;
  onViewDocument?: () => void;
}

const typeConfig = {
  articulo: {
    icon: Scale,
    label: "Artículo Legal",
    color: "accent",
  },
  jurisprudencia: {
    icon: BookOpen,
    label: "Jurisprudencia",
    color: "primary",
  },
  doctrina: {
    icon: FileText,
    label: "Doctrina",
    color: "muted",
  },
};

export const LegalSourceCard = ({
  type,
  title,
  code,
  reference,
  status,
  url,
  aiReasoning,
  relevance,
  matchedKeywords,
  confidence,
  excerpt,
  onViewDocument,
}: LegalSourceCardProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="legal-card space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg shrink-0",
            config.color === "accent" && "bg-accent/10",
            config.color === "primary" && "bg-primary/10",
            config.color === "muted" && "bg-secondary"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              config.color === "accent" && "text-accent",
              config.color === "primary" && "text-primary",
              config.color === "muted" && "text-muted-foreground"
            )} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {config.label}
              </span>
              <EvidenceStatusBadge status={status} size="sm" />
            </div>
            <h3 className="font-serif text-lg text-foreground">{title}</h3>
            {code && (
              <p className="text-sm text-accent font-medium mt-0.5">{code}</p>
            )}
            <p className="text-sm text-muted-foreground">{reference}</p>
          </div>
        </div>
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="p-3 rounded-lg bg-secondary/50 border-l-2 border-accent">
          <p className="text-sm text-foreground italic">"{excerpt}"</p>
        </div>
      )}

      {/* AI Traceability Panel */}
      <AITraceabilityPanel
        title="¿Por qué esta fuente?"
        reasoning={aiReasoning}
        relevance={relevance}
        matchedKeywords={matchedKeywords}
        confidence={confidence}
      />

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        {status === "disponible" && onViewDocument && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onViewDocument}
          >
            <Eye className="w-4 h-4" />
            📄 Ver documento completo
          </Button>
        )}
        {url && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Fuente oficial
            </a>
          </Button>
        )}
        {status === "no-disponible" && (
          <p className="text-xs text-muted-foreground">
            No se pudo acceder al documento. Verifica en el sitio oficial.
          </p>
        )}
      </div>
    </div>
  );
};
