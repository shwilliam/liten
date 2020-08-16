import {GetServerSideProps} from 'next'

import CookiesDisclaimer from '../components/cookies-disclaimer'
import Hero from '../components/hero'
import NewLinkForm from '../components/new-link-form'
import PricingTable from '../components/pricing-table'
import Layout from '../components/site-layout'
import {AuthToken} from '../interfaces'
import {validateHeaderToken} from '../lib'

type Props = {
  token: AuthToken
}

const IndexPage = ({token}: Props) => (
  <>
    <CookiesDisclaimer />
    <Layout title="home ~ liten" isAuthenticated={!!token}>
      <h1 className="sr-only">liten</h1>

      <Hero />

      <div className="py-8 pb-10 sm:py-10 sm:pb-12">
        <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
          <NewLinkForm />
        </div>
      </div>

      {!token && (
        <section className="mx-auto container mb-12">
          <h2 className="text-center font-semibold text-4xl lg:text-5xl tracking-tight mt-24 mb-8 md:mb-2">
            Pricing
          </h2>
          <PricingTable />
        </section>
      )}
    </Layout>
  </>
)

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const token = validateHeaderToken(ctx.req.headers)

  return {props: {token}}
}

export default IndexPage
