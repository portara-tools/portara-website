const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose');
require('dotenv').config()
import passport from "passport";
import { Profile, Strategy as GitHubStrategy } from 'passport-github';

// Mongo Connection
const URI = process.env.MONGO_DB;
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
    findUser (userID: String!): [PortaraSetting]!
  }
  type Subscription {
    portaraSettings(userID: String!): PortaraSetting!
  }
  type Mutation {
    changeSetting(userID: String!, name: String!, limit: ID!, per: ID!, throttle: ID!): PortaraSetting
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
    test: () => "Test success",

    findUser: async (_, { userID }) => {
      try {

        const newArr = [];
        const finalArr = [];
        const user = await User.findOne({ _id: userID })
          .then(data => {
            let str = JSON.stringify(data)
            newArr.push(str)
          })
        const derp = JSON.parse(newArr[0])
        delete derp['_id']
        delete derp['userID']
        delete derp['portara']
        for (let key in derp) {
          let newObj = { ...derp[key] }
          newObj['name'] = key.toString()
          finalArr.push(newObj)
        }
        return finalArr;

      } catch (error) {
        return error;
      }
    }
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

// Github Authentication --------------------------------------------------

interface UserProfile extends Profile {
  _json: {
    [key: string]: string;
  };
}

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/github/callback" // CHANGE IN PRODUCTION
  },
    (accessToken, refreshToken, userProfile, cb) => {
      const profile = (userProfile as unknown) as UserProfile;
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log(profile._json)
      cb(null, profile)
    }
  ));

app.use(passport.initialize());

app.get(
  '/githublogin',
  passport.authenticate('github', { session: false })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => res.redirect('http://localhost:3000') // CHANGE IN PRODUCTION TO '/dashboard'
);

// --------------------------------------------------------------------------

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
  cors: false,
});

app.use(express.static('public'));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});



httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
