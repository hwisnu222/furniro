import { format } from "date-fns";
const defaultDate = new Date();

export const formatDate = (date: string = defaultDate.toString()) => {
  return format(new Date(date), "PPP pp");
};
