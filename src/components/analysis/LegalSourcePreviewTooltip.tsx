import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { EvidenceStatusBadge, EvidenceStatus } from "./EvidenceStatusBadge";
import { ExternalLink, BookOpen, Scale, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalSourcePreviewTooltipProps {
  children: ReactNode;
  type: "articulo" | "jurisprudencia" | "doctrina";
  title: string;
  code?: string;
  excerpt?: string;
  fullContent?: string;
  confidence?: number;
  status: EvidenceStatus;
  url?: string;
  onExpandClick?: () => void;
  side?: "left" | "right" | "top" | "bottom";
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

export const LegalSourcePreviewTooltip = ({
  children,
  type,
  title,
  code,
  excerpt,
  fullContent,
  confidence,
  status,
  url,
  onExpandClick,
  side = "left",
}: LegalSourcePreviewTooltipProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-[380px] p-4 bg-[#f1f5f9] border border-[#cbd5e1] shadow-lg"
        side={side}
        align="start"
        sideOffset={8}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded-md",
                config.color === "accent" && "bg-accent/10",
                config.color === "primary" && "bg-primary/10",
                config.color === "muted" && "bg-secondary"
              )}>
                <Icon className={cn(
                  "w-4 h-4",
                  config.color === "accent" && "text-accent",
                  config.color === "primary" && "text-primary",
                  config.color === "muted" && "text-muted-foreground"
                )} />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {config.label}
              </span>
            </div>
            <EvidenceStatusBadge status={status} size="sm" />
          </div>

          {/* Title */}
          <div>
            <h4 className="font-serif text-sm font-medium text-foreground leading-tight">
              {title}
            </h4>
            {code && (
              <p className="text-xs text-accent font-medium mt-0.5">{code}</p>
            )}
          </div>

          {/* Excerpt/Content */}
          {(excerpt || fullContent) && (
            <div className="p-2 rounded-md bg-white/80 border-l-2 border-accent">
              <p className="text-xs text-foreground font-mono leading-relaxed line-clamp-4">
                {excerpt || fullContent?.substring(0, 200)}...
              </p>
            </div>
          )}

          {/* Confidence */}
          {confidence && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Confianza:</span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all",
                    confidence >= 80 ? "bg-[hsl(var(--evidence-disponible))]" :
                    confidence >= 60 ? "bg-[hsl(var(--evidence-parcial))]" :
                    "bg-muted-foreground"
                  )}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">{confidence}%</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            {(fullContent || status === "disponible") && onExpandClick && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-7 gap-1"
                onClick={onExpandClick}
              >
                📖 Ver texto completo
              </Button>
            )}
            {url && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-xs h-7 gap-1"
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                  Fuente oficial
                </a>
              </Button>
            )}
          </div>

          {status === "no-disponible" && !fullContent && (
            <p className="text-[10px] text-muted-foreground text-center">
              Consulta el enlace oficial para leer el contenido completo.
            </p>
          )}

          {/* Tooltip hint */}
          <p className="text-[10px] text-muted-foreground text-center pt-1">
            📖 Haz clic para leer el texto completo de esta fuente legal sin salir.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
