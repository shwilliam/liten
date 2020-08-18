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

      <div className="px-4 sm:px-8 xl:px-20 my-32 md:my-48 md:mb-36">
        <div className="mx-auto container my-48">
          <h2 className="sr-only">How does it work?</h2>

          <ol className="flex flex-wrap overflow-hidden">
            <li className="my-8 px-8 w-full overflow-hidden md:w-1/3">
              <div className="border-4 border-blue-500">
                <img className="blue-wash" src="/images/create.png" />
              </div>
              <h3 className="font-mono text-blue-500 text-3xl md:text-xl lg:text-3xl tracking-tight my-8 whitespace-no-wrap">
                1. Create a link
              </h3>
              <p className="lowercase leading-relaxed">
                Replace that long, ugly URL with a short, personalized one that
                everyone can remember.
              </p>
            </li>
            <li className="my-8 px-8 w-full overflow-hidden md:w-1/3">
              <div className="border-4 border-blue-500">
                <img className="blue-wash" src="/images/edit.png" />
              </div>
              <h3 className="font-mono text-blue-500 text-3xl md:text-xl lg:text-3xl tracking-tight my-8 whitespace-no-wrap">
                2. Edit your preview
              </h3>
              <p className="lowercase leading-relaxed">
                Edit how your link appears when shared on popular social
                platforms (FB, Twitter, Google).
              </p>
            </li>
            <li className="my-8 px-8 w-full overflow-hidden md:w-1/3">
              <div className="border-4 border-blue-500">
                <img className="blue-wash" src="/images/share.png" />
              </div>
              <h3 className="font-mono text-blue-500 text-3xl md:text-xl lg:text-3xl tracking-tight my-8 whitespace-no-wrap">
                3. Share!
              </h3>
              <p className="lowercase leading-relaxed">
                Share your new, beautiful link with customers and friends.
              </p>
            </li>
          </ol>
        </div>

        <div className="container px-4 sm:px-8 xl:px-20 my-48 mx-auto">
          <NewLinkForm />
        </div>
      </div>

      {!token && (
        <section className="mx-auto container mb-20">
          <h2 className="font-serif italic text-blue-500 text-center text-3xl lg:text-4xl tracking-tight my-8">
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
