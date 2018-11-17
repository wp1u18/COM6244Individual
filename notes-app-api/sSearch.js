import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to obtain staffs deatails by the keywords submitted from front end. 
export async function main(event, context) {
    const params = {
        TableName: "Staff",
        ProjectionExpression: "#s,Skills,StaffId",          //A string that identifies one or more attributes to retrieve from the specified table or index
        FilterExpression: "contains(#s,:v)",                //FilterExpression filters the result which retrieves from Table 
        ExpressionAttributeNames: { "#s": "StaffName" },    //ExpressionAttributeNames defines the AttributeName scanned  
        ExpressionAttributeValues: { ":v": event.queryStringParameters.content }             //ExpressionAttributeValue defines the Attribute value scanned  
    }; try {
        const result = await dynamoDbLib.call("scan", params);                               //Defiena a result variable to receive the data scanned and Using awite so that the data processing completed        
        return success(result.Items);                                                        // Return the matching list of items in response body
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }

}

