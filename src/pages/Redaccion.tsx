import { useState } from "react";
import { Mail, FileText, ClipboardList, Copy, Download, Edit, Check, Loader2, FileDown } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CaseDataForm, CaseData, LegalSpecialty } from "@/components/redaccion/CaseDataForm";
import { generateAdvancedDocument, getDocumentTypeInfo, AdvancedDocumentType } from "@/lib/legalDocumentTemplates";
import { generateDocumentPdf } from "@/lib/generateDocumentPdf";
import { SelloLegalDocumento } from "@/components/SelloLegalDocumento";

const documentIcons = {
  email: Mail,
  recurso: FileText,
  informe: ClipboardList,
};

const specialtyLabels: Record<LegalSpecialty, string> = {
  civil: "Derecho Civil",
  laboral: "Derecho Laboral",
  penal: "Derecho Penal",
  mercantil: "Derecho Mercantil",
  fiscal: "Derecho Fiscal",
  amparo: "Amparo y Constitucional",
};

const Redaccion = () => {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<AdvancedDocumentType>("informe");
  const [specialty, setSpecialty] = useState<LegalSpecialty>("civil");
  const [caseData, setCaseData] = useState<CaseData>({
    referencia: "",
    cliente: "",
    contraparte: "",
    hechos: "",
    pruebas: "",
    monto: "",
  });
  const [content, setContent] = useState(() => 
    generateAdvancedDocument("informe", "civil", caseData)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showCaseForm, setShowCaseForm] = useState(true);

  const handleTypeChange = (type: AdvancedDocumentType) => {
    setActiveType(type);
    setContent(generateAdvancedDocument(type, specialty, caseData));
    setIsEditing(false);
  };

  const handleSpecialtyChange = (newSpecialty: LegalSpecialty) => {
    setSpecialty(newSpecialty);
    setContent(generateAdvancedDocument(activeType, newSpecialty, caseData));
  };

  const handleCaseDataChange = (newData: CaseData) => {
    setCaseData(newData);
  };

  const handleGenerateDocument = () => {
    setContent(generateAdvancedDocument(activeType, specialty, caseData));
    setShowCaseForm(false);
    toast.success("Documento generado con fundamento legal y jurisprudencia aplicable.");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${getDocumentTypeInfo(activeType).title.toLowerCase().replace(" ", "_")}_${specialty}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Documento descargado en formato TXT");
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await generateDocumentPdf({
        content,
        title: getDocumentTypeInfo(activeType).title,
        specialty: specialtyLabels[specialty],
        caseData: {
          referencia: caseData.referencia,
          cliente: caseData.cliente,
          contraparte: caseData.contraparte,
          monto: caseData.monto,
        },
      });
      toast.success("✅ Informe descargado exitosamente.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("❌ Hubo un error al generar el informe. Intenta nuevamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const docInfo = getDocumentTypeInfo(activeType);

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Generación Jurídica Avanzada</p>
          <h1 className="text-3xl font-serif text-foreground">
            Documentos Legales con Fundamento
          </h1>
          <p className="text-muted-foreground">
            Genera documentos jurídicos sólidos con argumentación legal, citas normativas y jurisprudencia vigente.
          </p>
        </div>

        {/* Document Type Selector */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Tipo de documento</p>
          <div className="flex gap-3 flex-wrap">
            {(Object.keys(documentIcons) as AdvancedDocumentType[]).map((type) => {
              const Icon = documentIcons[type];
              const info = getDocumentTypeInfo(type);
              return (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "flex flex-col items-start gap-1 px-4 py-3 rounded-lg border transition-all duration-250 min-w-[180px]",
                    activeType === type
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-card hover:border-accent/50 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{info.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground text-left">
                    {info.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Data Form */}
        {showCaseForm && (
          <div className="space-y-4">
            <CaseDataForm
              caseData={caseData}
              specialty={specialty}
              onCaseDataChange={handleCaseDataChange}
              onSpecialtyChange={handleSpecialtyChange}
            />
            <div className="flex justify-end">
              <Button variant="accent" onClick={handleGenerateDocument} className="gap-2">
                <FileText className="w-4 h-4" />
                Generar Documento Jurídico
              </Button>
            </div>
          </div>
        )}

        {/* Show/Hide Form Toggle */}
        {!showCaseForm && (
          <Button 
            variant="outline" 
            onClick={() => setShowCaseForm(true)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Modificar datos del caso
          </Button>
        )}

        {/* Editor */}
        <div className="legal-card space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-serif text-lg text-foreground">
                {docInfo.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Materia: {specialtyLabels[specialty]}
              </p>
            </div>
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
              className="legal-input min-h-[500px] font-mono text-sm resize-none"
            />
          ) : (
            <div className="p-6 bg-secondary/30 rounded-lg min-h-[500px] max-h-[600px] overflow-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                {content}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-accent">⚖️</span>
              <span>Incluye fundamento legal y jurisprudencia SCJN</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="secondary" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar"}
              </Button>
              <Button variant="secondary" onClick={handleDownloadTxt} className="gap-2">
                <Download className="w-4 h-4" />
                TXT
              </Button>
              <Button 
                variant="accent" 
                onClick={handleDownloadPdf} 
                className="gap-2"
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                Descargar PDF
              </Button>
              <Button variant="default" className="gap-2">
                <Mail className="w-4 h-4" />
                Enviar
              </Button>
            </div>
          </div>
        </div>

        {/* Legal Seal Preview */}
        <SelloLegalDocumento />

        {/* Tip */}
        <div className="analysis-block bg-accent/5 border-accent/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Metodología IRAC:</strong> El documento incluye 
            argumentación estructurada con Issue (cuestión), Rule (norma), Application (aplicación) 
            y Conclusion, siguiendo las mejores prácticas de argumentación jurídica.
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
