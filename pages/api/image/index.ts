import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

const upload = multer({dest: '/tmp'})
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(upload.single('image'), async (req, res) => {
  try {
    if (!req.file) throw new Error('No file to upload')

    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill',
    })

    res.json({image})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
