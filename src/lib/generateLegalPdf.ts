import { jsPDF } from 'jspdf';
import arqentaLogo from '@/assets/arqenta-logo.png';

interface LegalSource {
  type: 'articulo' | 'jurisprudencia' | 'doctrina';
  title: string;
  code: string;
  reference?: string;
  status: 'disponible' | 'parcial' | 'no-disponible';
  url?: string;
  aiReasoning: string;
  relevance: 'alta' | 'media' | 'baja';
  confidence: number;
}

interface PdfData {
  aiSummary: string;
  traceabilityText: string;
  legalSources: LegalSource[];
  confidencePercentage: number;
  caseTitle?: string;
  caseSummary?: string;
}

export async function generateLegalPdf(data: PdfData): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // Helper function to add new page if needed
  const checkNewPage = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 40) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Helper to draw text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number = 6): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  };

  // ============ HEADER ============
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    
    await new Promise<void>((resolve) => {
      logoImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = logoImg.width;
        canvas.height = logoImg.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(logoImg, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        doc.addImage(dataUrl, 'PNG', margin, yPos, 25, 25);
        resolve();
      };
      logoImg.onerror = () => resolve();
      logoImg.src = arqentaLogo;
    });
  } catch {
    // Logo failed to load, continue without it
  }

  // Company name and contact
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('ARQENTA', margin + 30, yPos + 10);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Diseño y Desarrollo de Productos y Servicios con IA', margin + 30, yPos + 16);
  doc.text('Tel: 7292564174', margin + 30, yPos + 22);

  // Date on the right
  doc.setFontSize(9);
  const today = new Date().toLocaleDateString('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(today, pageWidth - margin, yPos + 10, { align: 'right' });

  yPos += 35;

  // Separator line
  doc.setDrawColor(29, 53, 87);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // ============ TITLE ============
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('📋 INFORME LEGAL CON TRAZABILIDAD', margin, yPos);
  yPos += 8;

  if (data.caseTitle) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Caso: ${data.caseTitle}`, margin, yPos);
    yPos += 10;
  }

  // ============ SECTION 1: CASE SUMMARY ============
  if (data.caseSummary) {
    checkNewPage(40);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 53, 87);
    doc.text('📄 Resumen del Caso', margin + 4, yPos + 5.5);
    yPos += 12;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    yPos = addWrappedText(data.caseSummary, margin, yPos, contentWidth);
    yPos += 8;
  }

  // ============ SECTION 2: AI ANALYSIS ============
  checkNewPage(40);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('🧠 Análisis generado por IA legal', margin + 4, yPos + 5.5);
  yPos += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  yPos = addWrappedText(data.aiSummary, margin, yPos, contentWidth);
  yPos += 8;

  // ============ SECTION 3: LEGAL SOURCES ============
  checkNewPage(20);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('🔍 Fuentes Legales Aplicadas', margin + 4, yPos + 5.5);
  yPos += 14;

  // Legal sources list with confidence
  for (const source of data.legalSources) {
    checkNewPage(45);

    // Status indicator
    let statusColor: [number, number, number];
    let statusText: string;
    switch (source.status) {
      case 'disponible':
        statusColor = [56, 161, 105]; // #38A169
        statusText = '🟢 Disponible';
        break;
      case 'parcial':
        statusColor = [236, 201, 75]; // #ECC94B
        statusText = '🟡 Parcial';
        break;
      default:
        statusColor = [229, 62, 62]; // #E53E3E
        statusText = '🔴 No disponible';
    }

    // Source type badge
    const typeLabels = {
      articulo: '📄 Artículo',
      jurisprudencia: '⚖️ Jurisprudencia',
      doctrina: '📖 Doctrina'
    };

    // Source box
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, yPos, contentWidth, 38, 2, 2, 'S');

    // Type and status
    doc.setFontSize(8);
    doc.setTextColor(...statusColor);
    doc.text(`${typeLabels[source.type]} | ${statusText}`, margin + 3, yPos + 5);

    // Relevance and confidence badge
    const relevanceColors: Record<string, [number, number, number]> = {
      alta: [42, 157, 143],
      media: [236, 201, 75],
      baja: [160, 160, 160]
    };
    doc.setTextColor(...relevanceColors[source.relevance]);
    doc.text(`[${source.relevance.toUpperCase()}] ${source.confidence}%`, pageWidth - margin - 25, yPos + 5);

    // Title and code
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 53, 87);
    const titleLines = doc.splitTextToSize(source.title, contentWidth - 10);
    doc.text(titleLines[0], margin + 3, yPos + 12);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(source.code, margin + 3, yPos + 18);

    // AI Reasoning (truncated)
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const reasoningText = source.aiReasoning.length > 120 
      ? source.aiReasoning.substring(0, 117) + '...' 
      : source.aiReasoning;
    const reasoningLines = doc.splitTextToSize(reasoningText, contentWidth - 10);
    doc.text(reasoningLines, margin + 3, yPos + 25);

    // URL if available (clickable link)
    if (source.url) {
      doc.setFontSize(7);
      doc.setTextColor(42, 157, 143);
      const truncatedUrl = source.url.length > 60 ? source.url.substring(0, 57) + '...' : source.url;
      doc.textWithLink(`🔗 ${truncatedUrl}`, margin + 3, yPos + 35, { url: source.url });
    }

    yPos += 42;
  }

  // ============ SECTION 4: TRACEABILITY PANEL ============
  checkNewPage(50);
  yPos += 4;
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('📎 Panel de Trazabilidad', margin + 4, yPos + 5.5);
  yPos += 12;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  yPos = addWrappedText(data.traceabilityText, margin, yPos, contentWidth);
  
  // Confidence indicator
  yPos += 4;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(42, 157, 143); // #2A9D8F
  doc.text(`✓ Confianza general del análisis: ${data.confidencePercentage}%`, margin, yPos);
  yPos += 10;

  // ============ FOOTER / LEGAL SEAL ============
  const footerHeight = 55;
  
  if (yPos + footerHeight > pageHeight - 20) {
    doc.addPage();
    yPos = margin;
  } else {
    yPos = pageHeight - footerHeight - 10;
  }

  // Footer separator
  doc.setDrawColor(29, 53, 87);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Legal seal box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, yPos, contentWidth, 45, 3, 3, 'F');

  // Seal title
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(29, 53, 87);
  doc.text('✅ Sello Legal de Validez', margin + 4, yPos + 7);

  // Seal text
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const sealText = 'Este informe fue generado automáticamente con respaldo jurídico conforme a legislación mexicana vigente. Incluye artículos del Código Civil Federal, Ley Federal del Trabajo, criterios de la SCJN, SAT, INAI y CONAMER.';
  const sealLines = doc.splitTextToSize(sealText, contentWidth - 8);
  doc.text(sealLines, margin + 4, yPos + 14);

  // Warning
  doc.setFillColor(255, 243, 205);
  doc.roundedRect(margin + 4, yPos + 26, contentWidth - 8, 10, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(133, 100, 4);
  doc.text('⚠️ Advertencia: Este documento no sustituye la asesoría profesional de un abogado.', margin + 8, yPos + 32);

  // ARQENTA branding
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('ARQENTA', margin + 4, yPos + 42);
  doc.text('Arquitectura Digital e IA Aplicada', pageWidth - margin - 4, yPos + 42, { align: 'right' });

  // Page footer text
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Informe generado automáticamente con respaldo jurídico y trazabilidad en fuentes oficiales. | Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Download
  doc.save('Informe_Legal_LawDesk.pdf');
}
