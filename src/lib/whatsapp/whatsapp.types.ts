export interface WhatsAppTextMessage {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry: Array<{
    changes: Array<{
      value: {
        messages?: WhatsAppTextMessage[];
      };
    }>;
  }>;
}
