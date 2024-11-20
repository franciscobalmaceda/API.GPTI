import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const falabella = await prisma.organization.upsert({
    where: { name: 'Falabella' },
    update: {},
    create: {
        name: 'Falabella',
    },
  })

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