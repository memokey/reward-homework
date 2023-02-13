import axios from "axios";
import Config from "../config";

export const apiCaller = axios.create({
  baseURL: `${Config.GLOBAL_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  withCredentials: true,
});