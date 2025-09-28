"use client";

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/layout/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DemographicPieChart } from '@/components/charts/demographic-pie-chart';
import { VaccinationBarChart } from '@/components/charts/vaccination-bar-chart';
import { AncLineChart } from '@/components/charts/anc-line-chart';
import { SymptomAreaChart } from '@/components/charts/symptom-area-chart';
import { VillageComparisonChart } from '@/components/charts/village-comparison-chart';
import { SyncStatusDonutChart } from '@/components/charts/sync-status-donut-chart';

export default function AnalyticsPage() {
  const t = useTranslations('Analytics');

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      />
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="vaccinations">{t('vaccinations')}</TabsTrigger>
          <TabsTrigger value="anc">{t('anc')}</TabsTrigger>
          <TabsTrigger value="trends">{t('diseasetrends')}</TabsTrigger>
          <TabsTrigger value="villages">{t('villages')}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DemographicPieChart />
            <VaccinationBarChart />
            <AncLineChart />
            <SymptomAreaChart />
            <VillageComparisonChart />
            <SyncStatusDonutChart />
          </div>
        </TabsContent>
        <TabsContent value="vaccinations" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <VaccinationBarChart />
            {/* Add more vaccination-specific charts here */}
          </div>
        </TabsContent>
        <TabsContent value="anc" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AncLineChart />
            {/* Add more ANC-specific charts here */}
          </div>
        </TabsContent>
        <TabsContent value="trends" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SymptomAreaChart />
            {/* Add more trend-specific charts here */}
          </div>
        </TabsContent>
        <TabsContent value="villages" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <VillageComparisonChart />
            {/* Add more village-specific charts here */}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
