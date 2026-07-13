import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { integrations } from "@/mock/data";
import { StatusBadge } from "@/components/common/badges";
import { Boxes, Cable, Landmark, Mail, Network, Send, Users, Webhook } from "lucide-react";
import { toast } from "sonner";

const icons: Record<string, any> = { Boxes, Cable, Landmark, Mail, Network, Send, Users, Webhook };

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader title="Integrations" description="Connect enterprise identity providers, financial systems, secure mail servers, and signature APIs." actions={<Button variant="outline" onClick={() => toast.info("Marketplace coming soon")}>Browse marketplace</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {integrations.map((i) => {
          const Icon = icons[i.icon] ?? Cable;
          return (
            <Section key={i.name}>
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                <StatusBadge status={i.status} />
              </div>
              <div className="mt-3 font-semibold">{i.name}</div>
              <div className="text-xs text-muted-foreground">Last sync: {i.last}</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => toast.success(`Configuration opened for ${i.name}`)}>Configure</Button>
                <Button size="sm" variant="ghost" className="flex-1" onClick={() => toast.success(`Sync history loaded for ${i.name}`)}>History</Button>
              </div>
            </Section>
          );
        })}
      </div>
    </div>
  );
}
