import { ConnectionString } from 'connection-string';

export function getConnectionString(
  host: string,
  port?: number,
  username?: string,
  password?: string,
) {
  return new ConnectionString('', {
    user: username,
    password: password,
    protocol: port ? 'mongodb' : 'mongodb+srv',
    hosts: [{ name: host, port: port }],
  }).toString();
}
