"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function DemographicPieChart() {
  const t = useTranslations('Analytics');

  const data = [
    { name: t('ageGroup0to5'), value: 8, color: '#9E7FFF' },
    { name: t('ageGroup6to18'), value: 12, color: '#38bdf8' },
    { name: t('ageGroup19to45'), value: 25, color: '#f472b6' },
    { name: t('ageGroup45plus'), value: 5, color: '#f59e0b' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('patientDemographics')}</CardTitle>
        <CardDescription>{t('patientDemographicsDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
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
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Legend iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
