import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/mock/data";
import { StatusBadge } from "@/components/common/badges";
import { UserPlus, Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function UsersPage() {
  return (
    <div>
      <PageHeader title="User Management" description="Provision accounts, assign roles and monitor activity." actions={<Button onClick={() => toast.success("Invitation link sent")}><UserPlus className="h-4 w-4 mr-2" /> Invite user</Button>} />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or email…" className="pl-9" /></div>
        <div className="text-xs text-muted-foreground ml-auto">Total {users.length} users · Active {users.filter(u => u.status === "Active").length} · Locked {users.filter(u => u.status === "Locked").length}</div>
      </div>

      <Section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">User</th><th className="text-left p-3 font-medium">Role</th><th className="text-left p-3 font-medium">Department</th><th className="text-left p-3 font-medium">Status</th><th className="text-left p-3 font-medium">Last login</th><th className="w-10 p-3"></th>
            </tr></thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/40">
                  <td className="p-3"><div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={u.avatar} /><AvatarFallback>{u.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback></Avatar>
                    <div className="min-w-0"><div className="font-medium truncate">{u.name}</div><div className="text-xs text-muted-foreground truncate">{u.email}</div></div>
                  </div></td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">{u.department}</td>
                  <td className="p-3"><StatusBadge status={u.status} /></td>
                  <td className="p-3 text-xs text-muted-foreground">{u.lastLogin}</td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success("Password reset link sent")}>Reset password</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Assigned role configuration loaded for ${u.name}`)}>Assign role</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Assigned department configuration loaded for ${u.name}`)}>Assign department</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Activity log details loaded for ${u.name}`)}>View activity</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => toast.success("User deactivated")}>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
