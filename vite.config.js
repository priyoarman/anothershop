import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiPort = env.PORT || "3002";

  return {
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${apiPort}`,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss({
        darkMode: "class",
        content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
        theme: { extend: {} },
        plugins: [],
      }),
    ],
  };
});
