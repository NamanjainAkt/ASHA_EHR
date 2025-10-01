"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data';
import { useTranslations } from 'next-intl';

export function VillageComparisonChart() {
  const t = useTranslations('Analytics');
  const data = analyticsData.villagePerformance;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('villageHealthPerformance')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="healthScore" fill="#2563EB" name={t('healthScore')} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}