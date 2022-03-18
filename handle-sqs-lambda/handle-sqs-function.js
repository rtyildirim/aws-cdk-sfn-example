var aws = require('aws-sdk')
exports.handler = async function (event, context, callback) {
    var stepfunctions = new aws.StepFunctions();
    var params;
    event.Records.forEach(record => {
        const { body } = record;
        console.log(body);
        params = {
            stateMachineArn: process.env.QUEUE_ARN,
            input: JSON.stringify({ inputCaseID: body })
        };
       
        // stepfunctions.startExecution(params, (err, data) => {
        //     if (err) {
        //         console.log("Error while caling Step Func.", err);
        //         callback(err, JSON.stringify({ }))
        //     } else {
        //         console.log("Succesfully execurted Step Func.");
        //         callback(null, JSON.stringify({ body }))
        //     }
        // });
    });
    
    //TODO: handle all quee elements. Add them to array/map above and handle in loop here
    console.log(params)
    console.log("Calling step functions...");
    const success = await stepfunctions.startExecution(params).promise();
    console.log(success)
    return {};
}
