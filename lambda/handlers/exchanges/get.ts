import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { connectDatabase } from "../../connections";

export async function get(params: APIGatewayProxyEventQueryStringParameters | null) {
  const client = await connectDatabase();

  let query = "SELECT * FROM sm.exchange WHERE 1=1";

  if (params?.exchangeId) {
    query += ` AND exchange_id=${params.exchangeId}`;
  }
  if (params?.exchangeName) {
    query += ` AND exchange_name='${params.exchangeName}'`;
  }

  const result = await client.query(query);
  const items = JSON.stringify(result.rows);

  return {
    statusCode: 200,
    body: items,
  }
}
   