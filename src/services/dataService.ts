export interface Disease {
  id: string;
  title: string;
  scientific_name: string;
  disease_type: string;
  listImage?: string | string[];
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
  const url = DATA_URL || '/api/diseases';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Remote data fetch failed');
    const remoteData = await response.json();

    if (Array.isArray(remoteData) && remoteData.length > 0) {
      return remoteData;
    }

    throw new Error('Remote data is empty or invalid');
  } catch (error) {
    console.error('Failed to fetch diseases:', error);
    return [];
  }
}
