"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mic, 
  MicOff, 
  Play, 
  Square,
  Brain,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Volume2,
  Copy,
  Save,
  Trash2,
  Activity
} from "lucide-react";
import { toast } from "sonner";

interface MedicalTerm {
  original: string;
  corrected: string;
  confidence: number;
  category: 'diagnosis' | 'symptom' | 'medication' | 'anatomy' | 'procedure';
}

interface VoiceSession {
  id: string;
  timestamp: string;
  originalText: string;
  processedText: string;
  medicalTerms: MedicalTerm[];
  confidence: number;
  language: 'en' | 'hi';
}

export function AIVoiceToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [medicalTerms, setMedicalTerms] = useState<MedicalTerm[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [sessions, setSessions] = useState<VoiceSession[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const t = useTranslations('AIVoice');

  // Medical terminology database for smart recognition
  const medicalDictionary = {
    // Common symptoms
    symptoms: [
      'fever', 'cough', 'headache', 'nausea', 'vomiting', 'diarrhea', 'fatigue', 'weakness',
      'chest pain', 'shortness of breath', 'abdominal pain', 'joint pain', 'muscle ache',
      'dizziness', 'blurred vision', 'rash', 'swelling', 'numbness', 'tingling'
    ],
    // Common diagnoses
    diagnoses: [
      'hypertension', 'diabetes', 'pneumonia', 'malaria', 'tuberculosis', 'anemia',
      'gastritis', 'arthritis', 'bronchitis', 'sinusitis', 'urinary tract infection',
      'skin infection', 'respiratory infection', 'viral fever', 'bacterial infection'
    ],
    // Common medications
    medications: [
      'paracetamol', 'aspirin', 'amoxicillin', 'ibuprofen', 'metformin', 'amlodipine',
      'lisinopril', 'omeprazole', 'azithromycin', 'cefixime', 'iron tablets',
      'folic acid', 'vitamin d', 'calcium', 'insulin'
    ],
    // Body parts/anatomy
    anatomy: [
      'heart', 'lungs', 'liver', 'kidney', 'stomach', 'intestine', 'brain', 'spine',
      'chest', 'abdomen', 'throat', 'eyes', 'ears', 'nose', 'mouth', 'teeth',
      'arms', 'legs', 'hands', 'feet', 'skin', 'blood', 'bone', 'muscle'
    ],
    // Medical procedures
    procedures: [
      'blood pressure check', 'blood test', 'urine test', 'x-ray', 'ultrasound',
      'vaccination', 'injection', 'wound dressing', 'examination', 'consultation',
      'checkup', 'screening', 'monitoring', 'follow-up'
    ]
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage === 'en' ? 'en-IN' : 'hi-IN';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        setCurrentTranscript(finalTranscript + interimTranscript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
        toast.error(t('speechError'));
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isRecording) {
          // Restart recognition if still recording
          recognitionRef.current.start();
        }
      };
    }
  }, [selectedLanguage, isRecording, t]);

  // AI Processing simulation for medical terminology
  const processWithAI = async (text: string): Promise<{processedText: string, terms: MedicalTerm[], confidence: number}> => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const words = text.toLowerCase().split(/\s+/);
    const detectedTerms: MedicalTerm[] = [];
    let processedWords = [...words];
    
    // Check for medical terms and apply corrections
    words.forEach((word, index) => {
      // Check symptoms
      const symptomMatch = medicalDictionary.symptoms.find(term => 
        term.includes(word) || word.includes(term) || calculateSimilarity(word, term) > 0.7
      );
      if (symptomMatch) {
        detectedTerms.push({
          original: word,
          corrected: symptomMatch,
          confidence: calculateSimilarity(word, symptomMatch),
          category: 'symptom'
        });
        processedWords[index] = symptomMatch;
      }
      
      // Check diagnoses
      const diagnosisMatch = medicalDictionary.diagnoses.find(term => 
        term.includes(word) || word.includes(term) || calculateSimilarity(word, term) > 0.7
      );
      if (diagnosisMatch) {
        detectedTerms.push({
          original: word,
          corrected: diagnosisMatch,
          confidence: calculateSimilarity(word, diagnosisMatch),
          category: 'diagnosis'
        });
        processedWords[index] = diagnosisMatch;
      }
      
      // Check medications
      const medicationMatch = medicalDictionary.medications.find(term => 
        term.includes(word) || word.includes(term) || calculateSimilarity(word, term) > 0.7
      );
      if (medicationMatch) {
        detectedTerms.push({
          original: word,
          corrected: medicationMatch,
          confidence: calculateSimilarity(word, medicationMatch),
          category: 'medication'
        });
        processedWords[index] = medicationMatch;
      }
      
      // Check anatomy
      const anatomyMatch = medicalDictionary.anatomy.find(term => 
        term.includes(word) || word.includes(term) || calculateSimilarity(word, term) > 0.7
      );
      if (anatomyMatch) {
        detectedTerms.push({
          original: word,
          corrected: anatomyMatch,
          confidence: calculateSimilarity(word, anatomyMatch),
          category: 'anatomy'
        });
        processedWords[index] = anatomyMatch;
      }
      
      // Check procedures
      const procedureMatch = medicalDictionary.procedures.find(term => 
        term.includes(word) || word.includes(term) || calculateSimilarity(word, term) > 0.7
      );
      if (procedureMatch) {
        detectedTerms.push({
          original: word,
          corrected: procedureMatch,
          confidence: calculateSimilarity(word, procedureMatch),
          category: 'procedure'
        });
        processedWords[index] = procedureMatch;
      }
    });
    
    const processed = processedWords.join(' ');
    const overallConfidence = detectedTerms.length > 0 
      ? detectedTerms.reduce((sum, term) => sum + term.confidence, 0) / detectedTerms.length * 100
      : 85;
    
    setIsProcessing(false);
    return {
      processedText: processed,
      terms: detectedTerms,
      confidence: overallConfidence
    };
  };

  // Calculate string similarity (Levenshtein distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      matrix[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
      matrix[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return 1 - matrix[str2.length][str1.length] / Math.max(str1.length, str2.length);
  };

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      setCurrentTranscript('');
      setProcessedText('');
      setMedicalTerms([]);
      setConfidence(0);
      setIsRecording(true);
      recognitionRef.current.start();
      toast.success(t('recordingStarted'));
    } else {
      toast.error(t('speechNotSupported'));
    }
  };

  const handleStopRecording = async () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
      
      if (currentTranscript.trim()) {
        const result = await processWithAI(currentTranscript);
        setProcessedText(result.processedText);
        setMedicalTerms(result.terms);
        setConfidence(result.confidence);
        
        // Save session
        const newSession: VoiceSession = {
          id: `session_${Date.now()}`,
          timestamp: new Date().toISOString(),
          originalText: currentTranscript,
          processedText: result.processedText,
          medicalTerms: result.terms,
          confidence: result.confidence,
          language: selectedLanguage
        };
        
        setSessions(prev => [newSession, ...prev.slice(0, 4)]); // Keep last 5 sessions
        toast.success(t('processingComplete'));
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'symptom': return 'bg-health-orange/10 text-health-orange border-health-orange/20';
      case 'diagnosis': return 'bg-health-blue/10 text-health-blue border-health-blue/20';
      case 'medication': return 'bg-health-emerald/10 text-health-emerald border-health-emerald/20';
      case 'anatomy': return 'bg-health-purple/10 text-health-purple border-health-purple/20';
      case 'procedure': return 'bg-health-pink/10 text-health-pink border-health-pink/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('copiedToClipboard'));
  };

  const saveSession = (session: VoiceSession) => {
    // In real app, this would save to backend
    toast.success(t('sessionSaved'));
  };

  return (
    <div className="space-y-6">
      {/* AI Voice Recording Interface */}
      <Card className="border-health-indigo/20 bg-gradient-to-br from-health-indigo/5 to-health-blue/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-health-indigo">
            <Brain className="h-5 w-5" />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Language Selection */}
          <div className="flex justify-center gap-2">
            <Button
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage('en')}
              className={selectedLanguage === 'en' ? 'bg-health-indigo hover:bg-health-indigo/90' : ''}
            >
              English
            </Button>
            <Button
              variant={selectedLanguage === 'hi' ? 'default' : 'outline'}
              onClick={() => setSelectedLanguage('hi')}
              className={selectedLanguage === 'hi' ? 'bg-health-indigo hover:bg-health-indigo/90' : ''}
            >
              हिन्दी
            </Button>
          </div>

          {/* Recording Controls */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Button
                size="lg"
                className={`h-32 w-32 rounded-full ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                    : 'bg-health-blue hover:bg-health-blue/90'
                }`}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={isProcessing}
              >
                {isRecording ? (
                  <MicOff className="h-12 w-12" />
                ) : (
                  <Mic className="h-12 w-12" />
                )}
              </Button>
              
              {isListening && (
                <div className="absolute -inset-2 border-4 border-health-blue rounded-full animate-ping"></div>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isRecording ? t('listening') : isProcessing ? t('processing') : t('tapToStart')}
              </p>
              {isListening && (
                <div className="flex items-center justify-center gap-2">
                  <Volume2 className="h-4 w-4 text-health-blue" />
                  <span className="text-sm text-muted-foreground">{t('speakClearly')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Processing Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles className="h-4 w-4 text-health-purple animate-spin" />
                <span className="text-sm font-medium">{t('aiProcessing')}</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Real-time Transcript */}
      {currentTranscript && (
        <Card className="border-health-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-health-teal">
              <Activity className="h-5 w-5" />
              {t('liveTranscript')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={currentTranscript}
              readOnly
              className="min-h-[100px] bg-muted/20"
              placeholder={t('speechWillAppearHere')}
            />
          </CardContent>
        </Card>
      )}

      {/* AI Processed Results */}
      {processedText && (
        <Card className="border-health-emerald/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-health-emerald">
                <CheckCircle className="h-5 w-5" />
                {t('aiProcessedText')}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-health-emerald/10 text-health-emerald">
                  {Math.round(confidence)}% {t('confidence')}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(processedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={processedText}
              onChange={(e) => setProcessedText(e.target.value)}
              className="min-h-[120px]"
            />
            
            {/* Medical Terms Detected */}
            {medicalTerms.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-health-purple" />
                  {t('medicalTermsDetected')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {medicalTerms.map((term, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={getCategoryColor(term.category)}
                    >
                      {term.original !== term.corrected && (
                        <span className="line-through opacity-60 mr-2">{term.original}</span>
                      )}
                      {term.corrected}
                      <span className="ml-2 text-xs">
                        ({Math.round(term.confidence * 100)}%)
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <Card className="border-health-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-health-purple">
              <Activity className="h-5 w-5" />
              {t('recentSessions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <div key={session.id} className="p-4 border rounded-lg bg-muted/10">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {session.language === 'en' ? 'English' : 'हिन्दी'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.timestamp).toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round(session.confidence)}% {t('confidence')}
                        </Badge>
                      </div>
                      <p className="text-sm">{session.processedText}</p>
                      {session.medicalTerms.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {session.medicalTerms.slice(0, 3).map((term, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {term.corrected}
                            </Badge>
                          ))}
                          {session.medicalTerms.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{session.medicalTerms.length - 3} {t('more')}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(session.processedText)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => saveSession(session)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Browser Compatibility Alert */}
      {'webkitSpeechRecognition' in window || 'SpeechRecognition' in window ? null : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('browserNotSupported')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}