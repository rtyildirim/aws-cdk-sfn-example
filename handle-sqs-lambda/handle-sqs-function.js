var aws = require('aws-sdk')
exports.handler = async function (event, context) {
    event.Records.forEach(record => {
        const { body } = record;
        console.log(body);
        var params = {
            stateMachineArn: process.env.QUEUE_ARN,
            input: JSON.stringify({ inputCaseID: body })
        };
        var stepfunctions = new aws.StepFunctions();
        console.log("Calling step functions...");
        console.log(params)
        stepfunctions.startExecution(params, (err, data) => {
            if (err) {
                console.log("Error while caling Step Func.", err);
            } else {
                console.log("Succesfully execurted Step Func.");
            }
        });
    });
    return {};
}