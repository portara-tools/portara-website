const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
import passport from "passport";
import { Profile, Strategy as GitHubStrategy } from 'passport-github';

// Mongo Connection
const URI = `mongodb://heroku_wcgfs261:n1g8tpuc2nmb8bj8d8jt24hd8v@ds137263.mlab.com:37263/heroku_wcgfs261`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () =>
  console.log('connected to MongoDB')
);

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  userID: String,
  portara: [{ name: String, limit: String, per: String, throttle: String }],
  URI: String,
  username: String,
  githubID: Number,
  avatarURL: String,
});

// userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('portaraUsers', userSchema);

// typeDefs
const typeDefs = gql`
  type Query {
    test: String!
    findUser (userID: String!): User!
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
        const user = await User.findById(userID);
        return user;  
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
  async (accessToken, refreshToken, userProfile, cb) => {

    const profile = (userProfile as unknown) as UserProfile;
    let existingUser = await User.find(
      { githubID: profile._json.id }
    );

    if (!existingUser.length) {
      await User.create({
        URI: uuidv4(),
        username: profile._json.login,
        githubID: profile._json.id,
        avatarURL: profile._json.avatar_url,
      })
    }
    // let test = await 
    await cb(null, profile)
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
