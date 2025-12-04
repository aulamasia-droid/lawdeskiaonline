import { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { extractTextFromFile, validateLegalDocument } from '@/lib/extractTextFromFile';

interface DocumentUploaderProps {
  onDocumentReady: (text: string, fileName: string) => void;
  onNotesChange?: (notes: string) => void;
  isProcessing?: boolean;
  className?: string;
}

export const DocumentUploader = ({
  onDocumentReady,
  onNotesChange,
  isProcessing = false,
  className,
}: DocumentUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(async (selectedFile: File) => {
    setError(null);
    
    const validation = validateLegalDocument(selectedFile);
    if (!validation.valid) {
      setError(validation.error || 'Archivo inválido');
      return;
    }

    setFile(selectedFile);
    setIsExtracting(true);

    try {
      const text = await extractTextFromFile(selectedFile);
      setExtractedText(text);
      
      if (text.length < 100) {
        setError('El documento parece estar vacío o no contiene texto legible. Intente con otro archivo.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo');
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setExtractedText('');
    setError(null);
  }, []);

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserNotes(e.target.value);
    onNotesChange?.(e.target.value);
  }, [onNotesChange]);

  const handleAnalyze = useCallback(() => {
    if (extractedText && file) {
      onDocumentReady(extractedText, file.name);
    }
  }, [extractedText, file, onDocumentReady]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {!file ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-accent bg-accent/5'
              : 'border-border hover:border-accent/50 hover:bg-secondary/50',
            error && 'border-destructive'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-medium text-foreground mb-2">
            Sube tu expediente legal
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Arrastra y suelta o haz clic para seleccionar
          </p>
          <p className="text-xs text-muted-foreground">
            Formatos: PDF, TXT, DOCX (máx. 20MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="p-2 rounded-lg bg-accent/10">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
                {extractedText && ` • ${extractedText.length.toLocaleString()} caracteres extraídos`}
              </p>
            </div>
            {isExtracting ? (
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={isProcessing}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Extracted Text Preview */}
          {extractedText && extractedText.length >= 100 && (
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Vista previa del texto extraído:
              </p>
              <p className="text-sm text-foreground/80 line-clamp-4">
                {extractedText.slice(0, 500)}...
              </p>
            </div>
          )}

          {/* User Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Notas adicionales (opcional)
            </label>
            <Textarea
              value={userNotes}
              onChange={handleNotesChange}
              placeholder="Agrega contexto adicional sobre el caso que no esté en el documento..."
              className="min-h-[100px]"
            />
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!extractedText || extractedText.length < 100 || isProcessing || isExtracting}
            className="w-full gap-2"
            variant="accent"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analizando expediente...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Analizar con IA Jurídica
              </>
            )}
          </Button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Help Text */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Importante:</strong> El análisis se basa exclusivamente 
          en el contenido del documento. Para PDFs escaneados sin texto seleccionable, 
          considere convertirlos a texto o usar un servicio de OCR externo.
        </p>
      </div>
    </div>
  );
};
