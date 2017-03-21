const SeedHelpers = require('./index');
const fs = require('fs');
const path = require('path');


const plants = SeedHelpers.getPlantFromDataSheet();
const Herbariums = SeedHelpers.getHerbariumFromDataSheet();
const Museums = SeedHelpers.getMuseumFromDataSheet();
const Gardens = SeedHelpers.getGardenFromDataSheet();


fs.writeFileSync(path.join(__dirname, './json/plant.json'), JSON.stringify(plants));
fs.writeFileSync(path.join(__dirname, './json/herbarium.json'), JSON.stringify(Herbariums));
fs.writeFileSync(path.join(__dirname, './json/museum.json'), JSON.stringify(Museums));
fs.writeFileSync(path.join(__dirname,'./json/garden.json'), JSON.stringify(Gardens));
fs.writeFileSync(path.join(__dirname,'./json/filtered.json'), JSON.stringify(SeedHelpers.getNoPlantIdItem()));

