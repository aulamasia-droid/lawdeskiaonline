import jsPDF from "jspdf";
import automatixLogo from "@/assets/automatix-logo.png";

interface DocumentPdfParams {
  content: string;
  title: string;
  specialty: string;
  caseData: {
    referencia: string;
    cliente: string;
    contraparte: string;
    monto: string;
  };
}

export const generateDocumentPdf = async ({
  content,
  title,
  specialty,
  caseData,
}: DocumentPdfParams): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // Helper function to add page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Helper function for wrapped text
  const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line: string) => {
      checkPageBreak(fontSize * 0.5);
      doc.text(line, margin, yPos);
      yPos += fontSize * 0.5;
    });
  };

  // Header with logo
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = automatixLogo;
    });
    doc.addImage(img, "PNG", margin, yPos, 30, 15);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("AUTOMATIX IA", margin + 35, yPos + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Diseño y Desarrollo de Productos con IA", margin + 35, yPos + 10);
    doc.text("Tel: 7292564174", margin + 35, yPos + 14);
    
    // Date on the right
    doc.setFontSize(9);
    const currentDate = new Date().toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(currentDate, pageWidth - margin - 40, yPos + 6);
    
    yPos += 25;
  } catch {
    yPos += 10;
  }

  // Divider
  doc.setDrawColor(29, 53, 87); // primary color
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Document Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(29, 53, 87);
  doc.text(title.toUpperCase(), pageWidth / 2, yPos, { align: "center" });
  yPos += 8;

  // Subtitle with specialty
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(42, 157, 143); // accent color
  doc.text(`Materia: ${specialty}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 12;

  // Case reference box
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, "FD");
  
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "bold");
  doc.text("DATOS DEL CASO", margin + 5, yPos + 6);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Referencia: ${caseData.referencia || "N/A"}`, margin + 5, yPos + 12);
  doc.text(`Cliente: ${caseData.cliente || "N/A"}`, margin + 5, yPos + 17);
  doc.text(`Contraparte: ${caseData.contraparte || "N/A"}`, pageWidth / 2, yPos + 12);
  doc.text(`Monto: ${caseData.monto || "N/A"} MXN`, pageWidth / 2, yPos + 17);
  
  yPos += 35;

  // Main content
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Process content by lines
  const lines = content.split("\n");
  
  lines.forEach((line) => {
    // Skip decorative lines
    if (line.includes("═══") || line.includes("───")) {
      checkPageBreak(5);
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      return;
    }

    // Section headers
    if (line.match(/^\d+\.\s+[A-ZÁÉÍÓÚÑ\s]+$/)) {
      checkPageBreak(15);
      yPos += 5;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 53, 87);
      doc.text(line, margin, yPos);
      yPos += 8;
      doc.setTextColor(0, 0, 0);
      return;
    }

    // Subsection headers
    if (line.match(/^\d+\.\d+\s+/)) {
      checkPageBreak(10);
      yPos += 3;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(line, margin, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      return;
    }

    // Roman numeral sections
    if (line.match(/^[IVX]+\.\s+/)) {
      checkPageBreak(12);
      yPos += 4;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 53, 87);
      doc.text(line, margin, yPos);
      yPos += 7;
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      return;
    }

    // Risk indicators
    if (line.includes("🟢") || line.includes("🟡") || line.includes("🔴")) {
      checkPageBreak(8);
      const cleanLine = line.replace(/🟢|🟡|🔴/g, "•");
      doc.setFontSize(10);
      if (line.includes("🟢")) doc.setTextColor(56, 161, 105);
      else if (line.includes("🟡")) doc.setTextColor(236, 201, 75);
      else if (line.includes("🔴")) doc.setTextColor(229, 62, 62);
      doc.text(cleanLine, margin + 5, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 5;
      return;
    }

    // Bullet points
    if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("✓")) {
      checkPageBreak(6);
      doc.setFontSize(9);
      const wrappedLines = doc.splitTextToSize(line, contentWidth - 10);
      wrappedLines.forEach((wLine: string) => {
        checkPageBreak(5);
        doc.text(wLine, margin + 5, yPos);
        yPos += 4.5;
      });
      return;
    }

    // Empty lines
    if (line.trim() === "") {
      yPos += 3;
      return;
    }

    // Regular text
    checkPageBreak(6);
    doc.setFontSize(9);
    const wrappedLines = doc.splitTextToSize(line, contentWidth);
    wrappedLines.forEach((wLine: string) => {
      checkPageBreak(4);
      doc.text(wLine, margin, yPos);
      yPos += 4;
    });
  });

  // Footer on last page
  const footerY = pageHeight - 25;
  
  doc.setDrawColor(29, 53, 87);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  
  doc.setFillColor(29, 53, 87);
  doc.rect(margin, footerY + 2, contentWidth, 18, "F");
  
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("SELLO LEGAL DE VALIDEZ", pageWidth / 2, footerY + 7, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(
    "Este documento fue generado por AUTOMATIX IA conforme a legislación mexicana vigente.",
    pageWidth / 2,
    footerY + 12,
    { align: "center" }
  );
  doc.text(
    "No sustituye la asesoría profesional de un abogado. Tel: 7292564174",
    pageWidth / 2,
    footerY + 16,
    { align: "center" }
  );

  // Save
  doc.save(`${title.replace(/\s+/g, "_")}_LawDesk.pdf`);
};
