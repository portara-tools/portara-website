
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose')


// Mongo Connection

const URI = `mongodb+srv://stevefrend:_--wC2-!TqUtsTJx@solo-vue4b.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
  console.log('connected to MongoDB')
);

const userSchema = new mongoose.Schema({
  userID: String,
  portara: [{ name: String, limit: String, per: String, throttle: String }],
});

// const portaraSchema = new mongoose.Schema({
//     limit: String || Number,
//   per: String || Number,
//   throttle: String || Number
// })

const User = mongoose.model('portaraUsers', userSchema);


// typeDefs
const typeDefs = gql`
  type Query {
    portaraSettings(userID: String!, limit: ID!, per: ID!, throttle: ID!): PortaraSetting!
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
      // also need args here to establish user ID as channel
      subscribe(_, { userID }) {
        console.log(userID)
        // Inside here, we reach into the database to see if the user exists. If it doesn't, userID = 'default'. If it does, userID = their email/ip/whatever
        return pubsub.asyncIterator(userID)
      }
    }
  },
  Query: {
    portaraSettings: (_, { userID, limit, per, throttle }) => {
      pubsub.publish(userID, { portaraSettings: { name, limit, per, throttle } })
      return { name, limit, per, throttle }
    },
  },
  Mutation: {
    changeSetting: async (_, { userID, name, limit, per, throttle }) => {
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
