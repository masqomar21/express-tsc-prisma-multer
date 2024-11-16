import {  type Express, type Request, type Response, NextFunction } from 'express';
import { ResponseData } from '../utilities';
import { StatusCodes } from 'http-status-codes';
import { CONFIG } from '../config';
import { productRouter } from './productRoute';

export const appRouter = async function (app:Express) :Promise<void> {

    app.get('/', (req: Request, res: Response) => {
        const data = {
            message: `Welcome to ${CONFIG.appName} for more function use /api/v1 as main router`
          }
          const response = ResponseData.default
          response.data = data
          return res.status(StatusCodes.OK).json(response)
    })


    app.get('/api/v1', (req: Request, res: Response) => {
        const data = {
            message: `Welcome to ${CONFIG.appName} API v1`
          }
          const response = ResponseData.default
          response.data = data
          return res.status(StatusCodes.OK).json(response)
    })

    app.use(
        '/api/v1/product', 
        productRouter()
    )
}