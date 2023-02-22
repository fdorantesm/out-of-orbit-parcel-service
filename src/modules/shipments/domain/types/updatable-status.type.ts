import { ShipmentStatus } from '../enums/status.enum';

export type UpdatableShipmentStatus =
  | ShipmentStatus.COLLECTED
  | ShipmentStatus.DELIVERED
  | ShipmentStatus.IN_WAREHOUSE
  | ShipmentStatus.IN_WAREHOUSE
  | ShipmentStatus.ON_DELIVERY
  | ShipmentStatus.CANCELLED;
