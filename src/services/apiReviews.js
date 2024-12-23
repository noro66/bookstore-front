import CustomAxios from "./customAxios.js";


export const createReview = async (reviewData) => {
	try {
		const response = await CustomAxios.post("/reviews", reviewData);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.message || "An error occurred");
		} else {
			throw new Error("Network error");
		}
	}
};
