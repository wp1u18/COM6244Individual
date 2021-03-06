import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


//This Lambda function is to create a new project which includes project name,
//Id.requirements and status attribute to Table projects, the uuid is generated 
//by system and other details are submited from front end
export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "projects",
        Item: {
            projectName: data.projectName,
            projectId: uuid.v1(),
            requirements: data.requirements,
            pstatus: data.pstatus
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}