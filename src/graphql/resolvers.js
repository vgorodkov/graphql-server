import crypto from 'crypto';
import { users } from '../db.js';
import { findUserIndexById } from '../utils/findUserIndexById.js';

export const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      const user = users.find((user) => user.id === id);

      if (!user) {
        throw new Error(`Cannot find the user`);
      }
      return user;
    },
  },
  Mutation: {
    createUser: (_, { data }) => {
      try {
        const newUser = {
          id: crypto.randomUUID(),
          ...data,
        };
        users.push(newUser);
        return newUser;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    deleteUser: (_, { id }) => {
      const indexToDelete = findUserIndexById(id);
      if (indexToDelete === -1) {
        throw new Error(`User with id ${id} was not found`);
      }
      users.splice(indexToDelete, 1);
      return `User with id ${id} was successfully deleted`;
    },
    editUser: (_, { data }) => {
      const { id, ...rest } = data;
      const indexToEdit = findUserIndexById(id);

      if (indexToEdit === -1) {
        throw new Error(`User with id ${id} was not found`);
      }

      users[indexToEdit] = {
        ...users[indexToEdit],
        ...rest,
      };
      return users[indexToEdit];
    },
  },
};
