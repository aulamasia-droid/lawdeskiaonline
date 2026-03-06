import arqentaLogo from "@/assets/arqenta-logo.png";

const fuentesAplicables = [
  "Código Civil Federal y códigos locales",
  "Ley Federal del Trabajo",
  "Código Nacional de Procedimientos Penales",
  "Criterios y jurisprudencia de la SCJN",
  "Tesis aisladas relevantes",
  "Disposiciones fiscales (SAT)",
  "Lineamientos de órganos como INAI y CONAMER",
];

export function SelloLegalDocumento() {
  return (
    <div className="border-t border-border mt-8 pt-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          <img src={arqentaLogo} alt="ARQENTA" className="h-12 w-auto" />
          <div>
            <h4 className="font-semibold text-foreground text-sm">ARQENTA</h4>
            <p className="text-xs text-muted-foreground">
              Arquitectura Digital e IA Aplicada
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-medium text-foreground flex items-center gap-2">
              🔖 Sello Legal de Validez
            </h5>
            <p className="text-xs text-muted-foreground mt-1">
              Este documento fue generado por un asistente automatizado especializado en derecho mexicano. 
              Su contenido está basado en leyes, reglamentos, jurisprudencia y criterios vigentes en México 
              al momento de su creación.
            </p>
          </div>

          <div className="bg-warning/10 border border-warning/30 rounded p-3">
            <p className="text-xs text-warning-foreground">
              <strong>Advertencia:</strong> Este documento no sustituye el juicio profesional de un abogado. 
              Siempre valida con fuentes oficiales o consulta con un especialista.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Fuentes aplicables:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {fuentesAplicables.map((fuente, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  {fuente}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
