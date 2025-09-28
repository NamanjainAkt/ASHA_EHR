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
        console.log('beforeinstallprompt fired');
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt immediately for mobile users
        setTimeout(() => {
          if (deferredPrompt) {
            toast('Install ASHAConnect App', {
              description: 'Add to home screen for offline access and better performance.',
              duration: 10000,
              action: {
                label: 'Install App',
                onClick: () => {
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult: any) => {
                      if (choiceResult.outcome === 'accepted') {
                        toast.success('ASHAConnect app installed successfully!');
                      } else {
                        toast.info('You can install the app later from browser menu.');
                      }
                      deferredPrompt = null;
                    });
                  }
                },
              },
            });
          }
        }, 2000);
      };

      const handleAppInstalled = () => {
        console.log('PWA installed');
        toast.success('ASHAConnect app has been installed!');
        deferredPrompt = null;
      };

      // Enhanced PWA detection
      const checkPWACapability = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInWebAppiOS = (window.navigator as any).standalone === true;
        const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
        
        if (isStandalone || isInWebAppiOS || isInWebAppChrome) {
          console.log('App is running in standalone mode');
        } else {
          console.log('App is running in browser');
          // For mobile browsers that don't support beforeinstallprompt
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (isMobile && !deferredPrompt) {
            setTimeout(() => {
              toast('Add to Home Screen', {
                description: 'For the best experience, add ASHAConnect to your home screen using your browser menu.',
                duration: 8000,
              });
            }, 5000);
          }
        }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
      
      // Check PWA capability after component mounts
      setTimeout(checkPWACapability, 1000);

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