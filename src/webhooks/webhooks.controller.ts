import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { IncomingWhatsAppMessage } from '../whatsapp/whatsapp.types';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly whatsappService: WhatsappService) {}
  @Post()
  handleIncomingMessage(@Body() body: any): Promise<void> {
    console.log(JSON.stringify(body));
    return this.whatsappService.handleIncomingMessage(body);
  }

  @Get()
  async verifyAndSubscribe(
    @Query() query: any,
    @Res() res: Response,
  ): Promise<void> {
    // This method retrieves all users from the database
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    console.log('Verification query:', query);

    // check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      // respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);
      console.log('Webhook verified successfully!');
    } else {
      // respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

const x: IncomingWhatsAppMessage = {
  entry: [
    {
      changes: [
        {
          field: 'messages',
          value: {
            contacts: [
              {
                profile: {
                  name: 'Adi',
                },
                wa_id: '917387039629',
              },
            ],
            messages: [
              {
                from: '917387039629',
                id: 'wamid.HBgMOTE3Mzg3MDM5NjI5FQIAEhgUM0E1MTRBNUQ0NTA4NkRFRDQwOEUA',
                text: {
                  body: 'Dolalala',
                },
                timestamp: '1749549288',
                type: 'text',
              },
            ],
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15556565224',
              phone_number_id: '697698320086503',
            },
          },
        },
      ],
      id: '1240634427606628',
    },
  ],
  object: 'whatsapp_business_account',
};

const y: IncomingWhatsAppMessage = {
  entry: [
    {
      changes: [
        {
          field: 'messages',
          value: {
            contacts: [
              {
                profile: {
                  name: 'Adi',
                },
                wa_id: '917387039629',
              },
            ],
            messages: [
              {
                from: '917387039629',
                id: 'wamid.HBgMOTE3Mzg3MDM5NjI5FQIAEhgUM0FDQjg1MThFQTRENENBMjYyQTQA',
                location: {
                  address:
                    'Sinhagad Road, Manigbaug Opposite Sundar Garden, Pune, Mahārāshtra 411051',
                  latitude: 18.475332260132,
                  longitude: 73.821212768555,
                  name: 'Hong-Kong Chinese Restaurant',
                  url: 'https://foursquare.com/v/56c9d5a1498e63278944d8e2',
                },
                timestamp: '1749550158',
                type: 'location',
              },
            ],
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15556565224',
              phone_number_id: '697698320086503',
            },
          },
        },
      ],
      id: '1240634427606628',
    },
  ],
  object: 'whatsapp_business_account',
};
