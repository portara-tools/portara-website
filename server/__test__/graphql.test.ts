import { graphql } from 'graphql'
const { gql, makeExecutableSchema } = require('apollo-server-express')
import { IResolverValidationOptions } from 'graphql-tools'
// import portaraSchemaDirective from '../mockDirective'
const mongoose = require('mongoose');

// Mongo Connection to a Live (Cloud) Dummy Db
beforeAll(async () => {
  const URI = process.env.MONGODB_URI || '';
  await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () =>
    console.log('connected to MongoDB')
  );
})


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

// Globally allows resolvers to not exist in the original schema
const resolverValidationOptions: IResolverValidationOptions = {
  allowResolversNotInSchema: true
};


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
    testM: String!
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
    test: () => "Query test success!",

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
    testM: () => 'Mutation test success!',
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

// -------------------------------------------------------------
//    Normal GraphQL Query & Mutation
// -------------------------------------------------------------
describe('Receives a response from our GraphQL Query', () => {

  it('Completes a query', async () => {

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions,
    })

    const response = await graphql(schema, 'query { test }');
    expect(response.data!.test).toBe("Query test success!")
  })

  it('Completes a mutation', async () => {

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions
    })

    const response = await graphql(schema, 'mutation { testM }');
    expect(response.data!.testM).toBe("Mutation test success!");
  })
})

// -------------------------------------------------------------
//    Return user's array of rate limiter settings
// -------------------------------------------------------------

describe('Receives a response from our GraphQL Query', () => {

  it('Completes a query without directive', async () => {

    const findUser = `
      {
        findUser (userID: "5ec9aa3a9057a222f161be33") {
          name
          limit
          throttle
          per
        }
      }
    `;

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions,
    })

    const response = await graphql(schema, findUser);
    expect(response.data!.test).toBe("Test")
  })

  //   it('Completes a mutation', async () => {
  //     const typeDefs = gql`
  //       type Query {
  //         test: String!
  //       }
  //       type Mutation {
  //         hello: String!
  //       }
  //   `;

  //     const schema = makeExecutableSchema({
  //       typeDefs,
  //       resolvers,
  //       resolverValidationOptions
  //     })

  //     const response = await graphql(schema, 'mutation { hello }');
  //     expect(response.data!.hello).toBe("Hello World");
  //   })
})