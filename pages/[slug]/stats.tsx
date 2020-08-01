import {GetServerSideProps} from 'next'

import PageHeader from '../../components/page-header'
import Layout from '../../components/site-layout'
import ViewChart from '../../components/view-chart'
import {useLinkViews} from '../../hooks'
import {AuthToken, Link} from '../../interfaces'
import {
  removeURLScheme,
  removeWebHostString,
  validateHeaderToken,
} from '../../lib'

type Props = {
  link: Link
  slug: string
  token: AuthToken
}

const LinkStatsPage = ({link, slug, token}: Props) => {
  const views = useLinkViews(slug)

  return (
    <Layout title={`stats ${slug} ~ liten`} isAuthenticated={!!token}>
      <div className="py-8 pb-10 sm:py-10 sm:pb-12">
        <PageHeader
          title={`/${slug} stats`}
          subtitle={
            <a
              className="block md:text-center mt-3 md:mt-8 text-gray-500 hover:text-gray-900 leading-tight"
              target="_blank"
              rel="noopener noreferrer"
              href={link.target}
            >
              {removeWebHostString(removeURLScheme(link.target))}
            </a>
          }
        />

        <section className="mx-auto p-4 sm:p-8 container max-w-2xl mb-12">
          {views.status === 'success' ? (
            views.data.views.length ? (
              <ViewChart views={views.data.views} />
            ) : (
              <p className="md:text-center text-2xl py-8">
                Patience! Views are coming!
              </p>
            )
          ) : null}
        </section>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = validateHeaderToken(ctx.req.headers)

  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link, slug, token}}
}

export default LinkStatsPage
