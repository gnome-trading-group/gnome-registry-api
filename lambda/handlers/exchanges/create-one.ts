import { connectDatabase } from "../../connections";
import { ICreateExchange } from "../../types";

export async function createOne(body: string | null) {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  const exchange = JSON.parse(body) as ICreateExchange;
  const client = await connectDatabase();
  const result = await client.query(`
    INSERT INTO sm.exchange (exchange_name)
    VALUES ('${exchange.exchangeName}')
    RETURNING *;
  `);
  
  if (result.rowCount != 1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Unable to create exchange with name: ${exchange.exchangeName}` }),
    }
  }

  const item = result.rows[0];

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
}
   