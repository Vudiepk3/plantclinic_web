import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchDiseases, Disease } from '../services/dataService';

interface DiseaseContextType {
  diseases: Disease[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DiseaseContext = createContext<DiseaseContextType | undefined>(undefined);

export function DiseaseProvider({ children }: { children: ReactNode }) {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDiseases();
      setDiseases(data);
    } catch (err) {
      setError('Failed to load disease data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DiseaseContext.Provider value={{ diseases, loading, error, refresh: loadData }}>
      {children}
    </DiseaseContext.Provider>
  );
}

export function useDiseases() {
  const context = useContext(DiseaseContext);
  if (context === undefined) {
    throw new Error('useDiseases must be used within a DiseaseProvider');
  }
  return context;
}
