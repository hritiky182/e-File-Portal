import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, Tag } from "lucide-react";
import { toast } from "sonner";

const fields = [
  { name: "e-File Unique Identifier", type: "Text", required: true, category: "All" },
  { name: "Sanction Amount (INR)", type: "Number", required: true, category: "Treasury Sanction" },
  { name: "Circular Notification Date", type: "Date", required: true, category: "All" },
  { name: "Security Classification (Secret/Confidential)", type: "Select", required: true, category: "All" },
  { name: "Ministry / Department Code", type: "Text", required: false, category: "All" },
  { name: "Statutory Compliance Authority", type: "Select", required: false, category: "RTI Response" },
  { name: "Public Records Archival Date", type: "Date", required: true, category: "All" },
];

const templates = [
  { name: "Cabinet Note Schema", fields: 12, docs: 1420 },
  { name: "RTI Request Tracking Schema", fields: 18, docs: 812 },
  { name: "Gazette Notification Draft", fields: 6, docs: 142 },
  { name: "Inter-Departmental Movement Slip", fields: 9, docs: 388 },
];

export default function MetadataPage() {
  return (
    <div>
      <PageHeader title="Metadata & Classification" description="Design metadata schemas, classification rules and retention triggers." actions={<Button onClick={() => toast.success("New field schema created")}><Plus className="h-4 w-4 mr-2" /> New field</Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Metadata Fields" className="lg:col-span-2">
          <ul className="space-y-2">
            {fields.map((f) => (
              <li key={f.name} className="flex items-center gap-3 rounded-lg border p-3">
                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary"><Tag className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.type} · {f.category}</div>
                </div>
                <span className="text-xs text-muted-foreground">Required</span>
                <Switch defaultChecked={f.required} onCheckedChange={(checked) => toast.success(`Field '${f.name}' required status: ${checked}`)} />
                <Button variant="ghost" size="sm" onClick={() => toast.info(`Editing field: ${f.name}`)}>Edit</Button>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Templates">
          <ul className="space-y-2">
            {templates.map((t) => (
              <li key={t.name} className="rounded-lg border p-3">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.fields} fields · {t.docs.toLocaleString()} documents</div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.info(`Editing template: ${t.name}`)}>Edit</Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Applied template: ${t.name}`)}>Apply</Button>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Add / Edit Field" className="mt-6">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Metadata field saved successfully"); }} className="grid gap-4 md:grid-cols-4">
          <div><label className="text-xs">Field name</label><Input placeholder="e.g. Sanction Number" required /></div>
          <div><label className="text-xs">Type</label>
            <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>
              <SelectItem value="Text">Text</SelectItem><SelectItem value="Number">Number</SelectItem><SelectItem value="Date">Date</SelectItem><SelectItem value="Select">Select</SelectItem><SelectItem value="Multi-select">Multi-select</SelectItem>
            </SelectContent></Select>
          </div>
          <div><label className="text-xs">Applies to category</label>
            <Select><SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="cabinet">Cabinet Note</SelectItem><SelectItem value="rti">RTI Request</SelectItem><SelectItem value="circular">Departmental Circular</SelectItem></SelectContent></Select>
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" className="flex-1">Save field</Button>
            <Button type="button" variant="outline" onClick={() => toast.info("Edits canceled")}>Cancel</Button>
          </div>
        </form>
      </Section>
    </div>
  );
}
