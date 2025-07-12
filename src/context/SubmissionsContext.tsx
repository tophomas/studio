"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Submission } from '@/lib/types';
import { SUBMISSIONS } from '@/lib/constants';

interface SubmissionsContextType {
  submissions: Submission[];
  addSubmission: (submission: Submission) => void;
}

const SubmissionsContext = createContext<SubmissionsContextType | undefined>(undefined);

export const SubmissionsProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(SUBMISSIONS);

  const addSubmission = (submission: Submission) => {
    setSubmissions(prevSubmissions => [submission, ...prevSubmissions]);
  };

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = () => {
  const context = useContext(SubmissionsContext);
  if (context === undefined) {
    throw new Error('useSubmissions must be used within a SubmissionsProvider');
  }
  return context;
};
