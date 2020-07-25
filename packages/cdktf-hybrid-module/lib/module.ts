import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { CustomInstance } from './construct'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const custom = new CustomInstance(this, 'Custom')

    new TerraformOutput(this, 'arn', {
      value: custom.instance.arn
    })
  }
}

const app = new App();
new MyStack(app, 'cdktf-hybrid-module');

app.synth();
