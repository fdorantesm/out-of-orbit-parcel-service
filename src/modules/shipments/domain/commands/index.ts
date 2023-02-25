import { CreateShipmentBulkCommandHandler } from './create-shipment-bulk/create-bulk-shipment.command.handler';
import { CreateShipmentCommandHandler } from './create-shipment/create-shipment.command.handler';

export * from './create-shipment/create-shipment.command';
export * from './create-shipment/create-shipment.command.handler';

export const CommandHandlers = [
  CreateShipmentCommandHandler,
  CreateShipmentBulkCommandHandler,
];
