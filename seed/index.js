const XLSX = require('node-xlsx').default;
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const ObjectID = require('mongodb').ObjectID;
const gardenSheet = XLSX.parse(path.join(__dirname, './garden.xlsx'));
const herbariumnSheet = XLSX.parse(path.join(__dirname, './herbarium.xlsx'));

let amount = process.env.JSON_PARSE_AMOUNT || 999999999;

exports.setAmount = function setAmount(_amount) {
    amount = _amount;
}
function encodeRFC5987ValueChars(str) {
    return encodeURI(str).
        replace(/['()]/g, escape)
}
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function getScinameKey(sciname){
    const scinameSplit = sciname.split(' ');
    return `${scinameSplit[0]} ${scinameSplit[1]}`;
}
function normailizeScientificName(name) {
    return name.replace(new RegExp(/\.|[(ไม้แดง)]|ฺ|\//, 'gi'), '')
        .replace(new RegExp(/,/), ' ')
        .replace(new RegExp(/(\s\s)/), ' ')
        .replace(new RegExp(/ /, 'gi'), ' ')
        .replace(new RegExp(/(\s\s)/), ' ')
        .toLowerCase()
        .trim();
}

const findImages = (category, nameOrCuid) => {
    let name = nameOrCuid.replace(new RegExp(/\.+$/, 'gi'), '');
    let words = name.split(' ');
    if (words.length < 2) {
        return [];
    }
    let images = [];
    const dirTest = new RegExp(`${escapeRegExp(words[0])}.*${escapeRegExp(words[1])}`, 'gi');
    switch (category) {
        case 'garden':
        case 'museum':
            const dirList = fs.readdirSync(path.join(__dirname, `../static/images/stock/${category}`));
            dirList.map(dirName => {
                if (dirTest.test(dirName)) {
                    const dirPath = path.join(__dirname, `../static/images/stock/${category}/${dirName}`);
                    if (fs.existsSync(dirPath)) {
                        const files = fs.readdirSync(dirPath);
                        images = files.map(file => ({
                            url: encodeRFC5987ValueChars(`/static/images/stock/${category}/${dirName}/${file}`),
                        }))
                    }
                }
            })
            break;
    }
    if (images.length > 0) {
        console.log('Image found : ' + name)
    }
    return images;
}
const filterOnlyEnglish = (input) => {
    const text = new RegExp(/^[a-zA-Z0-9?><\\;,’éêü{}()[\]\-_+=!@#$%\^&*|'"\s|\.×]*$/, 'i');
    const str = normailizeScientificName(input);
    if (!text.test(str)) {
        console.log('Remove plant with invalide scientific name : ' + str);
    }
    return text.test(str);
}
exports.filterOnlyEnglish = filterOnlyEnglish;


let scientificNameKeyCollection = {};
let noPlantIdfiltered = [];
exports.getNoPlantIdItem = () => {
    return noPlantIdfiltered;
}
exports.getPlantFromDataSheet = () => {
    const scientificNamesFromHerbarium = herbariumnSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter((item) => item[4])
        .filter((item) => filterOnlyEnglish(item[4]))
        .filter((item) => item[4] !== '_')
        .filter((item) => item[4] !== '-')
        .map(item => {
            const _id = ObjectID();
            const sciname = normailizeScientificName(item[4]);
            scientificNameKeyCollection[getScinameKey(sciname)] = _id;
            return {
                _id,
                scientificName: sciname,
                familyName: item[8],
                name: (item[5] || item[6] || '').replace(new RegExp(/_|\s+$/, 'gi'), '')
            }
        });
    const scientificNamesFromGarden = gardenSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[1])
        .filter((item) => filterOnlyEnglish(item[1]))
        .filter((item) => item[1] !== '_')
        .map(item => {
            const _id = ObjectID();
            const sciname = normailizeScientificName(item[1]);
            scientificNameKeyCollection[getScinameKey(sciname)] = _id
            return {
                _id,
                scientificName: normailizeScientificName(item[1]),
                familyName: item[2],
                name: (item[0] || '').replace(new RegExp(/_|\s+$/, 'gi'), ''),
            }
        });

    const scientificNames = _.union(scientificNamesFromGarden, scientificNamesFromHerbarium);
    return _.uniqBy(scientificNames, item => item.scientificName);
}

exports.getMuseumFromDataSheet = () => {
    const museums = gardenSheet[1].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[2])
        .filter((item) => filterOnlyEnglish(item[2]))
        .map(item => {
            const sciname = normailizeScientificName(item[2]);
            return ({
                plantId: scientificNameKeyCollection[getScinameKey(sciname)],
                scientificName: sciname,
                museumLocation: item[3],
                images: findImages('museum', item[2])
            })
        });
    return museums.filter(item => {
        if (!item.plantId) {
            console.log('remove item with no plant id');
            console.log(item);
            noPlantIdfiltered.push(item.scientificName);
        }
        return item.plantId
    });
}

exports.getGardenFromDataSheet = () => {
    const gardens = gardenSheet[2].data
        .filter((item, i) => i > 0 && item[0] && i < amount)
        .map(item => {
            const sciname = normailizeScientificName(item[0]);
            return {
                plantId: scientificNameKeyCollection[getScinameKey(sciname)],
                zone: item[2],
                scientificName: normailizeScientificName(item[0]),
                images: findImages('garden', item[0]),
            }
        });
    return gardens.filter(
        item => {
            if (!item.plantId) {
                console.log('remove item with no plant id');
                console.log(item);
                noPlantIdfiltered.push(item.scientificName);
            }
            return item.plantId;
        }
    );
}

exports.getHerbariumFromDataSheet = () => {
    const herbariums = herbariumnSheet[0].data
        .filter((item, i) => i > 0 && i < amount)
        .filter(item => item[4])
        .map(item => ({
            scientificName: normailizeScientificName(item[4]),
            discoverLocation: item[12],
            displayLocation: 'ตู้ ' + item[1] + ' ช่อง ' + item[2],
            cuid: item[0],
            collectedDate: new Date(item[15]),
            collector: item[10],
        }))
    return herbariums;
}