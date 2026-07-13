import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import AppLayout from "@/layouts/AppLayout";
import LoginPage from "@/pages/Login";
import ForgotPasswordPage from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import DashboardPage from "@/pages/Dashboard";
import SearchPage from "@/pages/Search";
import NotificationsPage from "@/pages/Notifications";
import DocumentsPage from "@/pages/documents/Documents";
import UploadPage from "@/pages/documents/Upload";
import DocumentDetailPage from "@/pages/documents/DocumentDetail";
import ScanningPage from "@/pages/Scanning";
import MetadataPage from "@/pages/Metadata";
import VersionsPage from "@/pages/Versions";
import WorkflowsPage from "@/pages/Workflows";
import ApprovalsPage from "@/pages/Approvals";
import AuditPage from "@/pages/Audit";
import SecurityPage from "@/pages/Security";
import CompliancePage from "@/pages/Compliance";
import ReportsPage from "@/pages/Reports";
import AnalyticsPage from "@/pages/Analytics";
import UsersPage from "@/pages/Users";
import RolesPage from "@/pages/Roles";
import DepartmentsPage from "@/pages/Departments";
import SettingsPage from "@/pages/Settings";
import IntegrationsPage from "@/pages/Integrations";
import BackupPage from "@/pages/Backup";
import ProfilePage from "@/pages/Profile";
import HelpPage from "@/pages/Help";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Authenticated Layout */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="documents/upload" element={<UploadPage />} />
              <Route path="documents/:id" element={<DocumentDetailPage />} />
              <Route path="scanning" element={<ScanningPage />} />
              <Route path="metadata" element={<MetadataPage />} />
              <Route path="versions" element={<VersionsPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="approvals" element={<ApprovalsPage />} />
              <Route path="audit" element={<AuditPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="compliance" element={<CompliancePage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="backup" element={<BackupPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
