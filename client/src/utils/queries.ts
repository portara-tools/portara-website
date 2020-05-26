import gql from 'graphql-tag'


export const UPDATE_SETTING = gql`
  mutation ($userID: String!, $name: String!, $limit: ID!, $per: ID!, $throttle: ID!){
    changeSetting(userID: $userID, name: $name, limit: $limit, per: $per, throttle: $throttle) {
      name
      limit
      per
      throttle
    }
  }
`

export const READ_DATABASE = gql`
  query findUser($userID: String!){
    findUser(userID: $userID) {
      name
      limit
      per
      throttle
    }
  }
`