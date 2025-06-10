import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  handleIncomingMessage(@Body() body: any): string {
    // Here you would handle the incoming webhook message
    // For now, we just log it and return a success message
    console.log('Received webhook:', body);
    return 'Webhook received successfully';
  }

  @Get()
  async verifyAndSubscribe(@Query() query: any, @Res() res: Response): Promise<void> {
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
