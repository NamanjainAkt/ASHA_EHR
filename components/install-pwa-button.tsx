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
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    const handleAppInstalled = () => {
      console.log('appinstalled event fired');
      setDeferredPrompt(null);
      setShowButton(false);
      toast.success('App installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    
    console.log('PWA Install Button - Is Standalone:', isStandalone);
    
    if (!isStandalone) {
      // Always show button for potential PWA users
      setTimeout(() => {
        console.log('Showing install button after delay');
        setShowButton(true);
      }, 2000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('Install button clicked, deferredPrompt:', !!deferredPrompt);
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('User choice:', choiceResult.outcome);
      if (choiceResult.outcome === 'accepted') {
        toast.success('Installing ASHAConnect app...');
      } else {
        toast.info('Installation cancelled. You can install later from browser menu.');
      }
      setDeferredPrompt(null);
      setShowButton(false);
    } else {
      // Fallback instructions for different browsers/platforms
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isEdge = /Edg/.test(navigator.userAgent);
      
      console.log('Platform detection:', { isIOS, isAndroid, isChrome, isEdge });
      
      if (isIOS) {
        toast.info('iOS: Tap Share button (↗️) → Add to Home Screen', { 
          duration: 8000,
          description: 'This will add ASHAConnect as an app icon on your home screen.'
        });
      } else if (isAndroid && (isChrome || isEdge)) {
        toast.info('Android: Tap Menu (⋮) → Add to Home Screen or Install App', { 
          duration: 8000,
          description: 'Look for "Install app" or "Add to Home screen" option.'
        });
      } else {
        toast.info('Install App: Check your browser menu for "Install" or "Add to Home Screen"', { 
          duration: 8000,
          description: 'The exact option depends on your browser.'
        });
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