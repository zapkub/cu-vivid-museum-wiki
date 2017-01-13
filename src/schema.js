
const Query = `
    type Query {
        getHerbariums(page: Int, limit: Int): Herbariums

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
