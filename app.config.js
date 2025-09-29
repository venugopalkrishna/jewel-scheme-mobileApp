// app.config.js
import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "TimeseraJewelScheme",
  slug: "timesera-jewel-scheme",
  assetBundlePatterns: ["assets/images/*", "assets/fonts/*"],
  // whatever else you had in app.json...
  extra: {
    API_URL: process.env.JEWEL_SERVICE_URL,
    JEWEL_SERVICE_URL: process.env.JEWEL_SERVICE_URL,
    eas: {
      projectId: "8bac7a9f-76ea-480c-88e7-fdd4b196e817",
    },
  },
});
