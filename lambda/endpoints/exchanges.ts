import { APIGatewayProxyEvent } from 'aws-lambda';
import { get } from '../handlers/exchanges/get';
import { createOne } from '../handlers/exchanges/create-one';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {

    switch (event.httpMethod) {
      case 'GET':
        return await get(event.queryStringParameters);
      case 'POST':
        return await createOne(event.body);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid HTTP method' }),
        };
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};