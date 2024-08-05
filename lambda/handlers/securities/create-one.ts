import { connectDatabase } from "../../connections";
import { ICreateSecurity } from "../../types";

export async function createOne(body: string | null) {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  const security = JSON.parse(body) as ICreateSecurity;
  const client = await connectDatabase();
  const result = await client.query(`
    INSERT INTO sm.security (symbol, description, type)
    VALUES ('${security.symbol}',${security.description ? `'${security.description}'` : 'null'},${security.type})
    RETURNING *;
  `);
  
  if (result.rowCount != 1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Unable to create security with symbol: ${security.symbol}` }),
    }
  }

  const item = result.rows[0];

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
}
   