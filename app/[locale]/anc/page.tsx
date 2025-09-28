"use client";

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AncLineChart } from '@/components/charts/anc-line-chart';
import { Baby, AlertTriangle, HeartHandshake } from 'lucide-react';

export default function AncMonitoringPage() {
  let t: any;
  try {
    t = useTranslations('ANC');
  } catch (error) {
    t = (key: string) => {
      const fallbacks: { [key: string]: string } = {
        'title': 'ANC Monitoring',
        'description': 'Track and manage antenatal care for expectant mothers.',
        'totalAncCases': 'Total ANC Cases',
        'fromLastMonth': '+3 from last month',
        'highRiskPregnancies': 'High-Risk Pregnancies',
        'requiresAttention': 'Requires immediate attention',
        'successfulDeliveries': 'Successful Deliveries',
        'thisQuarter': 'This quarter'
      };
      return fallbacks[key] || key;
    };
  }

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalAncCases')}</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">{t('fromLastMonth')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('highRiskPregnancies')}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">{t('requiresAttention')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('successfulDeliveries')}</CardTitle>
            <HeartHandshake className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">{t('thisQuarter')}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <AncLineChart />
      </div>
    </>
  );
}
