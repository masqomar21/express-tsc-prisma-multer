import express,  { type Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { CONSOLE } from "./src/utilities";
import { CONFIG } from "./src/config";
import { appRouter } from "./src/routes";
import { middleware } from "./src/middleware";


const app:Express = express()

app.use(cors({origin: true, credentials: true}))
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use( function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    CONSOLE.log(`${req.method} - ${req.url} from ${req.ip} AT ${new Date().toLocaleString()}`)
    next();
})

app.use('/public', express.static('public'))

appRouter(app)

app.all('*', middleware.error.notFound)
app.use(middleware.error.global)

app.listen(CONFIG.port, () => {
    CONSOLE.log('Server is running on port 3000')
})

