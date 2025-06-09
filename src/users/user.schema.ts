import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserRole = 'admin' | 'client' | 'driver';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({
    unique: true,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email regex
  })
  email: string;

  @Prop({
    required: true,
    enum: ['admin', 'client', 'driver'],
  })
  role: UserRole;

  @Prop({ default: true })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

export type UserDocument = User & Document;
export const UserModelName = 'User';
