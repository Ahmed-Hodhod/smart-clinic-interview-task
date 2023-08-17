import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//import {schema} from './graphql/schema';

//simport  fs from 'fs';
//import * as path from 'path';


//import {typeDefs} from "./graphql/schema.js";
//import  {resolvers} from './graphql/resolvers.js';
import {schema} from './graphql/schema.js';


import { PrismaClient } from '@prisma/client'
import getUserId from './utils.js';

const prisma = new PrismaClient()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  // typeDefs, 
  // resolvers,
 introspection: true,

});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
  context: async ({ req, res }) => {
  
  //  // Get the user token from the headers.
   const token = req.headers.authorization || null;

  //   //Try to retrieve a user with the token
   const userId = await getUserId(token);

  // if (!userId) {
  //   new Error('User is not Authenticated');
  //  }
  console.log("userId", userId);
   //const user = await prisma.user.findUnique({ where: { id: userId } });

    return {
      userId, 
      prisma
    }
  },

});

console.log(`🚀  Server ready at: ${url}`);

