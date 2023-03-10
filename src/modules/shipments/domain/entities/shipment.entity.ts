import { PackageSize } from '../enums/size.enum';
import { ShipmentStatus } from '../enums/status.enum';
import { ShipmentAddress } from '../interfaces/address.interface';
import { ShipmentPackage } from '../interfaces/package.interface';
import {
  CreateShipmentPayload,
  Shipment,
} from '../interfaces/shipment.interface';
import { DateService } from 'src/modules/shared/services/date.service';

const dateService = new DateService();

export class ShipmentEntity implements Shipment {
  private constructor(
    public uuid: string,
    public trackingNumber: string,
    public origin: ShipmentAddress,
    public destination: ShipmentAddress,
    public packet: ShipmentPackage,
    public userId: string,
    public status: ShipmentStatus,
    public createdAt?: Date,
  ) {}

  static create(shipment: Shipment): ShipmentEntity {
    const packet = {
      ...shipment.packet,
      size: this.calcSize(shipment.packet.weight),
    };
    return new ShipmentEntity(
      shipment.uuid,
      shipment.trackingNumber,
      shipment.origin,
      shipment.destination,
      packet,
      shipment.userId,
      shipment.status,
      shipment.createdAt,
    );
  }

  public isCancelableWithRefund(): boolean {
    const now = dateService.create();
    const createdAt = dateService.create(this.createdAt);
    const diffFromNow = dateService.diff(now, createdAt, 'minutes');
    return diffFromNow <= 2 && diffFromNow >= 0;
  }

  public cancel() {
    this.status = ShipmentStatus.CANCELLED;
  }

  public isCancelable(): boolean {
    const cancelables = Array.from([]).concat(
      ShipmentStatus.ON_DELIVERY,
      ShipmentStatus.DELIVERED,
    );
    return !cancelables.includes(this.status);
  }

  public isCancelled(): boolean {
    return this.hasStatus(ShipmentStatus.CANCELLED);
  }

  public hasStatus(status: ShipmentStatus): boolean {
    return this.status === status;
  }

  public static isTooHeavy(weight: number): boolean {
    return weight > 25000;
  }

  public static calcSize(weight: number) {
    const size =
      weight <= 5000
        ? PackageSize.SMALL
        : weight <= 15000
        ? PackageSize.MEDIUM
        : PackageSize.LARGE;

    return size;
  }

  public static getInitialStatus() {
    return ShipmentStatus.CREATED;
  }

  public static isSomePackageNotSupported(
    shipments: Shipment[] | CreateShipmentPayload[],
  ): boolean {
    return shipments.some((shipment) => shipment.packet.weight > 25000);
  }

  public toJson() {
    return {
      uuid: this.uuid,
      trackingNumber: this.trackingNumber,
      userId: this.userId,
      origin: this.origin,
      destination: this.destination,
      packet: this.packet,
      status: this.status,
    };
  }
}
