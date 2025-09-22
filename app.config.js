// app.config.js
import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "jewelScheme-mobileApp",
  slug: "jewelScheme-mobileApp",
  assetBundlePatterns: ["assets/images/*", "assets/fonts/*"],
  // whatever else you had in app.json...
  extra: {
    API_URL: process.env.JEWEL_SERVICE_URL,
    JEWEL_SERVICE_URL: process.env.JEWEL_SERVICE_URL,
    eas: {
      projectId: "5d7c47ab-4d27-4ff4-b31f-3fd61d46eec3",
    },
  },
});
