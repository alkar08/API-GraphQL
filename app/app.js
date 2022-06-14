import '@babel/polyfill'
import express from 'express'
const bodyParser = require('body-parser')
import { ApolloServer } from 'apollo-server-express'
const cors = require('cors')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
    modules: [
        // require('./GraphQL/tickets'),
        // require('./GraphQL/status'),
        require('./GraphQL/aplicacion'),
        require('./GraphQL/variablesGlobales'),
    ],
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)
