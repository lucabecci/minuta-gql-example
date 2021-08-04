import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import Database from '../db'
import {UserType} from '../types/types'
const Schemas = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args){
                return "Hello World"
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return Database
            }
        },
        user: {
            type: UserType,
            args: {id:{ type: GraphQLID }},
            resolve(parent, args){
                for (const user of Database) {
                    if(user.id === Number(args.id)){
                        return user
                    }
                }
                return null
            }
        }
    },
    
})

export default new GraphQLSchema({
    query: Schemas
})