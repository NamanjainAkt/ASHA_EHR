import { AnalyticsData, Patient } from './types';

export const patients: Patient[] = [
  {
    id: 'PAT001',
    name: 'Sunita Devi',
    age: 32,
    gender: 'Female',
    village: 'Rampur',
    lastVisit: '2025-07-15',
    status: 'Active',
    contact: '9876543210',
    bloodGroup: 'O+',
    allergies: ['Pollen'],
    medicalHistory: [
      { date: '2025-07-15', diagnosis: 'Viral Fever', treatment: 'Paracetamol' },
      { date: '2025-03-10', diagnosis: 'Common Cold', treatment: 'Rest and fluids' },
    ],
  },
  {
    id: 'PAT002',
    name: 'Ramesh Kumar',
    age: 45,
    gender: 'Male',
    village: 'Sitapur',
    lastVisit: '2025-07-20',
    status: 'Active',
    contact: '9876543211',
    bloodGroup: 'A+',
    allergies: [],
    medicalHistory: [
      { date: '2025-07-20', diagnosis: 'Hypertension', treatment: 'Amlodipine' },
    ],
  },
  {
    id: 'PAT003',
    name: 'Geeta Singh',
    age: 28,
    gender: 'Female',
    village: 'Rampur',
    lastVisit: '2025-06-30',
    status: 'Active',
    contact: '9876543212',
    bloodGroup: 'B+',
    allergies: ['Dust'],
    medicalHistory: [
      { date: '2025-06-30', diagnosis: 'Antenatal Checkup', treatment: 'Folic Acid' },
    ],
  },
  // Add 47 more patients for a total of 50
  ...Array.from({ length: 47 }, (_, i) => {
    const gender = (i % 2 === 0 ? 'Female' : 'Male') as 'Male' | 'Female' | 'Other';
    const village = ['Rampur', 'Sitapur', 'Govindpur', 'Alipur', 'Madhavpur'][i % 5];
    return {
      id: `PAT${String(i + 4).padStart(3, '0')}`,
      name: `Patient ${i + 4}`,
      age: 20 + (i % 50),
      gender,
      village,
      lastVisit: `2025-0${(i % 6) + 1}-${(i % 28) + 1}`,
      status: 'Active' as 'Active' | 'Inactive' | 'Deceased',
      contact: `9876543${String(213 + i).padStart(3, '0')}`,
      bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'O-'][i % 6],
      allergies: i % 7 === 0 ? ['Peanuts'] : [],
      medicalHistory: [
        { date: `2025-0${(i % 6) + 1}-${(i % 28) + 1}`, diagnosis: 'Routine Checkup', treatment: 'Vitamins' },
      ],
    };
  }),
];

export const analyticsData: AnalyticsData = {
  patientDemographics: {
    ageGroups: [
      { name: '0-10', value: 8 },
      { name: '11-20', value: 10 },
      { name: '21-40', value: 20 },
      { name: '41-60', value: 10 },
      { name: '60+', value: 2 },
    ],
    genderDistribution: [
      { name: 'Female', value: 28 },
      { name: 'Male', value: 22 },
    ],
  },
  vaccinationMetrics: {
    coverage: [
      { vaccine: 'BCG', coverage: 95, target: 100 },
      { vaccine: 'DPT', coverage: 88, target: 100 },
      { vaccine: 'Polio', coverage: 92, target: 100 },
      { vaccine: 'Measles', coverage: 85, target: 100 },
    ],
  },
  ancProgress: {
    registrations: [
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 15 },
      { month: 'Mar', count: 10 },
      { month: 'Apr', count: 18 },
      { month: 'May', count: 20 },
      { month: 'Jun', count: 17 },
    ],
  },
  healthTrends: {
    symptoms: [
      { month: 'Jan', fever: 110, cough: 80, diarrhea: 40 },
      { month: 'Feb', fever: 120, cough: 95, diarrhea: 45 },
      { month: 'Mar', fever: 100, cough: 70, diarrhea: 30 },
      { month: 'Apr', fever: 130, cough: 100, diarrhea: 50 },
      { month: 'May', fever: 150, cough: 110, diarrhea: 55 },
      { month: 'Jun', fever: 140, cough: 105, diarrhea: 60 },
    ],
  },
  villagePerformance: [
    { name: 'Rampur', healthScore: 85 },
    { name: 'Sitapur', healthScore: 92 },
    { name: 'Govindpur', healthScore: 78 },
    { name: 'Alipur', healthScore: 88 },
    { name: 'Madhavpur', healthScore: 81 },
  ],
  syncStatus: [
    { name: 'Synced', value: 450 },
    { name: 'Pending', value: 50 },
  ],
};
