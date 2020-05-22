/* eslint-disable */
// this is an auto generated file. This will be overwritten



export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      rateLimiters {
        items {
          id
          projectName
          limit
          per
          throttle
          userId
          user {
            id
            username
            rateLimiters {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        rateLimiters {
          items {
            id
            projectName
            limit
            per
            throttle
            userId
            user {
              id
              username
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRateLimiter = /* GraphQL */ `
  query GetRateLimiter($id: ID!) {
    getRateLimiter(id: $id) {
      id
      projectName
      limit
      per
      throttle
      userId
      user {
        id
        username
        rateLimiters {
          items {
            id
            projectName
            limit
            per
            throttle
            userId
            user {
              id
              username
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRateLimiters = /* GraphQL */ `
  query ListRateLimiters(
    $filter: ModelRateLimiterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRateLimiters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectName
        limit
        per
        throttle
        userId
        user {
          id
          username
          rateLimiters {
            items {
              id
              projectName
              limit
              per
              throttle
              userId
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
