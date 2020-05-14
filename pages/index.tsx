// import Link from 'next/link'
import Layout from '../components/Layout'
import { withRedux } from '../lib/withRedux'
import { withApollo } from '../lib/withApollo'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'



const IndexPage = () => {
  //state selecting hook
  const selectedState = useSelector((state: any) => state.counter)
  console.log(selectedState)
  // const dispatch = useDispatch()
  // console.log(dispatch(incrementCounter()))

  return (
    <Layout title="Portara | Home">
      <h1>This is our landing page</h1>
    </Layout>
  )
}

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage)
