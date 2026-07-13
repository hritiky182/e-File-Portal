import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { documents } from "@/mock/data";
import { GitBranch, RotateCcw, Diff, Download } from "lucide-react";
import { toast } from "sonner";

export default function VersionsPage() {
  const doc = documents[0];
  const versions = [
    { v: "3.0", user: "Aisha Rahman", date: "2026-07-12 14:22", note: "Final signed version approved by Cabinet Secretariat Legal Advisor.", size: "2.4 MB", current: true },
    { v: "2.3", user: "Priya Sharma", date: "2026-07-10 09:41", note: "Corrected sanction amount, updated schedule Annexure A.", size: "2.3 MB" },
    { v: "2.2", user: "Priya Sharma", date: "2026-07-08 16:07", note: "Formatting fixes on cover page and TOC.", size: "2.3 MB" },
    { v: "2.1", user: "Yuki Tanaka", date: "2026-07-04 11:12", note: "Added Annexure C — inter-departmental consultation remarks.", size: "2.1 MB" },
    { v: "2.0", user: "Yuki Tanaka", date: "2026-06-28 10:00", note: "Second draft after departmental compliance review.", size: "1.9 MB" },
    { v: "1.0", user: "Ravi Iyer", date: "2026-06-20 09:00", note: "Initial draft created from Cabinet Note template.", size: "1.7 MB" },
  ];
  return (
    <div>
      <PageHeader title="Version Control" description="Track, compare and restore document versions." actions={<><Button variant="outline" onClick={() => toast.info("Select two versions below to compare differences")}><Diff className="h-4 w-4 mr-2" /> Compare selected</Button><Button variant="outline" onClick={() => toast.success("Exporting version history log")}><Download className="h-4 w-4 mr-2" /> Export history</Button></>} />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="rounded-xl border bg-card p-4"><div className="text-xs text-muted-foreground uppercase tracking-wider">Document</div><div className="mt-2 font-semibold truncate">{doc.name}</div></div>
        <div className="rounded-xl border bg-card p-4"><div className="text-xs text-muted-foreground uppercase tracking-wider">Current version</div><div className="mt-2 font-semibold">v3.0 · Approved</div></div>
        <div className="rounded-xl border bg-card p-4"><div className="text-xs text-muted-foreground uppercase tracking-wider">Total versions</div><div className="mt-2 font-semibold">6</div></div>
      </div>

      <Section title="Version Timeline" actions={<Select defaultValue={doc.id} onValueChange={(val) => toast.info(`Viewing history for document ID: ${val}`)}><SelectTrigger className="w-64"><SelectValue /></SelectTrigger><SelectContent>{documents.slice(0, 6).map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent></Select>}>
        <ol className="relative border-l ml-4 space-y-6">
          {versions.map((v) => (
            <li key={v.v} className="ml-6">
              <span className={`absolute -left-[10px] mt-2 grid h-5 w-5 place-items-center rounded-full ring-4 ring-background ${v.current ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><GitBranch className="h-3 w-3" /></span>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-base">v{v.v}</span>
                  {v.current && <span className="text-[10px] bg-primary/10 text-primary rounded px-1.5 py-0.5 font-semibold">CURRENT</span>}
                  <span className="text-xs text-muted-foreground">· {v.date} · {v.user} · {v.size}</span>
                  <div className="ml-auto flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`Downloading version ${v.v} of document`)}><Download className="h-3.5 w-3.5 mr-1" /> Download</Button>
                    {!v.current && <Button size="sm" variant="ghost" onClick={() => toast.success(`Restoring document to version ${v.v}`)}><RotateCcw className="h-3.5 w-3.5 mr-1" /> Restore</Button>}
                  </div>
                </div>
                <div className="text-sm mt-2 text-muted-foreground">{v.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
