import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class CouldCancelInDeliveryShipmentException extends HttpException {
  constructor() {
    // TODO: Create exception codes
    const message = `Shipment in delivery could't be cancelled`;

    super(message, HttpStatus.BAD_REQUEST);
    Logger.error(this.message, CouldCancelInDeliveryShipmentException.name);
  }
}
