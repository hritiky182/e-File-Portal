import { Link } from "react-router-dom";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { FileText, Clock, CheckCircle2, XCircle, HardDrive, Building2, Upload, ScanLine, ShieldAlert, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadTrend, departmentUsage, categoryBreakdown, storageGrowth, workflowCompletion, documents, auditLogs, approvals } from "@/mock/data";
import { StatusBadge } from "@/components/common/badges";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";
import { FileIcon } from "@/components/common/FileIcon";

const cssChart = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export default function Dashboard() {
  const recent = documents.slice(0, 6);
  const recentAudit = auditLogs.slice(0, 6);
  return (
    <div>
      <PageHeader
        title="Enterprise Overview Dashboard"
        description="Real-time monitoring of files, movements, approvals, and audit trails."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/documents/upload"><Upload className="h-4 w-4 mr-2" /> Register File</Link></Button>
            <Button asChild><Link to="/scanning"><ScanLine className="h-4 w-4 mr-2" /> Physical Scanning</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Active Files" value="284,912" delta={4.2} icon={FileText} tone="primary" />
        <StatCard label="Pending Desks" value="182" delta={-8.1} icon={Clock} tone="warning" />
        <StatCard label="Cleared Today" value="1,247" delta={12.4} icon={CheckCircle2} tone="success" />
        <StatCard label="Returned Today" value="34" delta={-2.3} icon={XCircle} tone="destructive" />
        <StatCard label="Secure Vault Storage" value="4.8 TB" delta={3.1} icon={HardDrive} tone="info" />
        <StatCard label="Active Departments" value="12" delta={0} icon={Building2} tone="primary" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Section className="lg:col-span-2" title="File Registration & Movement Trend" description="Last 12 months activity">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={uploadTrend}>
                <defs>
                  <linearGradient id="u1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={cssChart[0]} stopOpacity={0.4} /><stop offset="100%" stopColor={cssChart[0]} stopOpacity={0} /></linearGradient>
                  <linearGradient id="u2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={cssChart[1]} stopOpacity={0.3} /><stop offset="100%" stopColor={cssChart[1]} stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--popover)", fontSize: 12 }} />
                <Area type="monotone" dataKey="uploads" stroke={cssChart[0]} fill="url(#u1)" strokeWidth={2} />
                <Area type="monotone" dataKey="downloads" stroke={cssChart[1]} fill="url(#u2)" strokeWidth={2} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Workflow Status" description="Current cycle distribution">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={workflowCompletion} innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {workflowCompletion.map((_, i) => <Cell key={i} fill={cssChart[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--popover)", fontSize: 12 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Section title="Department Wise File Volume" description="Documents per department">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={departmentUsage} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={110} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--popover)", fontSize: 12 }} />
                <Bar dataKey="value" fill={cssChart[0]} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="e-Vault Storage Trend" description="Rolling 8 quarters">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={storageGrowth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="quarter" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--popover)", fontSize: 12 }} />
                <Line type="monotone" dataKey="tb" stroke={cssChart[2]} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="File Classifications" description="Composition">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" outerRadius={90}>
                  {categoryBreakdown.map((_, i) => <Cell key={i} fill={cssChart[i % 5]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--popover)", fontSize: 12 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Section
          className="lg:col-span-2"
          title="Recent Uploads"
          actions={<Button variant="ghost" size="sm" asChild><Link to="/documents">View all <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>}
        >
          <ul className="divide-y">
            {recent.map((d) => (
              <li key={d.id} className="flex items-center gap-3 py-3">
                <FileIcon type={d.type} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.department} · {d.owner} · v{d.version}</div>
                </div>
                <StatusBadge status={d.status} />
                <div className="text-xs text-muted-foreground w-24 text-right hidden md:block">{d.modifiedAt}</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pending Reviews" actions={<Button variant="ghost" size="sm" asChild><Link to="/approvals">Open <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>}>
          <ul className="space-y-3">
            {approvals.slice(0, 5).map((a) => (
              <li key={a.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{a.document}</div>
                    <div className="text-xs text-muted-foreground">{a.stage} · Due {a.dueDate}</div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${a.priority === "High" ? "bg-destructive/10 text-destructive" : a.priority === "Medium" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>{a.priority}</span>
                </div>
                <Progress value={a.progress} className="h-1.5 mt-2" />
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Section className="lg:col-span-2" title="Activity Timeline" actions={<Activity className="h-4 w-4 text-muted-foreground" />}>
          <ol className="relative border-l border-border ml-3 space-y-4">
            {recentAudit.map((a) => (
              <li key={a.id} className="ml-4">
                <span className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="text-sm"><span className="font-semibold">{a.actor}</span> <span className="text-muted-foreground">{a.action.toLowerCase()}</span> <span className="font-medium">{a.target}</span></div>
                <div className="text-xs text-muted-foreground">{a.timestamp} · {a.ip}</div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Compliance Alerts" actions={<ShieldAlert className="h-4 w-4 text-warning" />}>
          <ul className="space-y-3 text-sm">
            <li className="rounded-lg border border-warning/30 bg-warning/5 p-3">
              <div className="font-semibold">RTI Response pending</div>
              <div className="text-xs text-muted-foreground">12 RTI requests are approaching the 30-day statutory response limit.</div>
            </li>
            <li className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <div className="font-semibold">Record Retention Review</div>
              <div className="text-xs text-muted-foreground">15 establishment order files exceed 25-year Class A transfer limit.</div>
            </li>
            <li className="rounded-lg border p-3">
              <div className="font-semibold">Public Records Act Review</div>
              <div className="text-xs text-muted-foreground">Annual departmental file audit due by Aug 15.</div>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
