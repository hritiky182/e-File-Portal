import { FileText, FileSpreadsheet, FileImage, Mail, File } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Document } from "@/mock/data";

export function FileIcon({ type, className }: { type: Document["type"]; className?: string }) {
  const map: Record<Document["type"], { icon: any; color: string }> = {
    PDF: { icon: FileText, color: "text-red-500 bg-red-500/10" },
    DOCX: { icon: FileText, color: "text-blue-500 bg-blue-500/10" },
    XLSX: { icon: FileSpreadsheet, color: "text-emerald-500 bg-emerald-500/10" },
    IMG: { icon: FileImage, color: "text-purple-500 bg-purple-500/10" },
    MSG: { icon: Mail, color: "text-amber-500 bg-amber-500/10" },
  };
  const cfg = map[type] ?? { icon: File, color: "text-muted-foreground bg-muted" };
  const Icon = cfg.icon;
  return (
    <div className={cn("grid place-items-center rounded-md h-9 w-9 shrink-0", cfg.color, className)}>
      <Icon className="h-4.5 w-4.5" />
    </div>
  );
}
