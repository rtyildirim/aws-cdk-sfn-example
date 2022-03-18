package main

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sfn"
)

var sqsQueueArn = ""

func handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	svc := sfn.New(sess)
	for _, message := range sqsEvent.Records {
		body := "{\"inputCaseID\": \"" + message.Body + "\"}"
		execInput := sfn.StartExecutionInput{
			Input:           &body,
			StateMachineArn: &sqsQueueArn,
		}
		log.Printf("The message %s for event source %s = %s \n", message.MessageId, message.EventSource, message.Body)
		res, err := svc.StartExecution(&execInput)
		if err != nil {
			log.Println("error while starting sfn execution", err)
		} else {
			log.Println("Succesfully executed sfn: ", res)
		}
	}

	return nil
}

func main() {
	sqsQueueArn = os.Getenv("QUEUE_ARN")
	lambda.Start(handler)
}
