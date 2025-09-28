"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <WifiOff className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">
            {isOnline ? 'Connection Restored' : 'You\'re Offline'}
          </CardTitle>
          <CardDescription>
            {isOnline 
              ? 'Your internet connection has been restored. Click refresh to reload the page.'
              : 'ASHAConnect works offline! Your data will be saved locally and synced when you reconnect.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isOnline ? (
            <Button onClick={handleRefresh} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Available Offline Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• View patient records</li>
                  <li>• Add new patient data</li>
                  <li>• Text and voice data entry</li>
                  <li>• Health score calculations</li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                Data will automatically sync when connection is restored.
              </p>
            </>
          )}
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}