// src/config/env.ts
// import Constants from "expo-constants";

// // SDK 49+ prefer expoConfig; fallback for older
// // const projectId = Constants.expoConfig?.extra?.eas?.projectId;
// const extra =
//   (Constants.expoConfig && Constants.expoConfig.extra?.eas?.projectId) ||
//   (Constants.manifest && (Constants.manifest as any).extra?.eas?.projectId) ||
//   {};

// const must = (k: string) => {
//   const v = (extra as any)[k];
//   if (v == null || v === "") {
//     throw new Error(`Missing env: ${k} (check app.config.js / EAS secrets)`);
//   }
//   return v as string;
// };

// export const ENV = {
//   JEWEL_SERVICE_URL: must("JEWEL_SERVICE_URL"),
// };

// import Constants from "expo-constants";

// const extra =
//   (Constants.expoConfig?.extra as any) ||
//   ((Constants.manifest as any)?.extra as any) ||
//   {};

// const must = (k: string) => {
//   const v = extra[k];
//   if (v == null || v === "") {
//     throw new Error(`Missing env: ${k} (check app.json / EAS secrets)`);
//   }
//   return v as string;
// };

// export const ENV = {
//   JEWEL_SERVICE_URL: must("JEWEL_SERVICE_URL"),
//   PROJECT_ID: extra.eas?.projectId ?? null, // won’t crash in Expo Go
// };

import Constants from "expo-constants";

type Extra = {
  API_URL?: string;
  JEWEL_SERVICE_URL?: string;
  eas?: { projectId?: string };
};

// Get extra safely
const extra: Extra =
  (Constants.expoConfig?.extra as Extra) ||
  ((Constants.manifest as any)?.extra as Extra) ||
  {};

// Utility to require env keys
const must = (k: keyof Extra): string => {
  const v = extra[k] as string | undefined;
  if (!v) {
    throw new Error(
      `Missing env: ${String(k)} (check app.json or EAS secrets)`
    );
  }
  return v;
};

export const ENV = {
  API_URL: must("API_URL"),
  JEWEL_SERVICE_URL: must("JEWEL_SERVICE_URL"),
  PROJECT_ID: extra.eas?.projectId ?? "", // 👈 now only string
};
