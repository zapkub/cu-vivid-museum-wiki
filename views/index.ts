import * as next from 'next'
import * as express from 'express'

const { serverRuntimeConfig } = require('./next.config')

async function initServer() {

  const server = express()
  const isProd = process.env.PRODUCTION === 'true'

  const client = next({ dev: !isProd })
  await client.prepare()

  if(!isProd) {
    console.log('APPLICATION RUNNING IN DEVELOPMENT MODE')
  }
  server.use(client.getRequestHandler())
  server.listen(serverRuntimeConfig.clientPort, function() {
    console.log('[index] start client and source at ' + serverRuntimeConfig.clientPort)
  })
}

initServer()
