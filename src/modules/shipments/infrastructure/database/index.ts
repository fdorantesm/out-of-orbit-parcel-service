import { Instance } from 'src/core/infrastructure/models/instance';
import { ShipmentModel } from './models/shipment.model';
import { ShipmentSchema } from './schemas/shipment.schema';

export const ShipmentModelConfig: Instance = {
  name: ShipmentModel.name,
  schema: ShipmentSchema,
};
