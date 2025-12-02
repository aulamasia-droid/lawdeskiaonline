import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const NuevoCaso = () => {
  const navigate = useNavigate();
  const [caseText, setCaseText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      handleFileUpload(file);
    } else {
      toast({
        title: "Formato no soportado",
        description: "Por favor, sube un archivo PDF.",
        variant: "destructive",
      });
    }
  }, []);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsExtracting(true);
    
    // Simulate PDF extraction
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedText("Texto extraído del documento PDF. Este es un ejemplo del contenido que sería procesado automáticamente...");
      toast({
        title: "Texto extraído con éxito",
        description: "El contenido del PDF está listo para análisis.",
      });
    }, 2000);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractedText("");
  };

  const handleAnalyze = () => {
    if (!caseText && !extractedText) {
      toast({
        title: "Contenido requerido",
        description: "Por favor, ingresa el texto del caso o sube un documento.",
        variant: "destructive",
      });
      return;
    }
    navigate("/analisis");
  };

  const totalText = caseText || extractedText;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Ingreso de caso</p>
          <h1 className="text-3xl font-serif text-foreground">
            Sube tu caso, y déjanos ayudarte con lo complejo
          </h1>
          <p className="text-muted-foreground">
            Ingresa el contenido de tu caso o sube un documento PDF para comenzar el análisis.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "legal-card border-2 border-dashed transition-all duration-250",
            isDragOver 
              ? "border-accent bg-accent/5" 
              : "border-border hover:border-accent/50",
            uploadedFile && "border-success bg-success/5"
          )}
        >
          {uploadedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <FileText className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isExtracting ? (
                  <div className="flex items-center gap-2 text-accent">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Extrayendo texto...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Texto extraído</span>
                  </div>
                )}
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-4 py-8 cursor-pointer">
              <div className="p-4 rounded-full bg-secondary">
                <Upload className="w-8 h-8 text-accent" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  Arrastra tu documento PDF aquí
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  o haz clic para seleccionar un archivo
                </p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">o escribe directamente</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Text Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Contenido del caso
          </label>
          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            placeholder="Describe los hechos del caso, las partes involucradas y cualquier información relevante..."
            className="legal-input min-h-[240px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {totalText.length} caracteres · Cuanto más detalle proporciones, mejor será el análisis.
          </p>
        </div>

        {/* Extracted Text Preview */}
        {extractedText && !caseText && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>Vista previa del texto extraído</span>
            </div>
            <div className="legal-card bg-secondary/50 max-h-40 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {extractedText}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button 
            variant="accent" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={!totalText}
            className="gap-2"
          >
            Analizar Caso
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NuevoCaso;
