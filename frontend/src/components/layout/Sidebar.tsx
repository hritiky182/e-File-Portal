import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Upload, ScanLine, Tags, GitBranch, Search,
  Workflow, CheckSquare, Bell, ClipboardList, ShieldCheck, ShieldAlert,
  BarChart3, PieChart, Users, KeyRound, Building2, Settings, Plug,
  DatabaseBackup, LifeBuoy, UserCircle, ChevronRight, Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav: Array<{ label: string; items: Array<{ to: string; label: string; icon: any }> }> = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/search", label: "Secure Search", icon: Search },
      { to: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Files & Documents",
    items: [
      { to: "/documents", label: "File Registry", icon: FileText },
      { to: "/documents/upload", label: "Upload & Register", icon: Upload },
      { to: "/scanning", label: "Scanning Module", icon: ScanLine },
      { to: "/metadata", label: "File Classification", icon: Tags },
      { to: "/versions", label: "Version Control", icon: GitBranch },
    ],
  },
  {
    label: "Movement & Approvals",
    items: [
      { to: "/workflows", label: "Workflow Designer", icon: Workflow },
      { to: "/approvals", label: "Approval Center", icon: CheckSquare },
    ],
  },
  {
    label: "Governance",
    items: [
      { to: "/audit", label: "Audit Trails", icon: ClipboardList },
      { to: "/security", label: "Security & Access", icon: ShieldCheck },
      { to: "/compliance", label: "Compliance & Acts", icon: ShieldAlert },
      { to: "/reports", label: "Reports & Disclosures", icon: BarChart3 },
      { to: "/analytics", label: "Analytics & Usage", icon: PieChart },
    ],
  },
  {
    label: "Administration",
    items: [
      { to: "/users", label: "Employee Directory", icon: Users },
      { to: "/roles", label: "Hierarchy & Roles", icon: KeyRound },
      { to: "/departments", label: "Departments", icon: Building2 },
      { to: "/settings", label: "System Settings", icon: Settings },
      { to: "/integrations", label: "Integrations", icon: Plug },
      { to: "/backup", label: "Backup & Recovery", icon: DatabaseBackup },
    ],
  },
  {
    label: "Personal",
    items: [
      { to: "/profile", label: "My Profile", icon: UserCircle },
      { to: "/help", label: "Help Center", icon: LifeBuoy },
    ],
  },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className={cn(
      "hidden lg:flex flex-col h-full shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200",
      collapsed ? "w-16" : "w-64",
    )}>
      <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border shrink-0">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShieldCheck className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight">CIS File Portal</div>
            <div className="text-[11px] text-sidebar-foreground/60 truncate">CIS File System</div>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto no-scrollbar py-3">
        {nav.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
                {group.label}
              </div>
            )}
            <ul className="space-y-0.5 px-2">
              {group.items.map((it) => {
                const hasExactMatch = nav.some((g) => g.items.some((item) => item.to === pathname));
                const active = hasExactMatch
                  ? pathname === it.to
                  : pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to + "/"));
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{it.label}</span>}
                      {!collapsed && active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-80" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border text-[11px] text-sidebar-foreground/60">
          <div>v4.2.1 · Central Server</div>
          <div className="mt-0.5">ISO 27001 Compliant</div>
        </div>
      )}
    </aside>
  );
}
