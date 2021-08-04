import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

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