import { Injectable } from '@nestjs/common';
import { IncomingWhatsAppMessage, WhatsAppMessageType } from './whatsapp.types';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly apiVersion: string = process.env.WHATSAPP_API_VERSION!;
  private readonly apiUrl: string = process.env.WHATSAPP_API_URL!;
  private readonly apiId: string = process.env.WHATSAPP_API_ID!;
  private readonly messagesEndPoint: string =
    process.env.WHATSAPP_API_MESSAGES_END_POINT!;
  private readonly messagesApiUrl: string = `${this.apiUrl}/${this.apiVersion}/${this.apiId}/${this.messagesEndPoint}/`;

  constructor(private readonly userService: UsersService) {}

  public async handleIncomingMessage(
    message: IncomingWhatsAppMessage,
  ): Promise<void> {
    const messageEntry = message.entry[0];
    const change = messageEntry.changes[0];
    const contact = change.value.contacts[0];
    const messageData = change.value.messages[0];

    const type = messageData.type;

    const existingUser = await this.userService.findByUsername(
      messageData.from,
    );
    const isRegistrationMessage = messageData.text?.body
      .toLowerCase()
      .includes('register');

    if (!existingUser && !isRegistrationMessage) {
      await this.setMessageReadStatus(messageData.id);
      await this.sendMessage(messageData.from, 'Please register first.');
      return;
    }

    switch (type) {
      case WhatsAppMessageType.TEXT:
        break;
      case WhatsAppMessageType.LOCATION:
        break;

      default:
        console.log('Unhandled message type:', type);
    }
  }

  private async setMessageReadStatus(messageId: string): Promise<void> {
    await axios.post(
      this.messagesApiUrl,
      {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        },
      },
    );
  }

  private async sendMessage(to: string, message: string): Promise<void> {
    await axios.post(
      this.messagesApiUrl,
      {
        messaging_product: 'whatsapp',
        to,
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        },
      },
    );
  }
}
