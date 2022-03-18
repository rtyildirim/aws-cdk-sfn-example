var aws = require("aws-sdk");
exports.handler = async function (event, context, callback) {
  var stepfunctions = new aws.StepFunctions();
  var inputParamArray = [];
  event.Records.forEach((record) => {
    const { body } = record;
    console.log("adding item to array: ", body);
    inputParamArray.push(body);
  });

  console.log("iterating over inputs: ", inputParamArray);
  for (const inputParam of inputParamArray) {
    params = {
      stateMachineArn: process.env.QUEUE_ARN,
      input: JSON.stringify({ inputCaseID: inputParam }),
    };
    console.log("executing SFn for ", params);
    const success = await stepfunctions.startExecution(params).promise();
    console.log(success);
  }

  return {};
};
