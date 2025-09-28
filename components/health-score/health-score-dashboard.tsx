"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Shield, 
  Thermometer,
  Brain,
  Eye,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Target,
  Calendar,
  AlertTriangle,
  Search,
  X,
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface HealthMetric {
  id: string;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: any;
  description: string;
  recommendations: string[];
  lastUpdated: string;
}

interface PatientHealthScore {
  patientId: string;
  patientName: string;
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  metrics: HealthMetric[];
  nextCheckup: string;
}

export function HealthScoreDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string>('PAT001');
  const [animatedScores, setAnimatedScores] = useState<{[key: string]: number}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showPatientList, setShowPatientList] = useState(false);
  const t = useTranslations('HealthScore');

  // Mock health score data - in real app, this would come from API
  const healthScores: PatientHealthScore[] = [
    {
      patientId: 'PAT001',
      patientName: 'Sunita Devi',
      overallScore: 78,
      riskLevel: 'medium',
      nextCheckup: '2025-01-15',
      metrics: [
        // ... existing metrics ...
      ]
    },
    {
      patientId: 'PAT002',
      patientName: 'Ramesh Kumar',
      overallScore: 82,
      riskLevel: 'low',
      nextCheckup: '2025-02-10',
      metrics: [
        // ... existing metrics ...
      ]
    },
    // Additional patients for search demonstration
    {
      patientId: 'PAT003',
      patientName: 'Priya Sharma',
      overallScore: 65,
      riskLevel: 'medium',
      nextCheckup: '2025-01-20',
      metrics: [
        {
          id: 'cardiovascular',
          name: 'Cardiovascular Health',
          score: 70,
          trend: 'stable',
          color: 'text-health-blue',
          icon: Heart,
          description: 'Mild hypertension, requires monitoring',
          recommendations: ['Regular exercise', 'Reduce sodium intake'],
          lastUpdated: '2024-12-21'
        },
        {
          id: 'nutrition',
          name: 'Nutrition Status',
          score: 60,
          trend: 'down',
          color: 'text-health-emerald',
          icon: Activity,
          description: 'Low iron levels detected',
          recommendations: ['Iron-rich foods', 'Vitamin C supplements'],
          lastUpdated: '2024-12-19'
        },
        {
          id: 'immunity',
          name: 'Immune System',
          score: 75,
          trend: 'up',
          color: 'text-health-purple',
          icon: Shield,
          description: 'Recent flu vaccination administered',
          recommendations: ['Continue immunity boosters', 'Regular health checks'],
          lastUpdated: '2024-12-22'
        },
        {
          id: 'mental',
          name: 'Mental Wellness',
          score: 55,
          trend: 'down',
          color: 'text-health-pink',
          icon: Brain,
          description: 'Work stress affecting sleep patterns',
          recommendations: ['Stress management techniques', 'Yoga practice'],
          lastUpdated: '2024-12-20'
        }
      ]
    },
    {
      patientId: 'PAT004',
      patientName: 'Anil Gupta',
      overallScore: 89,
      riskLevel: 'low',
      nextCheckup: '2025-03-05',
      metrics: [
        {
          id: 'cardiovascular',
          name: 'Cardiovascular Health',
          score: 92,
          trend: 'up',
          color: 'text-health-blue',
          icon: Heart,
          description: 'Excellent cardiovascular health',
          recommendations: ['Maintain current exercise routine'],
          lastUpdated: '2024-12-22'
        },
        {
          id: 'nutrition',
          name: 'Nutrition Status',
          score: 85,
          trend: 'stable',
          color: 'text-health-emerald',
          icon: Activity,
          description: 'Balanced diet with all nutrients',
          recommendations: ['Continue balanced diet'],
          lastUpdated: '2024-12-21'
        },
        {
          id: 'immunity',
          name: 'Immune System',
          score: 88,
          trend: 'stable',
          color: 'text-health-purple',
          icon: Shield,
          description: 'Strong immune response',
          recommendations: ['Seasonal flu vaccination'],
          lastUpdated: '2024-12-20'
        },
        {
          id: 'mental',
          name: 'Mental Wellness',
          score: 90,
          trend: 'up',
          color: 'text-health-pink',
          icon: Brain,
          description: 'Excellent mental health',
          recommendations: ['Continue mindfulness practice'],
          lastUpdated: '2024-12-22'
        }
      ]
    },
    {
      patientId: 'PAT005',
      patientName: 'Kavita Singh',
      overallScore: 92,
      riskLevel: 'low',
      nextCheckup: '2025-02-28',
      metrics: [
        {
          id: 'cardiovascular',
          name: 'Cardiovascular Health',
          score: 95,
          trend: 'up',
          color: 'text-health-blue',
          icon: Heart,
          description: 'Perfect cardiovascular parameters',
          recommendations: ['Maintain current lifestyle'],
          lastUpdated: '2024-12-22'
        },
        {
          id: 'nutrition',
          name: 'Nutrition Status',
          score: 90,
          trend: 'stable',
          color: 'text-health-emerald',
          icon: Activity,
          description: 'Optimal nutrition levels',
          recommendations: ['Continue current diet plan'],
          lastUpdated: '2024-12-21'
        },
        {
          id: 'immunity',
          name: 'Immune System',
          score: 92,
          trend: 'stable',
          color: 'text-health-purple',
          icon: Shield,
          description: 'Excellent immune system',
          recommendations: ['Regular health monitoring'],
          lastUpdated: '2024-12-22'
        },
        {
          id: 'mental',
          name: 'Mental Wellness',
          score: 88,
          trend: 'stable',
          color: 'text-health-pink',
          icon: Brain,
          description: 'Good work-life balance',
          recommendations: ['Continue stress management'],
          lastUpdated: '2024-12-21'
        }
      ]
    }
  ];

  const currentPatientData = healthScores.find(p => p.patientId === selectedPatient) || healthScores[0];

  // Filter patients based on search query
  const filteredPatients = healthScores.filter(patient => 
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
    setShowPatientList(false);
    setSearchQuery('');
  };

  // Animate score counters on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAnimatedScores: {[key: string]: number} = {};
      newAnimatedScores['overall'] = currentPatientData.overallScore;
      currentPatientData.metrics.forEach(metric => {
        newAnimatedScores[metric.id] = metric.score;
      });
      setAnimatedScores(newAnimatedScores);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedPatient, currentPatientData]);

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-health-emerald text-white';
      case 'medium': return 'bg-health-orange text-white';
      case 'high': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-health-emerald';
    if (score >= 60) return 'text-health-orange';
    return 'text-destructive';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-health-emerald" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Selector with Search */}
      <Card className="border-health-indigo/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-health-indigo">
            <Target className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input with Dropdown */}
            <div className="relative">
              <Popover open={showPatientList} onOpenChange={setShowPatientList}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={showPatientList}
                    className="w-full justify-between h-12 text-left font-normal"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-health-blue/10 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-health-blue" />
                      </div>
                      <div>
                        <div className="font-medium">{currentPatientData.patientName}</div>
                        <div className="text-xs text-muted-foreground">{currentPatientData.patientId}</div>
                      </div>
                    </div>
                    <Search className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder={t('searchPatients')} 
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandEmpty>{t('noPatientFound')}</CommandEmpty>
                    <CommandGroup>
                      <CommandList className="max-h-[300px] overflow-y-auto">
                        {filteredPatients.map((patient) => (
                          <CommandItem
                            key={patient.patientId}
                            value={patient.patientId}
                            onSelect={() => handlePatientSelect(patient.patientId)}
                            className="flex items-center gap-3 p-3 cursor-pointer"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-health-blue/10 to-health-purple/10 rounded-full flex items-center justify-center">
                              <Heart className="h-5 w-5 text-health-blue" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{patient.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{patient.patientId}</div>
                                </div>
                                <div className="text-right">
                                  <div className={`text-lg font-bold ${getScoreColor(patient.overallScore)}`}>
                                    {patient.overallScore}
                                  </div>
                                  <Badge className={getRiskLevelColor(patient.riskLevel)} variant="secondary">
                                    {t(patient.riskLevel + 'Risk')}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {selectedPatient === patient.patientId && (
                              <Check className="h-4 w-4 text-health-emerald" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Quick Patient Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-health-emerald/5 rounded-lg border border-health-emerald/20">
                <div className="text-lg font-bold text-health-emerald">{healthScores.filter(p => p.riskLevel === 'low').length}</div>
                <div className="text-xs text-muted-foreground">{t('lowRiskPatients')}</div>
              </div>
              <div className="p-3 bg-health-orange/5 rounded-lg border border-health-orange/20">
                <div className="text-lg font-bold text-health-orange">{healthScores.filter(p => p.riskLevel === 'medium').length}</div>
                <div className="text-xs text-muted-foreground">{t('mediumRiskPatients')}</div>
              </div>
              <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                <div className="text-lg font-bold text-destructive">{healthScores.filter(p => p.riskLevel === 'high').length}</div>
                <div className="text-xs text-muted-foreground">{t('highRiskPatients')}</div>
              </div>
              <div className="p-3 bg-health-indigo/5 rounded-lg border border-health-indigo/20">
                <div className="text-lg font-bold text-health-indigo">{healthScores.length}</div>
                <div className="text-xs text-muted-foreground">{t('totalPatients')}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Health Score */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-health-blue/20 bg-gradient-to-br from-health-blue/5 to-health-indigo/5">
          <CardHeader className="text-center">
            <CardTitle className="text-health-indigo">{t('overallHealth')}</CardTitle>
            <CardDescription>{currentPatientData.patientName}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted opacity-20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(animatedScores['overall'] || 0) * 2.51} 251`}
                    className={getScoreColor(currentPatientData.overallScore)}
                    style={{
                      transition: 'stroke-dasharray 2s ease-in-out'
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(currentPatientData.overallScore)}`}>
                    {animatedScores['overall'] || 0}
                  </span>
                  <span className="text-sm text-muted-foreground">{t('healthScore')}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge className={getRiskLevelColor(currentPatientData.riskLevel)}>
                {t(currentPatientData.riskLevel + 'Risk')}
              </Badge>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {t('nextCheckup')}: {currentPatientData.nextCheckup}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="md:col-span-2 border-health-emerald/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-health-emerald">
              <Star className="h-5 w-5" />
              {t('keyMetrics')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {currentPatientData.metrics.map((metric) => (
                <div key={metric.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{animatedScores[metric.id] || 0}</span>
                      <span className="text-muted-foreground">100</span>
                    </div>
                    <Progress 
                      value={animatedScores[metric.id] || 0} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        {currentPatientData.metrics.map((metric) => (
          <Card key={metric.id} className="border-opacity-20 hover:shadow-lg transition-shadow" style={{borderColor: metric.color.replace('text-', '')}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  {metric.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                    {animatedScores[metric.id] || 0}
                  </span>
                  {getTrendIcon(metric.trend)}
                </div>
              </CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={animatedScores[metric.id] || 0} className="h-3" />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-health-orange" />
                  {t('recommendations')}
                </h4>
                <ul className="space-y-1">
                  {metric.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-health-orange mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {t('lastUpdated')}: {metric.lastUpdated}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <Card className="border-health-teal/20 bg-gradient-to-r from-health-teal/5 to-health-blue/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-health-teal hover:bg-health-teal/90">
              <Calendar className="h-4 w-4 mr-2" />
              {t('scheduleCheckup')}
            </Button>
            <Button variant="outline" className="border-health-indigo text-health-indigo hover:bg-health-indigo/10">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {t('viewAlerts')}
            </Button>
            <Button variant="outline" className="border-health-purple text-health-purple hover:bg-health-purple/10">
              <TrendingUp className="h-4 w-4 mr-2" />
              {t('viewTrends')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}