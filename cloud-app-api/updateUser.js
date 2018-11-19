import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//this Lambda function is to update a specific staff information by Id
export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "Staff",
        Key: {
            StaffId: event.pathParameters.id
        },       
        UpdateExpression: "SET StaffName = :StaffName, Gender = :Gender, Skills = :Skills, Email = :Email, Birthdate = :Birthdate, StaffIdentity = :StaffIdentity",                            
        // 'UpdateExpression' defines the attributes to be updated
        ExpressionAttributeValues: {
            ":StaffName": data.StaffName || null,                  
            ":Gender": data.Gender || null,
            ":Skills": data.Skills || null,
            ":Email": data.Email || null,
            ":Birthdate": data.Birthdate || null,
            ":StaffIdentity": data.StaffIdentity || null
        },          
        // ExpressionAttributeValues defines the value in the update expression
        ReturnValues: "ALL_NEW"  // 'ReturnValues' specifies if and how to return the item's attributes
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ e });
    }
}