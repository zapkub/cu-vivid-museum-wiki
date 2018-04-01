// Batch image resizing with Node Imagemagick
// author: Rungsikorn Rungsikavanich
// contact: rungsikorn@me.com

const im = require('imagemagick')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// DIR is Relative from script location
// example: `$  DIR=../static/images/stock/herbarium-original node ./lib/batch-resizer.js`
const images = fs.readdirSync(path.join(__dirname, process.env.DIR || '.'))
const threads = parseInt(process.env.P, 10) || 10

const imagesList = images.filter((img, i) => i < 100);

(async function () {
  console.time(`resizing: ${threads} threads`)
  for (let index = 0; index < imagesList.length - 1; index += threads) {
    // console.log(`parallel resizing started at index: ${index}`);
    const q = _.range(index, index + threads, 1)
      .map(async (i) => {
        const imageName = imagesList[i]
        try {
          if (imageName) {
            const imagePath = path.join(__dirname, process.env.DIR || '.', imageName)
            const dstPath = path.join(__dirname, process.env.DIR || '.', 'resize', `${path.basename(imageName)}`)
            const ext = path.extname(imageName)
            if (ext.toLowerCase() === '.jpg') {
              const resizePromise = new Promise((rs) => {
                im.resize({
                  srcPath: imagePath,
                  dstPath,
                  width: 1024
                }, () => {
                  // console.log(`${i}/${images.length} (${imageName})`);
                  rs()
                })
              })
              await resizePromise
            }
          }
        } catch (e) {
          console.log(`error${imageName}`)
          console.log(e)
        }
      })
    await Promise.all(q)
  }
  console.timeEnd(`resizing: ${threads} threads`)
}())
