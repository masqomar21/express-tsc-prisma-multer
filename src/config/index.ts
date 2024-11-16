import dotenv from 'dotenv';
import { send } from 'process';

dotenv.config();


export const CONFIG = {
    appName : process.env.APP_NAME || 'app',
    appVersion: process.env.APP_VERSION || '1.0.0',
    port: process.env.PORT || 3000,
    appMode: process.env.APP_MODE || 'development',
    appLOg: (Boolean(process.env.APP_LOG)) || true,
    maxFileSize: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, //10MB
    
}