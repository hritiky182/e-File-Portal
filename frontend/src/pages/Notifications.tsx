import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { notifications as initialNotifications } from "@/mock/data";
import { Bell, CheckCheck, Settings } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type NotificationType = typeof initialNotifications[number];

function NotificationList({ list }: { list: NotificationType[] }) {
  if (list.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        No notifications found in this category.
      </div>
    );
  }
  return (
    <ul className="divide-y">
      {list.map((n) => (
        <li key={n.id} className="py-4 flex gap-3 items-start">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary shrink-0"><Bell className="h-4 w-4" /></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold">{n.title} {!n.read && <span className="ml-2 text-[10px] bg-primary text-primary-foreground rounded px-1.5 py-0.5">NEW</span>}</div>
              <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>
            <div className="mt-2"><Badge variant="outline" className="text-[10px] uppercase">{n.type}</Badge></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function NotificationsPage() {
  const [list, setList] = useState<NotificationType[]>(initialNotifications);

  const handleMarkAllRead = () => {
    setList(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All marked as read");
  };

  const unreadCount = list.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeader
        title="Notification Center"
        description="Review approvals, mentions, security and system alerts."
        actions={
          <>
            <Button variant="outline" onClick={handleMarkAllRead}><CheckCheck className="h-4 w-4 mr-2" /> Mark all read</Button>
            <Button variant="outline"><Settings className="h-4 w-4 mr-2" /> Preferences</Button>
          </>
        }
      />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All <Badge variant="secondary" className="ml-2">{list.length}</Badge></TabsTrigger>
          <TabsTrigger value="unread">Unread <Badge variant="secondary" className="ml-2">{unreadCount}</Badge></TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Section>
            <NotificationList list={list} />
          </Section>
        </TabsContent>
        <TabsContent value="unread">
          <Section>
            <NotificationList list={list.filter(n => !n.read)} />
          </Section>
        </TabsContent>
        <TabsContent value="mentions">
          <Section>
            <NotificationList list={list.filter(n => n.type === "mention" || n.type === "mentions")} />
          </Section>
        </TabsContent>
        <TabsContent value="approvals">
          <Section>
            <NotificationList list={list.filter(n => n.type === "approval")} />
          </Section>
        </TabsContent>
        <TabsContent value="security">
          <Section>
            <NotificationList list={list.filter(n => n.type === "security")} />
          </Section>
        </TabsContent>
        <TabsContent value="system">
          <Section>
            <NotificationList list={list.filter(n => n.type === "system")} />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
