
const Query = `
    type Query {
        queryCategory: [Category]
        queryLatestPlant(page: Int): SearchPayload
        getPlantFieldsList: [Field]
        getPlantById(id: String): Plant

        queryHeroImages(amount: Int): [HeroImage]

        searchItem(text: String!, categories: [String]!, page: Int): SearchPayload
        suggestItemByCategory(category_id: [String]!): [Plant]
    }
`;

const Mutation = `

`;

const Typed = `
    type Image {
        url: String
        width: Int
        height: Int
        public_id: String
    }
    type HeroImage {
        name: String
        image: Image
    }
    type Field {
        label: String
        path: String
    }
    type Plant {
        _id: String
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
        _id: String
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
