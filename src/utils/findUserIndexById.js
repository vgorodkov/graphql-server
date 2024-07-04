import { users } from '../db.js';

export const findUserIndexById = (id) =>
  users.findIndex((user) => user.id === id);
