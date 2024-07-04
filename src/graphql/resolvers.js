import crypto from 'crypto';

import { users } from '../db.js';
import { findUserIndexById } from '../utils/findUserIndexById.js';

export const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (_, { data }) => {
      const newUser = {
        id: crypto.randomUUID(),
        ...data,
      };
      users.push(newUser);
      return newUser;
    },
    deleteUser: (_, { id }) => {
      const indexToDelete = findUserIndexById(id);
      if (indexToDelete === -1) {
        return `User with id ${id} was not found`;
      }
      users.splice(indexToDelete, 1);
      return `User with id ${id} was successfully deleted`;
    },
    editUser: (_, { data }) => {
      const { id, ...rest } = data;
      const indexToEdit = findUserIndexById(id);

      if (indexToEdit === -1) {
        return null;
      }

      users[indexToEdit] = {
        ...users[indexToEdit],
        ...rest,
      };
      return users[indexToEdit];
    },
  },
};
