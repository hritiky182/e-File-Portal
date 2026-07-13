import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, MessageCircle, PlayCircle, LifeBuoy, Search, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  ["How do I upload multiple documents at once?", "Use the Upload page and drag several files into the drop zone. Metadata applies to all files."],
  ["Who can approve a workflow?", "Approvers are defined per stage in Workflow Manager and can be delegated temporarily."],
  ["How long are documents retained?", "Retention follows the policy attached to each category. Legal hold overrides scheduled purges."],
  ["Where can I see who viewed a document?", "Open the document, then use Activity Timeline. Full detail is in the Audit Logs page."],
];

const tickets = [
  { id: "TCK-2041", subject: "Cannot preview scanned TIFF", status: "Open", updated: "12m ago" },
  { id: "TCK-2036", subject: "Bulk export failed at 82%", status: "In progress", updated: "2h ago" },
  { id: "TCK-2028", subject: "Add branch code to KYC template", status: "Resolved", updated: "yesterday" },
];

export default function HelpPage() {
  return (
    <div>
      <PageHeader title="Help Center" description="Documentation, tutorials and support." actions={<Button variant="outline"><LifeBuoy className="h-4 w-4 mr-2" /> Contact support</Button>} />

      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-8 mb-6">
        <h2 className="text-xl font-semibold">How can we help?</h2>
        <div className="relative mt-4 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9 h-11" placeholder="Search articles, tutorials, release notes…" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Documentation" actions={<BookOpen className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-2 text-sm">
            {["Getting started","Document uploads","Workflows & approvals","Metadata & retention","Audit & compliance","Roles & permissions"].map((a) => (
              <li key={a}><button onClick={() => toast.success(`Article loaded: ${a}`)} className="w-full text-left flex items-center gap-2 rounded-md p-2 hover:bg-muted"><ArrowRight className="h-3.5 w-3.5 text-primary" /> {a}</button></li>
            ))}
          </ul>
        </Section>
        <Section title="Video Tutorials" actions={<PlayCircle className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-3">
            {["Uploading in bulk (3:12)","Building an approval workflow (5:44)","Setting up retention (4:20)","Running a compliance report (6:02)"].map((t) => (
              <li key={t} onClick={() => toast.success(`Playing video tutorial: ${t}`)} className="cursor-pointer hover:bg-muted/30 transition flex items-center gap-3 rounded-lg border p-2.5"><div className="grid h-10 w-16 place-items-center rounded bg-muted"><PlayCircle className="h-5 w-5 text-primary" /></div><div className="text-sm font-medium">{t}</div></li>
            ))}
          </ul>
        </Section>
        <Section title="Support Tickets" actions={<MessageCircle className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-2 text-sm">
            {tickets.map((t) => (
              <li key={t.id} className="rounded-lg border p-3"><div className="flex justify-between"><span className="font-mono text-xs">{t.id}</span><span className="text-xs text-muted-foreground">{t.updated}</span></div><div className="mt-1 font-medium">{t.subject}</div><div className="text-xs text-muted-foreground">Status: {t.status}</div></li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Frequently Asked Questions" className="mt-6">
        <ul className="divide-y">{faqs.map(([q, a]) => (<li key={q} className="py-3"><div className="font-medium text-sm">{q}</div><div className="text-sm text-muted-foreground mt-0.5">{a}</div></li>))}</ul>
      </Section>

      <Section title="Contact support" className="mt-6">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Ticket submitted"); }} className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Subject" />
          <Input placeholder="Related module (e.g. Workflows)" />
          <Textarea rows={4} placeholder="Describe the issue…" className="md:col-span-2" />
          <Button className="md:col-span-2 md:w-fit">Submit ticket</Button>
        </form>
      </Section>
    </div>
  );
}
