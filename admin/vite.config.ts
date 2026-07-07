import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base is "/admin/" in production so the built assets resolve correctly when
// this app is served at yoursite.com/admin (as part of the same Vercel
// project as the public site). Local dev keeps serving from "/" on its own
// port, unaffected.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/admin/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
