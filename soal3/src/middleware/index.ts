import { error } from "console";

import { errorMiddleware, notFoundMiddleware } from "./globalErrMiddleware";
import { fileUploadMiddleware } from "./fileUploadMiddleware";

export const middleware = {
    file: {
        upload : fileUploadMiddleware.fileUploadHandler
    },
    error: {
        global: errorMiddleware,
        notFound: notFoundMiddleware
    }
}