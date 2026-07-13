import { Link, useNavigate } from "react-router-dom";
import { Landmark, Lock, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-sidebar-primary"><Shield className="h-6 w-6 text-sidebar-primary-foreground" /></div>
          <div>
            <div className="text-lg font-bold">CIS File Portal</div>
            <div className="text-xs text-sidebar-foreground/70">CIS File System</div>
          </div>
        </div>
        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">CIS File Portal for administrative operations.</h1>
          <p className="text-sidebar-foreground/70 max-w-md">Replace manual paper filing with digital movements, electronic signature verification, audit trails, and strict department-wise hierarchy access.</p>
          <div className="grid grid-cols-3 gap-4 max-w-md pt-4 border-t border-sidebar-border">
            <div><div className="text-2xl font-bold">99.9%</div><div className="text-xs text-sidebar-foreground/60">Uptime SLA</div></div>
            <div><div className="text-2xl font-bold">AES-256</div><div className="text-xs text-sidebar-foreground/60">Encryption</div></div>
            <div><div className="text-2xl font-bold">Compliant</div><div className="text-xs text-sidebar-foreground/60">ISO 27001</div></div>
          </div>
        </div>
        <div className="relative text-xs text-sidebar-foreground/50">© 2026 CIS Corporate Systems Inc.</div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Shield className="h-5 w-5" /></div>
            <div className="font-bold">CIS File Portal</div>
          </div>
          <h2 className="text-2xl font-bold">Welcome User</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue to your dashboard.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                localStorage.setItem("authenticated", "true");
                toast.success("Successfully signed in.");
                navigate("/dashboard");
              }, 700);
            }}
            className="mt-8 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="aisha.rahman@cis.com" placeholder="name@cis.com" required />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pw">Security Pin / Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot credentials?</Link>
              </div>
              <div className="relative">
                <Input id="pw" type={showPw ? "text" : "password"} defaultValue="password123!" required />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Remember my computer</label>
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><Shield className="h-3.5 w-3.5" /> TLS 1.3</div>
            </div>
            <Button type="submit" className="w-full h-10" disabled={loading}>{loading ? "Verifying Credentials…" : (<>Sign in <ArrowRight className="h-4 w-4 ml-1" /></>)}</Button>
          </form>

          <div className="mt-8 flex items-start gap-3 rounded-lg border bg-secondary/50 p-4">
            <Lock className="h-4 w-4 mt-0.5 text-primary" />
            <div className="text-xs text-muted-foreground">
              This is a restricted file system. Unauthorized access is monitored, logged, and strictly prohibited under internal security policies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
