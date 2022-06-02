# CDK Project with Example StepFunctions (Lambda functions) State Machine

This is a CDK project created using the example on https://aws.amazon.com/getting-started/hands-on/create-a-serverless-workflow-step-functions-lambda/

It creates 5 lambda functions, a StepFunctions state machine and related roles. Execution fails or succeeds based on a random number generated in Work On Case lambda function, to demonstrate both cases.

Project also creates an SQS queue. The queue triggers a lambda function that starts the execution of the state machine. Input to the queue must be just the case id. (a number or a string). Adding the item to SQS will trigger the entire workflow.

Before running the cdk deploy command, you need to build and compress go project in sqs-handle-go folder:
* `GOOS=linux GOARCH=amd64 go build -o main main.go`      build go handler app
* `zip lambda-api-function.zip main`     compress binary code 


This can be used as a boilerplate project to create more complicated state machines.

AWS SERVERLESS IS AWESOME!!!!


## Useful commands
* `npm install`      install all dependencies before you run cdk
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk diff`        compare deployed stack with current state
* `cdk deploy`      deploy this stack to your default AWS account/region

