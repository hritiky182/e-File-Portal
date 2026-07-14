import { useState } from "react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { workflows } from "@/mock/data";
import { Workflow, Timer, CheckCircle2, AlertTriangle, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const templates = ["3-Step Approval", "Compliance Review", "Loan Underwriting", "Board Circulation", "Contract Sign-off"];

export default function WorkflowsPage() {
  const [workflowsList, setWorkflowsList] = useState(workflows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wName, setWName] = useState("");
  const [wOwner, setWOwner] = useState("");
  const [wStages, setWStages] = useState(3);
  const [wAvgHours, setWAvgHours] = useState(24);

  const handleAddWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wName.trim() || !wOwner.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const newW = {
      id: `WF-${Math.floor(1000 + Math.random() * 9000)}`,
      name: wName,
      owner: wOwner,
      stages: Number(wStages),
      active: 0,
      completed: 0,
      avgHours: Number(wAvgHours)
    };
    setWorkflowsList([...workflowsList, newW]);
    toast.success(`Workflow '${wName}' created successfully`);
    setWName("");
    setWOwner("");
    setWStages(3);
    setWAvgHours(24);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <PageHeader 
        title="Workflow Management" 
        description="Design approval matrices, routing, escalation and delegation." 
        actions={<Button onClick={() => setIsDialogOpen(true)}><Plus className="h-4 w-4 mr-2" /> New workflow</Button>} 
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="Active Workflows" value={workflowsList.length} icon={Workflow} tone="primary" delta={2} />
        <StatCard label="Pending Tasks" value="146" icon={Timer} tone="warning" delta={-3} />
        <StatCard label="Completed (30d)" value="1,924" icon={CheckCircle2} tone="success" delta={9} />
        <StatCard label="Overdue" value="18" icon={AlertTriangle} tone="destructive" delta={-5} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Section className="lg:col-span-2" title="Workflow Dashboard">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr>
                <th className="text-left p-3 font-medium">Workflow</th><th className="text-left p-3 font-medium">Owner</th><th className="text-left p-3 font-medium">Stages</th><th className="text-left p-3 font-medium">Active</th><th className="text-left p-3 font-medium">Completed</th><th className="text-left p-3 font-medium">Avg time</th><th className="text-left p-3 font-medium">Load</th>
              </tr></thead>
              <tbody className="divide-y">
                {workflowsList.map((w) => (
                  <tr key={w.id} className="hover:bg-muted/40">
                    <td className="p-3"><div className="font-medium">{w.name}</div><div className="text-xs text-muted-foreground">{w.id}</div></td>
                    <td className="p-3">{w.owner}</td>
                    <td className="p-3">{w.stages}</td>
                    <td className="p-3">{w.active}</td>
                    <td className="p-3">{w.completed}</td>
                    <td className="p-3">{w.avgHours}h</td>
                    <td className="p-3 w-40"><Progress value={(w.active / (w.active + 5)) * 100} className="h-1.5" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="space-y-6">
          <Section title="Workflow Builder">
            <div className="rounded-lg border-2 border-dashed p-4 space-y-2">
              {["Submitter", "Manager Review", "Compliance", "Legal", "Final Sign-off"].map((s, i, arr) => (
                <div key={s}>
                  <div className="rounded-md bg-accent text-accent-foreground px-3 py-2 text-sm font-medium flex items-center justify-between">
                    <span>{i + 1}. {s}</span><span className="text-[10px] text-muted-foreground uppercase">{i === 0 ? "Start" : i === arr.length - 1 ? "End" : "Approver"}</span>
                  </div>
                  {i < arr.length - 1 && <div className="grid place-items-center py-1 text-muted-foreground"><ArrowRight className="h-3.5 w-3.5 rotate-90" /></div>}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => toast.success("Stage template added")}><Plus className="h-3.5 w-3.5 mr-1" /> Add stage</Button>
            </div>
          </Section>
          <Section title="Templates">
            <ul className="space-y-2">
              {templates.map((t) => <li key={t} className="flex items-center justify-between rounded-lg border p-2.5"><span className="text-sm">{t}</span><Button size="sm" variant="ghost" onClick={() => toast.success(`Workflow created from template: ${t}`)}>Use</Button></li>)}
            </ul>
          </Section>
        </div>
      </div>

      {/* New Workflow Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" />
              New Workflow Matrix
            </DialogTitle>
            <DialogDescription>
              Design a new sequential or parallel document approval workflow matrix.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddWorkflow}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="wName">Workflow Name</Label>
                <Input
                  id="wName"
                  placeholder="e.g. Finance Authorization Flow"
                  value={wName}
                  onChange={(e) => setWName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wOwner">Workflow Owner (Manager)</Label>
                <Input
                  id="wOwner"
                  placeholder="e.g. Aisha Rahman"
                  value={wOwner}
                  onChange={(e) => setWOwner(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="wStages">Number of Stages</Label>
                  <Input
                    id="wStages"
                    type="number"
                    min={1}
                    max={10}
                    value={wStages}
                    onChange={(e) => setWStages(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wAvgHours">Avg SLA (Hours)</Label>
                  <Input
                    id="wAvgHours"
                    type="number"
                    min={1}
                    value={wAvgHours}
                    onChange={(e) => setWAvgHours(Number(e.target.value))}
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
                Create Workflow
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
