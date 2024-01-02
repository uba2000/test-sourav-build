/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_STREAM_IP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
