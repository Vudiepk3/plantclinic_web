/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISEASE_DATA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
