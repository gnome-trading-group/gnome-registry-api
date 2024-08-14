import { Client } from 'pg';

export async function connectDatabase() {
  const dbSecretJson = process.env.DATABASE_SECRET_JSON;

  if (!dbSecretJson) {
    throw new Error('Missing required environment variables');
  }

  const { password, dbname, port, host, username } = JSON.parse(dbSecretJson);

  const client = new Client({
    user: username,
    host,
    database: dbname,
    password,
    port: parseInt(port),
  });
  await client.connect();
  return client;
}
