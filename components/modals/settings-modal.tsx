"use client";

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/use-app-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Moon, 
  Globe, 
  Database,
  Shield,
  Smartphone,
  Volume2,
  Eye,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export function SettingsModal() {
  const { 
    interactiveElements: { showSettingsModal }, 
    setShowSettingsModal 
  } = useAppStore();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  
  const t = useTranslations('SettingsModal');

  return (
    <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-health-indigo">
            <Settings className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card className="border-health-blue/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-blue text-lg">
                <Bell className="h-5 w-5" />
                {t('notifications')}
              </CardTitle>
              <CardDescription>
                {t('notificationsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('enableNotifications')}</Label>
                  <p className="text-xs text-muted-foreground">{t('enableNotificationsDesc')}</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('soundAlerts')}</Label>
                  <p className="text-xs text-muted-foreground">{t('soundAlertsDesc')}</p>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-health-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-purple text-lg">
                <Eye className="h-5 w-5" />
                {t('appearance')}
              </CardTitle>
              <CardDescription>
                {t('appearanceDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('darkMode')}</Label>
                  <p className="text-xs text-muted-foreground">{t('darkModeDesc')}</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('highContrast')}</Label>
                  <p className="text-xs text-muted-foreground">{t('highContrastDesc')}</p>
                </div>
                <Switch
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data & Sync Settings */}
          <Card className="border-health-emerald/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-emerald text-lg">
                <Database className="h-5 w-5" />
                {t('dataSync')}
              </CardTitle>
              <CardDescription>
                {t('dataSyncDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('autoSync')}</Label>
                  <p className="text-xs text-muted-foreground">{t('autoSyncDesc')}</p>
                </div>
                <Switch
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{t('offlineMode')}</Label>
                  <p className="text-xs text-muted-foreground">{t('offlineModeDesc')}</p>
                </div>
                <Switch
                  checked={offlineMode}
                  onCheckedChange={setOfflineMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="border-health-orange/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-orange text-lg">
                <Globe className="h-5 w-5" />
                {t('language')}
              </CardTitle>
              <CardDescription>
                {t('languageDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-health-blue/10 text-health-blue">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    English
                  </Badge>
                  <Badge variant="outline">
                    हिन्दी
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{t('currentLanguage')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-health-pink/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-pink text-lg">
                <Shield className="h-5 w-5" />
                {t('security')}
              </CardTitle>
              <CardDescription>
                {t('securityDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('sessionTimeout')}</span>
                  <Badge variant="outline">30 {t('minutes')}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('encryptionStatus')}</span>
                  <Badge variant="secondary" className="bg-health-emerald/10 text-health-emerald">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t('enabled')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
            {t('cancel')}
          </Button>
          <Button 
            className="bg-health-indigo hover:bg-health-indigo/90"
            onClick={() => setShowSettingsModal(false)}
          >
            {t('saveSettings')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}