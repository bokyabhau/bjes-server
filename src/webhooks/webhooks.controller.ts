import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async getAllUsers(): Promise<User[]> {
    // This method retrieves all users from the database
    const users = await this.userService.findAll();
    return users;
  }
}
