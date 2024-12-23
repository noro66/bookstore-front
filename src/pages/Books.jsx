import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import { useState } from "react";
import CreateBookForm from "../features/Books/CreateBookForm.jsx";
import Spinner               from "../ui/Spinner.jsx";
import { useBooks }          from "../hooks/useBooks.js";
import { HiCalendar, HiMap } from "react-icons/hi2";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

// Styled components
const Card = styled.div`
    background-color: var(--color-grey-0);
    border-radius: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 28rem;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 12rem;
    object-fit: cover;
`;

const Badge = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-grey-800);
`;

const Content = styled.div`
    padding: 1.5rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-grey-900);
    margin-bottom: 0.75rem;
`;


const Info = styled.div`
    margin-bottom: 1rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;

    svg {
        margin-right: 0.75rem;
    }

    span {
        color: var(--color-grey-700);
    }
`;

function Books() {
    const [showForm, setShowForm] = useState(false);
    const { isPending: isBookPending, Books, error } = useBooks();

    if (isBookPending) return <Spinner />;
    if (error) return <p>Error loading data. Please try again later.</p>;
    if (!Books || Books.length === 0) return <p>No books found. Add one to get started 😊.</p>;

    return (
        <>
            <Row>
                <Heading as="h1">My Books</Heading>
                <Button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Close Form" : "Add New Book"}
                </Button>
            </Row>
            {showForm && (
                <Row>
                    <CreateBookForm />
                </Row>
            )}
            <Row type="horizontal" style={{ flexWrap: "wrap", gap: "1.6rem", cursor: 'pointer' }}>
                {Books.map(({ id, title, description, publicationDate, genre, author }) => (

                    <Card key={id}>
                        <Link to={`/books/${id}`}>
                        <ImageWrapper>
                            <Image
                                src="https://www.coe.int/documents/24916852/0/Supporters3.jpg/63b405d6-be6d-d2ec-bd11-0f03c6ca8130?t=1503560660000" // Static image
                                alt={`Cover of ${title}`}
                            />
                            <Badge>{genre}</Badge>
                        </ImageWrapper>
                        </Link>
                        <Content>
                            <Title>{title}</Title>
                            <Info>
                                <InfoItem>
                                    <HiCalendar />
                                    <span>{new Date(publicationDate).toLocaleDateString()}</span>
                                </InfoItem>
                                <InfoItem>
                                    <BsPersonCircle/>
                                    <span>{author ? `${author.firstName} ${author.lastName}` : "Unknown Author"}</span>
                                </InfoItem>
                            </Info>
                        </Content>
                    </Card>
                ))}
            </Row>
        </>
    );
}

export default Books;
