import { graphql } from 'graphql'
const { gql, makeExecutableSchema } = require('apollo-server-express')
import { IResolverValidationOptions } from 'graphql-tools'
// import portaraSchemaDirective from '../mockDirective'

const userData = {
  _id: "5ec9aa3a9057a222f161be33",
  userID: "steve",
  Mutation: {
    limit: "3",
    per: "10",
    throttle: "500ms"
  },
  bye: {
    limit: "8",
    per: "10",
    throttle: "0"
  },
}


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
        return pubsub.asyncIterator(userID)
      }
    }
  },
  Query: {
    test: () => "Query test success!",

    findUser: async (_, { userID }) => {
      try {
        const finalArr = [];

        for (let key in userData) {
          if (typeof userData[key] === 'object') {
            let newObj = { ...userData[key] }
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
    changeSetting: (_, { userID, name, limit, per, throttle }) => {

      try {
        const newObj = {
          limit,
          per,
          throttle
        };

        userData[name] = newObj

        return { userID, name, limit, per, throttle, userData }
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

describe('GraphQL query locates and returns data', () => {

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

  it("Data of user should be an array with two specific objects", async () => {
    const response = await graphql(schema, findUser);
    expect(response.data!.findUser).toEqual([
      expect.objectContaining({ name: "Mutation" }),
      expect.objectContaining({ name: "bye" }),
    ])
  })

  it("Each object in the array should have a length of 4 with three specific properties each", async () => {
    const response = await graphql(schema, findUser);
    const keys = Object.keys(response.data!.findUser[0])
    const length = keys.length
    expect(length).toBe(4)
    expect(keys).toContain('limit')
    expect(keys).toContain('per')
    expect(keys).toContain('throttle')
  })
})

describe('GraphQL mutation locates and mutates data', () => {

  const changeByeSetting = `
    mutation{
      changeSetting(userID: "5ec9aa3a9057a222f161be33",name:"bye", limit: 5, per: 10, throttle:0) {
        name
        limit
        per
        throttle
      }
    }
  `;
  const changeMutationSetting = `
    mutation{
      changeSetting(userID: "5ec9aa3a9057a222f161be33",name:"Mutation", limit: 5, per: 10, throttle:0) {
        name
        limit
        per
        throttle
      }
    }
  `;

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions,
  })

  it("Data of user's bye setting should be updated", async () => {
    const response = await graphql(schema, changeByeSetting);
    expect(response.data!.changeSetting.name).toBe('bye')
    expect(response.data!.changeSetting.limit).toBe(userData.bye.limit)
    expect(response.data!.changeSetting.per).toBe(userData.bye.per)
    expect(response.data!.changeSetting.throttle).toBe(userData.bye.throttle)
  })

  it("Data of user's Mutation setting should be updated", async () => {
    const response = await graphql(schema, changeMutationSetting);
    expect(response.data!.changeSetting.name).toBe('Mutation')
    expect(response.data!.changeSetting.limit).toBe(userData.bye.limit)
    expect(response.data!.changeSetting.per).toBe(userData.bye.per)
    expect(response.data!.changeSetting.throttle).toBe(userData.bye.throttle)
  })
})