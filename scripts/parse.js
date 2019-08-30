const fs = require('fs')
const path = require('path')
const {
  CHAINS_DIRECTORY,
  startSpinner,
  stopSpinner,
  stat,
  writeJson,
  saveList
} = require('./shared')

fs.readdir(CHAINS_DIRECTORY, async function (err, files) {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  startSpinner(`Verifying ${CHAINS_DIRECTORY} files`)

  let all = []
  let evm = []
  let cosmos = []

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
          exponent: coin.exponent
        }))

        let newJson = {
          name: json.name,
          network: json.network,
          interface: json.interface,
          coins: newCoins,
          rpc: json.rpc,
          custom: json.custom
        }

        await writeJson(filePath, newJson)
        all.push(newJson)
        if (newJson.interface.toLowerCase() === 'evm') {
          evm.push(newJson)
        } else if (newJson.interface.toLowerCase() === 'cosmos') {
          cosmos.push(newJson)
        }
      }
      return fileStat
    })
  )

  stopSpinner()

  await saveList(all, 'chains')
  await saveList(evm, 'evm')
  await saveList(cosmos, 'cosmos')

  console.log(
    `\nSuccessfully parsed ${files.length} file${files.length > 1 ? 's' : ''}`
  )
})
