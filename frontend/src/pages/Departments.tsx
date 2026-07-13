import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { departments } from "@/mock/data";
import { Building2, Users, FileText, Plus } from "lucide-react";
import { toast } from "sonner";

export default function DepartmentsPage() {
  return (
    <div>
      <PageHeader title="Departments" description="Organizational units, ownership and storage allocation." actions={<Button onClick={() => toast.success("New department wizard opened")}><Plus className="h-4 w-4 mr-2" /> New department</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {departments.map((d) => (
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
    </div>
  );
}
