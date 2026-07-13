import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center p-6 bg-secondary/40">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elegant">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to sign in</Link>
        {!sent ? (
          <>
            <div className="mt-4 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
            <h2 className="mt-4 text-xl font-bold">Reset your password</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your work email and we'll send a secure OTP.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("OTP sent to your inbox"); }} className="mt-6 space-y-4">
              <div className="space-y-1.5"><Label>Work email</Label><Input type="email" placeholder="name@cis.com" required /></div>
              <Button className="w-full">Send verification code</Button>
            </form>
          </>
        ) : (
          <>
            <div className="mt-4 grid h-11 w-11 place-items-center rounded-lg bg-success/10 text-success"><CheckCircle2 className="h-5 w-5" /></div>
            <h2 className="mt-4 text-xl font-bold">Enter the 6-digit code</h2>
            <p className="text-sm text-muted-foreground mt-1">We sent a code to your registered email. It expires in 10 minutes.</p>
            <form onSubmit={(e) => { e.preventDefault(); navigate("/reset-password"); }} className="mt-6 space-y-4">
              <div className="flex gap-2 justify-between">
                {[0,1,2,3,4,5].map((i) => <Input key={i} maxLength={1} className="h-12 w-12 text-center text-lg font-semibold" defaultValue={["1","2","3","4","5","6"][i]} />)}
              </div>
              <Button className="w-full">Verify code</Button>
              <button type="button" className="text-xs text-muted-foreground hover:text-foreground w-full text-center" onClick={() => toast.info("New code sent")}>Resend code</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
