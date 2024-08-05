import { connectDatabase } from "../../connections";
import { ICreateListing } from "../../types";

export async function createOne(body: string | null) {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  const listing = JSON.parse(body) as ICreateListing;
  const client = await connectDatabase();
  const result = await client.query(`
    INSERT INTO sm.listing (exchange_id,security_id,exchange_security_id,exchange_security_symbol)
    VALUES ('${listing.exchangeId}',${listing.securityId},'${listing.exchangeSecurityId}','${listing.exchangeSecuritySymbol}')
    RETURNING *;
  `);
  
  if (result.rowCount != 1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Unable to create listing with symbol: ${listing.exchangeSecuritySymbol}` }),
    }
  }

  const item = result.rows[0];

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  }
}
   