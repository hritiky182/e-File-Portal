import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/common/badges";
import { backups } from "@/mock/data";
import { DatabaseBackup, HardDrive, ShieldCheck, RotateCcw, Play } from "lucide-react";
import { toast } from "sonner";

export default function BackupPage() {
  return (
    <div>
      <PageHeader title="Backup & Disaster Recovery" description="Snapshot health, recovery points and restoration wizard." actions={<><Button variant="outline" onClick={() => toast.success("Backup task started")}><Play className="h-4 w-4 mr-2" /> Run backup now</Button><Button onClick={() => toast.success("Restore wizard opened")}><RotateCcw className="h-4 w-4 mr-2" /> Restore wizard</Button></>} />
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="Last successful backup" value="48 min ago" icon={DatabaseBackup} tone="success" delta={0} />
        <StatCard label="Recovery Points (30d)" value="30" icon={RotateCcw} tone="primary" delta={0} />
        <StatCard label="Storage Health" value="Healthy" icon={HardDrive} tone="success" delta={0} />
        <StatCard label="DR Site" value="Hyderabad Datacenter · Ready" icon={ShieldCheck} tone="info" delta={0} />
      </div>
      <Section title="Backup History">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
              <th className="text-left p-3 font-medium">Backup ID</th><th className="text-left p-3 font-medium">Type</th><th className="text-left p-3 font-medium">Size</th><th className="text-left p-3 font-medium">Started</th><th className="text-left p-3 font-medium">Duration</th><th className="text-left p-3 font-medium">Status</th><th className="text-right p-3 font-medium">Action</th>
            </tr></thead>
            <tbody className="divide-y">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-muted/40">
                  <td className="p-3 font-mono text-xs">{b.id}</td>
                  <td className="p-3">{b.type}</td>
                  <td className="p-3">{b.size}</td>
                  <td className="p-3 text-xs">{b.started}</td>
                  <td className="p-3">{b.duration}</td>
                  <td className="p-3"><StatusBadge status={b.status} /></td>
                  <td className="p-3 text-right"><Button size="sm" variant="ghost" onClick={() => toast.success(`Restoring backup ${b.id}...`)}>Restore</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
