import { PackageSize } from 'src/modules/shipments/domain/enums/size.enum';
import { ShipmentStatus } from 'src/modules/shipments/domain/enums/status.enum';
import { Shipment } from 'src/modules/shipments/domain/interfaces/shipment.interface';

export const shipmentList: Shipment[] = [
  {
    uuid: '25dab722-c622-4422-b46c-299adcd27f53',
    trackingNumber: '4LQGuZOdkWDX',
    origin: {
      street: 'Plaza de la consitución',
      extNumber: 's/n',
      neighborhood: 'Centro',
      zipCode: '06000',
      city: 'Cuauhtémoc',
      state: 'Ciudad de México',
      location: {
        latitude: 19.4326018,
        longitude: -99.1353936,
      },
    },
    destination: {
      street: 'Eje Central Lázaro Cárdenas',
      extNumber: 's/n',
      neighborhood: 'Centro',
      zipCode: '06000',
      city: 'Cuauhtémoc',
      state: 'Ciudad de México',
      location: {
        latitude: 19.4352001,
        longitude: -99.143389,
      },
    },
    packet: {
      length: 10,
      weight: 500,
      width: 30,
      height: 30,
      size: PackageSize.SMALL,
    },
    userId: '856f7dc1-ef6c-489c-8f72-557d98b93610',
    status: ShipmentStatus.CANCELLED,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: 'bbf32760-df0c-4f52-a2c3-1cf0c9c7a95b',
    trackingNumber: 'sdNLtHpfGAIM',
    origin: {
      street: 'Av. Revolución',
      extNumber: '375',
      neighborhood: 'San Pedro de los Pinos',
      zipCode: '03800',
      city: 'Benito Jurárez',
      state: 'Ciudad de México',
      location: {
        latitude: 19.39524,
        longitude: -99.1877887,
      },
    },
    destination: {
      street: 'Carr. Cayaco – Puerto Marquez',
      extNumber: 's/n',
      neighborhood: 'Campamento 26 de Septiembre',
      zipCode: '39898',
      city: 'Acapulco de Juárez',
      state: 'Guerrero',
      location: {
        latitude: 16.8246434,
        longitude: -99.8185864,
      },
    },
    packet: {
      length: 25,
      weight: 5000,
      width: 50,
      height: 30,
      size: PackageSize.MEDIUM,
    },
    userId: 'cfda6293-3da0-4bb5-bf15-889f4e788359',
    status: ShipmentStatus.CANCELLED,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: '816c30b0-4d25-419b-b512-b10cbafda28a',
    trackingNumber: 'VfAWh4rv0IY3',
    origin: {
      street: 'Horacio',
      extNumber: '340',
      intNumber: '203b',
      neighborhood: 'Polanco V sección',
      zipCode: '11550',
      city: 'Miguel Hidalgo',
      state: 'Ciudad de México',
      location: {
        latitude: 19.4326679,
        longitude: -99.1871174,
      },
    },
    destination: {
      street: 'Av. Víctor Hugo',
      extNumber: '142',
      neighborhood: 'Portales Nte',
      zipCode: '03303',
      city: 'Benito Juárez',
      state: 'Ciudad de México',
      location: {
        latitude: 19.3703798,
        longitude: -99.1513561,
      },
    },
    packet: {
      length: 15,
      weight: 24400,
      width: 60,
      height: 90,
      size: PackageSize.LARGE,
    },
    userId: '9baed68d-8a53-43a4-a3fd-20bfe96b3e7f',
    status: ShipmentStatus.CREATED,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: 'efee9fc4-51eb-4c44-ac3d-d489ff73c674',
    trackingNumber: 'h9xHXIYgLxP2',
    origin: {
      street: 'Bosques de Ecatepec',
      extNumber: '6a',
      intNumber: '103',
      neighborhood: 'Villas Ecatepec',
      zipCode: '55050',
      city: 'Ecatepec de Morelos',
      state: 'Estado de México',
      location: {
        latitude: 19.6021167,
        longitude: -99.0280672,
      },
    },
    destination: {
      street: 'Embarcadero 195',
      extNumber: '5',
      neighborhood: 'Villa Xochitenco',
      zipCode: '56334',
      city: 'Chimalhuacán',
      state: 'Estado de México',
      location: {
        latitude: 19.4352001,
        longitude: -99.143389,
      },
    },
    packet: {
      length: 20,
      weight: 16500,
      width: 60,
      height: 50,
      size: PackageSize.MEDIUM,
    },
    userId: 'e11a3a8e-44fb-4ce6-961e-f6cdd0506328',
    status: ShipmentStatus.ON_DELIVERY,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: 'af8cb161-56c5-45ea-86ff-30ee190c857d',
    trackingNumber: 'b64EW2ALtkqc',
    origin: {
      street: 'Av Paseo del Moral',
      extNumber: '330',
      neighborhood: 'Jardines del Moral',
      zipCode: '37160',
      city: 'León',
      state: 'Guanajuato',
      location: {
        latitude: 19.6021167,
        longitude: -99.0280672,
      },
    },
    destination: {
      street: 'C. Héroe de Nacozari',
      extNumber: '25B',
      intNumber: '14b',
      neighborhood: 'Centro',
      zipCode: '76000',
      city: 'Santiago de Querétaro',
      state: 'Querétaro',
      location: {
        latitude: 20.6008241,
        longitude: -100.4011286,
      },
    },
    packet: {
      length: 35,
      weight: 3000,
      width: 60,
      height: 30,
      size: PackageSize.SMALL,
    },
    userId: 'e11a3a8e-44fb-4ce6-961e-f6cdd0506328',
    status: ShipmentStatus.IN_WAREHOUSE,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: '74b62c1b-2766-4af8-bcfe-3cfbf2432957',
    trackingNumber: 'pCFtARFluNiP',
    origin: {
      street: 'Av Paseo del Moral',
      extNumber: '330',
      neighborhood: 'Jardines del Moral',
      zipCode: '37160',
      city: 'León',
      state: 'Guanajuato',
      location: {
        latitude: 19.6021167,
        longitude: -99.0280672,
      },
    },
    destination: {
      street: 'C. Héroe de Nacozari',
      extNumber: '25B',
      intNumber: '14b',
      neighborhood: 'Centro',
      zipCode: '76000',
      city: 'Santiago de Querétaro',
      state: 'Querétaro',
      location: {
        latitude: 20.6008241,
        longitude: -100.4011286,
      },
    },
    packet: {
      length: 15,
      weight: 24400,
      width: 10,
      height: 9,
      size: PackageSize.LARGE,
    },
    userId: 'e11a3a8e-44fb-4ce6-961e-f6cdd0506328',
    status: ShipmentStatus.IN_WAREHOUSE,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
  {
    uuid: '74b62c1b-2766-4af8-bcfe-3cfbf2432957',
    trackingNumber: '4Ah10NtKxFmd',
    origin: {
      street: 'C. Wenceslao Sánchez de la Barquera',
      extNumber: '13 zona 2 extendida',
      neighborhood: 'Villas del Sur',
      zipCode: '76040',
      city: 'Santiago de Querétaro',
      state: 'Querétaro',
      location: {
        latitude: 20.5821063,
        longitude: -100.3881769,
      },
    },
    destination: {
      street: 'Calle Cto. Alamos',
      extNumber: '88',
      intNumber: '14b',
      neighborhood: ' Alamos 2da Secc',
      zipCode: '76160',
      city: 'Santiago de Querétaro',
      state: 'Querétaro',
      location: {
        latitude: 20.6086853,
        longitude: -100.3833004,
      },
    },
    packet: {
      length: 15,
      weight: 1977,
      width: 60,
      height: 20,
      size: PackageSize.SMALL,
    },
    userId: 'e11a3a8e-44fb-4ce6-961e-f6cdd0506328',
    status: ShipmentStatus.DELIVERED,
    createdAt: new Date('2023-02-22T09:25:20.560-06:00'),
  },
];
