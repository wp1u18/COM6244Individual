import { success, failure } from "./libs/response-lib";

var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'eu-west-1'
});

export async function main(event, context) {
    const data = JSON.parse(event.body);
    console.log("Incoming: ", event);
    // var output = querystring.parse(event);

    var eParams = {
        Destination: {
            ToAddresses: [data.receiver]
        },
        Message: {
            Body: {
                Text: {
                    Data:"Congratulations,your request has been sent to administrator,please wait to confirm"
                }
            },
            Subject: {
                Data: "Request Confirmation"
            }
        },
        Source: "457013067@qq.com"
    };

    try {
        var email = ses.sendEmail(eParams);
          return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }

};
