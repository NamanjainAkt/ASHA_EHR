"use client";

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { TextDataEntry } from '@/components/text-data-entry';

export default function TextDataEntryPage() {
  const t = useTranslations('TextDataEntry');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('pageTitle')}
        description={t('pageDescription')}
      />
      <TextDataEntry />
    </div>
  );
}