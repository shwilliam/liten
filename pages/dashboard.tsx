import LinkList from '../components/link-list'
import Layout from '../components/site-layout'
import {useViewerLinks} from '../hooks'
import {validateHeaderToken} from '../utils'

const DashboardPage = () => {
  const links = useViewerLinks()

  return (
    <Layout title="dashboard ~ liten" isAuthenticated>
      <h1 className="sr-only">Dashboard</h1>

      <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
        <h2 className="font-semibold text-4xl lg:text-5xl tracking-tight mt-6 lg:mt-10 xl:mt-12 mb-2">
          Your Links
        </h2>

        {links.status === 'loading' && <p>Fetching links...</p>}
        {links.status === 'success' && links.data?.links && (
          <LinkList links={links.data.links} />
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const token = validateHeaderToken(ctx.req.headers)
  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/login',
      })
      .end()

  return {props: {}}
}

export default DashboardPage
