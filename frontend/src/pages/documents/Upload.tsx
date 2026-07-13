import { Link, useNavigate } from "react-router-dom";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, CheckCircle2, CloudUpload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([
    { name: "Cabinet_Note_Treasury_Clearance_2026.pdf", size: 2.4, progress: 100 },
    { name: "RTI_Response_DOPT_8924.pdf", size: 0.9, progress: 76 },
    { name: "Circular_Rules_Amendment_Draft.docx", size: 1.2, progress: 100 },
  ]);

  return (
    <div>
      <PageHeader
        title="Register & Upload e-File"
        description="Register new dossiers, circulars or cabinet notes. File classification drives workflows, routing desks, and retention."
        actions={<Button variant="outline" asChild><Link to="/documents">Cancel</Link></Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Section>
            <label htmlFor="drop" className="block cursor-pointer rounded-xl border-2 border-dashed border-input hover:border-primary/60 hover:bg-primary/5 transition p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><CloudUpload className="h-7 w-7" /></div>
              <div className="mt-4 font-semibold">Drag & drop files here</div>
              <div className="text-sm text-muted-foreground mt-1">or click to browse. PDF, DOCX, XLSX, JPG, PNG · Max 100 MB each</div>
              <input id="drop" type="file" multiple className="sr-only" />
            </label>
          </Section>

          <Section title="Upload queue" description={`${files.length} file(s) in queue`}>
            <ul className="space-y-3">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary shrink-0"><FileText className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium truncate">{f.name}</div>
                      <div className="text-xs text-muted-foreground shrink-0">{f.size.toFixed(1)} MB</div>
                    </div>
                    <Progress value={f.progress} className="h-1.5 mt-1.5" />
                  </div>
                  {f.progress === 100 ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFiles((xs) => xs.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button>}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="e-File Metadata" description="Applied to all files in queue">
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Files successfully uploaded and registered in e-File Portal"); navigate("/documents"); }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5"><Label>Category</Label>
                  <Select defaultValue="Cabinet Note"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="Cabinet Note">Cabinet Note</SelectItem>
                    <SelectItem value="Gazette Notification">Gazette Notification</SelectItem>
                    <SelectItem value="RTI Request">RTI Request</SelectItem>
                    <SelectItem value="Departmental Circular">Departmental Circular</SelectItem>
                    <SelectItem value="Treasury Sanction">Treasury Sanction</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-1.5"><Label>Department / Ministry</Label>
                  <Select defaultValue="Finance"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="Finance">Ministry of Finance</SelectItem>
                    <SelectItem value="Home">Ministry of Home Affairs</SelectItem>
                    <SelectItem value="IT">Department of IT</SelectItem>
                    <SelectItem value="Cabinet">Cabinet Secretariat</SelectItem>
                    <SelectItem value="Personnel">DOPT</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-1.5"><Label>Owner / Custodian</Label><Input defaultValue="Shri Aisha Rahman (Joint Secretary)" /></div>
                <div className="space-y-1.5"><Label>Security Level</Label>
                  <Select defaultValue="Confidential"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="Public">Public</SelectItem><SelectItem value="Internal">Internal</SelectItem><SelectItem value="Confidential">Confidential</SelectItem><SelectItem value="Restricted">Restricted</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-1.5"><Label>Retention Policy</Label>
                  <Select defaultValue="Class A"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="Class A">Class A (Permanent)</SelectItem>
                    <SelectItem value="Class B">Class B (15 years)</SelectItem>
                    <SelectItem value="Class C">Class C (5 years)</SelectItem>
                    <SelectItem value="temp">Temporary (1 year)</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="col-span-2 space-y-1.5"><Label>Workflow clearance routing</Label>
                  <Select defaultValue="cabinet"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="cabinet">Cabinet Note Clearance</SelectItem>
                    <SelectItem value="rti">RTI Response Approval</SelectItem>
                    <SelectItem value="budget">Budget Sanction Order</SelectItem>
                    <SelectItem value="none">No workflow (Ad-hoc Desk movement)</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="col-span-2 space-y-1.5"><Label>Tags</Label><Input placeholder="e.g. classified, urgent, rti" defaultValue="classified, urgent" /></div>
                <div className="col-span-2 space-y-1.5"><Label>Description / Subject</Label><Textarea rows={3} placeholder="Provide descriptive subject details…" /></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1"><Upload className="h-4 w-4 mr-2" /> Register & Upload</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/documents")}>Cancel</Button>
              </div>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
