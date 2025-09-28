"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const t = useTranslations('Header');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowButton(false);
      toast.success('App installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    if (!isStandalone) {
      // Show button for mobile users even without beforeinstallprompt
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setTimeout(() => setShowButton(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        toast.success('Installing ASHAConnect app...');
      }
      setDeferredPrompt(null);
      setShowButton(false);
    } else {
      // Fallback for browsers that don't support the install prompt
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        toast.info('To install: Tap Share → Add to Home Screen', { duration: 5000 });
      } else if (isAndroid) {
        toast.info('To install: Tap Menu (⋮) → Add to Home Screen', { duration: 5000 });
      } else {
        toast.info('To install: Look for "Install App" in your browser menu', { duration: 5000 });
      }
    }
  };

  if (!showButton) return null;

  return (
    <Button
      onClick={handleInstallClick}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Smartphone className="h-4 w-4" />
      Install App
    </Button>
  );
}