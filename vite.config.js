import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

const fs = require("fs");
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [reactRefresh()],

  server: {
    // port: 5000,
    open: true,
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem"),
    },
  },
});
