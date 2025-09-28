"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Square, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const commands = [
  "Register new patient Sunita Devi, age 32, village Rampur.",
  "Update patient PAT001, add diagnosis viral fever.",
  "Schedule follow-up for Ramesh Kumar in 7 days.",
  "Check vaccination status for child Anjali, ID C012.",
];

export default function VoiceEntryPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  let t: any;
  try {
    t = useTranslations('VoiceEntry');
  } catch (error) {
    t = (key: string) => {
      const fallbacks: { [key: string]: string } = {
        'title': 'Voice Data Entry',
        'description': 'Simulated voice interface for hands-free data input.',
        'recordingInterface': 'Recording Interface',
        'recordingInterfaceDesc': 'Click the microphone to start/stop recording simulation.',
        'recording': 'Recording...',
        'tapToStart': 'Tap to start recording',
        'commandHistory': 'Command History',
        'commandHistoryDesc': 'Recently simulated voice commands.',
        'processed': 'Processed',
        'noCommands': 'No commands recorded yet.'
      };
      return fallbacks[key] || key;
    };
  }

  const handleRecord = () => {
    if (isRecording) {
      // Simulate stopping recording
      setIsRecording(false);
      if (transcript) {
        setHistory(prev => [transcript, ...prev]);
        setTranscript('');
      }
    } else {
      // Simulate starting recording
      setIsRecording(true);
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      let i = 0;
      const interval = setInterval(() => {
        setTranscript(randomCommand.substring(0, i));
        i++;
        if (i > randomCommand.length) {
          clearInterval(interval);
        }
      }, 50);
    }
  };

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('recordingInterface')}</CardTitle>
            <CardDescription>
              {t('recordingInterfaceDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6 p-10">
            <Button
              size="lg"
              className={`h-24 w-24 rounded-full ${isRecording ? 'bg-destructive hover:bg-destructive/90' : ''}`}
              onClick={handleRecord}
            >
              {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
            </Button>
            <p className="text-muted-foreground text-center min-h-[40px]">
              {isRecording ? t('recording') : t('tapToStart')}
            </p>
            <div className="w-full p-4 border rounded-md bg-muted min-h-[100px]">
              <p className="text-lg">{transcript}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('commandHistory')}</CardTitle>
            <CardDescription>
              {t('commandHistoryDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <div key={index} className="flex items-start justify-between gap-4 p-3 border rounded-lg">
                      <p className="text-sm">{item}</p>
                      <Badge variant="secondary">{t('processed')}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-10">
                    {t('noCommands')}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
