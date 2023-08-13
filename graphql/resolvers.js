import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    doctors: () => doctors,
    assistants: () => assistants,
    patients: () => patients,
    doctor: (parent, args) => doctors.find(doctor => doctor.id === args.id),
    assistant: (parent, args) => assistants.find(assistant => assistant.id === args.id),
    patient: (parent, args) => patients.find(patient => patient.id === args.id),
    
  },


  Mutation: {
    signup,
    login,
  },

};


const doctors = [ 
{
  id: 1,
  name: 'Dr. John Doe',
  email: 'exaple@gmail.co'
}
]; 

async function signup(_, args, contextValue, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  console.log(contextValue)

  //const user = await contextValue.prisma.doctor.create({ data: { ...args, password } })
  const user = await prisma.doctor.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET )

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await prisma.doctor.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}



const assistants = [ 
  {
    id: 11,
    name: 'As. fsaho Doe',
    email: 'sfhso@gmail.co'
  }
  ]; 

  const patients = [ 
    {
      id: 15,
      name: 'Pa. John Doe',
      email: 'exaple@gmail.co'
    }
    ]; 

