import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const customAxios = axios.create({
									 baseURL: API_URL,
									 headers: { "Content-Type": "application/ld+json", },
									 timeout: 5000});
export default  customAxios
