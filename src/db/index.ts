import { PrismaClient } from "@prisma/client";
import { CONFIG } from "../config";

interface CostumeNodeGlobal extends Global {
    prisma: PrismaClient;
}

declare const global: CostumeNodeGlobal;

const prisma = global.prisma || new PrismaClient();
if(CONFIG.appMode === 'development') global.prisma = prisma;

export default prisma;