import { VitePWA } from "vite-plugin-pwa";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      VitePWA({
        version: "0.1.0",
        registerType: "autoUpdate",
        injectRegister: false,

        srcDir: "src",
        filename: "service-worker.js",
        strategies: "injectManifest",

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: "Axona",
          short_name: "Axona",
          description: "Gestionale per la tua attività",
          theme_color: "#ffffff",
        },
        injectManifest: {
          injectionPoint: undefined,
        },

        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },

        devOptions: {
          enabled: false,
          navigateFallback: "index.html",
          suppressWarnings: true,
          type: "module",
        },
      }),
    ],
    build: {
      minify: "terser", // Usa Terser invece di esbuild
      terserOptions: {
        compress: {
          drop_console: true, // Rimuove i console.log
          drop_debugger: true, // Rimuove i debugger
        },
        format: {
          comments: false, // Rimuove i commenti dal codice minificato
        },
      },
    },
  };
});
