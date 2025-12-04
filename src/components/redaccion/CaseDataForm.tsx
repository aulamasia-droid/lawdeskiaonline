import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CaseData {
  referencia: string;
  cliente: string;
  contraparte: string;
  hechos: string;
  pruebas: string;
  monto: string;
}

export type LegalSpecialty = "civil" | "laboral" | "penal" | "mercantil" | "fiscal" | "amparo";

interface CaseDataFormProps {
  caseData: CaseData;
  specialty: LegalSpecialty;
  onCaseDataChange: (data: CaseData) => void;
  onSpecialtyChange: (specialty: LegalSpecialty) => void;
}

const specialtyLabels: Record<LegalSpecialty, string> = {
  civil: "Derecho Civil",
  laboral: "Derecho Laboral",
  penal: "Derecho Penal",
  mercantil: "Derecho Mercantil",
  fiscal: "Derecho Fiscal",
  amparo: "Amparo y Constitucional",
};

export const CaseDataForm = ({
  caseData,
  specialty,
  onCaseDataChange,
  onSpecialtyChange,
}: CaseDataFormProps) => {
  const handleChange = (field: keyof CaseData, value: string) => {
    onCaseDataChange({ ...caseData, [field]: value });
  };

  return (
    <div className="legal-card space-y-6">
      <div className="space-y-2">
        <h3 className="font-serif text-lg text-foreground">Datos del Caso</h3>
        <p className="text-sm text-muted-foreground">
          Ingresa la información del caso para generar un documento personalizado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialty">Especialidad Legal</Label>
          <Select value={specialty} onValueChange={(v) => onSpecialtyChange(v as LegalSpecialty)}>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Selecciona especialidad" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(specialtyLabels) as LegalSpecialty[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {specialtyLabels[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referencia">Referencia del Caso</Label>
          <Input
            id="referencia"
            placeholder="Ej: EXP-2024-001234"
            value={caseData.referencia}
            onChange={(e) => handleChange("referencia", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cliente">Nombre del Cliente</Label>
          <Input
            id="cliente"
            placeholder="Nombre completo del cliente"
            value={caseData.cliente}
            onChange={(e) => handleChange("cliente", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contraparte">Parte Contraria</Label>
          <Input
            id="contraparte"
            placeholder="Nombre de la contraparte"
            value={caseData.contraparte}
            onChange={(e) => handleChange("contraparte", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monto">Monto Reclamado (MXN)</Label>
          <Input
            id="monto"
            placeholder="Ej: $150,000.00"
            value={caseData.monto}
            onChange={(e) => handleChange("monto", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hechos">Hechos Relevantes</Label>
        <Textarea
          id="hechos"
          placeholder="Describe los hechos principales del caso de manera cronológica..."
          className="min-h-[100px]"
          value={caseData.hechos}
          onChange={(e) => handleChange("hechos", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pruebas">Pruebas y Evidencias</Label>
        <Textarea
          id="pruebas"
          placeholder="Lista las pruebas documentales, testimoniales u otras evidencias disponibles..."
          className="min-h-[80px]"
          value={caseData.pruebas}
          onChange={(e) => handleChange("pruebas", e.target.value)}
        />
      </div>
    </div>
  );
};
