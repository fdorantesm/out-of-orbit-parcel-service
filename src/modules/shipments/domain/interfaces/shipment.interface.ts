import { ShipmentStatus } from '../enums/status.enum';
import { ShipmentAddress } from './address.interface';
import { CreateShipmentPackage, ShipmentPackage } from './package.interface';

export interface ShipmentBase {
  origin: ShipmentAddress;
  destination: ShipmentAddress;
}

export interface Shipment extends ShipmentBase {
  userId: string;
  trackingNumber: string;
  uuid: string;
  status: ShipmentStatus;
  packet: ShipmentPackage;
  createdAt?: Date;
}

export interface CreateShipmentPayload extends ShipmentBase {
  packet: CreateShipmentPackage;
}
