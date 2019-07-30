# Interchain Registry
Standardized registry for multi-interface blockchains. We are currently supporting the following interfaces: 
* [Cosmos](https://cosmos.network)
* [EVM](https://www.ethereum.org/)

## Adding a chain 
In order to add your chain to the registry, please do as follows:

1. Create a file inside the `/chains` folder named following the
   [chain naming standard](/docs/chain-naming-standard.md). 
2. Write your chain's definition inside the file following the 
   [chain specification standard](/docs/chain-specification-standard.md).
3. Start a Pull Request by using the existing template. 

## Examples
You can find examples of chains definition inside the `/chains` folder.
