import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to obtain projects by the keywords submitted from front end. 
export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "projects",
        Key: {
          projectId: event.pathParameters.id
        }, // 'Key' defines the partition key 
       
        
        UpdateExpression: "SET requirements = :requirements, pstatus = :pstatus, projectName = :projectName",                            
        // 'UpdateExpression' defines the attributes to be updated
        ExpressionAttributeValues: {
            ":requirements": data.requirements || null,
            ":pstatus": data.pstatus || null,
            ":projectName": data.projectName || null
        },// 'ExpressionAttributeValues' defines the value in the update expression
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}