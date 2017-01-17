
const Query = `
    type Query {
        queryHerbariums(page: Int, limit: Int): Herbariums


        queryGardens(page: Int, limit: Int): Gardens

        categoryList: [CategoryItem]
        searchItem(text: String, categories: [String]): SearchPayload
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

    type Herbarium {
        cuid: String
        name: String
        blockNo: Int
        slotNo: String
        scientificName: String
        collector_en: String
        collector_th: String
        altitude: String
        date: String 
        family: String
        locationName: String
        otherName: String
        duplicateAmount: Int
        habit: String
        note: String
        images: [Image]
    }
    type Garden {
        cuid: String
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
        minorBenefit: String 
        anatomy: String
        toxicDetail: String
        adr: String
        caution: String
        warning: String
        images: [Image]
        characteristic: String 
        chem_structure: String
        prod_dev: String
        slotNo: String
        donor: String
    }
    type Gardens {
        results: [Garden]
        total: Int
        currentPage: Int
        totalPages: Int
    }
    type Herbariums {
        results: [Herbarium]
        total: Int
        currentPage: Int
        totalPages: Int   
    }


    # Searching
    type CategoryItem {
        name: String
        value: String
    }
    type SearchResultItem {
        cuid: String
        name: String
        blockNo: Int
        slotNo: String
        scientificName: String
        family: String
    }
    type SearchPayload {
        results: [SearchResultItem]
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
