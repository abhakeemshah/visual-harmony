import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SystemSettingsProps {
  onNavigate: (page: string) => void;
}

export function SystemSettings({ onNavigate }: SystemSettingsProps) {
  const [maxQrValidity, setMaxQrValidity] = useState(10);
  const [defaultSessionDuration, setDefaultSessionDuration] = useState(5);
  const [allowManualMarking, setAllowManualMarking] = useState(true);
  const [requireDeviceVerification, setRequireDeviceVerification] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Settings saved");
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate("admin-dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8">
          System Settings
        </h1>

        {/* Settings Form */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border space-y-8">
          {/* Time Settings */}
          <div>
            <h2 className="font-serif text-xl mb-4">Time Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxQr">Max QR Validity (minutes)</Label>
                <Input
                  id="maxQr"
                  type="number"
                  min={1}
                  max={60}
                  value={maxQrValidity}
                  onChange={(e) => setMaxQrValidity(Number(e.target.value))}
                  className="rounded-xl max-w-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultDuration">
                  Default Session Duration (minutes)
                </Label>
                <Input
                  id="defaultDuration"
                  type="number"
                  min={1}
                  max={60}
                  value={defaultSessionDuration}
                  onChange={(e) =>
                    setDefaultSessionDuration(Number(e.target.value))
                  }
                  className="rounded-xl max-w-xs"
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div>
            <h2 className="font-serif text-xl mb-4">Features</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Allow Manual Marking</p>
                  <p className="text-sm text-muted-foreground">
                    Let teachers manually mark students in live sessions
                  </p>
                </div>
                <Switch
                  checked={allowManualMarking}
                  onCheckedChange={setAllowManualMarking}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Require Device Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Students must verify their device before scanning
                  </p>
                </div>
                <Switch
                  checked={requireDeviceVerification}
                  onCheckedChange={setRequireDeviceVerification}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
