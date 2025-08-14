import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface JobState {
  selectedProperty: string;
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
  });

  const updateJobState = (updates: Partial<JobState>) => {
    setJobState(prev => ({ ...prev, ...updates }));
  };

  const resetJobState = () => {
    setJobState({
      selectedProperty: '',
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
