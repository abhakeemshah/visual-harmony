import { useState } from "react";
import { Save, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdminLayout } from "@/components/AdminLayout";

interface SystemSettingsProps { onNavigate: (page: string) => void; }

export function SystemSettings({ onNavigate }: SystemSettingsProps) {
  const [batchLimits, setBatchLimits] = useState({ 2023: 200, 2024: 180, 2025: 170, 2026: 150 });
  const [qrDuration, setQrDuration] = useState("5");
  const [failedLoginAlerts, setFailedLoginAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSaveStatus("success");
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  return (
    <AdminLayout currentPage="admin-settings" onNavigate={onNavigate}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-medium">System Settings</h1>
        <Button onClick={handleSave} className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      {saveStatus === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-success/10 text-success flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Settings saved successfully
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Batch Student Limits - Full Width */}
        <div className="md:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-serif text-lg mb-4">Batch Student Limits</h2>
          <p className="text-sm text-muted-foreground mb-4">Maximum students per batch year for session creation</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(batchLimits).map(([year, limit]) => (
              <div key={year} className="space-y-2">
                <Label htmlFor={`batch-${year}`}>{year}</Label>
                <div className="flex items-center gap-2">
                  <Input id={`batch-${year}`} type="number" min={1} max={200} value={limit} onChange={(e) => setBatchLimits({ ...batchLimits, [year]: Number(e.target.value) })} className="rounded-xl" />
                  <span className="text-sm text-muted-foreground">students</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Session Duration */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-serif text-lg mb-4">QR Session Duration</h2>
          <Select value={qrDuration} onValueChange={setQrDuration}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 minutes</SelectItem>
              <SelectItem value="5">5 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Security Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-serif text-lg mb-4">Security Settings</h2>
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Failed Login Alerts</p><p className="text-sm text-muted-foreground">Get notified of failed login attempts</p></div>
            <Switch checked={failedLoginAlerts} onCheckedChange={setFailedLoginAlerts} />
          </div>
        </div>

        {/* Data Backup */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-serif text-lg mb-4">Data Backup</h2>
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Auto Backup (Daily)</p><p className="text-sm text-muted-foreground">Automatically backup data every day</p></div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-serif text-lg mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-medium">Email Notifications</p></div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium">Session Reminders</p></div>
              <Switch checked={sessionReminders} onCheckedChange={setSessionReminders} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
