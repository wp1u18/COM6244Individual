import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "Staff",
        Key: {
          StaffId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET StaffName = :StaffName, Gender = :Gender, Skills = :Skills, Email = :Email, Birthdate = :Birthdate, StaffIdentity = :StaffIdentity",                            
        //
        ExpressionAttributeValues: {
            ":StaffName": data.StaffName || null,                  
            ":Gender": data.Gender || null,
            ":Skills": data.Skills || null,
            ":Email": data.Email || null,
            ":Birthdate": data.Birthdate || null,
            ":StaffIdentity": data.StaffIdentity || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ e });
    }
}