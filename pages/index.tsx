import Link from 'next/link'
import Layout from '../components/Layout'
import { withRedux } from '../lib/withRedux'
import { useSelector, useDispatch } from 'react-redux'


 export default const IndexPage = () => {
  const selectedState = useSelector((state: any) => state.counter)
  console.log(selectedState)
  const dispatch = useDispatch()
  // console.log(dispatch(incrementCounter()))

  return (
    <Layout title="Portara | Home">
      <h1>This is our landing page</h1>
    </Layout>
  )
}

export default withRedux(IndexPage)
