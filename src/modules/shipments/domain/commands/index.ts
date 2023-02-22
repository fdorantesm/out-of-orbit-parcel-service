import { CreateShipmentCommandHandler } from './create-shipment/create-shipment.command.handler';

export * from './create-shipment/create-shipment.command';
export * from './create-shipment/create-shipment.command.handler';

export const CommandHandlers = [CreateShipmentCommandHandler];
