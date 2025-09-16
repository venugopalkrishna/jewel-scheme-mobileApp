// src/services/api.ts

import { ENV } from "./config/Config";

export const CREATE_JEWEL = `${ENV.JEWEL_SERVICE_URL}`;

// Example: axios
// import axios from "axios";
// export const api = axios.create({ baseURL: ENV.JEWEL_SERVICE_URL });
