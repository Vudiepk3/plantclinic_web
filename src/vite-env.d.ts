/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISEASE_DATA_URL?: string;
  readonly VITE_PRODUCTS_DATA_URL?: string;
  readonly VITE_SLIDER_DATA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
