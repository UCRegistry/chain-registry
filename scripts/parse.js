const fs = require('fs')
const path = require('path')
const {
  CHAINS_DIRECTORY,
  startSpinner,
  stopSpinner,
  stat,
  writeJson
} = require('./shared')

async function processFiles (files) {
  await Promise.all(
    files.map(async function (file) {
      const filePath = path.join(CHAINS_DIRECTORY, file)
      const fileStat = await stat(filePath)
      const ext = path.extname(file)
      if (fileStat.isFile() && ext === '.json') {
        let json = require(filePath)

        let fileName = file.replace(/\.json$/, '', '')
        if (fileName !== json.networkId) {
          throw Error(`File name (${file}) and network id (${json.networkId}) do not match. Please fix this and retry.`)
        }

        let newCoins = json.coins.map(coin => ({
          name: coin.name,
          symbol: coin.symbol,
          denom: coin.denom,
          exponent: coin.exponent,
          properties: coin.properties
        }))

        let newJson = {
          name: json.name,
          networkId: json.networkId,
          interface: json.interface,
          coins: newCoins,
          seedNodes: json.seedNodes,
          testRpcs: json.testRpcs,
          nodeInfo: json.nodeInfo,
          custom: json.custom
        }

        await writeJson(filePath, newJson)
      }
      return fileStat
    })
  )
}

fs.readdir(CHAINS_DIRECTORY, async function (err, files) {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  startSpinner(`Verifying ${CHAINS_DIRECTORY} files`)

  try {
    await processFiles(files)
  } catch (error) {
    console.error(`\n${error}`)
  } finally {
    stopSpinner()
  }

  console.log(`\nSuccessfully parsed ${files.length} file${files.length > 1 ? 's' : ''}`)
})
