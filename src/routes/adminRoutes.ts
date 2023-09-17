// src/routes/adminRoutes.ts

import express, { Request, Response } from 'express'
import { getFiles, performCleanup } from '../controllers/adminController'

const adminRoutes = express.Router()

adminRoutes.get('/', (req: Request, res: Response) => {
  res.send('Admin index endpoint')
})

adminRoutes.get('/all', getFiles)

adminRoutes.get('/cleanup', performCleanup)

export default adminRoutes
