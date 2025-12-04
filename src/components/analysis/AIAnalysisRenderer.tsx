import { cn } from "@/lib/utils";

interface AIAnalysisRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders AI-generated legal analysis with proper formatting
 * Handles markdown-like sections (## headers, bullet points, etc.)
 */
export const AIAnalysisRenderer = ({ content, className }: AIAnalysisRendererProps) => {
  const sections = parseAnalysisSections(content);

  return (
    <div className={cn("space-y-6", className)}>
      {sections.map((section, index) => (
        <div 
          key={index} 
          className="legal-card animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {section.title && (
            <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
              <span className="text-accent">{getSectionIcon(section.title)}</span>
              {section.title}
            </h3>
          )}
          <div className="prose prose-sm max-w-none">
            {renderContent(section.content)}
          </div>
        </div>
      ))}
    </div>
  );
};

interface Section {
  title: string;
  content: string;
}

function parseAnalysisSections(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  let currentSection: Section = { title: '', content: '' };

  for (const line of lines) {
    // Check for section headers (## Title)
    const headerMatch = line.match(/^##\s+(.+)$/);
    if (headerMatch) {
      // Save previous section if it has content
      if (currentSection.title || currentSection.content.trim()) {
        sections.push({ ...currentSection });
      }
      currentSection = { title: headerMatch[1], content: '' };
    } else {
      currentSection.content += line + '\n';
    }
  }

  // Don't forget the last section
  if (currentSection.title || currentSection.content.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

function getSectionIcon(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('resumen') || lowerTitle.includes('ejecutivo')) return '📋';
  if (lowerTitle.includes('tipología') || lowerTitle.includes('legal')) return '⚖️';
  if (lowerTitle.includes('cronología') || lowerTitle.includes('hechos')) return '📅';
  if (lowerTitle.includes('fundamentos') || lowerTitle.includes('jurídicos')) return '📚';
  if (lowerTitle.includes('argumentación')) return '🎯';
  if (lowerTitle.includes('riesgos')) return '⚠️';
  if (lowerTitle.includes('recomendación') || lowerTitle.includes('estratégica')) return '💡';
  if (lowerTitle.includes('monto') || lowerTitle.includes('reclamable')) return '💰';
  if (lowerTitle.includes('advertencia')) return '🛡️';
  return '📄';
}

function renderContent(content: string): JSX.Element[] {
  const lines = content.trim().split('\n');
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-1 mb-3">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{formatText(item)}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${elements.length}`} className="space-y-1 mb-3 list-decimal list-inside">
            {listItems.map((item, i) => (
              <li key={i} className="text-sm text-foreground">
                {formatText(item)}
              </li>
            ))}
          </ol>
        );
      }
      listItems = [];
      listType = null;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      flushList();
      continue;
    }

    // Check for bullet points
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(trimmedLine.slice(2));
      continue;
    }

    // Check for numbered lists
    const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(numberedMatch[1]);
      continue;
    }

    // Regular paragraph
    flushList();
    
    // Check for bold text indicating a subsection
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      elements.push(
        <p key={`p-${elements.length}`} className="font-medium text-foreground mt-4 mb-2">
          {trimmedLine.slice(2, -2)}
        </p>
      );
    } else if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*') && !trimmedLine.startsWith('**')) {
      // Italic text (usually disclaimers)
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm text-muted-foreground italic mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
          {trimmedLine.slice(1, -1)}
        </p>
      );
    } else {
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm text-foreground leading-relaxed mb-2">
          {formatText(trimmedLine)}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

function formatText(text: string): JSX.Element {
  // Replace **bold** with strong tags
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      // Add text before the match
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      // Add the bold text
      parts.push(<strong key={key++} className="font-medium text-foreground">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}
