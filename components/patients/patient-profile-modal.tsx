"use client";

import { useTranslations } from 'next-intl';
import { useAppStore } from '@/store/use-app-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Activity, 
  FileText, 
  Heart,
  Edit,
  X
} from "lucide-react";

export function PatientProfileModal() {
  const { 
    selectedPatient, 
    isPatientProfileModalOpen, 
    closePatientProfileModal 
  } = useAppStore();
  
  const t = useTranslations('PatientProfile');
  const tPatients = useTranslations('Patients');

  if (!selectedPatient) return null;

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN').format(new Date(dateString));
  };

  return (
    <Dialog open={isPatientProfileModalOpen} onOpenChange={closePatientProfileModal}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-health-blue/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-health-blue" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-health-indigo">
                  {selectedPatient.name}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-lg">
                  <MapPin className="h-4 w-4" />
                  {selectedPatient.village}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={selectedPatient.status === 'Active' ? 'secondary' : 'destructive'}
                className="text-sm px-3 py-1"
              >
                {tPatients(selectedPatient.status.toLowerCase())}
              </Badge>
              <Button variant="outline" size="sm" className="hover:bg-health-blue/10">
                <Edit className="h-4 w-4 mr-2" />
                {t('edit')}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information Card */}
            <Card className="border-health-teal/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-health-teal">
                  <User className="h-5 w-5" />
                  {t('basicInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('age')}</p>
                    <p className="text-lg font-semibold">{selectedPatient.age} {t('years')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('gender')}</p>
                    <p className="text-lg font-semibold">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('bloodGroup')}</p>
                    <p className="text-lg font-semibold text-health-orange">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{t('patientId')}</p>
                    <p className="text-lg font-semibold font-mono">{selectedPatient.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="border-health-purple/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-health-purple">
                  <Phone className="h-5 w-5" />
                  {t('contactInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('phoneNumber')}</p>
                  <p className="text-lg font-semibold">{selectedPatient.contact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('village')}</p>
                  <p className="text-lg font-semibold">{selectedPatient.village}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('lastVisit')}</p>
                  <p className="text-lg font-semibold text-health-emerald">
                    {formatDate(selectedPatient.lastVisit)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Medical History Card */}
            <Card className="border-health-pink/20 hover:shadow-lg transition-shadow md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-health-pink">
                  <FileText className="h-5 w-5" />
                  {t('medicalHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPatient.medicalHistory.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPatient.medicalHistory.map((record, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                        <Calendar className="h-5 w-5 text-health-indigo mt-1" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-semibold text-health-indigo">{record.diagnosis}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(record.date)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{t('treatment')}: {record.treatment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">{t('noMedicalHistory')}</p>
                )}
              </CardContent>
            </Card>

            {/* Allergies Card */}
            <Card className="border-warning/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Heart className="h-5 w-5" />
                  {t('allergies')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPatient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline" className="border-warning text-warning">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">{t('noAllergies')}</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-health-lime/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-health-lime">
                  <Activity className="h-5 w-5" />
                  {t('quickActions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-health-blue hover:bg-health-blue/90">
                  {t('scheduleVisit')}
                </Button>
                <Button variant="outline" className="w-full hover:bg-health-teal/10 border-health-teal">
                  {t('addRecord')}
                </Button>
                <Button variant="outline" className="w-full hover:bg-health-purple/10 border-health-purple">
                  {t('sendReminder')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}