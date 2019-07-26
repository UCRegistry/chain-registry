const fs = require('fs')
const path = require('path')
const {
  ROOT_DIRECTORY,
  CHAINS_DIRECTORY,
  startSpinner,
  stopSpinner,
  tableLog,
  stat,
  writeJson,
  sortBy,
  formatDid
} = require('./shared')

fs.readdir(CHAINS_DIRECTORY, async function (err, files) {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  startSpinner(`Verifying ${CHAINS_DIRECTORY} files`)

  let result = []

  await Promise.all(
    files.map(async function (file, index) {
      const filePath = path.join(CHAINS_DIRECTORY, file)
      const fileStat = await stat(filePath)
      const ext = path.extname(file)
      if (fileStat.isFile() && ext === '.json') {
        let json = require(filePath)

        let newCoins = json.coins.map(coin => ({
          name: coin.name,
          symbol: coin.symbol,
          denom: coin.denom,
          granularity: coin.granularity
        }))

        let newJson = {
          did: formatDid(json),
          name: json.name,
          network: json.network,
          interface: json.interface,
          coins: newCoins,
          rpc: json.rpc,
          custom: json.custom
        }

        await writeJson(filePath, newJson)
        result.push(newJson)
      }
      return fileStat
    })
  )

  const resultFilePath = path.join(ROOT_DIRECTORY, 'chains.json')
  const resultJson = sortBy(result, ['did'])
  await writeJson(resultFilePath, resultJson)

  stopSpinner()

  tableLog(result)

  console.log(
    `Successfully parsed ${files.length} file${files.length > 1 ? 's' : ''}`
  )
})
