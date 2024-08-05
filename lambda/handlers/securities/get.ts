import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { connectDatabase } from "../../connections";

export async function get(params: APIGatewayProxyEventQueryStringParameters | null) {
  const client = await connectDatabase();

  let query = "SELECT * FROM sm.security WHERE 1=1";

  if (params?.securityId) {
    query += ` AND security_id=${params.securityId}`;
  }
  if (params?.symbol) {
    query += ` AND symbol='${params.symbol}'`;
  }

  const result = await client.query(query);
  const items = JSON.stringify(result.rows);

  return {
    statusCode: 200,
    body: items,
  }
}
   