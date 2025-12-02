import { useState } from "react";
import { Search, Filter, Plus, FileText, Clock, MoreVertical } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Case {
  id: string;
  title: string;
  type: string;
  client: string;
  status: "analyzing" | "completed" | "pending" | "review";
  date: string;
  lastUpdate: string;
}

const allCases: Case[] = [
  {
    id: "1",
    title: "García vs. Constructora ABC",
    type: "Derecho Civil - Incumplimiento de Contrato",
    client: "Juan García",
    status: "analyzing",
    date: "2024-01-15",
    lastUpdate: "Hace 2 horas",
  },
  {
    id: "2",
    title: "Sucesión Martínez",
    type: "Derecho de Familia - Herencias",
    client: "Familia Martínez",
    status: "completed",
    date: "2024-01-10",
    lastUpdate: "Ayer",
  },
  {
    id: "3",
    title: "Demanda Laboral - Tech Corp",
    type: "Derecho Laboral - Despido Injustificado",
    client: "María López",
    status: "review",
    date: "2024-01-08",
    lastUpdate: "Hace 3 días",
  },
  {
    id: "4",
    title: "Recurso de Amparo Medina",
    type: "Derecho Constitucional",
    client: "Carlos Medina",
    status: "pending",
    date: "2024-01-05",
    lastUpdate: "Hace 5 días",
  },
  {
    id: "5",
    title: "Divorcio Consensual Pérez",
    type: "Derecho de Familia - Divorcio",
    client: "Ana y Pedro Pérez",
    status: "completed",
    date: "2024-01-03",
    lastUpdate: "Hace 1 semana",
  },
  {
    id: "6",
    title: "Reclamación Seguros Norte",
    type: "Derecho Comercial - Seguros",
    client: "Empresa Norte S.A.",
    status: "analyzing",
    date: "2024-01-01",
    lastUpdate: "Hace 2 semanas",
  },
];

const statusConfig = {
  analyzing: { label: "Analizando", className: "bg-accent/10 text-accent" },
  completed: { label: "Completado", className: "bg-success/10 text-success" },
  pending: { label: "Pendiente", className: "bg-warning/10 text-warning" },
  review: { label: "En revisión", className: "bg-primary/10 text-primary" },
};

const Casos = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCases = allCases.filter((case_) => {
    const matchesSearch = 
      case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Gestión de casos</p>
            <h1 className="text-3xl font-serif text-foreground">
              Mis Casos
            </h1>
            <p className="text-muted-foreground">
              {allCases.length} casos en total · {allCases.filter(c => c.status === "analyzing").length} en análisis
            </p>
          </div>
          <Button variant="accent" onClick={() => navigate("/nuevo-caso")} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo caso
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por título, cliente o tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="legal-input pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="legal-input w-auto"
            >
              <option value="all">Todos los estados</option>
              <option value="analyzing">Analizando</option>
              <option value="completed">Completado</option>
              <option value="pending">Pendiente</option>
              <option value="review">En revisión</option>
            </select>
          </div>
        </div>

        {/* Cases Table */}
        <div className="legal-card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Caso</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Última actualización</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCases.map((case_, index) => (
                <tr 
                  key={case_.id}
                  className="hover:bg-secondary/30 transition-colors cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => navigate("/analisis")}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary">
                        <FileText className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{case_.title}</p>
                        <p className="text-xs text-muted-foreground">{case_.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{case_.client}</td>
                  <td className="p-4">
                    <span className={cn("legal-badge", statusConfig[case_.status].className)}>
                      {statusConfig[case_.status].label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {case_.lastUpdate}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron casos con los filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Casos;
