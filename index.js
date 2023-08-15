import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

//simport  fs from 'fs';
//import * as path from 'path';

import { PrismaClient } from '@prisma/client'
import getUserId from './utils.js';

const prisma = new PrismaClient()

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
 introspection: true,

});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    
    
    if (req.body.operationName === 'IntrospectionQuery') {
      // console.log('blocking introspection query..');
      return {};
    }

    if (
      req.body.operationName === 'Singup' ||
      req.body.operationName === 'Login'
    ) {
      return {prisma};
    }
  
   // Get the user token from the headers.
    const token = req.headers.authorization || '';

    //Try to retrieve a user with the token
    const userId = await getUserId(token);

    if (!userId) {
      throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
    }
    console.log("userId", userId);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    return {
      user, 
      prisma
    }
  },

});

console.log(`🚀  Server ready at: ${url}`);