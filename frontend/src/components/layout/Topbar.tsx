import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, Moon, Sun, Upload, Plus, HelpCircle, LogOut, User, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/mock/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const crumbs = pathname.split("/").filter(Boolean);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur flex items-center gap-3 px-4 sticky top-0 z-30">
      <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:inline-flex"><Menu className="h-5 w-5" /></Button>

      <nav className="hidden md:flex items-center text-sm text-muted-foreground gap-1.5">
        <Link to="/dashboard" className="hover:text-foreground">Home</Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="opacity-50">/</span>
            <span className={i === crumbs.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>{c.replace(/-/g, " ")}</span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      <form
        onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q)}`); }}
        className="hidden md:flex relative w-[380px]"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search files, workflows, employees… (⌘K)"
          className="pl-9 h-9 bg-secondary/60 border-transparent focus-visible:bg-background"
        />
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Quick Actions <ChevronDown className="h-3.5 w-3.5 opacity-70" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Create</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate("/documents/upload")}><Upload className="h-4 w-4 mr-2" /> Register File</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/scanning")}>New scan job</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/workflows")}>Start workflow</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/users")}>Invite Employee</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/reports")}>Generate report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
        {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unread > 0 && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-96 p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="text-sm font-semibold">Notifications</div>
            <Button variant="ghost" size="sm" onClick={() => toast.success("All marked as read")}>Mark all read</Button>
          </div>
          <div className="max-h-96 overflow-auto divide-y">
            {notifications.map((n) => (
              <div key={n.id} className="px-4 py-3 hover:bg-muted/40 flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full shrink-0" style={{ background: n.read ? "transparent" : "hsl(var(--primary))" }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium truncate">{n.title}</div>
                    <Badge variant="outline" className="text-[10px]">{n.type}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{n.body}</div>
                  <div className="text-[11px] text-muted-foreground/80 mt-0.5">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/notifications")}>Open notification center</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" onClick={() => navigate("/help")}><HelpCircle className="h-5 w-5" /></Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted transition">
            <Avatar className="h-8 w-8"><AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=Aisha%20Rahman" /><AvatarFallback>AR</AvatarFallback></Avatar>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold leading-tight">Aisha Rahman</div>
              <div className="text-[10px] text-muted-foreground leading-tight">VP of Operations</div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate("/profile")}><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}><SettingsIcon className="h-4 w-4 mr-2" /> Preferences</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { localStorage.removeItem("authenticated"); navigate("/login"); }} className="text-destructive"><LogOut className="h-4 w-4 mr-2" /> Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
