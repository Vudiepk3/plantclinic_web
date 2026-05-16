import localData from '../data/disease.json';

export interface Disease {
  id: string;
  title: string;
  scientific_name: string;
  disease_type: string;
  listImage?: string;
  symptoms: string;
  cause: string;
  prevention: string;
  organic_control: string;
  chemical_control: string;
  summary: string;
  videoUrl: string;
}

const DATA_URL = import.meta.env.VITE_DISEASE_DATA_URL;

export async function fetchDiseases(): Promise<Disease[]> {
  if (!DATA_URL) {
    console.log('No remote data URL provided, using local data.');
    return localData as Disease[];
  }

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('Remote data fetch failed');
    const remoteData = await response.json();
    
    if (Array.isArray(remoteData) && remoteData.length > 0) {
      console.log('Successfully fetched remote data.');
      return remoteData;
    }
    
    throw new Error('Remote data is empty or invalid');
  } catch (error) {
    console.error('Failed to fetch remote diseases, falling back to local data:', error);
    return localData as Disease[];
  }
}
