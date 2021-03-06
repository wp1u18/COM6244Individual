import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//this Lambda function is to obtain a specific staff information by staffid
export async function main(event, context) {
    const params = {
        TableName: "Staff",
        // 'Key' defines the partition key and sort key of the item to be retrieved
        Key: {
            StaffId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Return the retrieved item
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found." });
        }
    } catch (e) {
        return failure({ status: false });
    }
}