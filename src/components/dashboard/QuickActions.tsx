import { Upload, Brain, PenTool, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Subir Nuevo Caso",
      description: "Analiza un documento legal",
      icon: Upload,
      variant: "accent" as const,
      onClick: () => navigate("/nuevo-caso"),
    },
    {
      title: "Análisis con IA",
      description: "Revisa análisis pendientes",
      icon: Brain,
      variant: "default" as const,
      onClick: () => navigate("/analisis"),
    },
    {
      title: "Redactar Documento",
      description: "Genera escritos legales",
      icon: PenTool,
      variant: "secondary" as const,
      onClick: () => navigate("/redaccion"),
    },
    {
      title: "Buscar Caso",
      description: "Encuentra casos anteriores",
      icon: Search,
      variant: "secondary" as const,
      onClick: () => navigate("/casos"),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Button
          key={action.title}
          variant={action.variant}
          className="h-auto flex-col items-start gap-2 p-5 text-left"
          onClick={action.onClick}
        >
          <action.icon className="w-5 h-5" />
          <div>
            <p className="font-medium">{action.title}</p>
            <p className="text-xs opacity-80 font-normal mt-1">{action.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}
