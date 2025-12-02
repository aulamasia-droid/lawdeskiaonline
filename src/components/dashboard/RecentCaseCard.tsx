import { FileText, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RecentCaseCardProps {
  title: string;
  type: string;
  status: "analyzing" | "completed" | "pending" | "review";
  date: string;
  onClick?: () => void;
}

const statusConfig = {
  analyzing: {
    label: "Analizando",
    className: "bg-accent/10 text-accent",
  },
  completed: {
    label: "Completado",
    className: "bg-success/10 text-success",
  },
  pending: {
    label: "Pendiente",
    className: "bg-warning/10 text-warning",
  },
  review: {
    label: "En revisión",
    className: "bg-primary/10 text-primary",
  },
};

export function RecentCaseCard({ title, type, status, date, onClick }: RecentCaseCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div 
      className="legal-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-secondary">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{type}</p>
          
          <div className="flex items-center gap-3 mt-3">
            <span className={cn("legal-badge", statusInfo.className)}>
              {statusInfo.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {date}
            </span>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
