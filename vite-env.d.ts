/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_POSTHOG_HOST: string | undefined;
  readonly VITE_POSTHOG_PUBLIC_KEY: string | undefined;
  readonly POSTHOG_HOST: string | undefined;
  readonly POSTHOG_PROJECT_TOKEN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
