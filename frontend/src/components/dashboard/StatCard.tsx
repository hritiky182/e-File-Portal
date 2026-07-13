import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label, value, delta, deltaLabel, icon: Icon, tone = "primary",
}: {
  label: string; value: string | number; delta?: number; deltaLabel?: string; icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive" | "info";
}) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  };
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</div>
          <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
        </div>
        <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={cn("inline-flex items-center gap-0.5 font-semibold", positive ? "text-success" : "text-destructive")}>
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {Math.abs(delta)}%
          </span>
          <span className="text-muted-foreground">{deltaLabel ?? "vs last period"}</span>
        </div>
      )}
    </div>
  );
}
