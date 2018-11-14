import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "Staff",
        Item: {
            StaffName: data.StaffName,
            StaffId: uuid.v1(),
            Gender: data.Gender,
            Email: data.Email,
            Skills: data.Skills,
            Birthdate: data.Birthdate,
            StaffIdentity: data.StaffIdentity
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}