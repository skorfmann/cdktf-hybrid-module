// https://www.terraform.io/docs/providers/aws/r/data_aws_kms_secrets.html
// generated from terraform resource schema

/*
{
  "version": 0,
  "block": {
    "attributes": {
      "id": {
        "type": "string",
        "optional": true,
        "computed": true
      },
      "plaintext": {
        "type": [
          "map",
          "string"
        ],
        "computed": true
      }
    },
    "block_types": {
      "secret": {
        "nesting_mode": "set",
        "block": {
          "attributes": {
            "context": {
              "type": [
                "map",
                "string"
              ],
              "optional": true
            },
            "grant_tokens": {
              "type": [
                "list",
                "string"
              ],
              "optional": true
            },
            "name": {
              "type": "string",
              "required": true
            },
            "payload": {
              "type": "string",
              "required": true
            }
          }
        },
        "min_items": 1
      }
    }
  }
}
*/
import { Construct } from 'constructs';
import { TerraformDataSource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';
import { StringMap } from "cdktf";

// Configuration

export interface DataAwsKmsSecretsConfig extends TerraformMetaArguments {
  /** secret block */
  readonly secret: DataAwsKmsSecretsSecret[];
}
export interface DataAwsKmsSecretsSecret {
  readonly context?: { [key: string]: string };
  readonly grantTokens?: string[];
  readonly name: string;
  readonly payload: string;
}

// Resource

export class DataAwsKmsSecrets extends TerraformDataSource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: DataAwsKmsSecretsConfig) {
    super(scope, id, {
      terraformResourceType: 'aws_kms_secrets',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._secret = config.secret;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // id - computed: true, optional: true, required: false
  private _id?: string;
  public get id() {
    return this._id ?? this.getStringAttribute('id');
  }
  public set id(value: string | undefined) {
    this._id = value;
  }

  // plaintext - computed: true, optional: false, required: true
  public plaintext(key: string): string {
    return new StringMap(this, 'plaintext').lookup(key);
  }

  // secret - computed: false, optional: false, required: true
  private _secret: DataAwsKmsSecretsSecret[];
  public get secret() {
    return this._secret;
  }
  public set secret(value: DataAwsKmsSecretsSecret[]) {
    this._secret = value;
  }

  // =========
  // SYNTHESIS
  // =========

  public synthesizeAttributes(): { [name: string]: any } {
    return {
      secret: this._secret,
    };
  }
}
