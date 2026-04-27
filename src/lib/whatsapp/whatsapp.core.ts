import { whatsappHttpClient } from "./index";
import { WhatsAppConfig } from "./whatsapp.config";

export const sendTextMessage = async (to: string, body: string) => {
  return whatsappHttpClient.post(`/${WhatsAppConfig.phoneNumberId}/messages`, {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body,
    },
  });
};
