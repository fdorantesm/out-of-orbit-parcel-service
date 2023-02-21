import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  autoIndex: true,
  timestamps: true,
  collection: 'apiKeys',
})
export class ApiKeyModel extends Document {
  @Prop({ type: String, index: true, unique: true })
  public uuid: string;

  @Prop({ type: String, index: true, unique: true })
  public name: string;

  @Prop({ type: String, unique: true, index: true })
  public key: string;

  @Prop({ type: String, unique: true, index: true })
  public keyUuid: string;
}

const ApiKeySchema = SchemaFactory.createForClass(ApiKeyModel);

export { ApiKeySchema };
