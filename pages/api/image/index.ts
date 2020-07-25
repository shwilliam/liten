import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

const upload = multer({dest: './tmp'})
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(upload.single('image'), async (req, res) => {
  if (!req.file) res.status(400).end()

  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 512,
    height: 512,
    crop: 'fill',
  })

  res.json({image})
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
