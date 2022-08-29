import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});
client.connect();

export default client;
