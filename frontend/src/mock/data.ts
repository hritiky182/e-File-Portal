// Mock data for the Government e-File Management System.
// Realistic government files, e-files, and ministries.

export type DocStatus = "Approved" | "Pending" | "Rejected" | "Draft" | "In Review" | "Archived";
export type SecurityLevel = "Public" | "Internal" | "Confidential" | "Restricted";

export interface Department {
  id: string;
  name: string;
  head: string;
  members: number;
  documents: number;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive" | "Locked";
  lastLogin: string;
  avatar: string;
}

export interface Document {
  id: string; // Unique e-File Number (Document Numbering)
  name: string;
  category: string;
  owner: string; // Current Desk / Handler Officer
  department: string; // Department-wise Access Control
  version: string;
  createdAt: string;
  modifiedAt: string;
  status: DocStatus;
  security: SecurityLevel;
  tags: string[];
  sizeKb: number;
  type: "PDF" | "DOCX" | "XLSX" | "IMG" | "MSG";
  starred?: boolean;
  shared?: boolean;
  archived?: boolean;
  digitalSignatureStatus?: "Verified" | "Pending" | "Unsigned";
  digitalSignatureSignee?: string;
  currentDesk?: string; // Digital File Movement tracking
}

export interface Workflow {
  id: string;
  name: string;
  stages: number;
  active: number;
  completed: number;
  avgHours: number;
  owner: string;
}

export interface Approval {
  id: string;
  document: string;
  requester: string;
  department: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  stage: string;
  progress: number;
}

export interface Notification {
  id: string;
  type: "approval" | "workflow" | "share" | "system" | "security" | "mention";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
  severity: "info" | "warn" | "critical";
}

const owners = [
  "Shri Aisha Rahman (Joint Secretary)",
  "Shri Mohammed Al-Farsi (Under Secretary)",
  "Smt Priya Sharma (Deputy Secretary)",
  "Shri James O'Connor (Director)",
  "Smt Sofia Rossi (Section Officer)",
  "Shri Chen Wei (Joint Secretary)",
  "Smt Fatima Zahra (Under Secretary)",
  "Shri David Cohen (Director)",
  "Smt Elena Petrov (Deputy Secretary)",
  "Shri Ravi Iyer (Section Officer)",
  "Smt Grace Mensah (Deputy Secretary)",
  "Smt Yuki Tanaka (Under Secretary)",
];

const categories = [
  "Cabinet Note",
  "Gazette Notification",
  "RTI Request",
  "Departmental Circular",
  "Treasury Sanction",
  "Budget Allocation",
  "Public Petition",
  "MOU/Agreement",
  "Policy Draft",
  "Audit Report",
  "Establishment Order",
  "Executive Order",
];

const departmentsList = [
  "Ministry of Finance",
  "Ministry of Home Affairs",
  "Department of IT",
  "Ministry of External Affairs",
  "Cabinet Secretariat",
  "Department of Personnel & Training",
  "Planning Commission",
  "Audit & Accounts",
  "Revenue Department",
  "Public Works Department",
];

