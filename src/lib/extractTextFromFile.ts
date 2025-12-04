/**
 * Extract text content from uploaded files
 * Supports: PDF (text-based), TXT, DOCX (basic)
 */

export const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Plain text files
  if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return await file.text();
  }

  // For PDF files, we'll read as text (works for text-based PDFs)
  // For scanned PDFs, OCR would require a backend service
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    // Try to read as array buffer and extract text
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromPdfBuffer(arrayBuffer);
    return text;
  }

  // For Word documents, extract basic text
  if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.docx')
  ) {
    const arrayBuffer = await file.arrayBuffer();
    return await extractTextFromDocx(arrayBuffer);
  }

  // For other files, try to read as text
  try {
    return await file.text();
  } catch {
    throw new Error(`No se puede leer el archivo: ${file.name}. Formatos soportados: PDF, TXT, DOCX`);
  }
};

/**
 * Basic PDF text extraction (for text-based PDFs)
 * Note: For scanned PDFs, OCR would be needed
 */
const extractTextFromPdfBuffer = async (buffer: ArrayBuffer): Promise<string> => {
  const bytes = new Uint8Array(buffer);
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  
  // Try to find text content in the PDF
  const textMatches: string[] = [];
  
  // Look for text between BT and ET markers (basic PDF text extraction)
  const btPattern = /BT[\s\S]*?ET/g;
  const matches = text.match(btPattern);
  
  if (matches) {
    for (const match of matches) {
      // Extract text from Tj and TJ operators
      const tjPattern = /\(([^)]*)\)\s*Tj/g;
      let tjMatch;
      while ((tjMatch = tjPattern.exec(match)) !== null) {
        textMatches.push(tjMatch[1]);
      }
    }
  }
  
  // Also look for stream content
  const streamPattern = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
  let streamMatch;
  while ((streamMatch = streamPattern.exec(text)) !== null) {
    const content = streamMatch[1];
    // Try to extract readable text
    const readable = content.replace(/[^\x20-\x7E\xA0-\xFF\n\r]/g, ' ').trim();
    if (readable.length > 50) {
      textMatches.push(readable);
    }
  }
  
  // If we found text, return it
  if (textMatches.length > 0) {
    return textMatches.join('\n').replace(/\s+/g, ' ').trim();
  }
  
  // Fallback: try to extract any readable text from the PDF
  const readableText = text
    .replace(/[^\x20-\x7E\xA0-\xFF\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // If we got meaningful text (more than just PDF structure)
  if (readableText.length > 200) {
    // Clean up PDF artifacts
    return readableText
      .replace(/obj\s*endobj/g, '')
      .replace(/stream\s*endstream/g, '')
      .replace(/\d+\s+\d+\s+obj/g, '')
      .trim();
  }
  
  // If nothing worked, the PDF might be scanned
  return 'El documento PDF parece ser una imagen escaneada y requiere OCR para su procesamiento. Por favor, suba un PDF con texto seleccionable o un archivo de texto.';
};

/**
 * Basic DOCX text extraction
 */
const extractTextFromDocx = async (buffer: ArrayBuffer): Promise<string> => {
  try {
    // DOCX files are ZIP archives - we need to extract document.xml
    // This is a simplified extraction that may not work for all DOCX files
    const bytes = new Uint8Array(buffer);
    const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    
    // Look for text content (simplified)
    const textPattern = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    const matches: string[] = [];
    let match;
    
    while ((match = textPattern.exec(text)) !== null) {
      if (match[1]) {
        matches.push(match[1]);
      }
    }
    
    if (matches.length > 0) {
      return matches.join(' ');
    }
    
    return 'No se pudo extraer el texto del documento Word. Por favor, copie y pegue el contenido manualmente.';
  } catch {
    return 'Error al procesar el documento Word.';
  }
};

/**
 * Validate file before processing
 */
export const validateLegalDocument = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 20 * 1024 * 1024; // 20MB
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const allowedExtensions = ['.pdf', '.txt', '.docx'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'El archivo excede el tamaño máximo de 20MB' };
  }
  
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.includes(extension);
  
  if (!isAllowed) {
    return { valid: false, error: 'Formato no soportado. Use PDF, TXT o DOCX' };
  }
  
  return { valid: true };
};
