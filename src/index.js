const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
});

server.listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
