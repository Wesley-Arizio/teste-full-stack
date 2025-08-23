import Constants from "expo-constants";

type AppExtraConfig = {
  apiBaseUrl: string;
};

const extraConfig = Constants.expoConfig?.extra as AppExtraConfig;

if (!extraConfig?.apiBaseUrl || typeof extraConfig.apiBaseUrl !== "string") {
  throw new Error("Missing env variable apiBaseUrl");
}

export const env = {
  apiBaseUrl: extraConfig.apiBaseUrl,
};
