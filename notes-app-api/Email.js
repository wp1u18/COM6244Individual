import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk"

var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-west-1'});
   

export async function main(event, context) {
    const data = JSON.parse(event.body);
    var Params = {
        Destination: {
            ToAddresses: [data.receiver]
        },
        Message: {
            Body: {
                Text: {
                    Charset:'UTF-8',
                    Data: "Congratulations,your request has been sent to administrator,please wait to confirm"
                }
            },
            Subject: {
                Data: "Confirmation"
            }
        },
Source: "457013067@qq.com"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(Params, function (err, data) {
        if (err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            context.succeed(event);

        }
    });

};