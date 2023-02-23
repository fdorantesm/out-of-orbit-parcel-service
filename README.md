### Description

A [NestJS](https://nestjs.com) API template using mongodb

### Stack

|                | Version |
| -------------- | ------- |
| NestJS         | 9.X     |
| MongoDB        | 5.0     |
| Docker         | 20.1    |
| Docker Compose | 1.29.2  |

### Installation

```bash
$ yarn install
```

### Seeds

#### Seed API Keys
```sh
yarn scripts:seed-api-keys
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### References

|         |                             |
| ------- | --------------------------- |
| API Ref | https://localhost:3000/docs |
| Postman | https://www.postman.com/lively-crater-325304/workspace/out-of-orbit-parcel-service |
| ApiKey  | 1BC6EPJ-NMYM3SY-MCPE175-N62WM7F |
| BaseUrl | https://oops-c1ta.onrender.com |
| Admin   | root@email.local / sesame |
| User    | john@email.local / sesame |

### Docker compose scripts

Launch services

```bash
yarn launch
```

Stop services

```bash
yarn bye
```
