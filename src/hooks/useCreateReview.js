import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../services/apiReviews.js";
import toast from "react-hot-toast";

export function useCreateReview() {
	const queryClient = useQueryClient();

	const { mutate: createReviewFn, isPending: isCreatingReview } = useMutation({ mutationFn: createReview, onSuccess: () => {
		toast.success("Review successfully created!");
		queryClient.invalidateQueries({ queryKey: ["Books"], });}, onError: (err) => {
		toast.error(err.message);}, });

	return { isCreatingReview, createReviewFn };
}