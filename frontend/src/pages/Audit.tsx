import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auditLogs } from "@/mock/data";
import { Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AuditPage() {
  return (
    <div>
      <PageHeader title="Audit Logs" description="Immutable, tamper-evident trail of every user and system action." actions={<Button variant="outline" onClick={() => toast.success("Exporting audit log CSV...")}><Download className="h-4 w-4 mr-2" /> Export CSV</Button>} />

      <div className="grid gap-3 md:grid-cols-6 mb-4">
        <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search officer, action or target…" className="pl-9" /></div>
        <Select><SelectTrigger><SelectValue placeholder="Action" /></SelectTrigger><SelectContent><SelectItem value="all">All actions</SelectItem>{["Viewed","Dispatched","Uploaded","Deleted","Edited","Moved","Shared","Login","Logout","Permission Changed"].map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent></Select>
        <Select><SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="info">Info</SelectItem><SelectItem value="warn">Warning</SelectItem><SelectItem value="critical">Critical</SelectItem></SelectContent></Select>
        <Input type="date" />
        <Input type="date" />
      </div>

      <Section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">Log ID</th><th className="text-left p-3 font-medium">Timestamp</th><th className="text-left p-3 font-medium">Actor</th><th className="text-left p-3 font-medium">Action</th><th className="text-left p-3 font-medium">Target</th><th className="text-left p-3 font-medium">IP</th><th className="text-left p-3 font-medium">Severity</th>
            </tr></thead>
            <tbody className="divide-y">
              {auditLogs.map((l) => (
                <tr key={l.id} className="hover:bg-muted/40">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{l.id}</td>
                  <td className="p-3 text-xs">{l.timestamp}</td>
                  <td className="p-3">{l.actor}</td>
                  <td className="p-3"><span className="font-medium">{l.action}</span></td>
                  <td className="p-3 truncate max-w-xs">{l.target}</td>
                  <td className="p-3 font-mono text-xs">{l.ip}</td>
                  <td className="p-3">
                    <span className={cn("text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded",
                      l.severity === "critical" ? "bg-destructive/10 text-destructive" : l.severity === "warn" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground")}>
                      {l.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
