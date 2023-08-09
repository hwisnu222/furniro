import { API_BASE } from "@/config/api";
import { routes } from "@/services/endpoint";

export const getAll = async ({ queryKey }: any) => {
  console.log(queryKey);

  // TODO: set variable params in here
  return await API_BASE.get(routes.PRODUCT);
};

export const getFindOne = async () => {
  return await API_BASE.get(routes.PRODUCT);
};

export const update = async () => {
  return await API_BASE.put(routes.PRODUCT);
};

export const deleteOne = async () => {
  return await API_BASE.delete(routes.PRODUCT);
};
