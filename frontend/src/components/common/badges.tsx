import { cn } from "@/lib/utils";
import type { DocStatus, SecurityLevel } from "@/mock/data";

export function StatusBadge({ status }: { status: DocStatus | string }) {
  const map: Record<string, string> = {
    Approved: "bg-success/10 text-success border-success/20",
    Pending: "bg-warning/15 text-warning border-warning/30",
    "In Review": "bg-info/10 text-info border-info/20",
    Rejected: "bg-destructive/10 text-destructive border-destructive/20",
    Draft: "bg-muted text-muted-foreground border-border",
    Archived: "bg-muted text-muted-foreground border-border",
    Active: "bg-success/10 text-success border-success/20",
    Inactive: "bg-muted text-muted-foreground border-border",
    Locked: "bg-destructive/10 text-destructive border-destructive/20",
    Connected: "bg-success/10 text-success border-success/20",
    Disconnected: "bg-destructive/10 text-destructive border-destructive/20",
    Warning: "bg-warning/15 text-warning border-warning/30",
    Compliant: "bg-success/10 text-success border-success/20",
    Attention: "bg-warning/15 text-warning border-warning/30",
    Success: "bg-success/10 text-success border-success/20",
    Partial: "bg-warning/15 text-warning border-warning/30",
    Idle: "bg-muted text-muted-foreground border-border",
    Scanning: "bg-info/10 text-info border-info/20",
    Error: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", map[status] ?? "bg-muted text-muted-foreground border-border")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </span>
  );
}

export function SecurityBadge({ level }: { level: SecurityLevel }) {
  const map: Record<SecurityLevel, string> = {
    Public: "bg-muted text-muted-foreground",
    Internal: "bg-info/10 text-info",
    Confidential: "bg-warning/15 text-warning",
    Restricted: "bg-destructive/10 text-destructive",
  };
  return <span className={cn("inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", map[level])}>{level}</span>;
}
