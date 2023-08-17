/* eslint-disable */
import type { Prisma, User, Patient } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: never;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Patient: {
        Name: "Patient";
        Shape: Patient;
        Include: never;
        Select: Prisma.PatientSelect;
        OrderBy: Prisma.PatientOrderByWithRelationInput;
        WhereUnique: Prisma.PatientWhereUniqueInput;
        Where: Prisma.PatientWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}