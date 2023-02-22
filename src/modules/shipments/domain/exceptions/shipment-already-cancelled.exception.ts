import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ShipmentAlreadyCancelledException extends HttpException {
  constructor() {
    // TODO: Create exception codes
    const message = `Shipment already cancelled`;
    super(message, HttpStatus.BAD_REQUEST);
    Logger.error(this.message, ShipmentAlreadyCancelledException.name);
  }
}
