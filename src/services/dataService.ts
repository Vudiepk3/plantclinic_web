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

export interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
  description: string;
  affiliateLink: string;
}

export interface Slide {
  title: string;
  subtitle: string;
  image: string;
  youtubeUrl: string;
}

const DEFAULT_DISEASE_DATA_URL =
  'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/disease.json';
const DEFAULT_PRODUCTS_DATA_URL =
  'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/products.json';
const DEFAULT_SLIDER_DATA_URL =
  'https://raw.githubusercontent.com/NguyenLinhK7/plantclinic/main/json/slider.json';

async function fetchRemoteArray<T>(url: string, label: string): Promise<T[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${label} data fetch failed with status ${response.status}`);
    }

    const remoteData = await response.json();

    if (Array.isArray(remoteData)) {
      return remoteData;
    }

    throw new Error(`${label} data is invalid`);
  } catch (error) {
    console.error(`Failed to fetch ${label}:`, error);
    return [];
  }
}

export async function fetchDiseases(): Promise<Disease[]> {
  return fetchRemoteArray<Disease>(
    import.meta.env.VITE_DISEASE_DATA_URL || DEFAULT_DISEASE_DATA_URL,
    'diseases'
  );
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchRemoteArray<Product>(
    import.meta.env.VITE_PRODUCTS_DATA_URL || DEFAULT_PRODUCTS_DATA_URL,
    'products'
  );
}

export async function fetchSlides(): Promise<Slide[]> {
  return fetchRemoteArray<Slide>(
    import.meta.env.VITE_SLIDER_DATA_URL || DEFAULT_SLIDER_DATA_URL,
    'slider'
  );
}
