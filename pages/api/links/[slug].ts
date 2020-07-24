import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const {slug} = req.query
    const link = await prisma.link.findOne({where: {slug: slug as string}})
    res.json({link})
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  } finally {
    await prisma.disconnect()
  }
}
