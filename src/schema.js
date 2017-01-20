
const Query = `
    type Query { 
        queryCategory(key: String): [Category]
        queryLatestPlant(page: Int): SearchPayload
        searchItem(text: String, categories: [String], page: Int): SearchPayload
    }
`;

const Mutation = `
    
`;

const Typed = `
    type Image {
        url: String
        width: Int
        height: Int
    }

    type Plant {
        cuid: String
        name: String
        localName: String
        otherName: [String]
        scientificName: String
        synonym: String
        family: String
        type: String
        locationName: String
        display: String
        recipe: String
        property: String
        localProperty: String 
        collector_en: String
        collector_th: String
        minorBenefit: String 
        anatomy: String
        habit: String
        altitude: String
        duplicateAmount: String
        blockNo: String
        toxicDetail: String
        adr: String
        note: String
        caution: String
        warning: String
        images: [Image]
        characteristic: String 
        chem_structure: String
        prod_dev: String
        slotNo: String
        donor: String
        category: [Category]
    }
    type Category {
        name: String
        key: String
    }


    # Searching
    type SearchPayload {
        results: [Plant]
        total: Int
        totalPages: Int
        currentPage: Int
    }
`;


const Schema = `
    schema {
        query: Query
    }
`;


export default [Schema, Query, Mutation, Typed];
