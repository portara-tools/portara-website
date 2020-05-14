// import Link from 'next/link'
import Layout from '../components/Layout'
import { withRedux } from '../lib/withRedux'
import { withApollo } from '../lib/withApollo'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import {Button} from '@material-ui/core'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'



const IndexPage = () => {
  //state selecting hook
  const selectedState = useSelector((state: any) => state.counter)
  const { loading, error, data }:{loading:boolean, error?:any, data:any} = useQuery(gql`{hello}`)
  // console.log(helloQuery)
  // console.log(selectedState)
  // const dispatch = useDispatch()
  // console.log(dispatch(incrementCounter()))

  return (
    <Layout title="Portara | Home">
      <h1>This is our landing page</h1>
      {/* <Button>Hello GraphQL Test</Button> */}
      {loading && <h1>Loading...</h1>}
      {data && <h1>{data.hello}</h1>}
    </Layout>
  )
}

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage)
