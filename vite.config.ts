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
      // Edge redirect for every path, including static files. vercel.json
      // carries the same rule for the Vercel platform merge.
      routeRules: {
        // Nitro gives /assets/** its own header rule, which is matched before
        // the catch-all. Repeat the redirect there so those files move too.
        "/assets/**": {
          redirect: {
            to: "https://www.timeoutsportsbarlongview.com",
            status: 301,
          },
        },
        "/**": {
          redirect: {
            to: "https://www.timeoutsportsbarlongview.com",
            status: 301,
          },
        },
      },
    }),
    viteReact(),
  ],
});
