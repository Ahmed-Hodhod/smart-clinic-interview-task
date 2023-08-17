import SchemaBuilder from '@pothos/core';
import { PrismaClient } from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';

import type PrismaTypes from '../prisma/pothos-types.js';

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    //exposeDescriptions: boolean | { models: boolean, fields: boolean },
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
});



builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
