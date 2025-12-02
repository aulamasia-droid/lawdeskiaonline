import { User, Bell, Shield, Palette, Globe } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    title: "Perfil",
    icon: User,
    description: "Información personal y preferencias de cuenta",
    items: [
      { label: "Nombre completo", value: "Dr. Roberto Mendoza" },
      { label: "Email", value: "r.mendoza@lawfirm.com" },
      { label: "Número de colegiatura", value: "CAL-12345" },
    ],
  },
  {
    title: "Notificaciones",
    icon: Bell,
    description: "Configura alertas y recordatorios",
    items: [
      { label: "Análisis completados", value: "Activado", toggle: true },
      { label: "Vencimiento de plazos", value: "Activado", toggle: true },
      { label: "Nuevas jurisprudencias", value: "Desactivado", toggle: true },
    ],
  },
  {
    title: "Seguridad",
    icon: Shield,
    description: "Contraseña y autenticación",
    items: [
      { label: "Cambiar contraseña", value: "••••••••", action: true },
      { label: "Autenticación de dos factores", value: "Desactivado", toggle: true },
    ],
  },
  {
    title: "Apariencia",
    icon: Palette,
    description: "Personaliza la interfaz",
    items: [
      { label: "Tema", value: "Claro" },
      { label: "Densidad de información", value: "Normal" },
    ],
  },
  {
    title: "Idioma y Región",
    icon: Globe,
    description: "Preferencias regionales",
    items: [
      { label: "Idioma", value: "Español (Latinoamérica)" },
      { label: "Zona horaria", value: "América/Santiago (GMT-3)" },
      { label: "Formato de fecha", value: "DD/MM/YYYY" },
    ],
  },
];

const Configuracion = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Ajustes</p>
          <h1 className="text-3xl font-serif text-foreground">
            Configuración
          </h1>
          <p className="text-muted-foreground">
            Personaliza tu experiencia en LawDesk AI.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <div 
              key={section.title}
              className="legal-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-secondary">
                  <section.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-lg text-foreground">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div 
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-foreground">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                      {item.toggle && (
                        <button 
                          className={cn(
                            "w-10 h-6 rounded-full transition-colors relative",
                            item.value === "Activado" ? "bg-accent" : "bg-secondary"
                          )}
                        >
                          <span 
                            className={cn(
                              "absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-transform",
                              item.value === "Activado" ? "right-1" : "left-1"
                            )}
                          />
                        </button>
                      )}
                      {item.action && (
                        <Button variant="secondary" size="sm">Cambiar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button variant="accent">
            Guardar cambios
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Configuracion;
