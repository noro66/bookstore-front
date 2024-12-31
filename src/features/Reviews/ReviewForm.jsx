import { useState }        from "react";
import { useCreateReview } from "./useCreateReview.js";
import { useForm }         from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components"; // Import styled-components

// Styled Components
const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-blue-700);	
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;

  &:disabled {
    background-color: var(--color-grey-500);;
  }

  &:hover {
    background-color: var(--color-green-700); ;
  }
`;

function ReviewForm() {
	const { id } = useParams();
	const { isCreatingReview, createReviewFn } = useCreateReview();
	const { register, handleSubmit, formState: { errors }, reset } = useForm();

	const onSubmit = (data) => {
		const reviewData = {
			...data,
			book: `/api/books/${id}`,
		};

		createReviewFn(reviewData, {
			onSuccess: () => {
				reset();
			},
		});
	};

	return (
		<FormContainer>
			<Title>Add a Review</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					{...register("fullName", { required: "Name is required" })}
					placeholder="Your Name"
				/>
				{errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}

				<Input
					type="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Invalid email address",
						},
					})}
					placeholder="Your Email"
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

				<Textarea
					{...register("comment", { required: "Comment is required" })}
					placeholder="Your Comment"
				/>
				{errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}

				<Button type="submit" disabled={isCreatingReview}>
					{isCreatingReview ? "Submitting..." : "Submit Review"}
				</Button>
			</form>
		</FormContainer>
	);
}

export default ReviewForm;
