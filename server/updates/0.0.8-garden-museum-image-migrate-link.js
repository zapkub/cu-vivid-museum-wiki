
const keystone = require('keystone')
module.exports = async (done) => {
  const Garden = keystone.list('Garden')
  const Museum = keystone.list('Museum')

  const h = await Garden.model.find({})
  for (let i of h) {
    i.images = i.images.map(image => {
      return {
        ...image,
        url: image.url.replace('https://vimu.blob.core.windows.net/vimu-storage', '')
      }
    })
    await i.save()
    console.log(i.images)
  }

  const m = await Museum.model.find({})
  for (let i of m) {
    i.images = i.images.map(image => {
      return {
        ...image,
        url: image.url.replace('https://vimu.blob.core.windows.net/vimu-storage', '')
      }
    })
    await i.save()
    console.log(i.images)
  }
  done()
}
