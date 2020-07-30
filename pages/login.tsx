import {Magic} from 'magic-sdk'
import {useRouter} from 'next/dist/client/router'
import Link from 'next/link'
import {useState} from 'react'

import Input from '../components/input'
import Layout from '../components/site-layout'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const magicPublicKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
    if (!magicPublicKey) return

    const did = await new Magic(magicPublicKey).auth.loginWithMagicLink({email})

    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: {Authorization: `Bearer ${did}`},
    })

    if (authRequest.ok) {
      router.push('/#dashboard')
    } else {
      alert('Error authenticating')
    }
  }

  const handleChange = (event: any) => setEmail(event.target.value)

  return (
    <Layout title="sign up ~ liten">
      <div className="mx-8">
        <form
          className="max-w-md mx-auto p-5 my-10 md:my-16 lg:my-32 mb-16 md:mb-20 lg:mb-40 shadow-lg rounded bg-white"
          onSubmit={handleSubmit}
        >
          <div className="pt-3 pb-6 text-center">
            <h1 className="text-center font-semibold text-4xl lg:text-5xl tracking-tight my-2">
              Welcome!
            </h1>
            <p className="text-gray-700">
              Get started by entering your email&nbsp;below
            </p>
          </div>

          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <Input
            value={email}
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            required
          />

          <button
            className="block w-full flex-shrink-0 px-3 py-2 my-1 border rounded bg-orange-700 text-white border-orange-700 hover:opacity-75"
            type="submit"
          >
            <span className="font-bold">Log in</span> or{' '}
            <span className="font-bold">sign up</span>
          </button>
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
