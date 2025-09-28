"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { DataTable } from '@/components/patients/data-table';
import { columns } from '@/components/patients/columns';
import { patients as initialPatients } from '@/lib/data';
import { AddPatientDialog } from '@/components/patients/add-patient-dialog';
import { FileDown } from 'lucide-react';
import { toast } from 'sonner';

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const t = useTranslations('Patients');

  const handlePatientAdded = (newPatient: any) => {
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleExport = () => {
    // Simulate export functionality
    toast.success(t('exportSuccess'));
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('title')}
        description={t('description')}
      >
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2">
          <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleExport}>
            <FileDown className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t('export')}
            </span>
          </Button>
          <AddPatientDialog onPatientAdded={handlePatientAdded} />
        </div>
      </PageHeader>
      <DataTable columns={columns} data={patients} />
    </div>
  );
}
