import { SchemaFactory } from '@nestjs/mongoose';

import { ShipmentModel } from '../models/shipment.model';

export const ShipmentSchema = SchemaFactory.createForClass(ShipmentModel);
