import { Construct } from 'constructs';
import { Resource } from 'cdktf';
import { Instance } from '../imports/providers/aws'

export interface CustomInstanceProps {
  instanceType?: string;
  tags?: {[key: string]: string};
}

export class CustomInstance extends Resource {
  public readonly instance: Instance;

  constructor(scope: Construct, name: string, props?: CustomInstanceProps) {
    super(scope, name);

    const { tags, instanceType = "t3.nano" } = props || {};

    this.instance = new Instance(this, 'ubuntu2', {
      ami: "ami-0ff8a91507f77f867",
      availabilityZone: "us-east-1a",
      instanceType,
      tags
    })
  }
}