const statuses: DocStatus[] = ["Approved", "Pending", "Rejected", "Draft", "In Review", "Archived"];
const securities: SecurityLevel[] = ["Public", "Internal", "Confidential", "Restricted"];
const types: Document["type"][] = ["PDF", "DOCX", "XLSX", "IMG", "MSG"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

function pad(n: number, w = 5) { return String(n).padStart(w, "0"); }

export const departments: Department[] = departmentsList.map((name, i) => ({
  id: `DEP-${pad(i + 1, 3)}`,
  name,
  head: pick(owners, i),
  members: 12 + (i * 7) % 80,
  documents: 240 + (i * 137) % 2400,
}));

export const users: UserRow[] = Array.from({ length: 42 }, (_, i) => ({
  id: `USR-${pad(i + 1)}`,
  name: pick(owners, i) + (i > 11 ? ` ${i}` : ""),
  email: `${pick(owners, i).toLowerCase().replace(/[^a-z]/g, ".").replace(/\(.*\)/, "").trim()}@nic.in`,
  role: pick(["Secretary", "Joint Secretary", "Director", "Deputy Secretary", "Under Secretary", "Section Officer", "Assistant Section Officer", "Auditor"], i),
  department: pick(departmentsList, i),
  status: (i % 11 === 0 ? "Locked" : i % 7 === 0 ? "Inactive" : "Active") as UserRow["status"],
  lastLogin: `2026-07-${String(1 + (i % 12)).padStart(2, "0")} ${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(pick(owners, i))}`,
}));

export const documents: Document[] = Array.from({ length: 84 }, (_, i) => {
  const cat = pick(categories, i);
  const dept = pick(departmentsList, i);
  const abbrev = dept.replace("Ministry of ", "M-").replace("Department of ", "D-").substring(0, 5).toUpperCase();
  const fileNum = `F-11012-${(i % 15) + 1}-${2023 + (i % 4)}-${abbrev}`;
  const sigStatus = pick(["Verified", "Pending", "Unsigned"], i);
  return {
    id: fileNum, // Unique e-File Numbering
    name: `${cat} — ${pick(["Cabinet Brief", "Establishment Approval", "Budget Sanction", "Draft Amendment", "Advisory Circular", "Executive Minutes"], i)}`,
    category: cat,
    owner: pick(owners, i),
    department: dept,
    version: `${1 + (i % 4)}.${i % 10}`,
    createdAt: `2026-0${1 + (i % 6)}-${String(1 + (i % 27)).padStart(2, "0")}`,
    modifiedAt: `2026-0${2 + (i % 5)}-${String(1 + ((i * 3) % 27)).padStart(2, "0")}`,
    status: pick(statuses, i),
    security: pick(securities, i),
    tags: [pick(["classified", "gazette", "rti-related", "cabinet"], i), pick(["urgent", "immediate", "routine", "confidential"], i + 1)],
    sizeKb: 120 + (i * 137) % 8400,
    type: pick(types, i),
    starred: i % 6 === 0,
    shared: i % 4 === 0,
    archived: i % 13 === 0,
    digitalSignatureStatus: sigStatus as "Verified" | "Pending" | "Unsigned",
    digitalSignatureSignee: sigStatus === "Verified" ? pick(owners, i + 1) : undefined,
    currentDesk: pick(owners, i + 2),
  };
});

export const workflows: Workflow[] = [
  { id: "WF-101", name: "Cabinet Note Clearance", stages: 5, active: 24, completed: 312, avgHours: 18, owner: "Cabinet Secretariat" },
  { id: "WF-102", name: "RTI Response Approval", stages: 3, active: 41, completed: 1204, avgHours: 6, owner: "Department of Personnel & Training" },
  { id: "WF-103", name: "Budget Sanction Order", stages: 6, active: 12, completed: 88, avgHours: 42, owner: "Ministry of Finance" },
  { id: "WF-104", name: "Bilateral Treaty Review", stages: 4, active: 7, completed: 63, avgHours: 24, owner: "Ministry of External Affairs" },
  { id: "WF-105", name: "Circular Dissemination", stages: 3, active: 3, completed: 47, avgHours: 12, owner: "Cabinet Secretariat" },
  { id: "WF-106", name: "DOPT Recruitment Process", stages: 4, active: 15, completed: 210, avgHours: 8, owner: "Department of Personnel & Training" },
];

export const approvals: Approval[] = Array.from({ length: 18 }, (_, i) => ({
  id: `APR-${pad(3000 + i, 4)}`,
  document: documents[i].name,
  requester: pick(owners, i + 2),
  department: pick(departmentsList, i),
  priority: pick(["High", "Medium", "Low"] as const, i),
  dueDate: `2026-07-${String(14 + (i % 14)).padStart(2, "0")}`,
  stage: pick(["Joint Secretary Review", "Departmental Verification", "External Affairs Clearance", "Cabinet Sign-off"], i),
  progress: 20 + (i * 13) % 80,
}));

export const notifications: Notification[] = [
  { id: "N1", type: "approval", title: "File movement request", body: "File No: F-11012/1/2023-M/FIN is moved to your desk for approval.", time: "2m ago", read: false },
  { id: "N2", type: "workflow", title: "Cabinet note cleared", body: "Framework WF-101 Cabinet Note Clearance successfully completed.", time: "18m ago", read: false },
  { id: "N3", type: "share", title: "File shared with your desk", body: "Smt Priya Sharma shared Circular Draft with your section.", time: "1h ago", read: false },
  { id: "N4", type: "security", title: "Restricted file access attempt", body: "Unauthorized read blocked for Confidential File in M/Home Affairs.", time: "3h ago", read: true },
  { id: "N5", type: "mention", title: "Noted on note-sheet", body: "@you was mentioned on the green note-sheet of File F-11012/4/2025.", time: "5h ago", read: true },
  { id: "N6", type: "system", title: "Scheduled e-Office audit", body: "Compliance logs review window Sun 02:00–04:00 UTC", time: "1d ago", read: true },
];

export const auditLogs: AuditLog[] = Array.from({ length: 60 }, (_, i) => ({
  id: `LOG-${pad(60000 + i)}`,
  actor: pick(owners, i),
  action: pick(["File Opened", "File Dispatched", "File Signed", "File Returned", "Comment Added", "Security Level Changed", "Shared", "Login", "Logout", "Hierarchy Updated"], i),
  target: pick(documents, i).name,
  ip: `10.${(i * 17) % 255}.${(i * 5) % 255}.${(i * 3) % 255}`,
  timestamp: `2026-07-${String(1 + (i % 13)).padStart(2, "0")} ${String((i * 3) % 24).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  severity: (i % 17 === 0 ? "critical" : i % 5 === 0 ? "warn" : "info") as AuditLog["severity"],
}));

export const uploadTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  uploads: 400 + Math.round(Math.sin(i / 2) * 180 + i * 42),
  downloads: 300 + Math.round(Math.cos(i / 2) * 140 + i * 30),
}));

export const departmentUsage = departments.slice(0, 8).map((d, i) => ({
  name: d.name,
  value: 200 + (i * 173) % 1400,
}));

export const categoryBreakdown = categories.slice(0, 6).map((c, i) => ({
  name: c,
  value: 5 + (i * 11) % 30,
}));

export const storageGrowth = Array.from({ length: 8 }, (_, i) => ({
  quarter: `Q${(i % 4) + 1} '${25 + Math.floor(i / 4)}`,
  tb: +(1.2 + i * 0.35 + Math.sin(i) * 0.1).toFixed(2),
}));

export const workflowCompletion = [
  { name: "Cleared", value: 68 },
  { name: "In Progress", value: 22 },
  { name: "Overdue", value: 6 },
  { name: "Pending", value: 4 },
];

export const integrations = [
  { name: "National Single Sign-On (Jan Parichay)", status: "Connected", last: "2m ago", icon: "Landmark" },
  { name: "Public Financial Management System (PFMS)", status: "Connected", last: "12m ago", icon: "Boxes" },
  { name: "National Informatics Centre (NIC) Mail", status: "Connected", last: "1h ago", icon: "Mail" },
  { name: "e-Pramaan Identity Gateway", status: "Connected", last: "3m ago", icon: "Users" },
  { name: "UIDAI Aadhaar e-Sign Service", status: "Connected", last: "just now", icon: "Cable" },
  { name: "Government Community REST API", status: "Connected", last: "20m ago", icon: "Send" },
  { name: "SMS Gateway (NIC)", status: "Connected", last: "5d ago", icon: "Webhook" },
];

export const scanners = [
  { name: "Central Registry Division — Fujitsu fi-7160", status: "Idle", queue: 0, ip: "10.10.20.11" },
  { name: "DOPT Scanning Desk — Kodak i2900", status: "Scanning", queue: 4, ip: "10.10.20.14" },
  { name: "Ministry Finance Registry — Canon DR-C240", status: "Idle", queue: 0, ip: "10.10.20.18" },
  { name: "Legal Cell — Epson DS-780N", status: "Error", queue: 2, ip: "10.10.20.22" },
];

export const compliance = [
  { name: "Public Records Act, 1993 Compliance", status: "Compliant", coverage: 98 },
  { name: "RTI Act Section 4 Proactive Disclosure", status: "Compliant", coverage: 96 },
  { name: "National Cyber Security Policy 2013", status: "Attention", coverage: 82 },
  { name: "Cabinet Secretariat Circulars on e-Office", status: "Compliant", coverage: 100 },
  { name: "IT Act 2000 Digital Signature Mandate", status: "Compliant", coverage: 94 },
  { name: "National Data Sharing & Accessibility Policy", status: "Attention", coverage: 88 },
];

export const backups = [
  { id: "BKP-NIC-2026-07-13-02", type: "Full", size: "1.42 TB", status: "Success", started: "2026-07-13 02:00", duration: "48m" },
  { id: "BKP-NIC-2026-07-12-02", type: "Incremental", size: "72 GB", status: "Success", started: "2026-07-12 02:00", duration: "12m" },
  { id: "BKP-NIC-2026-07-11-02", type: "Incremental", size: "68 GB", status: "Success", started: "2026-07-11 02:00", duration: "11m" },
  { id: "BKP-NIC-2026-07-10-02", type: "Incremental", size: "81 GB", status: "Partial", started: "2026-07-10 02:00", duration: "22m" },
  { id: "BKP-NIC-2026-07-09-02", type: "Full", size: "1.38 TB", status: "Success", started: "2026-07-09 02:00", duration: "51m" },
];

export const roles = [
  { name: "Secretary", users: 4, permissions: 84, description: "Full ministry oversight, clearance authorization, policies" },
  { name: "Joint Secretary", users: 7, permissions: 60, description: "Approval, classification, delegation, retention policy" },
  { name: "Director", users: 22, permissions: 42, description: "Section-wise verification, forwarding and note-sheet approvals" },
  { name: "Deputy Secretary", users: 18, permissions: 34, description: "File creation, noting, drafting and desk routing" },
  { name: "Under Secretary", users: 12, permissions: 28, description: "File movement authorization, compliance monitoring" },
  { name: "Section Officer", users: 15, permissions: 20, description: "File processing, initial noting, dispatch management" },
  { name: "Assistant Section Officer", users: 34, permissions: 14, description: "Drafting, data entry, scanning, registration" },
  { name: "Auditor", users: 5, permissions: 10, description: "Audit trail inspection and regulatory review" },
];

