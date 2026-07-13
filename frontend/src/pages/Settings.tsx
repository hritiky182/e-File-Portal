import React from "react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 md:grid-cols-[280px_1fr] py-4 border-b last:border-0">
      <div><div className="text-sm font-medium">{label}</div>{description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}</div>
      <div>{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="System Settings" description="Global configuration for the platform." actions={<Button onClick={() => toast.success("Settings saved")}>Save changes</Button>} />
      <Tabs defaultValue="general">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Section title="Organization">
            <Row label="Organization name"><Input defaultValue="CIS Corporate Systems Inc." /></Row>
            <Row label="Region"><Select defaultValue="in-1"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="in-1">Delhi Datacenter</SelectItem><SelectItem value="in-2">Mumbai Branch Datacenter</SelectItem></SelectContent></Select></Row>
            <Row label="Default timezone"><Select defaultValue="ist"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ist">Asia/Kolkata (IST)</SelectItem><SelectItem value="utc">UTC</SelectItem></SelectContent></Select></Row>
            <Row label="Language"><Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">Hindi</SelectItem><SelectItem value="reg">Regional Languages</SelectItem></SelectContent></Select></Row>
          </Section>
        </TabsContent>

        <TabsContent value="branding" className="mt-4">
          <Section title="Branding">
            <Row label="Product name"><Input defaultValue="CIS File Portal" /></Row>
            <Row label="Primary color"><Input type="color" defaultValue="#3559d9" className="h-10 w-24" /></Row>
            <Row label="Logo"><Button variant="outline" onClick={() => toast.success("Logo file picker opened")}>Upload logo</Button></Row>
          </Section>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <Section title="Email">
            <Row label="SMTP host"><Input defaultValue="mail.cis.com" /></Row>
            <Row label="From address"><Input defaultValue="no-reply@cis.com" /></Row>
            <Row label="Reply-to"><Input defaultValue="support@cis.com" /></Row>
            <Row label="Signature footer"><Textarea rows={3} defaultValue="CIS Corporate Systems · File Portal" /></Row>
          </Section>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Section title="Notifications">
            {["Approval requests","Workflow updates","Document shared","Security alerts","System maintenance"].map((n) => (
              <Row key={n} label={n}><Switch defaultChecked /></Row>
            ))}
          </Section>
        </TabsContent>

        <TabsContent value="retention" className="mt-4">
          <Section title="Retention policies">
            <Row label="Default retention"><Select defaultValue="10y"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1y">1 year</SelectItem><SelectItem value="7y">7 years</SelectItem><SelectItem value="10y">10 years</SelectItem></SelectContent></Select></Row>
            <Row label="Auto-purge expired"><Switch /></Row>
            <Row label="Legal hold override"><Switch defaultChecked /></Row>
          </Section>
        </TabsContent>

        {["security","backup","audit","workflows","api"].map((k) => (
          <TabsContent key={k} value={k} className="mt-4">
            <Section title={k.charAt(0).toUpperCase() + k.slice(1)}>
              <Row label={`${k} enabled`}><Switch defaultChecked /></Row>
              <Row label="Endpoint"><Input defaultValue={`/api/v1/${k}`} /></Row>
              <Row label="Notes"><Textarea rows={3} placeholder="Notes for administrators…" /></Row>
            </Section>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
