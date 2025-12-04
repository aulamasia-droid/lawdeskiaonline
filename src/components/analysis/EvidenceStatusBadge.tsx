import { cn } from "@/lib/utils";

export type EvidenceStatus = "disponible" | "parcial" | "no-disponible";

interface EvidenceStatusBadgeProps {
  status: EvidenceStatus;
  showLabel?: boolean;
  size?: "sm" | "md";
}

const statusConfig = {
  disponible: {
    icon: "🟢",
    label: "Documento verificado",
    className: "bg-[hsl(var(--evidence-disponible))]/10 text-[hsl(var(--evidence-disponible))]",
  },
  parcial: {
    icon: "🟡",
    label: "Acceso parcial",
    className: "bg-[hsl(var(--evidence-parcial))]/10 text-[hsl(var(--evidence-parcial))]",
  },
  "no-disponible": {
    icon: "🔴",
    label: "No disponible",
    className: "bg-[hsl(var(--evidence-no-disponible))]/10 text-[hsl(var(--evidence-no-disponible))]",
  },
};

export const EvidenceStatusBadge = ({ 
  status, 
  showLabel = true,
  size = "md" 
}: EvidenceStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium",
      size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
      config.className
    )}>
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
