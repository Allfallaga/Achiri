import axios from "axios";
console.log(process.env.REACT_APP_AXIOS_DOMAIN);
export default axios.create({
  baseURL: process.env.REACT_APP_AXIOS_DOMAIN,
});
