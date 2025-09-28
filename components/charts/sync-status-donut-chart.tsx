"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SyncStatusDonutChart() {
  const t = useTranslations('Analytics');

  const data = [
    { name: t('synced'), value: 45, color: '#10b981' },
    { name: t('pending'), value: 5, color: '#f59e0b' },
  ];

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>{t('dataSyncStatus')}</CardTitle>
        <CardDescription>{t('dataSyncStatusDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <div className="h-[160px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
