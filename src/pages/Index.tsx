import { FolderOpen, Brain, CheckCircle, Clock } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentCaseCard } from "@/components/dashboard/RecentCaseCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useNavigate } from "react-router-dom";

const recentCases = [
  {
    id: 1,
    title: "García vs. Constructora ABC",
    type: "Derecho Civil - Incumplimiento de Contrato",
    status: "analyzing" as const,
    date: "Hace 2 horas",
  },
  {
    id: 2,
    title: "Sucesión Martínez",
    type: "Derecho de Familia - Herencias",
    status: "completed" as const,
    date: "Ayer",
  },
  {
    id: 3,
    title: "Demanda Laboral - Tech Corp",
    type: "Derecho Laboral - Despido Injustificado",
    status: "review" as const,
    date: "Hace 3 días",
  },
  {
    id: 4,
    title: "Recurso de Amparo Medina",
    type: "Derecho Constitucional",
    status: "pending" as const,
    date: "Hace 5 días",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Bienvenido de vuelta</p>
          <h1 className="text-3xl font-serif text-foreground">
            Tu escritorio legal está listo
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Gestiona tus casos, analiza documentos y obtén sugerencias legales inteligentes.
          </p>
        </div>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-foreground">Acciones Rápidas</h2>
          <QuickActions />
        </section>

        {/* Stats Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-foreground">Resumen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Casos Activos"
              value={12}
              subtitle="3 requieren atención"
              icon={FolderOpen}
              trend={{ value: 8, positive: true }}
            />
            <StatsCard
              title="Análisis Completados"
              value={28}
              subtitle="Este mes"
              icon={Brain}
              trend={{ value: 15, positive: true }}
            />
            <StatsCard
              title="Estrategias Aplicadas"
              value={45}
              icon={CheckCircle}
            />
            <StatsCard
              title="Tiempo Promedio"
              value="4.2h"
              subtitle="Por análisis"
              icon={Clock}
              trend={{ value: 12, positive: true }}
            />
          </div>
        </section>

        {/* Recent Cases */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif text-foreground">Casos Recientes</h2>
            <button 
              onClick={() => navigate("/casos")}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentCases.map((caseItem, index) => (
              <div 
                key={caseItem.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RecentCaseCard
                  title={caseItem.title}
                  type={caseItem.type}
                  status={caseItem.status}
                  date={caseItem.date}
                  onClick={() => navigate("/analisis")}
                />
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant Hint */}
        <section className="legal-card bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg text-foreground">
                Legal Copilot activo
              </h3>
              <p className="text-muted-foreground text-sm">
                Tu asistente jurídico está listo para ayudarte. Sube un caso para comenzar el análisis 
                o consulta las sugerencias basadas en tus casos recientes.
              </p>
              <p className="text-xs text-accent italic">
                "Según el contenido de tu último caso, podrías considerar revisar el artículo 42..."
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
