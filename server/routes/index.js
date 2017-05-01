
// custom keystone app
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const cors = require('cors')
const express = require('express')
const path = require('path')

module.exports = (app, context) => {
  const { next } = context
  app.use(cors())
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  app.use('/lib', express.static(path.join(__dirname, '../../node_modules')))
  app.use('/graphql', graphqlExpress(req => ({
    schema: context.schema,
    context: Object.assign({
      isAdmin: req.isAdmin
    }, context)
  })))

  require('./plantDetail.routes')(app, context)
  require('./static.routes')(app, context)
  const handle = next.getRequestHandler()
  app.get('*', (req, res) => handle(req, res))
}
