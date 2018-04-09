const yaml = require('js-yaml');
const fs = require('fs')
const path = require('path')


let serverRuntimeConfig: any = {}

try {
  const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../config.yaml'), 'utf8'));
  serverRuntimeConfig.port = doc.port
  serverRuntimeConfig.clientPort = doc.clientPort

} catch (e) {
  console.log(e);
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig: { // Will be available on both server and client
    
  }
}