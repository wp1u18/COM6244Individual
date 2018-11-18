import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk"


var ses = new AWS.SES({ region: 'eu-west-1' });
export async function main(event, context) {
    const data = JSON.parse(event.body);
    var Params = {
        Destination: {
            ToAddresses: [data.receiver]
        },
        Message: {
            Body: {
                Text: { 
                    Data: "Congratulations,new staff has been add to internal system"
                }
            },
            Subject: {
                Data: "Confirmation"
            }
        },
Source: "457013067@qq.com"
    };


    try {
        const email = ses.sendEmail(Params).promise();
        console.log(email);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }

};