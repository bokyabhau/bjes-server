type WhatsAppContact = {
  profile: {
    name: string;
  };
  wa_id: string;
};

type WhatsAppEntryTextMessage = {
  body: string;
};

type WhatsAppEntryLocationMessage = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  url?: string;
};

export type WhatsAppEntryMessage = {
  from: string;
  id: string;
  text?: WhatsAppEntryTextMessage;
  location?: WhatsAppEntryLocationMessage;
  timestamp: string;
  type: string;
};

type WhatsAppMetadata = {
  display_phone_number: string;
  phone_number_id: string;
};

type WhatsAppEntryChangeValue = {
  contacts: WhatsAppContact[];
  messages: WhatsAppEntryMessage[];
  messaging_product: string;
  metadata: WhatsAppMetadata;
};

type WhatsAppEntryChange = {
  field: string;
  value: WhatsAppEntryChangeValue;
};

type WhatsAppEntry = {
  changes: WhatsAppEntryChange[];
  id: string;
};

export type IncomingWhatsAppMessage = {
  entry: WhatsAppEntry[];
  object: string;
};


export enum WhatsAppMessageType {
    TEXT = 'text',
    LOCATION = 'location',
}

export type WhatsAppSupportedMessageTypes = WhatsAppMessageType.TEXT | WhatsAppMessageType.LOCATION;