import Hero from '../components/hero'
import NewLinkForm from '../components/new-link-form'
import Layout from '../components/site-layout'

const IndexPage = () => {
  return (
    <Layout title="home ~ liten">
      <h1 className="sr-only">liten</h1>

      <Hero />

      <div className="bg-orange-600 py-8 pb-10 sm:py-10 sm:pb-12">
        <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
          <NewLinkForm />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
