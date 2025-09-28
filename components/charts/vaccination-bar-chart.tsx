"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'BCG', due: 5, completed: 45 },
  { name: 'Polio', due: 8, completed: 42 },
  { name: 'Penta', due: 3, completed: 47 },
  { name: 'MMR', due: 12, completed: 38 },
];

export function VaccinationBarChart() {
  const t = useTranslations('Analytics');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('vaccinationStatus')}</CardTitle>
        <CardDescription>{t('vaccinationStatusDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend iconSize={10} />
              <Bar dataKey="completed" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="due" fill="#f472b6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
