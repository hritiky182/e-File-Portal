import { useParams, Link, useNavigate } from "react-router-dom";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { documents } from "@/mock/data";
import { StatusBadge, SecurityBadge } from "@/components/common/badges";
import { FileIcon } from "@/components/common/FileIcon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, XCircle, MessageSquare, ArrowLeft, Send, CheckSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doc = documents.find((d) => d.id === id);

  if (!doc) {
    return (
      <div className="p-8 text-center">
        <div className="text-lg font-semibold text-destructive">File not found.</div>
        <Link to="/documents" className="text-primary underline mt-2 block">Back to e-File Registry</Link>
      </div>
    );
  }

  // Interactive State
  const [digitalSignatureStatus, setDigitalSignatureStatus] = useState(doc.digitalSignatureStatus || "Unsigned");
  const [currentDesk, setCurrentDesk] = useState(doc.currentDesk || doc.owner || "Registry Desk");
  const [status, setStatus] = useState(doc.status);
  const [comments, setComments] = useState([
    { author: "Shri Mohammed Al-Farsi (Under Secretary)", time: "2h ago", text: "Proposals on page 4 are in order. Budget sanction of ₹24.5 Lakhs may be forwarded to JS for approval." },
    { author: "Smt Priya Sharma (Deputy Secretary)", time: "yesterday", text: "Cabinet draft has been vetted by legal cell. No objections found." }
  ]);
  const [newComment, setNewComment] = useState("");
  const [movementTrail, setMovementTrail] = useState([
    { action: "File Created", officer: "Shri Ravi Iyer (Section Officer)", desk: "Section Registry Desk", date: "2026-07-01" },
    { action: "Noted & Vetted", officer: "Smt Priya Sharma (Deputy Secretary)", desk: "Administration Desk", date: "2026-07-03" },
    { action: "Digitally Signed (Aadhaar e-Sign)", officer: "Shri Mohammed Al-Farsi (Under Secretary)", desk: "Compliance Cell", date: "2026-07-05" },
    { action: "Forwarded to Joint Secretary", officer: doc.owner, desk: "Joint Secretary Desk", date: doc.createdAt }
  ]);

  // Dialog States
  const [isSignOpen, setIsSignOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Dispatch States
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [moveRemarks, setMoveRemarks] = useState("");

  const handlePostNote = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { author: "Shri Aisha Rahman (Joint Secretary)", time: "Just now", text: newComment }
    ]);
    setNewComment("");
    toast.success("Note added to Green Note Sheet");
  };

  const handleRequestOtp = () => {
    if (aadhaarNumber.length !== 12 || isNaN(Number(aadhaarNumber))) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to registered mobile number (******9923)");
  };

  const handleVerifySign = () => {
    if (otp.length !== 6 || isNaN(Number(otp))) {
      toast.error("Please enter the 6-digit OTP code");
      return;
    }
    setDigitalSignatureStatus("Verified");
    setComments([
      ...comments,
      {
        author: "Shri Aisha Rahman (Joint Secretary)",
        time: "Just now",
        text: "Digitally signed using UIDAI Aadhaar e-Sign service. Transaction Ref: DSC-928374-NIC."
      }
    ]);
    setMovementTrail([
      ...movementTrail,
      { action: "Digitally Signed (Aadhaar e-Sign)", officer: "Shri Aisha Rahman (Joint Secretary)", desk: "Joint Secretary Desk", date: "2026-07-13" }
    ]);
    setIsSignOpen(false);
    setOtpSent(false);
    setAadhaarNumber("");
    setOtp("");
    toast.success("Aadhaar DSC / e-Sign generated and verified successfully.");
  };

  const handleDispatch = () => {
    if (!selectedOfficer || !selectedDept) {
      toast.error("Please select a target Department and Officer");
      return;
    }
    setCurrentDesk(`${selectedOfficer} (${selectedDept})`);
    setComments([
      ...comments,
      {
        author: "Shri Aisha Rahman (Joint Secretary)",
        time: "Just now",
        text: `File forwarded to ${selectedOfficer} (${selectedDept}). Dispatch Remarks: ${moveRemarks || "No remarks."}`
      }
    ]);
    setMovementTrail([
      ...movementTrail,
      {
        action: "Forwarded / Dispatched",
        officer: `Shri Aisha Rahman (Joint Secretary) -> ${selectedOfficer}`,
        desk: `${selectedDept} Desk`,
        date: "2026-07-13"
      }
    ]);
    setIsMoveOpen(false);
    setSelectedOfficer("");
    setSelectedDept("");
    setMoveRemarks("");
    toast.success(`e-File successfully moved to ${selectedOfficer}'s desk.`);
  };

  const handleApprove = () => {
    setStatus("Approved");
    setComments([
      ...comments,
      { author: "Shri Aisha Rahman (Joint Secretary)", time: "Just now", text: "e-File approved and cleared for dispatch." }
    ]);
    toast.success("e-File approved and cleared.");
  };

  const handleReturn = () => {
    setStatus("Rejected");
    setComments([
      ...comments,
      { author: "Shri Aisha Rahman (Joint Secretary)", time: "Just now", text: "File returned to lower desk with objections for review." }
    ]);
    toast.error("File returned with objections.");
  };

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate("/documents")} className="mb-3"><ArrowLeft className="h-4 w-4 mr-1" /> Back to e-File Registry</Button>
      <PageHeader
        title={doc.name}
        description={`File No: ${doc.id} · ${doc.category} · ${doc.department}`}
        actions={
          <>
            <Button variant="outline" onClick={() => setIsMoveOpen(true)}> <Send className="h-4 w-4 mr-2" /> Dispatch / Move</Button>
            <Button variant="outline" onClick={() => setIsSignOpen(true)}><CheckSquare className="h-4 w-4 mr-2" /> Digital Sign (e-Sign)</Button>
            <Button variant="outline" onClick={() => toast.success("Downloading official PDF copy")}><Download className="h-4 w-4 mr-2" /> Download</Button>
            <Button variant="destructive" onClick={handleReturn}> <XCircle className="h-4 w-4 mr-2" /> Return (Objection)</Button>
            <Button onClick={handleApprove}><CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Clear</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <Section>
            <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-secondary to-muted grid place-items-center border">
              <div className="text-center max-w-md p-8 w-full">
                <FileIcon type={doc.type} className="h-16 w-16 mx-auto text-primary" />
                <div className="mt-4 text-lg font-semibold">{doc.type} Official Dossier</div>
                <div className="text-sm text-muted-foreground mt-1">Official Viewer for {doc.id}</div>
                <div className="mt-6 space-y-2 text-left text-sm bg-emerald-50/50 border border-emerald-200/50 dark:bg-emerald-950/10 dark:border-emerald-900/30 rounded-lg p-4 shadow-soft">
                  <div className="font-semibold border-b pb-2 text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <span>Green Note Sheet (Noting & Drafting)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">FILE NOTE</span>
                  </div>
                  <p className="text-xs font-semibold mt-2">Subject: {doc.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Refer notes on file regarding {doc.category}. The proposed guidelines are compliant with the Public Records Act, 1993 and have been validated against the departmental circular database.
                  </p>
                  <div className="mt-4 pt-2 border-t text-[10px] text-muted-foreground flex justify-between">
                    <span>Officer In-charge: {doc.owner}</span>
                    <span>Current Desk: {currentDesk}</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Tabs defaultValue="notes" className="mt-6">
            <TabsList>
              <TabsTrigger value="notes">Green Note Sheet</TabsTrigger>
              <TabsTrigger value="movement">File Movement Trail</TabsTrigger>
              <TabsTrigger value="correspondence">Correspondence Portion</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <Section>
                <div className="space-y-4">
                  {comments.map((c, idx) => (
                    <div key={idx} className="flex gap-3 border-l-2 border-emerald-500 pl-3">
                      <div className="flex-1">
                        <div className="text-sm"><span className="font-semibold">{c.author}</span> <span className="text-muted-foreground">· {c.time}</span></div>
                        <div className="text-sm mt-0.5 text-muted-foreground">{c.text}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-3 border-t flex-col">
                    <Textarea rows={2} placeholder="Add formal note / comments to this e-File note sheet…" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <Button className="self-end mt-2" onClick={handlePostNote}><MessageSquare className="h-4 w-4 mr-2" /> Post Note</Button>
                  </div>
                </div>
              </Section>
            </TabsContent>
            <TabsContent value="movement">
              <Section>
                <ol className="relative border-l ml-3 space-y-4">
                  {movementTrail.map((a, i) => (
                    <li key={i} className="ml-4">
                      <span className="absolute -left-[6px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                      <div className="text-sm font-medium">{a.action}</div>
                      <div className="text-xs text-muted-foreground">{a.officer} · {a.desk} · {a.date}</div>
                    </li>
                  ))}
                </ol>
              </Section>
            </TabsContent>
            <TabsContent value="correspondence">
              <Section>
                <ul className="divide-y">
                  {documents.slice(0, 4).map((d) => (
                    <li key={d.id} className="py-3 flex items-center gap-3">
                      <FileIcon type={d.type} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{d.name}</div>
                        <div className="text-xs text-muted-foreground">File No: {d.id} · v{d.version}</div>
                      </div>
                      <StatusBadge status={d.status} />
                    </li>
                  ))}
                </ul>
              </Section>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <Section title="e-File Metadata">
            <dl className="text-sm space-y-2.5">
              {[
                ["File No", doc.id],
                ["Format Type", doc.type],
                ["Version / Revision", `v${doc.version}`],
                ["Clearance Status", <StatusBadge key="s" status={status} />],
                ["Security Level", <SecurityBadge key="sec" level={doc.security} />],
                ["Desk Custodian", currentDesk],
                ["Department / Ministry", doc.department],
                ["e-Sign Status", <span key="sig" className={`text-xs font-semibold px-2 py-0.5 rounded ${digitalSignatureStatus === "Verified" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400"}`}>{digitalSignatureStatus}</span>],
                ["Retention Policy", "Class A (Permanent Record)"],
                ["Registry Date", doc.createdAt],
                ["Last Movement", doc.modifiedAt],
                ["Dossier Size", `${(doc.sizeKb / 1024).toFixed(1)} MB`],
              ].map(([k, v]) => (<div key={k as string} className="flex justify-between gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium text-right">{v}</dd></div>))}
              <div className="flex flex-wrap gap-1 pt-2 border-t">{doc.tags.map((t: string) => <span key={t} className="text-[10px] uppercase tracking-wide bg-muted rounded px-1.5 py-0.5 font-semibold text-muted-foreground">{t}</span>)}</div>
            </dl>
          </Section>

          <Section title="Notes History Summary">
            <ol className="space-y-3 text-sm">
              {[3,2,1].map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 rounded-full ${n === 3 ? "bg-emerald-500 ring-4 ring-emerald-500/20" : "bg-muted-foreground/40"}`} />
                  <div className="flex-1">
                    <div className="flex justify-between"><span className="font-medium">Note #{n} {n === 3 && <span className="text-[10px] bg-primary/10 text-primary rounded px-1 ml-1 font-semibold">CURRENT</span>}</span><span className="text-xs text-muted-foreground">2026-07-{10 + n}</span></div>
                    <div className="text-xs text-muted-foreground">{["Smt Priya Sharma (Deputy Secretary)","Shri Mohammed Al-Farsi (Under Secretary)","Shri Ravi Iyer (Section Officer)"][n-1]} · {["Final signed note sheet","Budget details appended","Dossier registered"][n-1]}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </aside>
      </div>

      {/* Digital Sign (e-Sign) Aadhaar Dialog */}
      <Dialog open={isSignOpen} onOpenChange={setIsSignOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Aadhaar e-Sign Gateway
            </DialogTitle>
            <DialogDescription>
              Verify your identity using UIDAI Aadhaar e-Sign service to apply your official digital signature.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="aadhaar">Aadhaar Number (12 digits)</Label>
              <Input
                id="aadhaar"
                placeholder="Enter 12-digit Aadhaar number"
                maxLength={12}
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                disabled={otpSent}
              />
            </div>
            {otpSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter 6-Digit OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter OTP sent to mobile"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            {!otpSent ? (
              <Button type="button" onClick={handleRequestOtp} className="w-full">
                Request OTP
              </Button>
            ) : (
              <div className="flex gap-2 w-full">
                <Button type="button" variant="outline" onClick={() => setOtpSent(false)} className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={handleVerifySign} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Verify & Sign
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispatch / Move Dialog */}
      <Dialog open={isMoveOpen} onOpenChange={setIsMoveOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Dispatch & Move e-File
            </DialogTitle>
            <DialogDescription>
              Forward this document dossier to another ministry or officer's desk for vetting, noting, or clearance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Ministry / Secretariat Department</Label>
              <Select onValueChange={(v) => setSelectedDept(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ministry of Finance">Ministry of Finance</SelectItem>
                  <SelectItem value="Ministry of Home Affairs">Ministry of Home Affairs</SelectItem>
                  <SelectItem value="Ministry of External Affairs">Ministry of External Affairs</SelectItem>
                  <SelectItem value="Department of Personnel & Training">Department of Personnel & Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Target Officer Desk</Label>
              <Select onValueChange={(v) => setSelectedOfficer(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Target Officer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shri Rajesh Verma (Secretary)">Shri Rajesh Verma (Secretary)</SelectItem>
                  <SelectItem value="Smt Priya Sharma (Deputy Secretary)">Smt Priya Sharma (Deputy Secretary)</SelectItem>
                  <SelectItem value="Shri Mohammed Al-Farsi (Under Secretary)">Shri Mohammed Al-Farsi (Under Secretary)</SelectItem>
                  <SelectItem value="Cabinet Secretary Desk">Cabinet Secretary Desk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remarks">Dispatch Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Enter movement notes/remarks for the note-sheet..."
                value={moveRemarks}
                onChange={(e) => setMoveRemarks(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsMoveOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleDispatch}>
              Forward File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
