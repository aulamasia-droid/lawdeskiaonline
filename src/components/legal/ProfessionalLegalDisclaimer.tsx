import { Shield, BookOpen } from "lucide-react";

interface ProfessionalLegalDisclaimerProps {
  showSourcesMessage?: boolean;
}

export const ProfessionalLegalDisclaimer = ({ 
  showSourcesMessage = true 
}: ProfessionalLegalDisclaimerProps) => {
  return (
    <div className="space-y-4 mt-8">
      {/* User context message */}
      {showSourcesMessage && (
        <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">📚 Respaldo normativo:</span>{" "}
            Todos los análisis y documentos están respaldados por normativa mexicana vigente. 
            Puedes consultar la trazabilidad legal en cada fuente citada.
          </p>
        </div>
      )}

      {/* Professional legal disclaimer */}
      <div className="p-5 bg-primary/5 border border-primary/20 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-semibold text-foreground">
              🛡️ Nota Legal Profesional
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Todo argumento, documento o sugerencia generada por esta plataforma se basa 
              exclusivamente en legislación, reglamentos, criterios jurisprudenciales y 
              disposiciones vigentes en México. La información aquí contenida es trazable 
              y verificable conforme al marco jurídico aplicable. No se emiten opiniones 
              personales, conjeturas ni interpretaciones ajenas a derecho.
            </p>
            <div className="pt-2 border-t border-primary/10">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Fuentes autorizadas:</span> Código Civil Federal, 
                Ley Federal del Trabajo, Código Fiscal de la Federación, CNPP, 
                Jurisprudencia SCJN, Tesis de Tribunales Colegiados, SAT, INAI, DOF.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
