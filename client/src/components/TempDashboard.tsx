import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, {useState} from 'react'
import Navbar from './Navbar'

const UPDATE_SETTING = gql`
  mutation ($userID: String!, $name: String!, $limit: ID!, $per: ID!, $throttle: ID!){
    changeSetting(userID: $userID, name: $name, limit: $limit, per: $per, throttle: $throttle) {
      name
      limit
      per
      throttle
    }
  }
`

const READ_DATABASE = gql`
  query findUser($userID: String!){
    findUser(userID: $userID) {
      name
      limit
      per
      throttle
    }
  }
`

interface IField {
  name: string
  limit: string
  per: string
  throttle: string
}

const TempDashboard: React.FunctionComponent = () => {
  const [ inputData, setInputData ] = useState({ name: '', limit: '', per: '', throttle: ''})
  const [triggerMutation, { data: newData }] = useMutation(UPDATE_SETTING, {
    variables: {
      userID: "5ec9aa3a9057a222f161be33",
      name: 'hello', 
      limit: inputData.limit.toString(), 
      per: inputData.per.toString(), 
      throttle: inputData.throttle.toString(), 
    }
  })
  const { loading, data } = useQuery(READ_DATABASE, {
    variables: { userID: "5ec9aa3a9057a222f161be33" },
  });
  
  console.log('DATA FROM DB READ (QUERY)', data)
  console.log('DATA FROM MUTATION', newData)
  
  const updateField = (e: any) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    });
  };

  if (!loading && data) {    
    return (
      <>
        <Navbar />
        <div>
          <ul>
            {data.findUser.map((field:IField) => {
              return <li>Name: {field.name} Limit: {field.limit} Duration: {field.per} Throttle: {field.throttle}</li>
            })}
            <form onSubmit={(e) => {
              e.preventDefault()
              triggerMutation()
            }}>
              <input name="limit" placeholder="limit" onChange={updateField}/>
              <input name="per" placeholder="duration" onChange={updateField}/>
              <input name="throttle" placeholder="throttle" onChange={updateField}/>
              <button type="submit">Submit</button>
            </form>
          </ul>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <h1>Loading...</h1>
      </>
    )
    }
  }

  export default TempDashboard;