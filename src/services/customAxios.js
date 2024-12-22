import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Create a custom Axios instance
const customAxios = axios.create({
									   baseURL: API_URL, // Set the base URL
									   headers: {
										   "Content-Type": "application/ld+json", // Set default headers (you can add more as needed)
									   },
									   timeout: 5000, // Optional: Set a timeout for requests
								   });


export default  customAxios
