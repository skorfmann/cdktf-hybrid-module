import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput, Token } from 'cdktf';
import { CustomInstance } from './construct'

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const custom = new CustomInstance(this, 'Custom', {
      // There's an open issue for native variable support https://github.com/hashicorp/terraform-cdk/issues/249
      tags: '${var.tags}' as any,
      instanceType: Token.asString('${var.instance_type}')
    })

    new TerraformOutput(this, 'arn', {
      value: custom.instance.arn
    })
  }
}

const app = new App();
const stack = new MyStack(app, 'cdktf-hybrid-module');

// See issue linked above, this will be natively supported
stack.addOverride('variable', {
  tags: {
    description: "Tags for the instance",
    type: "map(string)"
  },
  instance_type: {
    description: "Instance type",
    type: "string"
  }
})

app.synth();
