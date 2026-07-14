import { useState } from "react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, Tag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const fields = [
  { name: "File Unique Identifier", type: "Text", required: true, category: "All" },
  { name: "Budget Amount (INR)", type: "Number", required: true, category: "Budget Authorization" },
  { name: "Circular Notification Date", type: "Date", required: true, category: "All" },
  { name: "Security Classification (Secret/Confidential)", type: "Select", required: true, category: "All" },
  { name: "Department Code", type: "Text", required: false, category: "All" },
  { name: "Compliance Authority", type: "Select", required: false, category: "Regulatory Auditing" },
  { name: "Records Archival Date", type: "Date", required: true, category: "All" },
];

const templates = [
  { name: "Executive Board Schema", fields: 12, docs: 1420 },
  { name: "Compliance Audit Schema", fields: 18, docs: 812 },
  { name: "Release Announcement Schema", fields: 6, docs: 142 },
  { name: "Inter-Departmental Routing Slip", fields: 9, docs: 388 },
];

export default function MetadataPage() {
  const [fieldsList, setFieldsList] = useState(fields);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("Text");
  const [newCategory, setNewCategory] = useState("All");
  const [newRequired, setNewRequired] = useState(false);

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Please enter a valid field name");
      return;
    }
    const newField = {
      name: newName,
      type: newType,
      required: newRequired,
      category: newCategory
    };
    setFieldsList([newField, ...fieldsList]);
    toast.success(`Metadata field '${newName}' created successfully`);
    setNewName("");
    setNewType("Text");
    setNewCategory("All");
    setNewRequired(false);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <PageHeader 
        title="Metadata & Classification" 
        description="Design metadata schemas, classification rules and retention triggers." 
        actions={<Button onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" /> New field</Button>} 
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Metadata Fields" className="lg:col-span-2">
          <ul className="space-y-2">
            {fieldsList.map((f) => (
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
            <Select><SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="board">Board Note</SelectItem><SelectItem value="compliance">Audit Request</SelectItem><SelectItem value="circular">Departmental Circular</SelectItem></SelectContent></Select>
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit" className="flex-1">Save field</Button>
            <Button type="button" variant="outline" onClick={() => toast.info("Edits canceled")}>Cancel</Button>
          </div>
        </form>
      </Section>

      {/* New Field Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              New Metadata Field
            </DialogTitle>
            <DialogDescription>
              Create a new metadata field for document classification and indexing.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddField}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Field Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Project Code"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Field Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Number">Number</SelectItem>
                    <SelectItem value="Date">Date</SelectItem>
                    <SelectItem value="Select">Select</SelectItem>
                    <SelectItem value="Multi-select">Multi-select</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Board Note">Board Note</SelectItem>
                    <SelectItem value="Audit Request">Audit Request</SelectItem>
                    <SelectItem value="Departmental Circular">Departmental Circular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="required">Required Field</Label>
                <Switch
                  id="required"
                  checked={newRequired}
                  onCheckedChange={setNewRequired}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save field
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
