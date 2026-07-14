import { useState } from "react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { departments } from "@/mock/data";
import { Building2, Users, FileText, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DepartmentsPage() {
  const [departmentsList, setDepartmentsList] = useState(departments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dName, setDName] = useState("");
  const [dHead, setDHead] = useState("");
  const [dMembers, setDMembers] = useState(5);
  const [dDocs, setDDocs] = useState(25);

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dName.trim() || !dHead.trim()) {
      toast.error("Please fill in department name and head");
      return;
    }
    const newDept = {
      id: `dept-${departmentsList.length + 1}`,
      name: dName,
      head: dHead,
      members: Number(dMembers),
      documents: Number(dDocs)
    };
    setDepartmentsList([...departmentsList, newDept]);
    toast.success(`Department '${dName}' created successfully`);
    setDName("");
    setDHead("");
    setDMembers(5);
    setDDocs(25);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <PageHeader 
        title="Departments" 
        description="Organizational units, ownership and storage allocation." 
        actions={<Button onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" /> New department</Button>} 
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {departmentsList.map((d) => (
          <Section key={d.id}>
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold">{d.name}</div>
            <div className="text-xs text-muted-foreground">Head: {d.head}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-muted/40 p-2"><div className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Members</div><div className="font-semibold">{d.members}</div></div>
              <div className="rounded-md bg-muted/40 p-2"><div className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="h-3 w-3" /> Documents</div><div className="font-semibold">{d.documents.toLocaleString()}</div></div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Viewing department details: ${d.name}`)}>View</Button>
              <Button size="sm" variant="ghost" className="flex-1" onClick={() => toast.success(`Viewing settings for department: ${d.name}`)}>Settings</Button>
            </div>
          </Section>
        ))}
      </div>

      {/* New Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              New Department
            </DialogTitle>
            <DialogDescription>
              Register a new corporate organizational unit or department.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddDepartment}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="dName">Department Name</Label>
                <Input
                  id="dName"
                  placeholder="e.g. Legal & Compliance"
                  value={dName}
                  onChange={(e) => setDName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dHead">Department Head</Label>
                <Input
                  id="dHead"
                  placeholder="e.g. Aisha Rahman"
                  value={dHead}
                  onChange={(e) => setDHead(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dMembers">Initial Members</Label>
                  <Input
                    id="dMembers"
                    type="number"
                    min={1}
                    value={dMembers}
                    onChange={(e) => setDMembers(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dDocs">Documents Count</Label>
                  <Input
                    id="dDocs"
                    type="number"
                    min={0}
                    value={dDocs}
                    onChange={(e) => setDDocs(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Department
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
