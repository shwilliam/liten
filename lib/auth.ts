import {Magic} from 'magic-sdk'

export const logInWithEmail = async (email: string) => {
  const magicPublicKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
  if (!magicPublicKey) return

  const did = await new Magic(magicPublicKey).auth.loginWithMagicLink({email})

  const authRequest = await fetch('/api/login', {
    method: 'POST',
    headers: {Authorization: `Bearer ${did}`},
  })

  return authRequest
}
