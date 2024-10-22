import { Request, Response, NextFunction } from "express";
import { CONSOLE, ResponseData } from "../utilities";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (err: any, req: Request, res:Response, next: NextFunction) => {
    console.error(err.stack);

    if(err.headersSent) {
        return next(err);
    }


    const response = ResponseData.error(err.message || 'Something went wrong');

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}

export const notFoundMiddleware = (req: Request, res: Response) => {
    const response = ResponseData.error('Resource not found');

    return res.status(StatusCodes.NOT_FOUND).json(response);
}

