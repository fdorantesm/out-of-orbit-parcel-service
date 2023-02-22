import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { ShipmentAddress } from 'src/modules/shipments/domain/interfaces/address.interface';
import { ShipmentPackage } from 'src/modules/shipments/domain/interfaces/package.interface';

@Schema({
  collection: 'shipments',
  autoIndex: true,
})
export class ShipmentModel extends Document {
  @Prop({ type: String, unique: true })
  public uuid;

  @Prop({ type: String, unique: true })
  public trackingNumber: string;

  @Prop({ type: Object })
  public origin: ShipmentAddress;

  @Prop({ type: Object })
  public destination: ShipmentAddress;

  @Prop({ type: Object })
  public packet: ShipmentPackage;

  @Prop({ type: String })
  public userId: string;

  @Prop({ type: String })
  public status: ShipmentStatus;

  @Prop({ type: Date })
  public createdAt: Date;
}
