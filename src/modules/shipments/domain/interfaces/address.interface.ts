import { Location } from './location.interface';

export interface ShipmentAddress {
  street: string;
  extNumber: string;
  intNumber?: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
  location: Location;
}
