import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

import {validateHeaderToken} from '../../../../lib'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) throw new Error('Missing or invalid authorization token')

    const {email} = token
    const views = await prisma.view.count({where: {link: {author: {email}}}})

    res.json({views})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler
