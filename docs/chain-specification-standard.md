# Chain specification standard

In order to have your chain properly inserted into our directory, we require you to stick to the following standard
to make sure that clients will be able to properly handle your definition.

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "network": {
      "type": "string"
    },
    "interface": {
      "type": "string",
      "enum:" [
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
    "rpc": {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "custom": {
      "type": "object",
      "properties": {
        "lcd": {
          "type": "string"
        },
        "moniker": {
          "type": "string"
        }
      },
      "required": [
      ]
    }
  },
  "required": [
    "id",
    "name",
    "network",
    "interface",
    "coins",
    "rpc",
    "custom"
  ]
}
```

## Verify your definition

In order to verify that your chain definition adheres to the above standard, you can use tools such as
[JSON Schema Validator](https://www.jsonschemavalidator.net/).
