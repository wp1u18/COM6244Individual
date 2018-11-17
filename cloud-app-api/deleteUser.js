import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to delete a staff from Table Staff by their Id,the path id is defined in front end 
export async function main(event, context) {
    const params = {
        TableName: "Staff",
        // 'Key' defines the partition key and sort key of the item to be removed
        Key: {
            StaffId: event.pathParameters.id
        }
    };
    try {
        const result = await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}