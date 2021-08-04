import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import Schemas from './schemas/schemas'
import {CONF} from './config/server.json'
(() => {
    const app = express();
    app.use(
        "/graphql", 
        graphqlHTTP({
            schema: Schemas,
            graphiql: true
        })
    )

    app.listen(CONF.PORT, () => {
        console.log(`${CONF.NAMESPACE} on port in ${CONF.PORT}`)
    })
})()