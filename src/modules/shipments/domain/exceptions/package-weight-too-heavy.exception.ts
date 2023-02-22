import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class PackageWeightTooHeavyException extends HttpException {
  constructor() {
    // TODO: Create exception codes
    const message = `The package's weight is too heavy, you may to contact us for a special agreement`;
    super(message, HttpStatus.BAD_REQUEST);
    Logger.error(this.message, PackageWeightTooHeavyException.name);
  }
}
