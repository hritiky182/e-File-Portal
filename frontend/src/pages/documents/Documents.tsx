import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { documents } from "@/mock/data";
import { StatusBadge, SecurityBadge } from "@/components/common/badges";
import { FileIcon } from "@/components/common/FileIcon";
import { Search, Filter, LayoutGrid, List, Upload, MoreHorizontal, Star, Share2, Download, Trash2, Copy, Pencil, GitBranch, ClipboardList, FolderPlus, Folder, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const folders = [
  { name: "Cabinet Secretariats", count: 1420 },
  { name: "Treasury & Finance Bills", count: 2840 },
  { name: "Gazette Notifications", count: 940 },
  { name: "RTI Files & Circulars", count: 1832 },
  { name: "Establishment & Personnel", count: 3612 },
  { name: "Public Works & Revenue", count: 488 },
];

export default function DocumentsPage() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = documents;
    if (tab === "starred") list = list.filter((d) => d.starred);
    if (tab === "shared") list = list.filter((d) => d.shared);
    if (tab === "archived") list = list.filter((d) => d.archived);
    if (tab === "recent") list = [...list].sort((a, b) => (a.modifiedAt < b.modifiedAt ? 1 : -1)).slice(0, 20);
    if (q) list = list.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.owner.toLowerCase().includes(q.toLowerCase()));
    return list;
  }, [tab, q]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allChecked = filtered.length > 0 && filtered.every((d) => selected.includes(d.id));

  return (
    <div>
      <PageHeader
        title="e-File Registry"
        description="Browse, track, and dispatch e-files across ministries and desks."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("New Section Folder created")}><FolderPlus className="h-4 w-4 mr-2" /> New Section Folder</Button>
            <Button asChild><Link to="/documents/upload"><Upload className="h-4 w-4 mr-2" /> Register e-File</Link></Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border bg-card p-4 h-fit">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Folders</div>
          <ul className="space-y-0.5">
            {folders.map((f) => (
              <li key={f.name}>
                <button onClick={() => toast.success(`Viewing folder: ${f.name}`)} className="w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <Folder className="h-4 w-4 text-primary" />
                  <span className="truncate flex-1 text-left">{f.name}</span>
                  <span className="text-xs text-muted-foreground">{f.count}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Filters</div>
          <div className="space-y-3 text-sm">
            <Select><SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger><SelectContent>{Array.from(new Set(documents.map((d) => d.category))).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger><SelectContent>{Array.from(new Set(documents.map((d) => d.department))).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            <Select><SelectTrigger><SelectValue placeholder="Security" /></SelectTrigger><SelectContent><SelectItem value="Public">Public</SelectItem><SelectItem value="Internal">Internal</SelectItem><SelectItem value="Confidential">Confidential</SelectItem><SelectItem value="Restricted">Restricted</SelectItem></SelectContent></Select>
          </div>
        </aside>

        <div>
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-8 h-9 w-56" /></div>
                <Button variant="outline" size="icon" className="h-9 w-9"><Filter className="h-4 w-4" /></Button>
                <div className="flex rounded-md border">
                  <Button variant={view === "table" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-r-none" onClick={() => setView("table")}><List className="h-4 w-4" /></Button>
                  <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-9 w-9 rounded-l-none" onClick={() => setView("grid")}><LayoutGrid className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {selected.length > 0 && (
              <div className="flex items-center gap-2 mb-3 rounded-lg border bg-accent/50 px-3 py-2 text-sm">
                <span className="font-medium">{selected.length} selected</span>
                <div className="ml-auto flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => toast.success("Downloaded")}><Download className="h-4 w-4 mr-1" /> Download</Button>
                  <Button size="sm" variant="ghost" onClick={() => toast.success("Shared")}><Share2 className="h-4 w-4 mr-1" /> Share</Button>
                  <Button size="sm" variant="ghost" onClick={() => toast.success("Archived")}><ClipboardList className="h-4 w-4 mr-1" /> Archive</Button>
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { toast.success("Moved to Trash"); setSelected([]); }}><Trash2 className="h-4 w-4 mr-1" /> Delete</Button>
                </div>
              </div>
            )}

            <TabsContent value={tab} className="mt-0">
              {view === "table" ? (
                <div className="rounded-xl border bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th className="w-10 p-3"><Checkbox checked={allChecked} onCheckedChange={(v) => setSelected(v ? filtered.map((d) => d.id) : [])} /></th>
                          <th className="text-left p-3 font-medium">File Subject / Name</th>
                          <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                          <th className="text-left p-3 font-medium hidden lg:table-cell">Custodian Desk</th>
                          <th className="text-left p-3 font-medium hidden lg:table-cell">Ministry/Dept</th>
                          <th className="text-left p-3 font-medium hidden xl:table-cell">Version</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium hidden xl:table-cell">Security</th>
                          <th className="text-left p-3 font-medium hidden md:table-cell">Last Movement</th>
                          <th className="w-10 p-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filtered.map((d) => (
                          <tr key={d.id} className="hover:bg-muted/40">
                            <td className="p-3"><Checkbox checked={selected.includes(d.id)} onCheckedChange={() => toggle(d.id)} /></td>
                            <td className="p-3">
                              <Link to={`/documents/${d.id}`} className="flex items-center gap-3 group">
                                <FileIcon type={d.type} />
                                <div className="min-w-0">
                                  <div className="font-medium truncate group-hover:text-primary">{d.name}</div>
                                  <div className="text-xs text-muted-foreground">{d.id} · {(d.sizeKb / 1024).toFixed(1)} MB</div>
                                </div>
                                {d.starred && <Star className="h-3.5 w-3.5 text-warning fill-warning" />}
                              </Link>
                            </td>
                            <td className="p-3 hidden md:table-cell text-muted-foreground">{d.category}</td>
                            <td className="p-3 hidden lg:table-cell">{d.owner}</td>
                            <td className="p-3 hidden lg:table-cell text-muted-foreground">{d.department}</td>
                            <td className="p-3 hidden xl:table-cell text-muted-foreground">v{d.version}</td>
                            <td className="p-3"><StatusBadge status={d.status} /></td>
                            <td className="p-3 hidden xl:table-cell"><SecurityBadge level={d.security} /></td>
                            <td className="p-3 hidden md:table-cell text-muted-foreground text-xs">{d.modifiedAt}</td>
                            <td className="p-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild><Link to={`/documents/${d.id}`}>Preview</Link></DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.success("Downloading")}><Download className="h-4 w-4 mr-2" /> Download</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.success("Share link copied")}><Share2 className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                                  <DropdownMenuItem><Copy className="h-4 w-4 mr-2" /> Copy</DropdownMenuItem>
                                  <DropdownMenuItem><Pencil className="h-4 w-4 mr-2" /> Rename</DropdownMenuItem>
                                  <DropdownMenuItem><GitBranch className="h-4 w-4 mr-2" /> Version history</DropdownMenuItem>
                                  <DropdownMenuItem><ClipboardList className="h-4 w-4 mr-2" /> Audit history</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between p-3 border-t text-xs text-muted-foreground">
                    <div>{filtered.length} of {documents.length} documents</div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm">1</Button>
                      <Button variant="ghost" size="sm">2</Button>
                      <Button variant="ghost" size="sm">3</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((d) => (
                    <Link to={`/documents/${d.id}`} key={d.id} className="rounded-xl border bg-card p-4 hover:shadow-elegant transition block">
                      <div className="flex items-start justify-between">
                        <FileIcon type={d.type} className="h-11 w-11" />
                        {d.starred && <Star className="h-4 w-4 text-warning fill-warning" />}
                      </div>
                      <div className="mt-3 font-medium text-sm truncate">{d.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{d.category} · v{d.version}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <StatusBadge status={d.status} />
                        <SecurityBadge level={d.security} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
