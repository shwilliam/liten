import {Magic} from '@magic-sdk/admin'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (_req, res) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        maxAge: -1,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    )

    res.end()
  } catch (error) {
    console.log({error})
    res.status(500).json({error: {message: error.message}})
  }
})

export default handler
