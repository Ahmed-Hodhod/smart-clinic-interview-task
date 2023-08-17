"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("@pothos/core"));
const client_1 = require("@prisma/client");
const plugin_prisma_1 = tslib_1.__importDefault(require("@pothos/plugin-prisma"));
const prisma = new client_1.PrismaClient({});
const builder = new core_1.default({
    plugins: [plugin_prisma_1.default],
    prisma: {
        client: prisma,
        filterConnectionTotalCount: true,
        onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
    },
});
