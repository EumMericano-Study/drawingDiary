import axios from "axios";

const url = "http://localhost:8787/";

export const client = axios.create();
client.defaults.baseURL = url;
