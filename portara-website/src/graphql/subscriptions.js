/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateRateLimiter = /* GraphQL */ `
  subscription OnCreateRateLimiter {
    onCreateRateLimiter {
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
export const onUpdateRateLimiter = /* GraphQL */ `
  subscription OnUpdateRateLimiter {
    onUpdateRateLimiter {
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
export const onDeleteRateLimiter = /* GraphQL */ `
  subscription OnDeleteRateLimiter {
    onDeleteRateLimiter {
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
