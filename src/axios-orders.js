import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-project-87a37.firebaseio.com"
});

export default instance;
