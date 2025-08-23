// No topo do arquivo
import "dotenv/config";

export default {
  expo: {
    name: "client",
    slug: "client",
    extra: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3001/",
    },
  },
};
