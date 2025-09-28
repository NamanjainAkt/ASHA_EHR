"use client";

import { useEffect } from 'react';
import { toast } from 'sonner';

export function PWAInstaller() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Register service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      }

      // Handle PWA install prompt
      let deferredPrompt: any;
      
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt after a delay
        setTimeout(() => {
          toast('Install ASHAConnect', {
            description: 'Install the app for a better experience with offline support.',
            action: {
              label: 'Install',
              onClick: () => {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then((choiceResult: any) => {
                    if (choiceResult.outcome === 'accepted') {
                      toast.success('ASHAConnect installed successfully!');
                    }
                    deferredPrompt = null;
                  });
                }
              },
            },
          });
        }, 3000);
      };

      const handleAppInstalled = () => {
        toast.success('ASHAConnect has been installed!');
        deferredPrompt = null;
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      // Handle offline/online status
      const handleOnline = () => {
        toast.success('Connection restored - data will sync automatically');
      };

      const handleOffline = () => {
        toast.info('Working offline - data will be saved locally');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return null;
}