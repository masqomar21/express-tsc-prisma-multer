
import { CONFIG } from "../config";

export const CONSOLE = {
    log : function (message: string, ...optionalParams: any) {
        CONFIG.appLOg && console.log(message, ...optionalParams)
    },

    error : function (message: string, ...optionalParams: any) {
        CONFIG.appLOg && console.error(message, ...optionalParams)
    },

    warn : function (message: string, ...optionalParams: any) {
        CONFIG.appLOg && console.warn(message, ...optionalParams)
    },

    info : function (message: string, ...optionalParams: any) {
        CONFIG.appLOg && console.info(message, ...optionalParams)
    },

    debug : function (message: string, ...optionalParams: any) {
        CONFIG.appLOg && console.debug(message, ...optionalParams)
    },

    table : function (tabularData: any, properties?: string[]) {
        CONFIG.appLOg && console.table(tabularData, properties)
    }
}