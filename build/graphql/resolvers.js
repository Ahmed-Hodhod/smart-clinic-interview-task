"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
exports.resolvers = {
    Query: {
        patient: getPatient,
        patients: getPatients,
    },
    Mutation: {
        signup,
        login,
        addPatient,
        updatePatient,
        deletePatient
    },
};
async function signup(_, args, context, info) {
    const password = await bcryptjs_1.default.hash(args.password, 10);
    const user = await context.prisma.user.create({ data: { ...args, password } });
    return {
        user,
    };
}
async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } });
    if (!user) {
        throw new Error('No such user found');
    }
    const valid = await bcryptjs_1.default.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.APP_SECRET);
    return {
        token,
        user,
    };
}
async function getPatients(parent, args, context) {
    if (context.user.role == 'ASSISTANT' || context.user.role == 'DOCTOR') {
        return await context.prisma.patient.findMany();
    }
}
async function getPatient(parent, args, context) {
    console.log(context.user);
    if (context.user.role == 'ASSISTANT' || context.user.role == 'DOCTOR') {
        return await context.prisma.patient.findUnique({ where: { id: args.patientId } });
    }
}
async function addPatient(parent, args, context, info) {
    const { userId } = context;
    if (!userId) {
        throw new Error('You are not Authenticated');
    }
    const { role } = await context.prisma.user.findUnique({ where: { id: userId } });
    if (role == 'DOCTOR') {
        return await context.prisma.patient.create({ data: { ...args } });
    }
    else {
        throw new Error('You don\'t have permission to add a patient');
    }
}
async function updatePatient(parent, args, context, info) {
    const { userId } = context;
    if (!userId) {
        throw new Error('You are not Authenticated');
    }
    const { role } = await context.prisma.user.findUnique({ where: { id: userId } });
    if (role == 'DOCTOR' || role == 'ASSISTANT') {
        return await context.prisma.patient.update({ where: { id: args.id }, data: { ...args } });
    }
    else {
        throw new Error('You don\'t have permission to update a patient');
    }
}
async function deletePatient(parent, args, context, info) {
    const { userId } = context;
    if (!userId) {
        throw new Error('You are not Authenticated');
    }
    const { role } = await context.prisma.user.findUnique({ where: { id: userId } });
    if (role == 'DOCTOR') {
        return await context.prisma.patient.delete({ where: { id: args.id } });
    }
    else {
        throw new Error('You don\'t have permission to delete a patient');
    }
}
