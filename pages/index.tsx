import Hero from '../components/hero'
import NewLinkForm from '../components/new-link-form'
import Layout from '../components/site-layout'
import {AuthToken} from '../interfaces'
import {validateHeaderToken} from '../utils'

type Props = {
  token: AuthToken
}

const IndexPage = ({token}: Props) => {
  return (
    <Layout title="home ~ liten" isAuthenticated={!!token}>
      <h1 className="sr-only">liten</h1>

      <Hero />

      <div className="bg-orange-600 py-8 pb-10 sm:py-10 sm:pb-12">
        <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
          <NewLinkForm isAuthenticated={!!token} />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const token = validateHeaderToken(ctx.req.headers)
  return {props: {token}}
}

export default IndexPage
