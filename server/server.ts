const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();
const mongoose = require('mongoose');
const cors = require('cors')
const woiehn = 'hey'
const { v4: uuidv4 } = require('uuid');

const passport = require('passport');
const { Profile } = require('passport-github');
const GitHubStrategy = require('passport-github').Strategy;

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config() 
}

// Mongo Connection
const URI = process.env.MONGODB_URI || '';
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () =>
  console.log('connected to MongoDB')
);
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  userID: String,
  URI: String,
  username: String,
  githubID: Number,
  avatarURL: String,
}, 
{ strict: false });

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
        const data = JSON.parse(newArr[0])
        delete data['_id']
        delete data['userID']
        delete data['portara']
        for (let key in data) {
          if (typeof data[key] === 'object') {
            let newObj = { ...data[key] }
            newObj['name'] = key.toString()
            finalArr.push(newObj)
          }
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
        return { userID, name, limit, per, throttle }

      } catch (error) {
        return error;
      }
    }
  }
};


const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors())
// Github Authentication --------------------------------------------------
passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://portara-web.herokuapp.com/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {

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
    await cb(null, profile)
  }
  ));
  
app.use(passport.initialize());
app.get(
  '/githublogin',
  passport.authenticate('github', { session: false }),
);
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
      .redirect('https://portara-web.herokuapp.com/')
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
