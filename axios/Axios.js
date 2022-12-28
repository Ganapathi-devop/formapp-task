const { default: axios } = require("axios");

const url = "https://18c4-2405-201-e020-f143-4113-ce56-7c09-1881.in.ngrok.io";

const axiosBaseUrl = axios.create({
  baseURL: url,
});

export default axiosBaseUrl