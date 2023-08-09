import axios from "axios";

export const API_BASE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});
