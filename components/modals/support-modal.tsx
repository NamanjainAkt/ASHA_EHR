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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  BookOpen,
  Video,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  Users
} from "lucide-react";

export function SupportModal() {
  const { 
    interactiveElements: { showSupportModal }, 
    setShowSupportModal 
  } = useAppStore();
  
  const t = useTranslations('SupportModal');

  const contactMethods = [
    {
      icon: Phone,
      title: t('phoneSupport'),
      description: t('phoneSupportDesc'),
      value: '+91-1800-XXX-XXXX',
      available: t('available24x7'),
      color: 'text-health-blue'
    },
    {
      icon: Mail,
      title: t('emailSupport'),
      description: t('emailSupportDesc'),
      value: 'support@ashaconnect.in',
      available: t('response24hrs'),
      color: 'text-health-emerald'
    },
    {
      icon: MessageCircle,
      title: t('chatSupport'),
      description: t('chatSupportDesc'),
      value: t('startChat'),
      available: t('onlineNow'),
      color: 'text-health-purple'
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: t('userGuide'),
      description: t('userGuideDesc'),
      action: t('readGuide'),
      color: 'text-health-orange'
    },
    {
      icon: Video,
      title: t('videoTutorials'),
      description: t('videoTutorialsDesc'),
      action: t('watchVideos'),
      color: 'text-health-pink'
    },
    {
      icon: Download,
      title: t('quickReference'),
      description: t('quickReferenceDesc'),
      action: t('download'),
      color: 'text-health-teal'
    }
  ];

  const faqItems = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    }
  ];

  return (
    <Dialog open={showSupportModal} onOpenChange={setShowSupportModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-health-indigo">
            <HelpCircle className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-health-indigo">{t('contactUs')}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-health-blue/20 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                      <CardTitle className="text-sm">{method.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{method.value}</p>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {method.available}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Help Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-health-emerald">{t('helpResources')}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {resources.map((resource, index) => (
                <Card key={index} className="border-health-emerald/20 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <resource.icon className={`h-5 w-5 ${resource.color}`} />
                      <CardTitle className="text-sm">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      {resource.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick FAQ */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-health-purple">{t('frequentlyAsked')}</h3>
            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <Card key={index} className="border-health-purple/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-health-purple">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* System Information */}
          <Card className="border-health-teal/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-health-teal text-lg">
                <Users className="h-5 w-5" />
                {t('systemInfo')}
              </CardTitle>
              <CardDescription>
                {t('systemInfoDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t('appVersion')}</p>
                  <p className="text-sm font-medium">ASHAConnect v2.1.0</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t('lastUpdate')}</p>
                  <p className="text-sm font-medium">Dec 28, 2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t('deviceId')}</p>
                  <p className="text-sm font-mono">DEV-ASHA-001</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{t('connectionStatus')}</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-health-emerald" />
                    <p className="text-sm font-medium text-health-emerald">{t('connected')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setShowSupportModal(false)}>
            {t('close')}
          </Button>
          <Button 
            className="bg-health-indigo hover:bg-health-indigo/90"
            onClick={() => {
              // In a real app, this would open a contact form or chat
              setShowSupportModal(false);
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {t('startChat')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}