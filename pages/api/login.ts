import {Magic} from '@magic-sdk/admin'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

let magic: any

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    if (!magic) magic = new Magic(process.env.MAGIC_SECRET_KEY)

    const userMeta = await magic.users.getMetadataByToken(
      magic.utils.parseAuthorizationHeader(req.headers.authorization),
    )

    const {email} = userMeta
    let user = await prisma.user.findOne({where: {email}})

    if (!user) user = await prisma.user.create({data: {email}})
    if (!process.env.JWT_SECRET) throw new Error('No JWT token found')

    const token = jwt.sign(
      {email: user.email, id: user.id, time: new Date()},
      process.env.JWT_SECRET,
      {
        expiresIn: '6h',
      },
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    )

    res.json(user)
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler
