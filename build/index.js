"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_js_1 = require("./graphql/schema.js");
const resolvers_js_1 = require("./graphql/resolvers.js");
const client_1 = require("@prisma/client");
const utils_js_1 = __importDefault(require("./utils.js"));
const prisma = new client_1.PrismaClient();
const server = new server_1.ApolloServer({
    typeDefs: schema_js_1.typeDefs,
    resolvers: resolvers_js_1.resolvers,
    introspection: true,
});
const { url } = await (0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 5000 },
    context: async ({ req, res }) => {
        const token = req.headers.authorization || null;
        const userId = await (0, utils_js_1.default)(token);
        console.log("userId", userId);
        return {
            userId,
            prisma
        };
    },
});
console.log(`🚀  Server ready at: ${url}`);
