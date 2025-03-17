declare const VITE_APP_VERSION: string;

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_POSTHOG_HOST: string | undefined;
  readonly VITE_POSTHOG_PUBLIC_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
