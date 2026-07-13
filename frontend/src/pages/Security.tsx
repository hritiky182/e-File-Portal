import { PageHeader, Section } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/common/badges";
import { ShieldCheck, Lock, Users, MonitorSmartphone, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

const sessions = [
  { user: "Aisha Rahman", device: "MacBook Pro · Chrome 140", ip: "10.20.4.12", location: "New Delhi (NIC HQ)", last: "just now" },
  { user: "David Cohen", device: "Windows · Edge 128", ip: "10.20.4.44", location: "Mumbai (State Data Centre)", last: "3 min ago" },
  { user: "Yuki Tanaka", device: "iPhone 15 · Safari", ip: "10.20.4.71", location: "Bengaluru (National Data Centre)", last: "12 min ago" },
  { user: "Grace Mensah", device: "Windows · Chrome 140", ip: "10.20.4.88", location: "Hyderabad (DR Site)", last: "1 h ago" },
];

const alerts = [
  { title: "Impossible travel detected", user: "Priya Sharma", severity: "critical", time: "12m ago" },
  { title: "Password reset requested outside business hours", user: "James O'Connor", severity: "warning", time: "2h ago" },
  { title: "Bulk download of Restricted docs", user: "Chen Wei", severity: "warning", time: "yesterday" },
];

export default function SecurityPage() {
  return (
    <div>
      <PageHeader title="Security" description="Access, identity, encryption and threat protection." actions={<Button variant="outline" onClick={() => toast.success("Security policies configurations loaded")}>Security policies</Button>} />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="SSO Adoption" value="98.4%" delta={0.6} icon={ShieldCheck} tone="success" />
        <StatCard label="Active Sessions" value={sessions.length} delta={0} icon={Users} tone="info" />
        <StatCard label="Blocked Devices" value="12" delta={-3} icon={MonitorSmartphone} tone="warning" />
        <StatCard label="Open Security Alerts" value="3" delta={-1} icon={ShieldAlert} tone="destructive" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section title="Encryption Status" className="lg:col-span-1">
          <div className="space-y-4 text-sm">
            <div><div className="flex justify-between mb-1"><span>Data at rest (AES-256)</span><StatusBadge status="Approved" /></div><Progress value={100} className="h-1.5" /></div>
            <div><div className="flex justify-between mb-1"><span>Data in transit (TLS 1.3)</span><StatusBadge status="Approved" /></div><Progress value={100} className="h-1.5" /></div>
            <div><div className="flex justify-between mb-1"><span>KMS key rotation</span><StatusBadge status="Approved" /></div><Progress value={94} className="h-1.5" /></div>
            <div><div className="flex justify-between mb-1"><span>Backup encryption</span><StatusBadge status="Approved" /></div><Progress value={100} className="h-1.5" /></div>
          </div>
        </Section>

        <Section title="Password Policy" className="lg:col-span-1">
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Minimum length: <b className="ml-auto">12 chars</b></li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Complexity: <b className="ml-auto">Upper + lower + num + symbol</b></li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Rotation: <b className="ml-auto">Every 90 days</b></li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> History: <b className="ml-auto">Last 10 blocked</b></li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> Lockout: <b className="ml-auto">5 failed attempts</b></li>
            <li className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" /> SSO: <b className="ml-auto">Enforced</b></li>
          </ul>
        </Section>

        <Section title="Security Alerts" className="lg:col-span-1">
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.title} className={`rounded-lg border p-3 border-border ${a.severity === "critical" ? "bg-destructive/5" : "bg-warning/5"}`}>
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.user} · {a.time}</div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Active Sessions" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">User</th><th className="text-left p-3 font-medium">Device</th><th className="text-left p-3 font-medium">IP</th><th className="text-left p-3 font-medium">Location</th><th className="text-left p-3 font-medium">Last active</th><th className="text-right p-3 font-medium">Action</th>
            </tr></thead>
            <tbody className="divide-y">
              {sessions.map((s) => (
                <tr key={s.user} className="hover:bg-muted/40">
                  <td className="p-3 font-medium">{s.user}</td>
                  <td className="p-3">{s.device}</td>
                  <td className="p-3 font-mono text-xs">{s.ip}</td>
                  <td className="p-3">{s.location}</td>
                  <td className="p-3 text-muted-foreground text-xs">{s.last}</td>
                  <td className="p-3 text-right"><Button variant="ghost" size="sm" className="text-destructive" onClick={() => toast.success(`Revoked session for user ${s.user}`)}>Revoke</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
