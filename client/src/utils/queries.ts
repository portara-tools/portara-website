import gql from 'graphql-tag'


export const UPDATE_SETTING = gql`
  mutation ($userID: ID!, $name: String!, $limit: ID!, $per: ID!, $throttle: ID!){
    changeSetting(userID: $userID, name: $name, limit: $limit, per: $per, throttle: $throttle) {
      name
      limit
      per
      throttle
    }
  }
`

export const READ_DATABASE = gql`
  query findUser($userID: ID!){
    findUser(userID: $userID) {
      name
      limit
      per
      throttle
    }
  }
`

export const FIND_DASHBOARD = gql`
  query findDashboard($github_ID: ID!) {
    findDashboard(github_ID: $github_ID) {
      token
      avatarURL
    }
  }
`;