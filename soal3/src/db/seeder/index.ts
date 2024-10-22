import { PrismaClient } from "@prisma/client"
import { SeedCategoriesAndProducts } from "./dataseet/Category";

const prisma = new PrismaClient();

async function main() {
    const productAdnCatoagries = await SeedCategoriesAndProducts()
    
    console.log('Seed data inserted successfully');
}

main()
    .then(() =>prisma.$disconnect())
    .catch(e => {
        console.error(e);
        prisma.$disconnect();
    });