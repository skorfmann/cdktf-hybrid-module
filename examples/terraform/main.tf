provider "aws" {
  region = "us-east-1"
}

module "instance" {
  source = "../../packages/cdktf-hybrid-module/module"

  instance_type = "t3.nano"

  tags = {
    "CDKTF" = "IS AWESOME"
  }
}

output "instance_arn" {
  // a static name would be desirable in this case, see https://github.com/hashicorp/terraform-cdk/issues/247
  value = module.instance.cdktfhybridmodule_arn_788D4ED0
}
