import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to list all staffs
export async function main(event, context) {
  const params = {
      TableName: "Staff",
  };

  try {
    const result = await dynamoDbLib.call("scan", params); //Scan method will view all table to retrieve information
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
      console.log(e);
    return failure({ status: false });
  }
}