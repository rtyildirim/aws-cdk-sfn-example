# CDK Project with Example StepFunctions (Lambda functions) State Machine

This is a CDK project created using the example on https://aws.amazon.com/getting-started/hands-on/create-a-serverless-workflow-step-functions-lambda/

It creates 5 lambda functions, a StepFunctions state machine and related roles. Execution fails or succeeds based on a random number generated in Work On Case lambda function, to demonstrate both cases.

Project also creates an SQS queue. The queue triggers a lambda function that starts the execution of the state machine. Input to the queue must be just the case id. (a number or a string)

This can be used as a boilerplate project to create more complicated state machines.

AWS SERVERLESS IS AWESOME!!!!


## Useful commands
* `npm install`      install all dependencies before you run cdk
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
