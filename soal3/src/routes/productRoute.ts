import express, { Router } from "express";
import { productController } from "../controllers/prductController";
import { middleware } from "../middleware";

export const productRouter = () : Router => {
    const router = express.Router()

    router.get('/', productController.findAll)
    router.get('/:id', productController.findById)
    router.post('/', middleware.file.upload('image', 10 * 1024 * 1024 ).single('image'), productController.create)
    router.put('/:id', middleware.file.upload('image', 10 * 1024 * 1024 ).single('image'), productController.update)
    router.delete('/:id', productController.delete) 

    return router
} 