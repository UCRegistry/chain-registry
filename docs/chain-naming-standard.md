# Chain naming standard

In order to have your chain specification recognized as valid and added to the list of supported chains, you need to
give the JSON file containing it the given name

```sh
<networkId>.json
```

Where `<networkId>` is the value of the field that is written inside the
[chain specification file](/docs/chain-specification-standard.md) that you are submitting.

Please note that not using a valid name for the specification file will result into it being discarded.

## Network ID format

A network ID is a case-sensitive string in the format `^[a-zA-Z0-9_.-]{4,32}$`.
When choosing a new network ID, the following guildelines should be followed:

1. Choose a network ID that is long enough to be unique within the blockchain
   ecosystem.
2. Choose a network ID as short as possible to avoid unnecessary data.
3. Choose a network ID that is to some degree human readable and helps for basic
   debugging.

Some bad network IDs are `ethereum` (violates 1.),
`da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba` (violates 2.
and 3.). Better alternatives are `ethereum-eip155-3` and `lisk-da3ed6a454`.
