import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dayjs } from 'dayjs';

export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening' | 'Late-Night' | '';

interface JobState {
  selectedProperty: string;
  jobType: string;
  jobDescription: string;
  jobDate: Dayjs | null;
  jobTime: TimeSlot;
  ownerPresence: string;
  poNumber: string;
  additionalDetails: string;
  images: File[];
}

interface NewJobContextType {
  jobState: JobState;
  updateJobState: (updates: Partial<JobState>) => void;
  resetJobState: () => void;
}

const NewJobContext = createContext<NewJobContextType | undefined>(undefined);

export const NewJobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobState, setJobState] = useState<JobState>({
    selectedProperty: '',
    jobType: '',
    jobDescription: '',
    jobDate: null,
    jobTime: '',
    ownerPresence: '',
    poNumber: '',
    additionalDetails: '',
    images: [],
  });

  const updateJobState = (updates: Partial<JobState>) => {
    setJobState(prev => ({ ...prev, ...updates }));
  };

  const resetJobState = () => {
    setJobState({
      selectedProperty: '',
      jobType: '',
      jobDescription: '',
      jobDate: null,
      jobTime: '',
      ownerPresence: '',
      poNumber: '',
      additionalDetails: '',
      images: [],
    });
  };

  return (
    <NewJobContext.Provider value={{ jobState, updateJobState, resetJobState }}>
      {children}
    </NewJobContext.Provider>
  );
};

export const useNewJob = () => {
  const context = useContext(NewJobContext);
  if (!context) {
    throw new Error('useNewJob must be used within NewJobProvider');
  }
  return context;
};