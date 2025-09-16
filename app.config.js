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
      projectId: "2874f4ee-c554-411d-a489-589b9fc25e8b",
    },
  },
});
