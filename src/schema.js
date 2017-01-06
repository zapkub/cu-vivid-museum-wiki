
const Query = `
    type Query {
        getHerbariums(page: Int, limit: Int): [Herbarium]
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
        images: [Image]
    }
`;


const Schema = `
    schema {
        query: Query
    }
`;


export default [Schema, Query, Mutation, Typed];
