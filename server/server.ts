
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose')

// Mongo Connection
const URI = `mongodb://heroku_wcgfs261:n1g8tpuc2nmb8bj8d8jt24hd8v@ds137263.mlab.com:37263/heroku_wcgfs261`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () =>
  console.log('connected to MongoDB')
);

const userSchema = new mongoose.Schema({
  userID: String,
}, { strict: false });


const User = mongoose.model('portaraUsers', userSchema);

// typeDefs
const typeDefs = gql`
  type Query {
    test: String!
  }
  type Subscription {
    portaraSettings(userID: String!): PortaraSetting!
  }
  type Mutation {
    changeSetting(userID: String, name: String!, limit: ID!, per: ID!, throttle: ID!): PortaraSetting
  }
  type User {
    userID: String!
    portara: [PortaraSetting]!
  }
  type PortaraSetting {
    name: String!
    limit: ID!
    per: ID!
    throttle: ID!
  }
`;

// resolvers
const resolvers = {
  Subscription: {
    portaraSettings: {
      subscribe(_, { userID }) {
        console.log(userID)
        return pubsub.asyncIterator(userID)
      }
    }
  },
  Query: {
    test: () => "Test success"
  },
  Mutation: {

    /*
      This is the mutation to be triggered when a user updates settings to ANY field
      ---- name: the name of the field definition or object
      ---- userID: the unique token that is used and sent back to the client
    */
    changeSetting: async (_, { userID, name, limit, per, throttle }) => {
      try {
        const newObj = {
          limit,
          per,
          throttle
        };

        await User.findByIdAndUpdate(userID, { [name]: newObj }, { upsert: true, new: true })
        await pubsub.publish(userID, { portaraSettings: { name, limit, per, throttle } })
        const doodoo = await User.findById(userID)
        console.log(doodoo)
        return { userID, name, limit, per, throttle }

      } catch (error) {
        return error;
      }
    }
  }
};


const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
  playground: true,
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


server.applyMiddleware({
  app,
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
