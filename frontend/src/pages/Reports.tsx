import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, CalendarClock } from "lucide-react";
import { toast } from "sonner";

const reports = [
  { name: "Document Activity", description: "Uploads, downloads and views per period", lastRun: "2026-07-12" },
  { name: "Workflow Performance", description: "Cycle time, bottlenecks and completion", lastRun: "2026-07-12" },
  { name: "Department Usage", description: "Storage, uploads and approvals per department", lastRun: "2026-07-11" },
  { name: "Storage Report", description: "Growth, quotas and largest categories", lastRun: "2026-07-10" },
  { name: "Audit Report", description: "User activity, permission changes, exports", lastRun: "2026-07-12" },
  { name: "Security Report", description: "SSO, sessions, blocked devices and alerts", lastRun: "2026-07-12" },
  { name: "Compliance Report", description: "Retention, missing docs, regulator readiness", lastRun: "2026-07-09" },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reporting"
        description="Generate, schedule and download reports in PDF, Excel and CSV."
        actions={
          <>
            <Select defaultValue="pdf"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pdf">PDF</SelectItem><SelectItem value="xlsx">Excel</SelectItem><SelectItem value="csv">CSV</SelectItem></SelectContent></Select>
            <Button variant="outline" onClick={() => toast.success("Report scheduler opened")}><CalendarClock className="h-4 w-4 mr-2" /> Schedule</Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Section key={r.name}>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold">{r.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{r.description}</div>
            <div className="text-[11px] text-muted-foreground mt-2">Last run: {r.lastRun}</div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1" onClick={() => toast.success(`${r.name} generated`)}> <Download className="h-4 w-4 mr-1" /> Generate</Button>
              <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Configuration loaded for ${r.name}`)}>Configure</Button>
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}
