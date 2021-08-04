import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

let mock = [
    {
        name: "Luca",
        age: 20,
        country: "AR",
        active: true
    },
    {
        name: "Lolo",
        age: 19,
        country: "AR",
        active: false
    },
    {
        name: "Juan",
        age: 40,
        country: "AR",
        active: false
    }
]

const Schemas = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Hello World"
            }
        }
    }
})

export default new GraphQLSchema({
    query: Schemas
})