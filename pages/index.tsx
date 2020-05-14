import Link from 'next/link'
import Layout from '../components/Layout'
import { withRedux } from '../lib/withRedux'
import { useSelector, useDispatch } from 'react-redux'



const IndexPage = () => {
  const selectedState = useSelector((state: any) => state.counter)
  console.log(selectedState)
  const dispatch = useDispatch()
  // console.log(dispatch(incrementCounter()))

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default withRedux(IndexPage)
