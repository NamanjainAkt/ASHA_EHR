"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Download, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface PWAStatus {
  manifestExists: boolean;
  serviceWorkerSupported: boolean;
  serviceWorkerRegistered: boolean;
  isStandalone: boolean;
  isOnline: boolean;
  installPromptAvailable: boolean;
  platform: string;
  browser: string;
}

export default function PWATestPage() {
  const [status, setStatus] = useState<PWAStatus | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [manifestData, setManifestData] = useState<any>(null);

  useEffect(() => {
    checkPWAStatus();
    
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt fired in test page');
      e.preventDefault();
      setDeferredPrompt(e);
      setStatus(prev => prev ? { ...prev, installPromptAvailable: true } : null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const checkPWAStatus = async () => {
    try {
      // Check manifest
      const manifestResponse = await fetch('/manifest.json');
      const manifest = await manifestResponse.json();
      setManifestData(manifest);

      // Detect platform and browser
      const userAgent = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isChrome = /Chrome/.test(userAgent);
      const isEdge = /Edg/.test(userAgent);
      const isSafari = /Safari/.test(userAgent) && !isChrome;

      let platform = 'Desktop';
      if (isIOS) platform = 'iOS';
      else if (isAndroid) platform = 'Android';

      let browser = 'Unknown';
      if (isChrome) browser = 'Chrome';
      else if (isEdge) browser = 'Edge';
      else if (isSafari) browser = 'Safari';

      // Check service worker
      const swSupported = 'serviceWorker' in navigator;
      let swRegistered = false;
      if (swSupported) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        swRegistered = registrations.length > 0;
      }

      // Check standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;

      const pwaStatus: PWAStatus = {
        manifestExists: manifestResponse.ok,
        serviceWorkerSupported: swSupported,
        serviceWorkerRegistered: swRegistered,
        isStandalone,
        isOnline: navigator.onLine,
        installPromptAvailable: !!deferredPrompt,
        platform,
        browser
      };

      setStatus(pwaStatus);
    } catch (error) {
      console.error('Error checking PWA status:', error);
    }
  };

  const testInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      toast.success(`User choice: ${choiceResult.outcome}`);
      setDeferredPrompt(null);
    } else {
      toast.error('Install prompt not available. Check browser compatibility.');
    }
  };

  const StatusIcon = ({ condition }: { condition: boolean }) => 
    condition ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />;

  if (!status) return <div>Loading PWA diagnostics...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>PWA Installation Diagnostics</CardTitle>
          <CardDescription>
            This page helps diagnose PWA installation issues on mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold">System Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{status.platform}</Badge>
                  <Badge variant="outline">{status.browser}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.isOnline} />
                  <span>Online Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.isStandalone} />
                  <span>Running in Standalone Mode</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">PWA Requirements</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.manifestExists} />
                  <span>Web App Manifest</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.serviceWorkerSupported} />
                  <span>Service Worker Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.serviceWorkerRegistered} />
                  <span>Service Worker Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon condition={status.installPromptAvailable} />
                  <span>Install Prompt Available</span>
                </div>
              </div>
            </div>
          </div>

          {manifestData && (
            <div className="space-y-3">
              <h3 className="font-semibold">Manifest Information</h3>
              <div className="bg-muted p-3 rounded text-sm">
                <div>Name: {manifestData.name}</div>
                <div>Short Name: {manifestData.short_name}</div>
                <div>Start URL: {manifestData.start_url}</div>
                <div>Display: {manifestData.display}</div>
                <div>Icons: {manifestData.icons?.length || 0} icons defined</div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={testInstall} disabled={!deferredPrompt}>
              <Download className="w-4 h-4 mr-2" />
              Test Install Prompt
            </Button>
            <Button onClick={checkPWAStatus} variant="outline">
              Refresh Status
            </Button>
          </div>

          {status.platform === 'iOS' && (
            <div className="bg-blue-50 p-4 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <strong>iOS Instructions:</strong>
                  <p>On iOS Safari, tap the Share button (↗️) at the bottom, then select "Add to Home Screen"</p>
                </div>
              </div>
            </div>
          )}

          {status.platform === 'Android' && (
            <div className="bg-green-50 p-4 rounded">
              <div className="flex items-start gap-2">
                <Smartphone className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <strong>Android Instructions:</strong>
                  <p>In Chrome/Edge, tap the menu (⋮) and look for "Add to Home screen" or "Install app"</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}