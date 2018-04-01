require('dotenv').config({path: '../.env'})

import * as next from 'next'
import * as express from 'express'

async function initServer() {
  const server = express()
  const isProd = process.env.IS_DEV === 'true'

  const client = next({ dev: !isProd })
  await client.prepare()

  if(!isProd) {
    console.log('APPLICATION RUNNING IN DEVELOPMENT MODE')
  }
  server.use(client.getRequestHandler())
  server.listen(3000, function() {
    console.log('[index] start client and source at ' + 3000)
  })
}

initServer()
