// import { PrismaClient } from "@prisma/client"
// // import bcrypt from "bcrypt"

// const prisma = new PrismaClient();

// export async function seedUser() {

//     await prisma.user.deleteMany({});

//     console.log('Seed data inserted user');

//     return await prisma.user.createMany({
//         data: [{
//             email: 'test@test.com',
//             name: 'Test User',
//             password:'password',
//         },
//         {
//             email: 'admin.test@test.com',
//             name: 'Admin User',
//             password:'password',
//             role: 'admin'
//         }]
//     });
// }
