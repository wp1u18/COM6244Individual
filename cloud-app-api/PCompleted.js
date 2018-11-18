import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to list all completed projects 
export async function main(event, context) {

    const params = {
        TableName: "projects",
        FilterExpression: "#p = :v",                       //FilterExpression filters the result which retrieves from Table 
        ExpressionAttributeNames: { "#p": "pstatus" },   //ExpressionAttributeNames defines the AttributeName scanned  
        ExpressionAttributeValues: { ":v": "Completed" }   //ExpressionAttributeValue defines the Attribute value scanned  
    }; try {
        const result = await dynamoDbLib.call("scan", params); //Defiena a result variable to receive the data scanned and Using awite so that the data processing completed        
        return success(result.Items);// Return the matching list of items in response body
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }

}