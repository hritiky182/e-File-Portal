import { Link, useSearchParams } from "react-router-dom";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { documents } from "@/mock/data";
import { StatusBadge, SecurityBadge } from "@/components/common/badges";
import { FileIcon } from "@/components/common/FileIcon";
import { Search, Save, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [q, setQ] = useState(initial);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  const results = documents.filter((d) => !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.owner.toLowerCase().includes(q.toLowerCase()) || d.tags.join(" ").includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="Enterprise Search" description="Search across documents, metadata, comments, and full text." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border bg-card p-4 space-y-4 h-fit">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Advanced Filters</div>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground">Date range</label><div className="grid grid-cols-1 gap-2 mt-1"><Input type="date" /><Input type="date" /></div></div>
              <Select><SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger><SelectContent><SelectItem value="all">All departments</SelectItem>{Array.from(new Set(documents.map((d) => d.department))).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              <Select><SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger><SelectContent>{Array.from(new Set(documents.map((d) => d.category))).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              <Select><SelectTrigger><SelectValue placeholder="Owner" /></SelectTrigger><SelectContent>{Array.from(new Set(documents.map((d) => d.owner))).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              <Select><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="Approved">Approved</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Rejected">Rejected</SelectItem></SelectContent></Select>
              <Select><SelectTrigger><SelectValue placeholder="Security level" /></SelectTrigger><SelectContent><SelectItem value="Confidential">Confidential</SelectItem><SelectItem value="Restricted">Restricted</SelectItem></SelectContent></Select>
              <Button variant="outline" size="sm" className="w-full"><Save className="h-4 w-4 mr-2" /> Save this search</Button>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1"><Clock className="h-3 w-3" /> Recent searches</div>
            <ul className="text-sm space-y-1">
              {["loan agreement 2026", "KYC pending compliance", "board minutes Q2", "mortgage 245000"].map((s) => (
                <li key={s}><button onClick={() => setQ(s)} className="text-primary hover:underline text-left font-medium">{s}</button></li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents, comments, metadata…" className="pl-9 h-11 text-base" />
          </div>
          <Section title={`${results.length} results`}>
            <ul className="divide-y">
              {results.slice(0, 30).map((d) => (
                <li key={d.id} className="py-4 flex items-start gap-4">
                  <FileIcon type={d.type} />
                  <div className="min-w-0 flex-1">
                    <Link to={`/documents/${d.id}`} className="text-sm font-semibold hover:text-primary">{d.name}</Link>
                    <div className="text-xs text-muted-foreground mt-0.5">{d.category} · {d.department} · {d.owner} · v{d.version}</div>
                    <div className="text-xs mt-1 line-clamp-2 text-muted-foreground">…standard collateral terms, principal disbursement of USD 245,000 with amortization schedule attached as Annex A. Borrower acknowledges …</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <StatusBadge status={d.status} />
                    <SecurityBadge level={d.security} />
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
