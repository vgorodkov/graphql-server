import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Query{
        users: [User]!
        user(id:ID!):User!
    }
    
    type Mutation{
        createUser(data: CreateUserInput!):User!
        deleteUser(id: ID!):String!
        editUser(data: EditUserInput!):User!
    }
    
    type User{
        id: ID
        username: String
        surname: String
        age: Int
    }
    
    input CreateUserInput{
        id: ID
        username: String!
        surname: String!
        age: Int!
    }
        
    input EditUserInput{
        id: ID
        username: String
        surname: String
        age: Int
    }

    `);
