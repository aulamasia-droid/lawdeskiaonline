import { useState } from "react";
import { Mail, FileText, ClipboardList, Copy, Download, Edit, Check } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type DocumentType = "email" | "recurso" | "informe";

const documentTemplates = {
  email: {
    title: "Email Formal",
    icon: Mail,
    content: `Estimado/a [Nombre del destinatario],

Me dirijo a usted en relación con el asunto [Referencia del caso], en representación de mi cliente [Nombre del cliente].

Tras el análisis detallado de la situación, consideramos pertinente informarle que:

1. El contrato de fecha [fecha] establece claramente las obligaciones de ambas partes.
2. Se ha documentado un incumplimiento de [descripción del incumplimiento].
3. Los daños estimados ascienden a [monto].

Solicitamos amablemente una reunión para discutir una posible solución antes de proceder con acciones legales formales.

Quedamos a su disposición para cualquier consulta.

Atentamente,
[Su nombre]
Abogado`,
  },
  recurso: {
    title: "Recurso Legal",
    icon: FileText,
    content: `EN LO PRINCIPAL: Demanda de indemnización de perjuicios por incumplimiento contractual.
PRIMER OTROSÍ: Acompaña documentos.
SEGUNDO OTROSÍ: Patrocinio y poder.

SEÑOR JUEZ DE LETRAS EN LO CIVIL

[Nombre del demandante], [profesión u oficio], [domicilio], a S.S. respetuosamente digo:

Que vengo en interponer demanda de indemnización de perjuicios por incumplimiento contractual en contra de [nombre del demandado], [domicilio conocido], en base a los siguientes:

I. HECHOS

Con fecha [fecha], las partes suscribieron un contrato de [tipo de contrato], cuyo objeto era [descripción].

El demandado ha incurrido en incumplimiento grave de sus obligaciones contractuales, específicamente:
- [Incumplimiento 1]
- [Incumplimiento 2]

II. DERECHO

Fundo la presente demanda en los artículos 1489 y 1556 del Código Civil, que establecen...

POR TANTO,
RUEGO A SS.: Tener por interpuesta demanda de indemnización de perjuicios...`,
  },
  informe: {
    title: "Informe Jurídico",
    icon: ClipboardList,
    content: `INFORME JURÍDICO
CONFIDENCIAL

Fecha: [Fecha actual]
Caso: [Referencia del caso]
Cliente: [Nombre del cliente]

1. ANTECEDENTES

El presente informe tiene por objeto analizar la situación jurídica derivada de [breve descripción del asunto].

2. HECHOS RELEVANTES

- [Hecho 1]
- [Hecho 2]
- [Hecho 3]

3. ANÁLISIS JURÍDICO

Desde el punto de vista legal, se identifican los siguientes elementos:

3.1 Marco normativo aplicable
El caso se rige principalmente por [normativa aplicable].

3.2 Evaluación de riesgos
Se han identificado los siguientes riesgos potenciales:
- Riesgo alto: [descripción]
- Riesgo medio: [descripción]

4. CONCLUSIONES Y RECOMENDACIONES

Basados en el análisis precedente, recomendamos:

1. [Recomendación 1]
2. [Recomendación 2]
3. [Recomendación 3]

Quedamos a disposición para ampliar cualquier aspecto del presente informe.

_______________________
[Nombre del abogado]
Abogado`,
  },
};

const Redaccion = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<DocumentType>("email");
  const [content, setContent] = useState(documentTemplates.email.content);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTypeChange = (type: DocumentType) => {
    setActiveType(type);
    setContent(documentTemplates[type].content);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      title: "Copiado al portapapeles",
      description: "El documento está listo para pegar.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTemplates[activeType].title.toLowerCase().replace(" ", "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Documento descargado",
      description: "El archivo se ha guardado en tu dispositivo.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Redacción automática</p>
          <h1 className="text-3xl font-serif text-foreground">
            Genera documentos legales
          </h1>
          <p className="text-muted-foreground">
            Selecciona el tipo de documento y personaliza el contenido generado.
          </p>
        </div>

        {/* Document Type Selector */}
        <div className="flex gap-3">
          {(Object.keys(documentTemplates) as DocumentType[]).map((type) => {
            const template = documentTemplates[type];
            const Icon = template.icon;
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-250",
                  activeType === type
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-card hover:border-accent/50 text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{template.title}</span>
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div className="legal-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-foreground">
              {documentTemplates[activeType].title}
            </h3>
            <Button
              variant={isEditing ? "accent" : "secondary"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? "Vista previa" : "Editar"}
            </Button>
          </div>

          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="legal-input min-h-[400px] font-mono text-sm resize-none"
            />
          ) : (
            <div className="p-6 bg-secondary/30 rounded-lg min-h-[400px] overflow-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                {content}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="secondary" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
            <Button variant="secondary" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
            <Button variant="accent" className="gap-2">
              <Mail className="w-4 h-4" />
              Enviar
            </Button>
          </div>
        </div>

        {/* Tip */}
        <div className="analysis-block bg-accent/5 border-accent/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Consejo:</strong> Revisa y personaliza 
            los campos entre corchetes [así] antes de usar el documento. El Legal Copilot 
            ha generado este contenido basándose en el análisis de tu caso.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => navigate("/sugerencias")}>
            ← Volver a sugerencias
          </Button>
          <Button variant="default" onClick={() => navigate("/casos")}>
            Ver todos los casos
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Redaccion;
