"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/data';
import { useTranslations } from 'next-intl';

export function SymptomAreaChart() {
  const t = useTranslations('Analytics');
  const data = analyticsData.healthTrends.symptoms;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('commonSymptomsOverTime')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="fever" stackId="1" stroke="#EF4444" fill="#EF4444" name={t('fever')} />
              <Area type="monotone" dataKey="cough" stackId="1" stroke="#F59E0B" fill="#F59E0B" name={t('cough')} />
              <Area type="monotone" dataKey="diarrhea" stackId="1" stroke="#2563EB" fill="#2563EB" name={t('diarrhea')} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}