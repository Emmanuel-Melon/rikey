import { createAxiosClient } from "@/lib/axios";
import { WhatsAppConfig } from "./whatsapp.config";

export const whatsappHttpClient = createAxiosClient({
  baseURL: WhatsAppConfig.apiUrl,
  defaultHeaders: {
    Authorization: `Bearer ${WhatsAppConfig.accessToken}`,
    "Content-Type": "application/json",
  },
  timeout: 30000,
});
