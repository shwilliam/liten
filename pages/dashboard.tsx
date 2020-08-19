import {GetServerSideProps} from 'next'

import LinkList from '../components/link-list'
import PageHeader from '../components/page-header'
import Layout from '../components/site-layout'
import SummaryCard from '../components/summary-card'
import {useViewerLinks, useViewerLinksViews} from '../hooks'
import {AuthToken} from '../interfaces'
import {validateHeaderToken} from '../lib'

type Props = {
  token?: AuthToken
}

const DashboardPage = ({token}: Props) => {
  const links = useViewerLinks()
  const linksViews = useViewerLinksViews()
  const linksCount = links.status === 'success' ? links.data.links?.length : '?'
  const totalCustomPreviews =
    typeof linksCount === 'number' ? linksCount * 3 : '?'
  const totalLinkViews =
    linksViews.status === 'success' ? linksViews.data.views : '?'

  return (
    <Layout title="dashboard ~ liten" isAuthenticated>
      <div className="py-8 pb-10 sm:py-10 sm:pb-12">
        <PageHeader title="Dashboard" subtitle={token?.email} />

        <section className="container px-4 sm:px-8 my-12 md:my-16 lg:my-24 xl:px-20 mx-auto">
          <div className="flex justify-around md:mx-auto overflow-visible">
            <SummaryCard
              label="Short links"
              labelShort="Links"
              figure={linksCount}
            >
              <svg
                className="p-2 h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </SummaryCard>

            <SummaryCard
              figure={totalCustomPreviews}
              label="Custom previews"
              labelShort="Previews"
            >
              <svg
                className="p-2 h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </SummaryCard>

            <SummaryCard
              figure={totalLinkViews}
              label="Link views"
              labelShort="Views"
            >
              <svg
                className="p-2 h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </SummaryCard>
          </div>
        </section>

        <section className="container px-4 sm:px-8 xl:px-20 mx-auto my-20">
          <h2 className="font-serif italic md:text-center text-blue-500 text-4xl lg:text-5xl tracking-tight md:pt-6 md:pb-4 lg:pb-8 lg:mt-10 mb-2">
            Your Links
          </h2>

          {links.status === 'loading' && <p>Fetching links...</p>}
          {links.status === 'success' && links.data?.links && (
            <LinkList links={links.data.links} stats />
          )}
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const token = validateHeaderToken(ctx.req.headers)
  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/login',
      })
      .end()

  return {props: {token}}
}

export default DashboardPage
