const NextJS = require('next')
require('dotenv').config()

// Sentry io error log management
if (process.env.RAVEN_URL) {
  const Raven = require('raven-js')
  Raven
    .config(process.env.RAVEN_URL)
    .install()
}
// Require our core node modules.
const chalk = require('chalk')
const path = require('path')
const cloudinary = require('cloudinary-core')
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
// ENV Var check
const requiredEnv = ['MONGO_URI', 'COOKIE_SECRET', 'CLOUDINARY_URL']
const missingEnv = []
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    missingEnv.push(key)
  }
})
if (missingEnv.length > 0) {
  throw new Error(`Environment variable is missing : ${missingEnv.join(', ')}`)
}

// Added in Node.js v1.4.1, this is a global event handler that will be notified of
// Promise values that do not have a .catch() handler (or some kind) attached to them.
// --
// NOTE: Some 3rd-party Promise libraries like Bluebird and Q will catch unhandled
// rejections and emit an "unhandledRejection" event on the global process object.

process.on('unhandledRejection',
    (reason) => {
      console.log(chalk.red.bold('[PROCESS] Unhandled Promise Rejection'))
      console.log(chalk.red.bold('- - - - - - - - - - - - - - - - - - -'))
      console.log(reason)
      console.log(chalk.red.bold('- -'))
    })

const dev = process.env.NODE_ENV !== 'production'
const next = NextJS({ dev })
// Setup keystone

const keystone = require('keystone')

require('dotenv').config()

keystone.init({
  name: 'VividMuseam',
  brand: 'Chula',
  static: '../static',
  'module root': path.join(__dirname, './server'),
  mongo: `${process.env.MONGO_URI}` || 'localhost:27017/vivid',
  port: 3000,
  'session store': 'mongo',
  updates: 'updates',
  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || 'development secret'
})
keystone.set('cloudinary config', process.env.CLOUDINARY_URL)
keystone.import('./models')

keystone.set('locals', {
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
  _: require('lodash')
})

keystone.set('nav', {
  users: 'users'
})

const cl = cloudinary.Cloudinary.new()
cl.fromEnvironment();
(async () => {
  await next.prepare()
  const context = {
    keystone,
    cl,
    next,
    Plant: keystone.list('Plant').model,
    Museum: keystone.list('Museum').model,
    Garden: keystone.list('Garden').model,
    Herbarium: keystone.list('Herbarium').model,
    Report: keystone.list('Report').model
  }
  const server = require('./server')(context)
  server.start(3000, () => {
    console.log(`Start app on 3000`);  // eslint-disable-line
  })
})()
