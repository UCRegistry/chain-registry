# cosmos-chainid-registry

Registry for Cosmos Chain IDs

## Examples

```js
// cosmos-hub2.json
{
  "did": "did:cosmos:cosmos-hub2",
  "name": "Cosmos Hub",
  "network": "cosmos-hub2",
  "interface": "cosmos",
  "coins": [
    {
      "name": "Atom",
      "symbol": "ATM",
      "denom": "uatom",
      "granularity": 9
    }
  ],
  "rpc": [
    "http://178.128.246.154:26657"
  ],
  "custom": {
    "lcd": "http://178.128.246.154:1317",
    "moniker": "cosmos-do-sentryz1"
  }
}

// eip155-1.json
{
  "did": "did:ethr:eip155-1",
  "name": "Ethereum Mainnet",
  "network": "eip155-1",
  "interface": "evm",
  "coins": [
    {
      "name": "Ether",
      "symbol": "ETH",
      "denom": "wei",
      "granularity": 18
    }
  ],
  "rpc": [
    "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
    "https://api.mycryptoapi.com/eth"
  ],
  "custom": {
    "chainId": 1,
    "networkId": 1
  }
}
```
