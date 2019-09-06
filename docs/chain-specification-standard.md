# Chain specification standard

In order to have your chain properly inserted into our directory, we require you to stick to the following standard
to make sure that clients will be able to properly handle your definition.

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "networkId": {
      "type": "string"
    },
    "interface": {
      "type": "string",
      "enum": [
        "cosmos",
        "evm"
      ]
    },
    "coins": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "denom": {
              "type": "string"
            },
            "exponent": {
              "type": "integer"
            },
            "properties": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                }
              ]
            }
          },
          "required": [
            "name",
            "symbol",
            "denom",
            "exponent"
          ]
        }
      ]
    },
    "seedNodes": {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "testRpcs": {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "nodeInfo": {
      "type": "object",
      "properties": {
        "sourceCode": {
          "type": "string"
        },
        "buildInstructions": {
          "type": "string"
        }
      },
      "required": [
        "sourceCode",
        "buildInstructions"
      ]
    },
    "custom": {
      "type": "object",
      "properties": {
        "chainId": {
          "type": "integer"
        },
        "networkId": {
          "type": "integer"
        },
        "lcd": {
          "type": "string"
        },
        "moniker": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "name",
    "networkId",
    "interface",
    "coins",
    "custom"
  ]
}
```

## Verify your definition

In order to verify that your chain definition adheres to the above standard, you can use tools such as
[JSON Schema Validator](https://www.jsonschemavalidator.net/).
