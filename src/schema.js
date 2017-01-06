
const Query = `
    type Query {
        getHerbariums(page: Int, limit: Int): [Herbarium]
    }
`;

const Mutation = `
    type Mutation {
        
    }
`;

const Typed = `
    type Image {
        url: String
        width: Number
        height: Number
    }
    
    type Herbarium {
        cuid: Int
        name: String
        blockNo: Number
        slotNo: String
        images: [Image]
    }
`;


const Schema = `
    schema {
        query: Query
        mutation: Mutation
    }
`;


export default [Schema, Query, Mutation, Typed];
