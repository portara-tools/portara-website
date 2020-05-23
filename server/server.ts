
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose')


// Mongo Connection

const URI = `mongodb://heroku_wcgfs261:n1g8tpuc2nmb8bj8d8jt24hd8v@ds137263.mlab.com:37263/heroku_wcgfs261`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
  console.log('connected to MongoDB')
);

const userSchema = new mongoose.Schema({
  userID: String,
  portara: [{ name: String, limit: String, per: String, throttle: String }],
});


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
        // console.log(userID)
        return pubsub.asyncIterator(userID)
      }
    }
  },
  Query: {
    test: () => "Test success"

  },
  Mutation: {
    changeSetting: async (_, { userID, name, limit, per, throttle }) => {
      try {
        const data = await User.findById(userID)
        const arr = [...data.portara]
        const Field = {
          name,
          limit,
          per,
          throttle
        };
        let found = false
        for (let field of arr) {
          if (field.name === name) {
            field.limit = limit;
            field.per = per;
            field.throttle = throttle
            found = true
            break
          }
        }
        if (!found) {
          arr.push(Field)
        }
        await User.findOneAndUpdate(userID, { $set: { portara: arr } }, { upsert: true })

        // const doodoo = await User.findById(userID)
        // console.log('steves data', doodoo)
        pubsub.publish(userID, { portaraSettings: { name, limit, per, throttle } })
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
