import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  return (
    <div className="min-h-screen grid place-items-center p-6 bg-secondary/40">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elegant">
        {!done ? (
          <>
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><KeyRound className="h-5 w-5" /></div>
            <h2 className="mt-4 text-xl font-bold">Choose a new password</h2>
            <p className="text-sm text-muted-foreground mt-1">Must be at least 12 characters, include uppercase, number and symbol.</p>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 space-y-4">
              <div className="space-y-1.5"><Label>New password</Label><Input type="password" required /></div>
              <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password" required /></div>
              <Button className="w-full">Update password</Button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-7 w-7" /></div>
            <h2 className="mt-4 text-xl font-bold">Password updated</h2>
            <p className="text-sm text-muted-foreground mt-1">You can now sign in with your new password.</p>
            <Button className="mt-6" onClick={() => navigate("/login")}>Continue to sign in</Button>
          </div>
        )}
      </div>
    </div>
  );
}
