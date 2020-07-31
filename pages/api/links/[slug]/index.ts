import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const {slug} = req.query
    const link = await prisma.link.findOne({where: {slug: slug as string}})
    res.json({link})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler
