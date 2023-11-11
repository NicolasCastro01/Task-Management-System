import { PrismaClient } from '@prisma/client'
import { SeederStatus } from './seedStatus'
const prisma = new PrismaClient()
const seedStatus = new SeederStatus(prisma);

async function main() {
  await seedStatus.run();
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })