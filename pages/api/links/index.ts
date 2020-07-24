import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const links = await prisma.link.findMany()
    res.json({links})
  } catch (err) {
    res.status(500).json({statusCode: 500, message: err.message})
  } finally {
    await prisma.disconnect()
  }
}
