import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dayjs } from 'dayjs';

export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening' | 'Late-Night' | '';

interface JobState {
  //Job related field
  selectedProperty: string;
  jobType: string;
  jobDescription: string;
  jobDate: Dayjs | null;
  jobTime: TimeSlot;
  ownerPresence: string;
  poNumber: string;
  additionalDetails: string;
  images: File[];
  //Booking realated fields
  halfHourlyRate: number;
  vatRate: number;
  accountDiscount: number;
  discount4Hours: number;
  discount8Hours: number;
  appliedDiscountCode: string;
  appliedDisountAmount: number;
  selectedCardId: string;
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
    halfHourlyRate: 30,
    vatRate: 20,
    accountDiscount: 5,
    discount4Hours: 5,
    discount8Hours: 10,
    appliedDiscountCode: 'DRAIN25BXQW',
    appliedDisountAmount: 25,
    selectedCardId: "",
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
      halfHourlyRate: 0,
      vatRate: 0,
      accountDiscount: 0,
      discount4Hours: 5,
      discount8Hours: 10,
      appliedDiscountCode: '',
      appliedDisountAmount: 0,
      selectedCardId: "",
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