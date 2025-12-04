import { useState, useCallback } from 'react';

interface AnalysisResult {
  content: string;
  isComplete: boolean;
}

interface UseLegalAnalysisReturn {
  analyze: (documentText: string, userNotes?: string, specialty?: string) => Promise<void>;
  result: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  progress: number;
  reset: () => void;
}

export const useLegalAnalysis = (): UseLegalAnalysisReturn => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setProgress(0);
    setIsAnalyzing(false);
  }, []);

  const analyze = useCallback(async (
    documentText: string,
    userNotes?: string,
    specialty?: string
  ) => {
    setIsAnalyzing(true);
    setError(null);
    setResult({ content: '', isComplete: false });
    setProgress(10);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-legal-document`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ documentText, userNotes, specialty }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al analizar el documento');
      }

      if (!response.body) {
        throw new Error('No se recibió respuesta del servidor');
      }

      setProgress(30);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            setResult({ content: accumulatedContent, isComplete: true });
            setProgress(100);
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulatedContent += content;
              setResult({ content: accumulatedContent, isComplete: false });
              // Update progress based on content length (estimate)
              const estimatedProgress = Math.min(90, 30 + (accumulatedContent.length / 50));
              setProgress(estimatedProgress);
            }
          } catch {
            // Incomplete JSON, put it back
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulatedContent += content;
            }
          } catch { /* ignore */ }
        }
      }

      setResult({ content: accumulatedContent, isComplete: true });
      setProgress(100);

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProgress(0);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    analyze,
    result,
    isAnalyzing,
    error,
    progress,
    reset,
  };
};
