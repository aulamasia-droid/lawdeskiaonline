import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, BookOpen, ArrowRight, Check } from "lucide-react";
import automatixLogo from "@/assets/automatix-logo.png";

const especialidades = [
  { emoji: "🔥", nombre: "Derecho Civil", descripcion: "Contratos, arrendamientos, daños, responsabilidad civil." },
  { emoji: "❤️", nombre: "Derecho Familiar", descripcion: "Divorcios, patria potestad, pensiones y custodia." },
  { emoji: "🔒", nombre: "Derecho Penal", descripcion: "Delitos patrimoniales, amparos penales, defensa penal." },
  { emoji: "🧑‍🌾", nombre: "Derecho Agrario", descripcion: "Regularización, sucesiones, asambleas ejidales." },
  { emoji: "💼", nombre: "Derecho Mercantil", descripcion: "Cobranza, contratos, controversias mercantiles." },
  { emoji: "🏢", nombre: "Derecho Laboral", descripcion: "Despidos, finiquitos, auditorías laborales." },
  { emoji: "🌎", nombre: "Derecho Administrativo", descripcion: "Multas, licencias, trámites gubernamentales." },
  { emoji: "🏛️", nombre: "Constitucional / Amparo", descripcion: "Amparos directos e indirectos, derechos humanos." },
  { emoji: "🧾", nombre: "Derecho Fiscal", descripcion: "SAT, créditos fiscales, defensa fiscal." },
  { emoji: "🏘️", nombre: "Derecho Inmobiliario", descripcion: "Contratos, preventas, regularización de inmuebles." },
];

const fuentesLegales = [
  "Código Civil Federal y locales",
  "Códigos de Procedimientos",
  "Ley Federal del Trabajo",
  "Leyes penales, administrativas, fiscales",
  "Jurisprudencia de la SCJN",
  "Tesis aisladas",
  "Criterios del SAT, INAI, CONAMER",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  const validateWhatsapp = (value: string) => {
    const regex = /^\+52\s?\d{2}\s?\d{4}\s?\d{4}$/;
    if (!value.trim()) {
      return "Por favor ingresa tu número de WhatsApp";
    }
    if (!regex.test(value)) {
      return "Por favor ingresa un número válido con el formato: +52 55 1234 5678";
    }
    return "";
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!selectedEspecialidad) {
        toast({
          title: "Selecciona una especialidad",
          description: "Por favor elige tu rama del Derecho para continuar.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const error = validateWhatsapp(whatsapp);
      if (error) {
        setWhatsappError(error);
        return;
      }
      setStep(3);
    } else {
      // Save to localStorage
      localStorage.setItem("lawdesk_onboarding", JSON.stringify({
        especialidad: selectedEspecialidad,
        whatsapp: whatsapp,
        completedAt: new Date().toISOString(),
      }));
      toast({
        title: "¡Bienvenido a LawDesk AI!",
        description: "Tu perfil ha sido configurado correctamente.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={automatixLogo} alt="Automatix" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-foreground">LawDesk AI</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-2 w-8 rounded-full transition-all duration-300",
                  s < step ? "bg-success" : s === step ? "bg-accent" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Especialidad */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  ⚖️ Elige tu Especialidad Legal
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Selecciona la rama del Derecho con la que trabajas. Esto nos permitirá adaptar los escritos, análisis y estrategias a tus necesidades.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {especialidades.map((esp) => (
                  <button
                    key={esp.nombre}
                    onClick={() => setSelectedEspecialidad(esp.nombre)}
                    className={cn(
                      "legal-card text-left transition-all duration-250 cursor-pointer",
                      "hover:border-accent hover:shadow-elevated",
                      selectedEspecialidad === esp.nombre && "border-accent ring-2 ring-accent/30 bg-accent/5"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{esp.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{esp.nombre}</h3>
                          {selectedEspecialidad === esp.nombre && (
                            <Check className="h-4 w-4 text-accent" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{esp.descripcion}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* AI Helper Lexi */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8 flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Lexi - Tu asistente</p>
                  <p className="text-sm text-muted-foreground">
                    ¿No sabes qué especialidad elegir? Puedo guiarte según el tipo de casos que manejas con más frecuencia.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: WhatsApp */}
          {step === 2 && (
            <div className="animate-fade-in max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  📱 Ingresa tu WhatsApp de contacto
                </h1>
                <p className="text-muted-foreground">
                  Captura tu número de WhatsApp (México) para asociarlo como posible cliente interesado.
                </p>
              </div>

              <div className="legal-card mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Número de WhatsApp
                </label>
                <Input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  value={whatsapp}
                  onChange={(e) => {
                    setWhatsapp(e.target.value);
                    setWhatsappError("");
                  }}
                  className={cn(
                    "legal-input",
                    whatsappError && "border-destructive focus:ring-destructive"
                  )}
                />
                {whatsappError && (
                  <p className="text-sm text-destructive mt-2">{whatsappError}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Formato: +52 55 1234 5678
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Legal Note */}
          {step === 3 && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  📚 Importante
                </h1>
              </div>

              <Alert className="mb-8 border-warning/50 bg-warning/10">
                <BookOpen className="h-5 w-5 text-warning" />
                <AlertTitle className="text-foreground">Aviso Legal</AlertTitle>
                <AlertDescription className="text-muted-foreground mt-2">
                  Todas las respuestas, documentos, estrategias y sugerencias generadas por este asistente deben basarse exclusivamente en leyes, reglamentos, normas y criterios jurídicos vigentes en México, incluyendo jurisprudencia, acuerdos y disposiciones actualizadas aplicables al caso o especialidad seleccionada.
                </AlertDescription>
              </Alert>

              <div className="legal-card mb-8">
                <h3 className="font-semibold text-foreground mb-4">Fuentes Legales Aplicables:</h3>
                <ul className="space-y-2">
                  {fuentesLegales.map((fuente, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success flex-shrink-0" />
                      {fuente}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="legal-card bg-muted/30">
                <h3 className="font-semibold text-foreground mb-4">Resumen de tu configuración:</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Especialidad:</span>
                    <span className="font-medium text-foreground">{selectedEspecialidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">WhatsApp:</span>
                    <span className="font-medium text-foreground">{whatsapp}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
            >
              Atrás
            </Button>
          )}
          {step === 1 && <div />}
          <Button onClick={handleContinue} className="gap-2">
            {step === 3 ? "Continuar a la plataforma" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
