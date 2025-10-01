"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data';
import { useTranslations } from 'next-intl';

export function AncLineChart() {
  const t = useTranslations('Analytics');
  const data = analyticsData.ancProgress.registrations;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('monthlyAncRegistrations')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8B5CF6" name={t('registrations')} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}