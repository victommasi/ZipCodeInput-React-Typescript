import axios from "axios";

const api = axios.create({
  headers: {
    common: {
      "Content-Type": "application/json"
    }
  }
});
export default api;
