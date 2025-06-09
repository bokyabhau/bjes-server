import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

const modelDefinitions: ModelDefinition[] = [
  { name: User.name, schema: UserSchema },
];

@Module({
  imports: [MongooseModule.forFeature(modelDefinitions)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
