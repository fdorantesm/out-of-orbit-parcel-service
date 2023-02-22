import { ShipmentAddress } from 'src/modules/shipments/domain/interfaces/address.interface';
import { ShipmentPackage } from 'src/modules/shipments/domain/interfaces/package.interface';

export interface CreateShipmentRequestContext {
  userId: string;
  origin: ShipmentAddress;
  destination: ShipmentAddress;
  packet: Omit<ShipmentPackage, 'size'>;
}
