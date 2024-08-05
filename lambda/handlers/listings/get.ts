import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { connectDatabase } from "../../connections";

export async function get(params: APIGatewayProxyEventQueryStringParameters | null) {
  const client = await connectDatabase();

  let query = "SELECT * FROM sm.listing WHERE 1=1";

  if (params?.securityId) {
    query += ` AND security_id=${params.securityId}`;
  }
  if (params?.exchangeId) {
    query += ` AND exchange_id=${params.exchangeId}`;
  }
  if (params?.exchangeSecurityId) {
    query += ` AND exchange_security_id='${params.exchangeSecurityId}'`;
  }
  if (params?.exchangeSecuritySymbol) {
    query += ` AND exchange_security_symbol='${params.exchangeSecuritySymbol}'`;
  }

  const result = await client.query(query);
  const items = JSON.stringify(result.rows);

  return {
    statusCode: 200,
    body: items,
  }
}
   