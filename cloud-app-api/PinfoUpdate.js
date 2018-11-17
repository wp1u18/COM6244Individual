import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//This Lambda function is to list current log-in staff infor
export async function main(event, context) {
	const data = JSON.parse(event.body);
	const params = {
		TableName: "Staff",
		
		Key: {
            StaffId: event.pathParameters.id,// 'Key' defines the partition key and sort key of the item to be retrieved
		},
		// 'UpdateExpression' defines the attributes to be updated
		
		UpdateExpression: "SET StaffName = :StaffName, Gender = :Gender, Skills = :Skills, Email = :Email, Birthdate = :Birthdate, StaffIdentity = :StaffIdentity",                            
		//
		ExpressionAttributeValues: {
			":StaffName": data.StaffName || null,                  
			":Gender": data.Gender || null,
			":Skills": data.Skills || null,
			":Email": data.Email || null,
			":Birthdate": data.Birthdate || null,
			":StaffIdentity": data.StaffIdentity || null
		},// 'ExpressionAttributeValues' defines the value in the update expression					
		ReturnValues: "ALL_NEW"// 'ReturnValues' specifies if and how to return the item's attributes, where ALL_NEW returns all attributes of the item after the update;
	};

	try {
		const result = await dynamoDbLib.call("update", params);
		return success({ status: true });
	} catch (e) {
		return failure({ e });
	}
}