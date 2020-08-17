import {useRouter} from 'next/dist/client/router'
import Link from 'next/link'
import {ChangeEvent, useState} from 'react'
import {useLocalStorage} from 'react-use'

import Button from '../components/button'
import Layout from '../components/site-layout'
import {useClaimLocalLinks} from '../hooks'
import {logInWithEmail} from '../lib'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [claimLocalLinks] = useClaimLocalLinks()
  const [localCreatedLinks] = useLocalStorage('created_links')
  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const authRequest = await logInWithEmail(email)

    if (authRequest?.ok) {
      const localLinks = JSON.parse(localCreatedLinks as string)
      const localLinksIds = localLinks
        .filter((link: any) => !link.authorId)
        .map((link: any) => link.id)
      await claimLocalLinks({links: localLinksIds})
      router.push('/dashboard')
    } else {
      alert('Error authenticating')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)

  return (
    <Layout title="sign up ~ liten">
      <div className="mx-8">
        <form
          className="max-w-md mx-auto p-5 my-10 md:my-16 lg:my-32 mb-16 md:mb-20 lg:mb-40 bg-white border-4 border-blue-500"
          onSubmit={handleSubmit}
        >
          <div className="pt-3 pb-6 text-center">
            <h1 className="font-mono text-center font-semibold text-blue-500 text-4xl lg:text-5xl tracking-tight my-2">
              Welcome!
            </h1>
            <p className="text-gray-700">
              Get started by entering your email&nbsp;below
            </p>
          </div>

          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            className="w-full px-3 py-2 border-4 border-blue-500 placeholder-gray-800"
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            required
          />

          <Button className="w-full -mt-2" type="submit">
            <span className="font-bold">Log in</span> or{' '}
            <span className="font-bold">sign up</span>
          </Button>
          <p className="text-center text-gray-700 p-4 mt-3">
            By creating an account, you agree to the{' '}
            <Link href="/terms-of-service">
              <a className="underline text-gray-600 hover:text-gray-700">
                Terms of Service
              </a>
            </Link>{' '}
            and our{' '}
            <Link href="/privacy-policy">
              <a className="underline text-gray-600 hover:text-gray-700">
                Privacy Policy
              </a>
            </Link>
            .
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
