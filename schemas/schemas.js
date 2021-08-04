import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import Database from '../db'
import {UserType} from '../types/types'

const Querys = new GraphQLObjectType({
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

const Mutations = new GraphQLObjectType({
    name: "Mutations",
    field: {
        updateName: {
            type: UserType,
            args: {
                id:{ type: new GraphQLNonNull(GraphQLID) },
                name:{ type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                for (const user of Database) {
                    if(user.id === Number(args.id)){
                        user.name = args.name
                        return user
                    }
                    return null
                }
            }
        }
    }
})

export default new GraphQLSchema({
    query: Querys,
    mutation: Mutations
})