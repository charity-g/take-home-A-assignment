import { PrismaClient } from '@prisma/client'

import { getSeedData } from './data'

const client = new PrismaClient()

const deleteAllRecords = async () => {
  // Deletion order is important due to non-null relation constraints.
  await client.query.deleteMany()
  await client.formData.deleteMany()

  console.log('All records deleted')
}

const createAllRecords = async () => {
  // Deletion order is important due to non-null relation constraints.
  const data = await getSeedData()
  await client.formData.createMany({ data: data.formData })
  for (const queryObj of data.queries) {
    await client.query.create({
      data: {
        id: queryObj.id,
        title: queryObj.title,
        description: queryObj.description,
        status: 'OPEN',
        createdAt: new Date(),
        updatedAt: new Date(),
        formData: {
          connect: { id: queryObj.formDataId },
        },
      },
    })
  }

  console.log('All records created')
}

async function seed() {
  console.log('Seeding database...')
  await deleteAllRecords()
  await createAllRecords()
}

seed()
  .then(async () => {
    await client.$disconnect()
    console.log('database disconnected')
    process.exit(0)
  })
  .catch(async e => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
