import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class CantUpdateCancelledShipmentStatusException extends HttpException {
  constructor() {
    // TODO: Create exception codes
    const message = `Can't update cancelled shipment status`;
    super(message, HttpStatus.BAD_REQUEST);
    Logger.error(this.message, CantUpdateCancelledShipmentStatusException.name);
  }
}
