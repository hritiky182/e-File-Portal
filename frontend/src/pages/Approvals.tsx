import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { approvals } from "@/mock/data";
import { CheckCircle2, XCircle, Clock, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type ApprovalType = typeof approvals[number] & { status: string; comment?: string };

export default function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalType[]>(() =>
    approvals.map((a) => ({ ...a, status: "pending", comment: "" }))
  );

  const handleAction = (id: string, action: "completed" | "rejected" | "delegated", msg: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: action };
        }
        return item;
      })
    );
    toast.success(msg);
  };

  const handleCommentChange = (id: string, comment: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, comment };
        }
        return item;
      })
    );
  };

  const pending = items.filter((i) => i.status === "pending");
  const completed = items.filter((i) => i.status === "completed");
  const rejected = items.filter((i) => i.status === "rejected");
  const delegated = items.filter((i) => i.status === "delegated");

  return (
    <div>
      <PageHeader title="Approval Center" description="Review tasks assigned to you across all workflows." />
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
          <TabsTrigger value="delegated">Delegated ({delegated.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pending.length === 0 ? (
            <Section>
              <div className="text-center py-10 text-sm text-muted-foreground">
                No pending tasks found. All clear!
              </div>
            </Section>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {pending.map((a) => (
                <Section key={a.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{a.id} · {a.department}</div>
                      <div className="text-sm font-semibold mt-0.5 truncate">{a.document}</div>
                      <div className="text-xs text-muted-foreground">From {a.requester} · Stage: {a.stage}</div>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${a.priority === "High" ? "bg-destructive/10 text-destructive" : a.priority === "Medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>{a.priority}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Workflow progress</span><span>{a.progress}%</span></div>
                    <Progress value={a.progress} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3"><Clock className="h-3.5 w-3.5" /> Due {a.dueDate}</div>
                  <Textarea
                    rows={2}
                    placeholder="Comment (optional)…"
                    value={a.comment}
                    onChange={(e) => handleCommentChange(a.id, e.target.value)}
                    className="mt-3"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => handleAction(a.id, "completed", `File approval completed for ${a.document}`)}>
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleAction(a.id, "rejected", `Rejected and returned ${a.document}`)}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAction(a.id, "delegated", `Task delegated to subordinate officer`)}>
                      <UserCheck className="h-4 w-4 mr-1" /> Delegate
                    </Button>
                  </div>
                </Section>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {completed.length === 0 ? (
            <Section>
              <div className="text-center py-10 text-sm text-muted-foreground">No completed tasks yet.</div>
            </Section>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {completed.map((a) => (
                <Section key={a.id}>
                  <div className="flex items-start justify-between gap-3 opacity-80">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{a.id} · {a.department}</div>
                      <div className="text-sm font-semibold mt-0.5 truncate">{a.document}</div>
                      <div className="text-xs text-muted-foreground">Approved stage: {a.stage}</div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-success/10 text-success">Approved</span>
                  </div>
                  {a.comment && (
                    <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground italic">
                      Comment: "{a.comment}"
                    </div>
                  )}
                </Section>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          {rejected.length === 0 ? (
            <Section>
              <div className="text-center py-10 text-sm text-muted-foreground">No rejected tasks yet.</div>
            </Section>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {rejected.map((a) => (
                <Section key={a.id}>
                  <div className="flex items-start justify-between gap-3 opacity-80">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{a.id} · {a.department}</div>
                      <div className="text-sm font-semibold mt-0.5 truncate">{a.document}</div>
                      <div className="text-xs text-muted-foreground">Returned at stage: {a.stage}</div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Rejected / Returned</span>
                  </div>
                  {a.comment && (
                    <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground italic">
                      Objection Details: "{a.comment}"
                    </div>
                  )}
                </Section>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="delegated" className="mt-4">
          {delegated.length === 0 ? (
            <Section>
              <div className="text-center py-10 text-sm text-muted-foreground">No delegated tasks yet.</div>
            </Section>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {delegated.map((a) => (
                <Section key={a.id}>
                  <div className="flex items-start justify-between gap-3 opacity-80">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{a.id} · {a.department}</div>
                      <div className="text-sm font-semibold mt-0.5 truncate">{a.document}</div>
                      <div className="text-xs text-muted-foreground">Delegated from stage: {a.stage}</div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-info/10 text-info">Delegated</span>
                  </div>
                  {a.comment && (
                    <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground italic">
                      Delegation notes: "{a.comment}"
                    </div>
                  )}
                </Section>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
