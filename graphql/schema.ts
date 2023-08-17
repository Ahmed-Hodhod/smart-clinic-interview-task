// graphql/schema.ts

import { builder } from "./builder.js";

export const schema = builder.toSchema()

// export const  typeDefs = `#graphql

// type User {
//   id: Int!
//   name: String!
//   email: String!
//   password: String!
//   role: Role!
// }

// enum Role {
//   ADMIN 
//   DOCTOR
//   ASSISTANT
// }

// type Patient {
//   id: Int!
//   name: String!
//   birthdate: String!
//   medicalInfo: String!
// }

//   type Query {

//     # All users 
//     patients: [Patient!]!
//     patient(id: Int!): Patient
//   }

//   type AuthPayload {
//     token: String
//     user: User
//   }
  
//   type Mutation {
//     signup(email: String!, password: String!, name: String!, role: Role!): AuthPayload
//     login(email: String!, password: String!): AuthPayload
//     addPatient(name: String!, birthdate: String!, medicalInfo: String!): Patient
//     updatePatient(id: Int!, name: String, birthdate: String, medicalInfo: String): Patient
//     deletePatient(id: Int!): Patient
//   }
// `;

