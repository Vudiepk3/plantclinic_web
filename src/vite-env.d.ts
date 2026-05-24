/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_ROUTER_BASENAME?: string;
  readonly VITE_DISEASE_DATA_URL?: string;
  readonly VITE_PRODUCTS_DATA_URL?: string;
  readonly VITE_SLIDER_DATA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
