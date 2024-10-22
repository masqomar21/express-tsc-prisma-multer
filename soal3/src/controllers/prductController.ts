import { promises } from "dns";
import { Response } from "express";
import { Pagination } from "../utilities/pagination";
import prisma from "../db";
import { CONSOLE, ResponseData } from "../utilities";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { parse } from "path";

export const productController = {
    findAll : async function (req: any, res : Response ): Promise<any>  {
        const page = new Pagination(
            parseInt(req.query.page) || 1,
            parseInt(req.query.limit) || 10
        )

        try {
            const[products, count] = await Promise.all([
                prisma.product.findMany({
                    select: {
                        id: true,
                        name: true,
                        image :true,
                        decs : true,
                        Categories: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    skip: page.offset,
                    take: page.limit
                }),
                prisma.product.count()
            ])
            
            const response = ResponseData.default
            response.data = page.paginate({ count, rows: products })
            return res.status(StatusCodes.OK).json(response)
        } catch (error :any) {
            CONSOLE.log(error)
            const message = `unable to process request ! error: ${error.message}`
            const response = ResponseData.error(message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
        }
    },
    findById : async function (req: any, res : Response ): Promise<any> {
        const id = req.params.id
        try {
            

            const product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    decs: true,
                    category_id: true,
                    Categories: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })

            if(!product){
                const response = ResponseData.error("product not found")
                return res.status(StatusCodes.NOT_FOUND).json(response)
            }

            const response = ResponseData.default
            response.data = product
            return res.status(StatusCodes.OK).json(response)
        } catch (error : any) {
           CONSOLE.log(error)
            const message = `unable to process request ! error: ${error.message}`
            const response = ResponseData.error(message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
        }
    },

    create : async function (req: any, res : Response ): Promise<any> {
        const reqBody = {
            name : req.body.name,
            image : req.file.filename ?? null,
            decs : req.body.decs,
            category_id : parseInt(req.body.category_id)
        }
        const scema = z.object({
            name: z.string(),
            image: z.string().optional(),
            decs: z.string().optional(),
            category_id: z.number() 
        })

        const validateScema = scema.safeParse(reqBody)
        if(!validateScema.success){
            const response = ResponseData.error(validateScema.error.flatten().fieldErrors)
            return res.status(StatusCodes.BAD_REQUEST).json(response)
        }

        try {
            const user = await prisma.product.create({
                data: validateScema.data
            })

            const response = ResponseData.default
            response.data = { message: "product created successfully", user }
            return res.status(StatusCodes.CREATED).json(response)
        } catch (error :any) {
           CONSOLE.log(error)
            const message = `unable to process request ! error: ${error.message}`
            const response = ResponseData.error(message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
        }
    }, 
    update : async function (req: any, res : Response) : Promise<any> {
        const id = req.params.id

        const reqBody = {
            name : req.body.name,
            image : req.file.filename ?? null,
            decs : req.body.decs,
            category_id : parseInt(req.body.category_id)
        }

        try {
            const productExist = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(!productExist){
                const response = ResponseData.error("product not found")
                return res.status(StatusCodes.NOT_FOUND).json(response)
            }

            const scema = z.object({
                name: z.string().optional(),
                image: z.string().optional(),
                decs: z.string().optional(),
                category_id: z.number().optional()
            })

            const validateScema = scema.safeParse(reqBody)
            if(!validateScema.success){
                const response = ResponseData.error(validateScema.error.flatten().fieldErrors)
                return res.status(StatusCodes.BAD_REQUEST).json(response)
            }

            const product = await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    ...(validateScema.data.name && { name: validateScema.data.name }),
                    ...(validateScema.data.image && { image: validateScema.data.image }),
                    ...(validateScema.data.decs && { decs: validateScema.data.decs }),
                    ...(validateScema.data.category_id && { category_id: validateScema.data.category_id })
                }
            })

            const response = ResponseData.default
            response.data = { message: "product updated successfully", product }
            return res.status(StatusCodes.OK).json(response)
        } catch (error : any) {
            CONSOLE.log(error)
            const message = `unable to process request ! error: ${error.message}`
            const response = ResponseData.error(message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
        }
    },
    delete : async function (req: any, res : Response) : Promise<any> {
        const id = req.params.id

        try {
            const productExist = await prisma.product.findUnique({
                where: {
                    id: parseInt(id)
                }
            })

            if(!productExist){
                const response = ResponseData.error("product not found")
                return res.status(StatusCodes.NOT_FOUND).json(response)
            }

            await prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            })

            const response = ResponseData.default
            response.data = { message: "product deleted successfully" }
            return res.status(StatusCodes.OK).json(response)
        } catch (error : any) {
            CONSOLE.log(error)
            const message = `unable to process request ! error: ${error.message}`
            const response = ResponseData.error(message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
        }
    }

}