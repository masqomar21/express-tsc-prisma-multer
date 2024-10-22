import { PrismaClient } from "@prisma/client"
import { faker} from "@faker-js/faker";

const prisma = new PrismaClient();

export async function SeedCategoriesAndProducts() {

    await prisma.categories.deleteMany({});
    await prisma.product.deleteMany({});

    console.log('Seed data inserted for products and categories');

    const categoriesData = Array.from({length: 10}, (): {name: string} => ({
        name : faker.commerce.department()
    }))

    const createdCategories = await prisma.categories.createMany({
        data: categoriesData
    });

    const categories = await prisma.categories.findMany();

    for (const category of categories) {
        const products = Array.from({length: 10}, (): {name: string; decs: string; image: string; category_id: number} => ({
            name: faker.commerce.productName(),
            decs: faker.commerce.productDescription(),
            image: faker.image.url(),
            category_id: category.id
        }))

        await prisma.product.createMany({
            data: products
        });
    }

    console.log('Seed data inserted for products and categories');
}
