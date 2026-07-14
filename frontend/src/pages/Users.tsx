import { useState } from "react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/mock/data";
import { StatusBadge } from "@/components/common/badges";
import { UserPlus, Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UsersPage() {
  const [usersList, setUsersList] = useState(users);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Operations Manager");
  const [dept, setDept] = useState("Operations");

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in name and email");
      return;
    }
    const newUser = {
      id: `usr-${usersList.length + 1}`,
      name: name,
      email: email,
      role: role,
      department: dept,
      status: "Active" as const,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
      lastLogin: "Never"
    };
    setUsersList([newUser, ...usersList]);
    toast.success(`Invitation link successfully sent to ${email}`);
    setName("");
    setEmail("");
    setRole("Operations Manager");
    setDept("Operations");
    setIsDialogOpen(false);
  };

  return (
    <div>
      <PageHeader 
        title="User Management" 
        description="Provision accounts, assign roles and monitor activity." 
        actions={<Button onClick={() => setIsDialogOpen(true)}><UserPlus className="h-4 w-4 mr-2" /> Invite user</Button>} 
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or email…" className="pl-9" /></div>
        <div className="text-xs text-muted-foreground ml-auto">Total {usersList.length} users · Active {usersList.filter(u => u.status === "Active").length} · Locked {usersList.filter(u => u.status === "Locked").length}</div>
      </div>

      <Section>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">User</th><th className="text-left p-3 font-medium">Role</th><th className="text-left p-3 font-medium">Department</th><th className="text-left p-3 font-medium">Status</th><th className="text-left p-3 font-medium">Last login</th><th className="w-10 p-3"></th>
            </tr></thead>
            <tbody className="divide-y">
              {usersList.map((u) => (
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

      {/* Invite User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Invite Employee
            </DialogTitle>
            <DialogDescription>
              Send an invitation to provision a new user account with role-based access.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  placeholder="e.g. Yuki Tanaka"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userEmail">Email Address</Label>
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="e.g. yuki.tanaka@cis.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userRole">Assign Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="userRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COO">COO</SelectItem>
                    <SelectItem value="VP of Operations">VP of Operations</SelectItem>
                    <SelectItem value="Department Director">Department Director</SelectItem>
                    <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                    <SelectItem value="Team Lead">Team Lead</SelectItem>
                    <SelectItem value="Section Lead">Section Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userDept">Department</Label>
                <Select value={dept} onValueChange={setDept}>
                  <SelectTrigger id="userDept">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="IT & Security">IT & Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
