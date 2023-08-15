import { PrismaClient } from '@prisma/client'
import {doctors, assistants, patients} from '../data/initial_data.js'

const prisma = new PrismaClient()

 async function main() {
//   await prisma.doctor.create({
//     data: doctors[0]
//   })

//   await prisma.assistant.create({
//     data: assistants[0],
//   })

  // await prisma.patient.create({
  //   data: patients[0],
  // })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })