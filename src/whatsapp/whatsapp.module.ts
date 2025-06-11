import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [WhatsappService],
  imports: [UsersModule],
  exports: [WhatsappService],
})
export class WhatsappModule {}
