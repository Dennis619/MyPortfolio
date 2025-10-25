import React from "react";
import axios from "axios";
import getServerName from "./ServerName";

const api = axios.create({
  baseURL: `${getServerName()}`,
});

export default api;
