import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/badges";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const devices = [
  { name: "NIC Secretariat Terminal · Chrome", loc: "New Delhi (NIC HQ)", last: "Now" },
  { name: "iPhone 15 · Mobile e-Office", loc: "New Delhi", last: "1h ago" },
  { name: "iPad Pro · Mobile e-Office", loc: "Mumbai (State Data Centre)", last: "3 days ago" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My Profile" description="Personal information, security, preferences and devices." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Section>
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24"><AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=Aisha%20Rahman" /><AvatarFallback>AR</AvatarFallback></Avatar>
            <div className="mt-4 font-semibold">Aisha Rahman</div>
            <div className="text-xs text-muted-foreground">Joint Secretary</div>
            <StatusBadge status="Active" />
            <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => toast.success("Photo upload picker opened")}>Change photo</Button>
            <Button variant="ghost" size="sm" className="mt-2 w-full text-destructive" onClick={() => { localStorage.removeItem("authenticated"); toast.success("Signed out"); navigate("/login"); }}> <LogOut className="h-4 w-4 mr-1" /> Sign out</Button>
          </div>
          <dl className="text-sm mt-6 pt-6 border-t space-y-2">
            <div className="flex justify-between"><dt className="text-muted-foreground">Officer Code</dt><dd>GOV-92837</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Department</dt><dd>Cabinet Secretariat</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>NIC New Delhi</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Reporting Secretary</dt><dd>Shri Rajesh Verma</dd></div>
          </dl>
        </Section>

        <div>
          <Tabs defaultValue="profile">
            <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="preferences">Preferences</TabsTrigger><TabsTrigger value="devices">Devices</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList>

            <TabsContent value="profile" className="mt-4">
              <Section>
                <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }} className="grid gap-4 md:grid-cols-2">
                  <div><Label>First name</Label><Input defaultValue="Aisha" /></div>
                  <div><Label>Last name</Label><Input defaultValue="Rahman" /></div>
                  <div><Label>Email</Label><Input defaultValue="aisha.rahman@nic.in" /></div>
                  <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
                  <div className="md:col-span-2"><Button>Save changes</Button></div>
                </form>
              </Section>
            </TabsContent>

            <TabsContent value="security" className="mt-4 space-y-6">
              <Section title="Password">
                <form onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }} className="grid gap-4 md:grid-cols-3">
                  <div><Label>Current</Label><Input type="password" /></div>
                  <div><Label>New</Label><Input type="password" /></div>
                  <div><Label>Confirm</Label><Input type="password" /></div>
                  <div className="md:col-span-3"><Button>Update password</Button></div>
                </form>
              </Section>
            </TabsContent>

            <TabsContent value="preferences" className="mt-4">
              <Section>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><Label>Language</Label><Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">Hindi</SelectItem><SelectItem value="reg">Regional Languages</SelectItem></SelectContent></Select></div>
                  <div><Label>Timezone</Label><Select defaultValue="ist"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ist">Asia/Kolkata (IST)</SelectItem><SelectItem value="utc">UTC</SelectItem></SelectContent></Select></div>
                  <div><Label>Density</Label><Select defaultValue="comfortable"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="comfortable">Comfortable</SelectItem><SelectItem value="compact">Compact</SelectItem></SelectContent></Select></div>
                  <div className="flex items-center justify-between"><div><Label>Email digest</Label><div className="text-xs text-muted-foreground">Daily summary at 08:00</div></div><Switch defaultChecked /></div>
                </div>
              </Section>
            </TabsContent>

            <TabsContent value="devices" className="mt-4">
              <Section>
                <ul className="divide-y">{devices.map((d) => (<li key={d.name} className="py-3 flex items-center gap-3"><div className="flex-1"><div className="text-sm font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.loc} · Last active {d.last}</div></div><Button variant="ghost" size="sm" className="text-destructive" onClick={() => toast.success(`Revoked access for device: ${d.name}`)}>Revoke</Button></li>))}</ul>
              </Section>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Section>
                <ol className="relative border-l ml-3 space-y-4">
                  {["Signed in from Delhi (NIC HQ)","Approved 3 e-files","Uploaded Cabinet Brief for File F-11012-1","Ran Compliance & Acts report","Changed security PIN"].map((a, i) => (
                    <li key={i} className="ml-4"><span className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" /><div className="text-sm">{a}</div><div className="text-xs text-muted-foreground">2026-07-{String(13 - i).padStart(2, "0")} 09:{String((i * 11) % 60).padStart(2, "0")}</div></li>
                  ))}
                </ol>
              </Section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
