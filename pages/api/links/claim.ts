import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

import {validateHeaderToken} from '../../../lib'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) {
      res
        .status(401)
        .json({error: {message: 'Missing or invalid authorization token'}})
      return
    }

    const {links} = req.body

    const user = await prisma.user.update({
      where: {email: token.email},
      data: {
        links: {
          connect: links.map((link: string) => ({id: link})),
        },
      },
    })

    res.status(204).json({user})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler
