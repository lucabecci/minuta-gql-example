import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import Database from '../db'
import {UserType} from '../types/types'

const Query = new GraphQLObjectType({
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

const Mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name:{ type: new GraphQLNonNull(GraphQLString) },
                age:{ type: new GraphQLNonNull(GraphQLInt) },
                country:{ type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                const user = {
                    id: 4,
                    name: args.name,
                    age: args.age,
                    country: args.country,
                    active: false
                }
                Database.push(user)
                return user
            }
        }
    }
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation
})