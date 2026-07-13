import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { scanners, documents } from "@/mock/data";
import { StatusBadge } from "@/components/common/badges";
import { Scan, Play, Settings } from "lucide-react";
import { toast } from "sonner";

export default function ScanningPage() {
  return (
    <div>
      <PageHeader
        title="Scanning Module"
        description="Manage connected scanners, batch scanning, OCR and image enhancement."
        actions={<><Button variant="outline" onClick={() => toast.info("Opening Scan Profiles")}><Settings className="h-4 w-4 mr-2" /> Scan Profiles</Button><Button onClick={() => toast.success("Batch scan job started")}><Play className="h-4 w-4 mr-2" /> Start Batch Scan</Button></>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Connected Scanners" className="lg:col-span-2">
          <div className="grid gap-3">
            {scanners.map((s) => (
              <div key={s.name} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Scan className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.ip} · Queue: {s.queue}</div>
                </div>
                <StatusBadge status={s.status} />
                <Button variant="outline" size="sm" onClick={() => toast.success(`Managing scanner: ${s.name}`)}>Manage</Button>
              </div>
            ))}
          </div>
        </Section>
        <Section title="OCR Engine">
          <div className="space-y-3 text-sm">
            <div><div className="flex justify-between mb-1"><span>Queue depth</span><span className="font-semibold">12 pages</span></div><Progress value={35} /></div>
            <div><div className="flex justify-between mb-1"><span>Recognition accuracy</span><span className="font-semibold">98.4%</span></div><Progress value={98} /></div>
            <div><div className="flex justify-between mb-1"><span>Image enhancement</span><span className="font-semibold">Enabled</span></div><Progress value={82} /></div>
            <div className="pt-2 border-t text-xs text-muted-foreground">Tesseract 5 · Multilingual (EN, AR, FR, DE) · Auto-rotate on</div>
          </div>
        </Section>
      </div>

      <Section title="Scan History" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">Job ID</th><th className="text-left p-3 font-medium">Batch</th><th className="text-left p-3 font-medium">Pages</th><th className="text-left p-3 font-medium">Operator</th><th className="text-left p-3 font-medium">Started</th><th className="text-left p-3 font-medium">Status</th>
            </tr></thead>
            <tbody className="divide-y">
              {documents.slice(0, 12).map((d, i) => (
                <tr key={d.id} className="hover:bg-muted/40">
                  <td className="p-3 font-mono text-xs">SCN-{20240 + i}</td>
                  <td className="p-3">{d.category} batch #{i + 1}</td>
                  <td className="p-3">{12 + (i * 7) % 80}</td>
                  <td className="p-3">{d.owner}</td>
                  <td className="p-3 text-xs text-muted-foreground">{d.modifiedAt} 09:{String((i * 7) % 60).padStart(2,"0")}</td>
                  <td className="p-3"><StatusBadge status={i % 5 === 0 ? "Pending" : "Approved"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
