import { Client } from 'pg';
import * as AWS from 'aws-sdk';

export async function connectDatabase() {
  const dbSecretArn = process.env.DATABASE_SECRET_ARN;

  if (!dbSecretArn) {
    throw new Error('Missing required environment variables');
  }

  const secretManager = new AWS.SecretsManager();
  const secretParams: AWS.SecretsManager.GetSecretValueRequest = {
    SecretId: dbSecretArn,
  };
  const dbSecret = await secretManager.getSecretValue(secretParams).promise();
  const secretString = dbSecret.SecretString;

  if (!secretString) {
    throw new Error(`Unable to find secret using arn: ${dbSecretArn}`);
  }

  const { password, dbname, port, host, username } = JSON.parse(secretString);

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
