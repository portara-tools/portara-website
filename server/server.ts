const { ApolloServer, PubSub } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
// const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const enforce = require('express-sslify');

const pubsub = new PubSub();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

// Set local variables/paths depending on production/development
let redirectURI = 'https://www.portara.io';
let callbackURI = 'https://www.portara.io/auth/github/callback';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  callbackURI = 'http://localhost:4000/auth/github/callback';
  redirectURI = 'http://localhost:3000/';
}

// Mongo Connection
const URI = process.env.MONGODB_URI || '';
mongoose.connect(
  URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => console.log('connected to MongoDB')
);

const userSchema = new mongoose.Schema(
  {
    userID: String,
    token: String,
    username: String,
    githubID: Number,
    avatarURL: String,    
  },
  { strict: false }
);

const User = mongoose.model('portaraUsers', userSchema);

// typeDefs
const typeDefs = gql`
  type Query {
    test: String!
    findUser(userID: ID!): [PortaraSetting]!
    findDashboard(github_ID: ID!): UserInfo!
  }
  type Subscription {
    portaraSettings(userID: String!): PortaraSetting!
  }
  type Mutation {
    changeSetting(
      userID: ID!
      name: String!
      limit: ID!
      per: ID!
      throttle: ID!
    ): PortaraSetting
  }
  type UserInfo {
    user_ID: ID!
    token: String!
    username: String!
    github_ID: ID!
    avatarURL: String!
    changeSetting(userID: ID!, name: String!, limit: ID!, per: ID!, throttle: ID!): PortaraSetting
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
        return pubsub.asyncIterator(userID);
      },
    },
  },
  Query: {
    test: () => 'Test success',
    // findUser returns an array of all fields that are added to a user in the DB
    findUser: async (_, { userID }) => {
      try {
        const newArr = [];
        const finalArr = [];
        await User.findOne({ githubID: userID }).then((data) => {
          const str = JSON.stringify(data);
          newArr.push(str);
        });
        const data = JSON.parse(newArr[0]);
        delete data['_id'];
        delete data['username'];
        delete data['githubID'];
        delete data['avatarURL'];
        for (const key in data) {
          if (typeof data[key] === 'object') {
            let newObj = { ...data[key] };
            newObj['name'] = key.toString();
            finalArr.push(newObj);
          }
        }
        return finalArr;
      } catch (error) {
        return error;
      }
    },

    findDashboard: async (_, { github_ID }) => {
      const dashboardData = await User.findOne({ githubID: github_ID });
      return dashboardData;
    },
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
          throttle,
        };
        // await User.findByIdAndUpdate(userID, { [name]: newObj }, { upsert: true, new: true });
        await User.findOneAndUpdate({ token: userID }, { [name]: newObj }, { upsert: true, new: true });
        await pubsub.publish(userID, { //! we're going to use the token for userID instead of GHid
          portaraSettings: {
            name,
            limit,
            per,
            throttle,
          },
        });

        return {
          userID,
          name,
          limit,
          per,
          throttle,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

const PORT = process.env.PORT || 4000;
const app = express();
// app.use(cors());
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Github Authentication --------------------------------------------------
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: callbackURI,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.find({ githubID: profile._json.id });
      if (!existingUser.length) {
        await User.create({
          token: uuidv4(),
          username: profile._json.login,
          githubID: profile._json.id,
          avatarURL: profile._json.avatar_url,
        });
      }
      await cb(null, profile);
    }
  )
);

app.use(passport.initialize());
app.get('/githublogin', passport.authenticate('github', { session: false }));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    res.locals.id = req.user.id;
    res.locals.username = req.user.username;
    res.locals.avatar = req.user.photos[0].value;
    res
      .cookie('GitHubID', res.locals.id)
      .cookie('Username', res.locals.username)
      .cookie('Avatar', res.locals.avatar)
      .redirect(redirectURI);
  }
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
  // cors: false,
});

// This static is used to server our build folder when deploying
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}


httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
