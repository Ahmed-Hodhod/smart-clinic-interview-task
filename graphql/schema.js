export const typeDefs = `#graphql

type Doctor {
  id: Int!
  name: String!
  email: String!
  patients: [Patient!]!
}

type Assistant {
  id: Int!
  name: String!
  email: String!
  patients: [Patient!]!
}

type Patient {
  id: Int!
  name: String!
  birthdate: String!
  doctor: Doctor
  assistants: [Assistant!]!
}

  type Query {
    doctors: [Doctor!]!
    assistants: [Assistant!]!
    patients: [Patient!]!
    doctor(id: Int!): Doctor
    assistant(id: Int!): Assistant
    patient(id: Int!): Patient

  }

  type AuthPayload {
    token: String
    user: Doctor
  }
  
  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
  

  
`;

