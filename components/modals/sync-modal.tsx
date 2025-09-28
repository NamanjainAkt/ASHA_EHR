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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Database,
  Upload,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function SyncModal() {
  const { 
    interactiveElements: { showSyncModal }, 
    setShowSyncModal 
  } = useAppStore();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');
  
  const t = useTranslations('SyncModal');

  const handleSync = async () => {
    setSyncStatus('syncing');
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setIsUploading(false);
    setIsDownloading(true);
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      setDownloadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setIsDownloading(false);
    setSyncStatus('completed');
    
    setTimeout(() => {
      toast.success(t('syncSuccess'));
      setShowSyncModal(false);
      setSyncStatus('idle');
      setUploadProgress(0);
      setDownloadProgress(0);
    }, 1000);
  };

  const handleClose = () => {
    if (syncStatus === 'syncing') return;
    setShowSyncModal(false);
    setSyncStatus('idle');
    setUploadProgress(0);
    setDownloadProgress(0);
  };

  return (
    <Dialog open={showSyncModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-health-blue">
            <RefreshCw className={`h-5 w-5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Connection Status */}
          <Card className="border-health-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Wifi className="h-4 w-4 text-health-emerald" />
                {t('connectionStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-health-emerald/10 text-health-emerald">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t('connected')}
                </Badge>
                <span className="text-sm text-muted-foreground">{t('serverOnline')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Sync Progress */}
          {syncStatus === 'syncing' && (
            <div className="space-y-4">
              {/* Upload Progress */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-health-blue" />
                  <span className="text-sm font-medium">{t('uploading')}</span>
                  {isUploading && <span className="text-xs text-muted-foreground">{uploadProgress}%</span>}
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>

              {/* Download Progress */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-health-emerald" />
                  <span className="text-sm font-medium">{t('downloading')}</span>
                  {isDownloading && <span className="text-xs text-muted-foreground">{downloadProgress}%</span>}
                </div>
                <Progress value={downloadProgress} className="h-2" />
              </div>
            </div>
          )}

          {/* Sync Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-health-orange/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-health-orange" />
                  <div>
                    <p className="text-sm font-medium">47</p>
                    <p className="text-xs text-muted-foreground">{t('pendingRecords')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-health-purple/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-health-purple" />
                  <div>
                    <p className="text-sm font-medium">2h ago</p>
                    <p className="text-xs text-muted-foreground">{t('lastSync')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {syncStatus === 'idle' && (
              <>
                <Button 
                  onClick={handleSync} 
                  className="flex-1 bg-health-blue hover:bg-health-blue/90"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('startSync')}
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  {t('cancel')}
                </Button>
              </>
            )}
            
            {syncStatus === 'syncing' && (
              <Button disabled className="flex-1" variant="secondary">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                {t('syncing')}
              </Button>
            )}
            
            {syncStatus === 'completed' && (
              <Button className="flex-1 bg-health-emerald hover:bg-health-emerald/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('syncCompleted')}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}