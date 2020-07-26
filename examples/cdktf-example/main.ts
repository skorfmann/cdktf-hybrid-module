import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { CustomInstance } from 'cdktf-hybrid-module'
import { AwsProvider } from './.gen/providers/aws'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'default', {
      region: 'us-east-1'
    })

    new CustomInstance(this, 'my-instance', {
      instanceType: 't3.nano',
      tags: {
        'CDKTF': 'IS AWESOME'
      }
    })

  }
}

const app = new App();
new MyStack(app, 'cdktf-example');
app.synth();
