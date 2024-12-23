import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBooks } from "../hooks/useBooks.js";
import Spinner from "../ui/Spinner";
import { HiCalendar, HiUser, HiBookOpen } from "react-icons/hi2";
import styled from "styled-components";
import ReviewForm from '../features/Reviews/ReviewForm.jsx'; // Import the ReviewForm component

// Styled Components
const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const BookTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-grey-900);
    margin-bottom: 1rem;
`;

const Author = styled.h2`
    font-size: 1.75rem;
    color: var(--color-grey-700);
    margin-bottom: 0.5rem;
`;

const Info = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--color-grey-600);

    svg {
        margin-right: 0.5rem;
    }

    span {
        color: var(--color-grey-800);
    }
`;

const Description = styled.p`
    font-size: 1.125rem;
    color: var(--color-grey-700);
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const ReviewSection = styled.div`
    margin-top: 2rem;
`;

const ReviewTitle = styled.h3`
    font-size: 1.5rem;
    color: var(--color-grey-900);
    margin-bottom: 1rem;
`;

const ReviewList = styled.ul`
    list-style-type: none;
    padding: 0;

    li {
        background-color: var(--color-grey-100);
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
    }
`;

const ReviewItem = styled.li`
    font-size: 1rem;
    color: var(--color-grey-700);

    strong {
        font-weight: 600;
        color: var(--color-grey-900);
    }
`;

const BookImage = styled.img`
    width: 100%;
    max-width: 300px;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    object-fit: cover;
`;

function BookDetails() {
	const { id } = useParams();
	const { Books, isPending } = useBooks();
	const [bookDetails, setBookDetails] = useState(null);

	useEffect(() => {
		if (!isPending && Books?.length > 0) {
			const book = Books.find((book) => parseInt(book.id) === parseInt(id));
			setBookDetails(book);
		}
	}, [id, Books]);

	if (isPending) return <Spinner />;
	if (!bookDetails) return <p>Book not found.</p>;

	return (
		<Container>
			<BookImage src="https://via.placeholder.com/300x450" alt="Book Cover" />
			<BookTitle>Title: {bookDetails.title}</BookTitle>
			<div>
				<Author>
					<HiUser size={20} />
					{bookDetails.author.firstName} {bookDetails.author.lastName}
				</Author>
				<Info>
					<InfoItem>
						<HiBookOpen size={20} />
						<span>{bookDetails.genre}</span>
					</InfoItem>
					<InfoItem>
						<HiCalendar size={20} />
						<span>{new Date(bookDetails.publicationDate).toLocaleDateString()}</span>
					</InfoItem>
				</Info>
				<Description>
					<strong>Description: </strong> {bookDetails.description}
				</Description>
			</div>

			<ReviewSection>
				<ReviewTitle>Reviews:</ReviewTitle>
				{bookDetails.reviews.length === 0 ? (
					<p>No reviews yet.</p>
				) : (
					 <ReviewList>
						 {bookDetails.reviews.map((review, index) => (
							 <ReviewItem key={index}>
								 <strong>{review.fullName}</strong>: {review.comment}
							 </ReviewItem>
						 ))}
					 </ReviewList>
				 )}

				{/* Use the ReviewForm component */}
				<ReviewForm />
			</ReviewSection>
		</Container>
	);
}

export default BookDetails;
