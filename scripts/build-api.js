const fs = require('fs')
const path = require('path')
const {
  CHAINS_DIRECTORY,
  startSpinner,
  stopSpinner,
  stat,
  writeJson,
  saveListToFile
} = require('./shared')

const repoRoot = path.join(__dirname, '../')
const apiV1 = path.join(repoRoot, 'dist', 'v1')
const apiNetworks = path.join(apiV1, 'networks')
fs.mkdirSync(apiNetworks, { recursive: true })

fs.readdir(CHAINS_DIRECTORY, async function (err, files) {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  startSpinner(`Processing ${CHAINS_DIRECTORY} files`)

  const all = []
  const evm = []
  const cosmos = []
  const index = []

  await Promise.all(
    files.map(async function (file) {
      const filePath = path.join(CHAINS_DIRECTORY, file)
      const fileStat = await stat(filePath)
      const ext = path.extname(file)
      if (fileStat.isFile() && ext === '.json') {
        let chainData = require(filePath)

        await writeJson(path.join(apiNetworks, `${chainData.networkId}.json`), chainData)
        all.push(chainData)
        if (chainData.interface.toLowerCase() === 'evm') {
          evm.push(chainData)
        } else if (chainData.interface.toLowerCase() === 'cosmos') {
          cosmos.push(chainData)
        }
        index.push({
          name: chainData.name,
          networkId: chainData.networkId
        })
      }
      return fileStat
    })
  )

  stopSpinner()

  await saveListToFile(all, path.join(apiV1, `all.json`))
  await saveListToFile(evm, path.join(apiV1, `evm.json`))
  await saveListToFile(cosmos, path.join(apiV1, `cosmos.json`))
  await saveListToFile(index, path.join(apiV1, `index.json`))

  console.log(`Successfully processed ${files.length} files`)
})
