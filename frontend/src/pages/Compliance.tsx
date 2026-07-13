import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/common/badges";
import { Progress } from "@/components/ui/progress";
import { compliance } from "@/mock/data";
import { ShieldCheck, FileWarning, CalendarX, ClipboardCheck, Download } from "lucide-react";
import { toast } from "sonner";

export default function CompliancePage() {
  return (
    <div>
      <PageHeader title="Compliance" description="Regulatory posture, retention and data-protection controls." actions={<Button variant="outline" onClick={() => toast.success("Regulator compliance package generated")}><Download className="h-4 w-4 mr-2" /> Generate regulator pack</Button>} />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="Compliance Status" value="93%" delta={1.2} icon={ShieldCheck} tone="success" />
        <StatCard label="Missing Documents" value="27" delta={-4} icon={FileWarning} tone="warning" />
        <StatCard label="Retention Violations" value="7" delta={-2} icon={CalendarX} tone="destructive" />
        <StatCard label="Audit Readiness" value="High" delta={5} icon={ClipboardCheck} tone="info" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Frameworks" className="lg:col-span-2">
          <ul className="space-y-3">
            {compliance.map((c) => (
              <li key={c.name} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{c.name}</div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="mt-2"><Progress value={c.coverage} className="h-1.5" /></div>
                <div className="text-xs text-muted-foreground mt-1">Coverage {c.coverage}% · Last review 2026-06-30</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Regulatory Reports">
          <ul className="space-y-2 text-sm">
            {[
              ["CAG Audit Briefing", "2026-08-15", "Draft 78%"],
              ["RTI Disclosure Annual Review", "2026-07-31", "Ready"],
              ["NIC Cyber Security Certification", "2026-07-20", "Submitted"],
              ["Public Records Act Compliance Report", "2026-09-01", "In review"],
              ["National Data Sharing Audits", "2026-10-15", "Draft 42%"],
            ].map(([n, d, s]) => (
              <li key={n as string} className="rounded-lg border p-3">
                <div className="text-sm font-medium">{n as string}</div>
                <div className="text-xs text-muted-foreground">Due {d as string} · {s as string}</div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Opening report editor for: ${n}`)}>Open</Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Downloading PDF for: ${n}`)}><Download className="h-3.5 w-3.5 mr-1" /> PDF</Button>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
