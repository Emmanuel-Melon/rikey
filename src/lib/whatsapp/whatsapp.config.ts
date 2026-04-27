import { servicesConfig } from "@/config";

export const WhatsAppConfig = {
  apiUrl: "https://graph.facebook.com/v23.0",
  phoneNumberId: servicesConfig.whatsapp?.phoneNumberId,
  businessAccountId: servicesConfig.whatsapp?.businessAccountId,
  accessToken: servicesConfig.whatsapp?.accessToken,
  webhookVerifyToken: servicesConfig.whatsapp?.webhookVerifyToken,
};
