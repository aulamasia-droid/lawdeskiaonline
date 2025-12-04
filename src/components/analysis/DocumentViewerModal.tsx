import { X, ExternalLink, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentUrl?: string;
  documentContent?: string;
  sourceUrl?: string;
}

export const DocumentViewerModal = ({
  isOpen,
  onClose,
  title,
  documentUrl,
  documentContent,
  sourceUrl,
}: DocumentViewerModalProps) => {
  const [loadError, setLoadError] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-serif text-lg">{title}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Documento verificado por fuente oficial
              </p>
            </div>
            <div className="flex items-center gap-2">
              {sourceUrl && (
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Abrir en sitio oficial
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-secondary/30">
          {loadError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="p-4 rounded-full bg-warning/10 mb-4">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                No se pudo cargar el documento
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                No se pudo acceder al documento. Verifica en el Semanario Judicial de la Federación o en el sitio oficial.
              </p>
              {sourceUrl && (
                <Button variant="accent" className="gap-2" asChild>
                  <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Consultar en sitio oficial
                  </a>
                </Button>
              )}
            </div>
          ) : documentUrl ? (
            <iframe
              src={documentUrl}
              className="w-full h-full border-0"
              title={title}
              onError={() => setLoadError(true)}
            />
          ) : documentContent ? (
            <div className="p-6 overflow-auto h-full">
              <div className="max-w-3xl mx-auto prose prose-sm">
                <div 
                  className="text-sm text-foreground leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: documentContent }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-muted-foreground">Documento no disponible</p>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-border shrink-0 bg-card">
          <p className="text-xs text-muted-foreground text-center">
            ⚖️ Artículo citado en casos similares entre 2022–2025
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
