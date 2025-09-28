"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  UserPlus, 
  Activity, 
  Calendar, 
  Plus,
  Save,
  Trash2,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface QuickEntry {
  id: string;
  type: 'patient' | 'visit' | 'note';
  content: string;
  timestamp: string;
}

export function TextDataEntry() {
  const [entries, setEntries] = useState<QuickEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [entryType, setEntryType] = useState<'patient' | 'visit' | 'note'>('note');
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    village: '',
    symptoms: '',
    diagnosis: '',
    treatment: ''
  });
  const [visitData, setVisitData] = useState({
    patientId: '',
    visitType: '',
    notes: '',
    followUp: ''
  });
  
  const t = useTranslations('TextDataEntry');

  const handleQuickSave = () => {
    if (!currentEntry.trim()) {
      toast.error(t('enterContent'));
      return;
    }

    const newEntry: QuickEntry = {
      id: `entry_${Date.now()}`,
      type: entryType,
      content: currentEntry,
      timestamp: new Date().toISOString()
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
    toast.success(t('entrySaved'));
  };

  const handlePatientSave = () => {
    if (!patientData.name || !patientData.age || !patientData.village) {
      toast.error(t('fillRequired'));
      return;
    }

    const patientEntry = `New Patient: ${patientData.name}, Age: ${patientData.age}, Village: ${patientData.village}. Symptoms: ${patientData.symptoms || 'None'}. Diagnosis: ${patientData.diagnosis || 'Pending'}. Treatment: ${patientData.treatment || 'None'}.`;
    
    const newEntry: QuickEntry = {
      id: `patient_${Date.now()}`,
      type: 'patient',
      content: patientEntry,
      timestamp: new Date().toISOString()
    };

    setEntries(prev => [newEntry, ...prev]);
    setPatientData({ name: '', age: '', village: '', symptoms: '', diagnosis: '', treatment: '' });
    toast.success(t('patientDataSaved'));
  };

  const handleVisitSave = () => {
    if (!visitData.patientId || !visitData.visitType) {
      toast.error(t('fillRequired'));
      return;
    }

    const visitEntry = `Visit Record: Patient ID ${visitData.patientId}, Type: ${visitData.visitType}. Notes: ${visitData.notes || 'No notes'}. Follow-up: ${visitData.followUp || 'None scheduled'}.`;
    
    const newEntry: QuickEntry = {
      id: `visit_${Date.now()}`,
      type: 'visit',
      content: visitEntry,
      timestamp: new Date().toISOString()
    };

    setEntries(prev => [newEntry, ...prev]);
    setVisitData({ patientId: '', visitType: '', notes: '', followUp: '' });
    toast.success(t('visitDataSaved'));
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success(t('entryDeleted'));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(timestamp));
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'patient': return <UserPlus className="h-4 w-4" />;
      case 'visit': return <Activity className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'patient': return 'bg-health-blue/10 border-health-blue/20';
      case 'visit': return 'bg-health-emerald/10 border-health-emerald/20';
      default: return 'bg-health-purple/10 border-health-purple/20';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-health-indigo/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-health-indigo">
            <FileText className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick" className="data-[state=active]:bg-health-blue/20">{t('quickEntry')}</TabsTrigger>
              <TabsTrigger value="patient" className="data-[state=active]:bg-health-emerald/20">{t('patientForm')}</TabsTrigger>
              <TabsTrigger value="visit" className="data-[state=active]:bg-health-purple/20">{t('visitForm')}</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-type">{t('entryType')}</Label>
                  <Select onValueChange={(value: 'patient' | 'visit' | 'note') => setEntryType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="note">{t('generalNote')}</SelectItem>
                      <SelectItem value="patient">{t('patientNote')}</SelectItem>
                      <SelectItem value="visit">{t('visitNote')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quick-entry">{t('content')}</Label>
                  <Textarea
                    id="quick-entry"
                    placeholder={t('enterContent')}
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>
                <Button 
                  onClick={handleQuickSave} 
                  className="w-full bg-health-indigo hover:bg-health-indigo/90"
                  disabled={!currentEntry.trim()}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t('saveEntry')}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="patient" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">{t('patientName')} *</Label>
                  <Input
                    id="patient-name"
                    placeholder={t('enterName')}
                    value={patientData.name}
                    onChange={(e) => setPatientData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-age">{t('age')} *</Label>
                  <Input
                    id="patient-age"
                    type="number"
                    placeholder={t('enterAge')}
                    value={patientData.age}
                    onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="patient-village">{t('village')} *</Label>
                  <Input
                    id="patient-village"
                    placeholder={t('enterVillage')}
                    value={patientData.village}
                    onChange={(e) => setPatientData(prev => ({ ...prev, village: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-symptoms">{t('symptoms')}</Label>
                  <Textarea
                    id="patient-symptoms"
                    placeholder={t('enterSymptoms')}
                    value={patientData.symptoms}
                    onChange={(e) => setPatientData(prev => ({ ...prev, symptoms: e.target.value }))}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-diagnosis">{t('diagnosis')}</Label>
                  <Input
                    id="patient-diagnosis"
                    placeholder={t('enterDiagnosis')}
                    value={patientData.diagnosis}
                    onChange={(e) => setPatientData(prev => ({ ...prev, diagnosis: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="patient-treatment">{t('treatment')}</Label>
                  <Textarea
                    id="patient-treatment"
                    placeholder={t('enterTreatment')}
                    value={patientData.treatment}
                    onChange={(e) => setPatientData(prev => ({ ...prev, treatment: e.target.value }))}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <Button 
                onClick={handlePatientSave} 
                className="w-full bg-health-emerald hover:bg-health-emerald/90"
                disabled={!patientData.name || !patientData.age || !patientData.village}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t('savePatientData')}
              </Button>
            </TabsContent>

            <TabsContent value="visit" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="visit-patient-id">{t('patientId')} *</Label>
                  <Input
                    id="visit-patient-id"
                    placeholder="PAT001"
                    value={visitData.patientId}
                    onChange={(e) => setVisitData(prev => ({ ...prev, patientId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visit-type">{t('visitType')} *</Label>
                  <Select onValueChange={(value) => setVisitData(prev => ({ ...prev, visitType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectVisitType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">{t('routineCheckup')}</SelectItem>
                      <SelectItem value="followup">{t('followUp')}</SelectItem>
                      <SelectItem value="emergency">{t('emergency')}</SelectItem>
                      <SelectItem value="vaccination">{t('vaccination')}</SelectItem>
                      <SelectItem value="anc">{t('ancVisit')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="visit-notes">{t('visitNotes')}</Label>
                  <Textarea
                    id="visit-notes"
                    placeholder={t('enterVisitNotes')}
                    value={visitData.notes}
                    onChange={(e) => setVisitData(prev => ({ ...prev, notes: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="visit-followup">{t('followUpPlan')}</Label>
                  <Input
                    id="visit-followup"
                    placeholder={t('enterFollowUp')}
                    value={visitData.followUp}
                    onChange={(e) => setVisitData(prev => ({ ...prev, followUp: e.target.value }))}
                  />
                </div>
              </div>
              <Button 
                onClick={handleVisitSave} 
                className="w-full bg-health-purple hover:bg-health-purple/90"
                disabled={!visitData.patientId || !visitData.visitType}
              >
                <Activity className="h-4 w-4 mr-2" />
                {t('saveVisitData')}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <Card className="border-health-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-health-teal">
              <Clock className="h-5 w-5" />
              {t('recentEntries')}
            </CardTitle>
            <CardDescription>
              {t('recentEntriesDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {entries.map((entry) => (
                <div key={entry.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${getEntryColor(entry.type)}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getEntryIcon(entry.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {t(entry.type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(entry.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{entry.content}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}