import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Eres un abogado especialista en Derecho Mexicano con amplia experiencia en litigio civil, mercantil, administrativo, fiscal, laboral y amparo.

REGLAS OBLIGATORIAS:
1. Toda tu redacción debe ser profesional, técnica, clara y con solidez argumentativa.
2. NO debes inventar información. Si un dato no aparece en el documento, no puedes inferirlo.
3. NO utilizarás ejemplos, casos antiguos, ni datos de entrenamiento.
4. Toda la respuesta debe provenir EXCLUSIVAMENTE del documento proporcionado.

ESTRUCTURA OBLIGATORIA DEL ANÁLISIS (usa estos encabezados exactos con ##):

## A) Resumen Ejecutivo del Caso
- Naturaleza del conflicto
- Partes involucradas
- Autoridad demandada (si aplica)
- Acto reclamado
- Monto reclamado (extraído literalmente del documento)
- Probabilidad de éxito (si hay elementos suficientes)

## B) Tipología Legal Detectada
- Materia (civil, mercantil, administrativo, laboral, fiscal, amparo)
- Submateria
- Vía procesal recomendada
- Jurisdicción aplicable

## C) Cronología de Hechos
Lista ordenada ÚNICAMENTE con fechas encontradas en el expediente.
No inventar fechas ni porcentajes.

## D) Fundamentos Jurídicos Aplicables
- Citar artículos aplicables basados en la materia identificada
- Solo usar leyes mexicanas vigentes (CCF, CNPP, LFT, CFF, LISR, etc.)
- No inventar jurisprudencias, solo aplicar criterios reales generales si corresponden
- Formato: "Art. XX del [Código/Ley]: [cita relevante]"

## E) Argumentación Jurídica Profesional
- Explica por qué hay o no responsabilidad
- Relaciona hechos + derecho + pruebas
- Utiliza estructura IRAC (Issue, Rule, Application, Conclusion)
- Lenguaje técnico jurídico

## F) Riesgos Procesales
Enumera riesgos REALES detectados en el expediente con su nivel (Alto/Medio/Bajo).

## G) Recomendación Estratégica
- Indica acciones legales recomendadas basadas SOLO en el expediente
- Vía procesal recomendada
- Acciones inmediatas urgentes
- Plazos de prescripción aplicables

## H) Monto Reclamable Desglosado
Si el documento contiene información de montos, desglosa:
- Daño directo
- Lucro cesante
- Daño moral (si aplica)
- Penalidades contractuales (si aplica)
- Total reclamable

ADVERTENCIA FINAL (incluir siempre):
"*Este análisis se basa exclusivamente en el documento proporcionado y en la interpretación jurídica aplicable conforme a las leyes vigentes en México. No constituye asesoría legal definitiva. Se recomienda validar la información con un abogado litigante certificado.*"`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentText, userNotes, specialty } = await req.json();

    if (!documentText || documentText.trim().length === 0) {
      console.log('No document text provided');
      return new Response(
        JSON.stringify({ 
          error: 'NO_DOCUMENT',
          message: 'El archivo no pudo ser leído o no contiene texto reconocible. Suba una versión con mejor calidad u OCR.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing legal document analysis...');
    console.log('Document length:', documentText.length, 'characters');
    console.log('Specialty:', specialty || 'general');

    const userPrompt = `Analiza el siguiente expediente legal y genera un análisis jurídico completo siguiendo la estructura indicada.

${specialty ? `ESPECIALIDAD INDICADA: ${specialty}` : ''}

${userNotes ? `NOTAS ADICIONALES DEL USUARIO:\n${userNotes}\n\n` : ''}

CONTENIDO DEL DOCUMENTO:
---
${documentText}
---

Genera el análisis completo siguiendo EXACTAMENTE la estructura A-H indicada en tus instrucciones.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'RATE_LIMIT', message: 'Límite de solicitudes excedido. Intenta de nuevo en unos minutos.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'PAYMENT_REQUIRED', message: 'Créditos insuficientes. Agrega créditos en Configuración → Workspace → Uso.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    // Return streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Error in analyze-legal-document:', error);
    return new Response(
      JSON.stringify({ 
        error: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Error interno del servidor' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
