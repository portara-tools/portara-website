/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
  }
`;
export const createRateLimiter = /* GraphQL */ `
  mutation CreateRateLimiter(
    $input: CreateRateLimiterInput!
    $condition: ModelRateLimiterConditionInput
  ) {
    createRateLimiter(input: $input, condition: $condition) {
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
  }
`;
export const updateRateLimiter = /* GraphQL */ `
  mutation UpdateRateLimiter(
    $input: UpdateRateLimiterInput!
    $condition: ModelRateLimiterConditionInput
  ) {
    updateRateLimiter(input: $input, condition: $condition) {
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
  }
`;
export const deleteRateLimiter = /* GraphQL */ `
  mutation DeleteRateLimiter(
    $input: DeleteRateLimiterInput!
    $condition: ModelRateLimiterConditionInput
  ) {
    deleteRateLimiter(input: $input, condition: $condition) {
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
  }
`;
