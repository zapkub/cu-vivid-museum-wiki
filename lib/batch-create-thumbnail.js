// Batch image resizing with Node Imagemagick
// author: Rungsikorn Rungsikavanich
// contact: rungsikorn@me.com

const im = require('imagemagick')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const recursive = require('recursive-readdir')
// DIR is Relative from script location
// example: `$  DIR=../static/images/stock/herbarium-original node ./lib/batch-resizer.js`
recursive(path.join(__dirname, process.env.DIR || '.'), (err, files) => {
  const threads = parseInt(process.env.P, 10) || 10

  const imagesList = files.filter((img, i) => i < 99999);
  (async function () {
    console.time(`resizing: ${threads} threads`)
    for (let index = 0; index < imagesList.length - 1; index += threads) {
    // console.log(`parallel resizing started at index: ${index}`);
      const q = _.range(index, index + threads, 1)
      .map(async (i) => {
        const imageName = imagesList[i]

        try {
          if (imageName) {
            const dstPath = path.join(__dirname, process.env.DIR || '.', 'resize', `${path.basename(imageName)}`)
            const ext = path.extname(imageName)
            if ((/-thumb/).test(imageName)) {
              console.log(`unlink${imageName}`)
              fs.unlinkSync(imageName)
            }
            if (ext.toLowerCase() === '.jpg' && !(/-thumb/).test(imageName)) {
              const resizePromise = new Promise((rs) => {
                im.resize({
                  srcPath: imageName,
                  dstPath: imageName.replace(/\.jpg/ig, '-thumb.jpg'),
                  width: 1024
                }, () => {
                  console.log(`${i}/${imagesList.length} (${imageName})`)
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
})
