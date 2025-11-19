import {
  Stack,
  StackProps,
  Tags,
  Duration,
  aws_lambda as lambda,
  CfnOutput,
  aws_s3 as s3,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

export class SampleAppCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prefix = "pd-";

    Tags.of(this).add("Owner", "PlerionDemo");

    const commonFnProps = {
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 128,
      timeout: Duration.seconds(10),
      bundling: {
        externalModules: ["aws-sdk"],
        minify: false
      }
    };

    const lambdaA = new NodejsFunction(this, "LambdaA", {
      ...commonFnProps,
      functionName: `${prefix}lambda-a`,
      entry: path.join(__dirname, "..", "src", "lambda-a", "index.ts"),
      handler: "handler"
    });

    const insecureBucket = new s3.Bucket(this, "InsecureBucket", {
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      versioned: false,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.PUT,
            s3.HttpMethods.POST,
            s3.HttpMethods.DELETE
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"]
        }
      ]
    });
  }
}
