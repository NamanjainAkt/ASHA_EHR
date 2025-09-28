import { create } from 'zustand';
import { Patient } from '@/lib/types';

interface AppState {
  isOffline: boolean;
  toggleOffline: () => void;
  
  // Sidebar state
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  
  // Patient profile modal state
  selectedPatient: Patient | null;
  isPatientProfileModalOpen: boolean;
  openPatientProfileModal: (patient: Patient) => void;
  closePatientProfileModal: () => void;
  
  // Button interaction states
  interactiveElements: {
    showSyncModal: boolean;
    showSettingsModal: boolean;
    showSupportModal: boolean;
  };
  setShowSyncModal: (show: boolean) => void;
  setShowSettingsModal: (show: boolean) => void;
  setShowSupportModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOffline: false,
  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),
  
  // Sidebar state
  isMobileSidebarOpen: false,
  setMobileSidebarOpen: (open: boolean) => set({ isMobileSidebarOpen: open }),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  
  // Patient profile modal state
  selectedPatient: null,
  isPatientProfileModalOpen: false,
  openPatientProfileModal: (patient: Patient) => set({ 
    selectedPatient: patient, 
    isPatientProfileModalOpen: true 
  }),
  closePatientProfileModal: () => set({ 
    selectedPatient: null, 
    isPatientProfileModalOpen: false 
  }),
  
  // Button interaction states
  interactiveElements: {
    showSyncModal: false,
    showSettingsModal: false,
    showSupportModal: false,
  },
  setShowSyncModal: (show: boolean) => set((state) => ({
    interactiveElements: { ...state.interactiveElements, showSyncModal: show }
  })),
  setShowSettingsModal: (show: boolean) => set((state) => ({
    interactiveElements: { ...state.interactiveElements, showSettingsModal: show }
  })),
  setShowSupportModal: (show: boolean) => set((state) => ({
    interactiveElements: { ...state.interactiveElements, showSupportModal: show }
  })),
}));
