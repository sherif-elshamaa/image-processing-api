import express, { Router, Request, Response } from 'express'
import { imageQueryValidator, imagePreviewValidator } from '../validators/imageValidator'
import { validationResult } from 'express-validator'
import resizer from '../controllers/resizer'
import fs from 'fs-extra'
import path from 'path'

const dir = process.cwd()
const route = Router()
route.use('/public', express.static(path.join(dir, './src/public')))

route.get('/convert', imageQueryValidator(), async (req: Request, res: Response) => {
  const filename: string = req.query.filename as string
  const width: string = req.query.width as string
  const height: string = req.query.height as string

  const filePath = path.join(dir, `./src/public/images/${filename}.jpg`)
  const convertPath = path.join(dir, `./src/public/converted/${filename}_${width}_${height}.jpg`)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    try {
      const imageSrcExist = await fs.pathExists(filePath)
      const convertedSrcExist = await fs.pathExists(convertPath)

      if (!imageSrcExist) {
        res.status(400).json({ error: `${filename}: image not found` })
        console.log(`image not found in ${filePath}`)
        return
      } else if (convertedSrcExist) {
        res.render('preview', {
          img: `public/converted/${filename}_${width}_${height}.jpg`,
          width: width,
          height: height
        })
        console.log(`image already exists in ${convertPath}`)
        return
      } else {
        await resizer(filePath, width, height, convertPath)

        res.render('convert', {
          img: `public/converted/${filename}_${width}_${height}.jpg`,
          width: width,
          height: height
        })
        console.log('successfully resized')
      }
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  }
})

route.get('/preview', imagePreviewValidator(), async (req: Request, res: Response) => {
  const { filename } = req.query
  const filePath = path.join(dir, `./src/public/images/${filename}.jpg`)
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    try {
      const imageSrcExist = await fs.pathExists(filePath)
      if (!imageSrcExist) {
        res.status(400).json({ error: `${filename}: image not found` })
        console.log(`image not found in ${filePath}`)
        return
      } else {
        res.render('preview', {
          img: `public/images/${filename}.jpg`
        })
        console.log('image previewed')
        return
      }
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  }
})

export default route
