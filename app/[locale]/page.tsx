"use client";

import { Users, HeartPulse, Baby, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DemographicPieChart } from '@/components/charts/demographic-pie-chart';
import { VaccinationBarChart } from '@/components/charts/vaccination-bar-chart';
import { SyncStatusDonutChart } from '@/components/charts/sync-status-donut-chart';
import { PageHeader } from '@/components/layout/page-header';
import { AddPatientDialog } from '@/components/patients/add-patient-dialog';
import { toast } from 'sonner';

export default function Dashboard() {
  // Try to use translations, fallback to English if not available
  let t: any;
  try {
    t = useTranslations('Dashboard');
  } catch (error) {
    t = (key: string) => {
      const fallbacks: { [key: string]: string } = {
        'title': 'Dashboard',
        'description': 'Welcome back, ASHA Worker!',
        'addPatient': 'Add Patient',
        'syncNow': 'Sync Now',
        'totalPatients': 'Total Patients',
        'totalPatientsDesc': '+2 since last month',
        'villagesCovered': 'Villages Covered',
        'villagesCoveredDesc': 'Serving communities effectively',
        'ancRegistrations': 'ANC Registrations',
        'ancRegistrationsDesc': 'This month',
        'vaccinationsDue': 'Vaccinations Due',
        'vaccinationsDueDesc': 'In the next 7 days',
        'recentActivity': 'Recent Activity',
        'recentActivityDesc': 'Latest patient visits and important updates in your area.',
        'recentPatients': 'Recent Patients',
        'recentPatientsDesc': 'Patients who had visits in the last 7 days.',
        'patient': 'Patient',
        'visitDate': 'Visit Date',
        'syncSuccess': 'Data synchronized successfully!'
      };
      return fallbacks[key] || key;
    };
  }

  const handleSyncNow = () => {
    // Simulate sync operation
    toast.success(t('syncSuccess'));
  };

  const handlePatientAdded = (patient: any) => {
    // In a real app, this would update the global state/backend
    console.log('New patient added:', patient);
  };

  return (
    <>
      <PageHeader title={t('title')} description={t('description')}>
        <AddPatientDialog onPatientAdded={handlePatientAdded} />
        <Button variant="secondary" onClick={handleSyncNow}>{t('syncNow')}</Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalPatients')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">
              {t('totalPatientsDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('villagesCovered')}
            </CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              {t('villagesCoveredDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('ancRegistrations')}</CardTitle>
            <Baby className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              {t('ancRegistrationsDesc')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('vaccinationsDue')}
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              {t('vaccinationsDueDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>{t('recentActivity')}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {t('recentActivityDesc')}
                </CardDescription>
              </CardHeader>
            </Card>
            <SyncStatusDonutChart />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <DemographicPieChart />
            <VaccinationBarChart />
          </div>
        </div>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>{t('recentPatients')}</CardTitle>
            <CardDescription>
              {t('recentPatientsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('patient')}</TableHead>
                  <TableHead className="text-right">{t('visitDate')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Sunita Devi</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Rampur
                    </div>
                  </TableCell>
                  <TableCell className="text-right">2025-07-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Ramesh Kumar</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Sitapur
                    </div>
                  </TableCell>
                  <TableCell className="text-right">2025-07-20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
