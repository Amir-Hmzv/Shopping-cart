import instance from "./axios";
import * as endpoints from "./endpoints";

export const getUsers = () => instance.get(``);

export const getUser = (id: string) =>
  instance.get(id);

export const createUser = (data: any) =>
  instance.post(endpoints.CREATE_USER, data);

export const updateUser = (id: string, data: any) =>
  instance.put(endpoints.UPDATE_USER.replace(":id", id), data);

export const deleteUser = (id: string) =>
  instance.delete(endpoints.DELETE_USER.replace(":id", id));
