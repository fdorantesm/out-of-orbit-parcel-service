import { ShipmentAddress } from 'src/modules/shipments/domain/interfaces/address.interface';
import { ShipmentPackage } from 'src/modules/shipments/domain/interfaces/package.interface';

export interface CreateShipmentUseCasePayload {
  origin: ShipmentAddress;
  destination: ShipmentAddress;
  packet: Omit<ShipmentPackage, 'size'>;
  userId: string;
}
