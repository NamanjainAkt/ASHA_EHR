"use client";

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { HealthScoreDashboard } from '@/components/health-score/health-score-dashboard';

export default function HealthScorePage() {
  const t = useTranslations('HealthScore');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pageTitle')}
        description={t('pageDescription')}
      />
      <HealthScoreDashboard />
    </div>
  );
}