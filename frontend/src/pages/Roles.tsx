import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { roles } from "@/mock/data";
import { KeyRound, Shield, Plus } from "lucide-react";
import { toast } from "sonner";

const perms = [
  "Documents.View", "Documents.Upload", "Documents.Delete", "Documents.Share",
  "Workflows.Start", "Workflows.Approve", "Workflows.Configure",
  "Users.Manage", "Roles.Manage", "Audit.View", "Compliance.Review",
  "Settings.General", "Settings.Security", "Reports.Generate",
];

export default function RolesPage() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" description="Granular RBAC across documents, workflows and administration." actions={<Button onClick={() => toast.success("New role definition created")}><Plus className="h-4 w-4 mr-2" /> New role</Button>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {roles.map((r) => (
          <Section key={r.name}>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Shield className="h-5 w-5" /></div>
            <div className="mt-3 font-semibold text-sm">{r.name}</div>
            <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{r.description}</div>
            <div className="mt-3 text-xs text-muted-foreground flex justify-between"><span>{r.users} users</span><span>{r.permissions} permissions</span></div>
          </Section>
        ))}
      </div>

      <Section title="Permission Matrix" description="Rows are permissions; columns are roles.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs"><tr>
              <th className="text-left p-3 font-medium sticky left-0 bg-muted/50"><KeyRound className="h-3.5 w-3.5 inline mr-1" /> Permission</th>
              {roles.map((r) => <th key={r.name} className="text-center p-3 font-medium min-w-[110px]">{r.name.split(" ")[0]}</th>)}
            </tr></thead>
            <tbody className="divide-y">
              {perms.map((p, i) => (
                <tr key={p} className="hover:bg-muted/40">
                  <td className="p-3 sticky left-0 bg-card font-mono text-xs">{p}</td>
                  {roles.map((_, ri) => <td key={ri} className="p-3 text-center"><Checkbox defaultChecked={(i + ri) % 3 !== 0} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
