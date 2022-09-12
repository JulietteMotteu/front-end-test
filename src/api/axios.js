import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
