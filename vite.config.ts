import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

const isVercel = process.env.VERCEL === "1" || process.env.NITRO_PRESET === "vercel";

export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  server: {
    allowedHosts: true,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Keep SSR entry pointed at our catastrophic-error wrapper.
      server: { entry: "server" },
    }),
    nitro({
      preset: isVercel ? "vercel" : undefined,
    }),
    viteReact(),
  ],
});
