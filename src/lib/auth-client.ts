import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://192.168.1.6:5000",
  fetchOptions: {
    headers: {
      origin: "dementianestcare://",
    },
  },
  plugins: [
    expoClient({
      scheme: "dementianestcare",
      storagePrefix: "dementianestcare",
      storage: SecureStore,
    }),
  ],
});
export const { signIn, signUp, useSession } = createAuthClient();
