const plants = require('./json/plant.json')

const herbariums = require('./json/herbarium.json')
const gardens = require('./json/garden.json')
const museums = require('./json/museum.json')

const fs = require('fs')
const path = require('path')

const INDEX_NAME = 'plants'
const TYPE_NAME = 'doc'

async function createDocInstructions () {
  // create plant instruction
  // this will use exists data from
  // previous legacy version
  // and create elastic migration onw
  const instructions = []

  for (const plant of plants) {
    instructions.push({
      index: {
        _index: INDEX_NAME,
        _type: TYPE_NAME,
        _id: plant.scientificName.replace(/\s/g, '-')
      }
    })
    const p = {
      name: plant.name,
      scientificName: plant.scientificName,
      familyName: plant.familyName
    }

    // process sub categories data
    // include
    // - herbarium
    // - garden
    // - museum
    // by use scientificName as foreign key
    p.herbariums = herbariums.filter(herbarium => herbarium.scientificName === plant.scientificName)
    p.gardens = gardens.filter(garden => garden.scientificName === plant.scientificName)
    p.museum = museums.filter(museum => museum.scientificName === plant.scientificName)

    instructions.push(p)
  }

  const instructionsString = instructions.map(i => JSON.stringify(i)).join('\n') + '\n'
  fs.writeFileSync(path.join(__dirname, './json/bulks.json'), instructionsString)
}
createDocInstructions()
