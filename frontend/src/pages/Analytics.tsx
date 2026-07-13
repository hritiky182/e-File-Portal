import { PageHeader, Section } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { uploadTrend, departmentUsage, categoryBreakdown, workflowCompletion } from "@/mock/data";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Upload, Download, Users, Timer } from "lucide-react";

const cssChart = ["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)"];

const heat = Array.from({ length: 7 }, (_, r) => Array.from({ length: 24 }, (_, c) => ({ r, c, v: Math.round(Math.abs(Math.sin(r + c / 3) * 100)) })));

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Trends, KPIs and heat-maps across the document platform." />
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="Uploads (30d)" value="12,842" delta={8.4} icon={Upload} tone="primary" />
        <StatCard label="Downloads (30d)" value="34,120" delta={4.1} icon={Download} tone="info" />
        <StatCard label="Active Users" value="1,204" delta={2.6} icon={Users} tone="success" />
        <StatCard label="Avg Approval Time" value="14.2h" delta={-6.3} icon={Timer} tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Activity trend">
          <div className="h-72"><ResponsiveContainer><AreaChart data={uploadTrend}>
            <defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={cssChart[0]} stopOpacity={0.4}/><stop offset="100%" stopColor={cssChart[0]} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} /><YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} />
            <Area type="monotone" dataKey="uploads" stroke={cssChart[0]} fill="url(#a)" strokeWidth={2} />
          </AreaChart></ResponsiveContainer></div>
        </Section>
        <Section title="Department usage">
          <div className="h-72"><ResponsiveContainer><BarChart data={departmentUsage}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-25} textAnchor="end" height={60} /><YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} />
            <Bar dataKey="value" fill={cssChart[1]} radius={[4,4,0,0]} />
          </BarChart></ResponsiveContainer></div>
        </Section>
        <Section title="Category composition">
          <div className="h-72"><ResponsiveContainer><PieChart>
            <Pie data={categoryBreakdown} dataKey="value" outerRadius={95} label>{categoryBreakdown.map((_, i) => <Cell key={i} fill={cssChart[i % 5]} />)}</Pie>
            <Tooltip contentStyle={{ borderRadius: 8, background: "var(--popover)", border: "1px solid var(--border)", fontSize: 12 }} /><Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart></ResponsiveContainer></div>
        </Section>
        <Section title="Approval performance (radar)">
          <div className="h-72"><ResponsiveContainer><RadarChart data={workflowCompletion.concat([{ name: "SLA", value: 82 }, { name: "Escalations", value: 14 }])}>
            <PolarGrid /><PolarAngleAxis dataKey="name" fontSize={11} /><PolarRadiusAxis fontSize={10} />
            <Radar dataKey="value" stroke={cssChart[0]} fill={cssChart[0]} fillOpacity={0.3} />
          </RadarChart></ResponsiveContainer></div>
        </Section>
      </div>

      <Section title="Access heat-map (day × hour)" className="mt-6">
        <div className="overflow-x-auto">
          <div className="inline-grid gap-1 grid-cols-24">
            {heat.flat().map((cell) => (
              <div key={`${cell.r}-${cell.c}`} title={`${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][cell.r]} ${cell.c}:00 — ${cell.v} actions`}
                className="h-4 w-4 rounded-sm" style={{ background: `color-mix(in oklab, var(--chart-1) ${cell.v}%, transparent)` }} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground"><span>Less</span><div className="h-3 w-24 rounded-sm bg-gradient-to-r from-transparent to-primary" /><span>More</span></div>
        </div>
      </Section>
    </div>
  );
}
