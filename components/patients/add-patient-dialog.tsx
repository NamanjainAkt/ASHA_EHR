"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface AddPatientDialogProps {
  onPatientAdded?: (patient: any) => void;
}

export function AddPatientDialog({ onPatientAdded }: AddPatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    village: '',
    contact: '',
    bloodGroup: '',
  });
  
  let t: any;

  try {
    t = useTranslations('AddPatient');
  } catch (error) {
    t = (key: string) => {
      const fallbacks: { [key: string]: string } = {
        'title': 'Add New Patient',
        'description': 'Enter patient information to add them to your records.',
        'name': 'Name',
        'age': 'Age',
        'gender': 'Gender',
        'village': 'Village',
        'contact': 'Contact Number',
        'bloodGroup': 'Blood Group',
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'cancel': 'Cancel',
        'addPatient': 'Add Patient',
        'patientAdded': 'Patient added successfully!',
      };
      return fallbacks[key] || key;
    };
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.gender || !formData.village || !formData.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Generate patient ID
    const patientId = `PAT${String(Math.floor(Math.random() * 1000) + 100).padStart(3, '0')}`;
    
    const newPatient = {
      id: patientId,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      village: formData.village,
      contact: formData.contact,
      bloodGroup: formData.bloodGroup || 'Unknown',
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active' as const,
      allergies: [],
      medicalHistory: [],
    };

    // Call the callback if provided
    if (onPatientAdded) {
      onPatientAdded(newPatient);
    }

    // Show success message
    toast.success(t('patientAdded'));

    // Reset form and close dialog
    setFormData({
      name: '',
      age: '',
      gender: '',
      village: '',
      contact: '',
      bloodGroup: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 w-full sm:w-auto">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('addPatient')}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')} *</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">{t('age')} *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t('gender')} *</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">{t('male')}</SelectItem>
                  <SelectItem value="Female">{t('female')}</SelectItem>
                  <SelectItem value="Other">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="village">{t('village')} *</Label>
            <Input
              id="village"
              placeholder="Enter village name"
              value={formData.village}
              onChange={(e) => handleInputChange('village', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">{t('contact')} *</Label>
            <Input
              id="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t('bloodGroup')} (Optional)</Label>
            <Select onValueChange={(value) => handleInputChange('bloodGroup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
              {t('cancel')}
            </Button>
            <Button type="submit" className="w-full sm:w-auto">{t('addPatient')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}