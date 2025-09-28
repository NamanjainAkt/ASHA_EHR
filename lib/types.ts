export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  village: string;
  lastVisit: string;
  status: 'Active' | 'Inactive' | 'Deceased';
  contact: string;
  bloodGroup: string;
  allergies: string[];
  medicalHistory: { date: string; diagnosis: string; treatment: string }[];
}

export interface AnalyticsData {
  patientDemographics: {
    ageGroups: { name: string; value: number }[];
    genderDistribution: { name: string; value: number }[];
  };
  vaccinationMetrics: {
    coverage: { vaccine: string; coverage: number; target: number }[];
  };
  ancProgress: {
    registrations: { month: string; count: number }[];
  };
  healthTrends: {
    symptoms: { month: string; fever: number; cough: number; diarrhea: number }[];
  };
  villagePerformance: { name: string; healthScore: number }[];
  syncStatus: { name: string; value: number }[];
}
