import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const resolvers = {
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
// Once your are signed up, you can login with your email and password.
async function signup(_, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
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
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return {
        token,
        user,
    };
}
async function getPatients(parent, args, context) {
    if (context.user.role == 'ASSISTANT' || context.user.role == 'DOCTOR') {
        //console.log()
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
        //console.log()
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
        //console.log()
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
        //console.log()
        return await context.prisma.patient.delete({ where: { id: args.id } });
    }
    else {
        throw new Error('You don\'t have permission to delete a patient');
    }
}
//# sourceMappingURL=resolvers.js.map