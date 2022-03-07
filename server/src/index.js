const { GraphQLServer, PubSub } = require('graphql-yoga')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const db = require('./data')

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { db, pubsub } })

server.start(() => console.log('Server is running'))
