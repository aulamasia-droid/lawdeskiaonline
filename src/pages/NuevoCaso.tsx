import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle, ArrowRight, Brain } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { extractTextFromFile, validateLegalDocument } from "@/lib/extractTextFromFile";
import { useLegalAnalysis } from "@/hooks/use-legal-analysis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LegalSpecialty = 'civil' | 'laboral' | 'penal' | 'mercantil' | 'fiscal' | 'amparo' | 'administrativo' | 'familiar' | 'agrario' | 'inmobiliario';

const specialtyLabels: Record<LegalSpecialty, string> = {
  civil: 'Derecho Civil',
  laboral: 'Derecho Laboral',
  penal: 'Derecho Penal',
  mercantil: 'Derecho Mercantil',
  fiscal: 'Derecho Fiscal',
  amparo: 'Amparo',
  administrativo: 'Derecho Administrativo',
  familiar: 'Derecho Familiar',
  agrario: 'Derecho Agrario',
  inmobiliario: 'Derecho Inmobiliario',
};

const NuevoCaso = () => {
  const navigate = useNavigate();
  const [caseText, setCaseText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [specialty, setSpecialty] = useState<LegalSpecialty | ''>('');
  
  const { analyze, result, isAnalyzing, error, progress } = useLegalAnalysis();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    const validation = validateLegalDocument(file);
    if (!validation.valid) {
      toast.error(validation.error || "Archivo inválido");
      return;
    }

    setUploadedFile(file);
    setIsExtracting(true);
    
    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
      
      if (text.length < 100) {
        toast.error("El documento parece estar vacío o contiene muy poco texto.");
      } else {
        toast.success("Texto extraído con éxito");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al procesar el archivo");
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractedText("");
  };

  const handleAnalyze = async () => {
    const textToAnalyze = caseText || extractedText;
    
    if (!textToAnalyze || textToAnalyze.length < 50) {
      toast.error("Por favor, ingresa más contenido para el análisis.");
      return;
    }

    try {
      await analyze(textToAnalyze, userNotes, specialty || undefined);
    } catch (err) {
      toast.error("Error al iniciar el análisis");
    }
  };

  // Navigate to analysis when complete
  if (result?.isComplete && result.content) {
    navigate("/analisis", { 
      state: { 
        aiAnalysis: result.content,
        fileName: uploadedFile?.name || 'Texto manual',
        specialty 
      } 
    });
  }

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
            Ingresa el contenido de tu caso o sube un documento para comenzar el análisis con IA.
          </p>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="legal-card space-y-4 animate-pulse-subtle">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Brain className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Analizando expediente con IA...</p>
                <p className="text-sm text-muted-foreground">
                  Extrayendo información, identificando tipología y generando análisis jurídico
                </p>
              </div>
              <span className="text-2xl font-serif text-accent">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            {result?.content && (
              <div className="p-3 rounded-lg bg-secondary/50 max-h-40 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-1">Vista previa del análisis:</p>
                <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-4">
                  {result.content.slice(0, 500)}...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Error en el análisis</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        )}

        {/* Specialty Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Especialidad Legal (opcional)
          </label>
          <Select value={specialty} onValueChange={(v) => setSpecialty(v as LegalSpecialty)}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Selecciona la materia del caso..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(specialtyLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Seleccionar la materia ayuda a generar un análisis más preciso.
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
                    {extractedText && ` · ${extractedText.length.toLocaleString()} caracteres`}
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
                <Button variant="ghost" size="icon" onClick={removeFile} disabled={isAnalyzing}>
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
                  Arrastra tu documento aquí
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PDF, TXT o DOCX (máx. 20MB)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={handleFileInput}
                className="hidden"
                disabled={isAnalyzing}
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
            disabled={isAnalyzing}
          />
          <p className="text-xs text-muted-foreground">
            {totalText.length} caracteres · Cuanto más detalle proporciones, mejor será el análisis.
          </p>
        </div>

        {/* User Notes */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Notas adicionales (opcional)
          </label>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Contexto adicional, preguntas específicas o información que no está en el documento..."
            className="legal-input min-h-[100px] resize-none"
            disabled={isAnalyzing}
          />
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
                {extractedText.slice(0, 1000)}
                {extractedText.length > 1000 && '...'}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => navigate("/")} disabled={isAnalyzing}>
            Cancelar
          </Button>
          <Button 
            variant="accent" 
            size="lg" 
            onClick={handleAnalyze}
            disabled={!totalText || totalText.length < 50 || isAnalyzing}
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Analizar con IA Jurídica
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm text-foreground mb-2">
            <strong>🤖 Análisis con IA Jurídica</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            El análisis se genera utilizando inteligencia artificial especializada en derecho mexicano. 
            Se identificará la tipología legal, se extraerán hechos relevantes, se aplicarán fundamentos 
            jurídicos y se generarán recomendaciones estratégicas basadas exclusivamente en el contenido 
            del documento proporcionado.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default NuevoCaso;
