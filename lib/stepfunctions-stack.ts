import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class StepfunctionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'StepfunctionsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const openCaseLambda = new lambda.Function(this, 'OpenCase', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('open-case-lambda'),
      handler: 'open-case-function.handler'
    });

    const assignCaseLambda = new lambda.Function(this, 'AssignCase', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('assign-case-lambda'),
      handler: 'assign-case-function.handler'
    });

    const workOnCaseLambda = new lambda.Function(this, 'WorkOnCase', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('work-on-case-lambda'),
      handler: 'work-on-case-function.handler'
    });

    const closeCaseLambda = new lambda.Function(this, 'CloseCase', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('close-case-lambda'),
      handler: 'close-case-function.handler'
    });

    const escalateCaseLambda = new lambda.Function(this, 'EscalateCase', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('escalate-case-lambda'),
      handler: 'escalate-case-function.handler'
    });

    const openCase = new tasks.LambdaInvoke(this, 'Open Case', {
      lambdaFunction: openCaseLambda,
    })

    const assignCase = new tasks.LambdaInvoke(this, 'Assign Case', {
      lambdaFunction: assignCaseLambda,
    })

    const workOnCase = new tasks.LambdaInvoke(this, 'Work On Case', {
      lambdaFunction: workOnCaseLambda,
    })

    const closeCase = new tasks.LambdaInvoke(this, 'Close Case', {
      lambdaFunction: closeCaseLambda,
    })

    const escalateCase = new tasks.LambdaInvoke(this, 'Escalate Case', {
      lambdaFunction: escalateCaseLambda,
    })

    const jobFailed = new sfn.Fail(this, 'Fail', {
      cause: 'Engage Tier 2 Support',
    });
    
    const isComplete = new sfn.Choice(this, 'Is Case Resolved');
    
    const chain = sfn.Chain.start(openCase)
    .next(assignCase)
    .next(workOnCase)
    .next(
      isComplete
        .when(sfn.Condition.numberEquals('$.Payload.Status', 1), closeCase)
        .when(sfn.Condition.numberEquals('$.Payload.Status', 0), escalateCase.next(jobFailed)),
    );

    new sfn.StateMachine(this, 'StateMachine', {
      definition: chain,
    });
    
  }
}
