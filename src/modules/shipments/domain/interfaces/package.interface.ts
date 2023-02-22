import { PackageSize } from '../enums/size.enum';

export interface ShipmentPackage {
  size: PackageSize;
  length: number;
  weight: number;
  width: number;
  height: number;
}

export type CreateShipmentPackage = Omit<ShipmentPackage, 'size'>;
