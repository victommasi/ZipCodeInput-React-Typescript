import axios from "axios";

export const fetchZipCodes = (): Promise<any> => {
  return axios.get(
    "https://run.mocky.io/v3/a17382da-9c6c-42a3-bfe6-1c66b9b4687b"
  );
};
