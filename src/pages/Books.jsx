import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button.jsx";
import { useState } from "react";
import CreateBookForm from "../features/Books/CreateBookForm.jsx";
import Spinner from "../ui/Spinner.jsx";
import { useBooks } from "../hooks/useBooks.js";
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

const SearchInput = styled.input`
    width: 100%;
    max-width: 28rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
        color: var(--color-grey-500);
        font-style: italic;
    }
`;


function Books() {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { isPending: isBookPending, Books, error } = useBooks();

    const filteredBooks = Books?.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (isBookPending) return <Spinner />;
    if (error) return <p>Error loading data. Please try again later.</p>;
    if (!Books || Books.length === 0) return <p>No books found. Add one to get started 😊.</p>;

    return (
        <>
            <Row>
                <Button onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Close Form" : "Add New Book"}
                </Button>
                {showForm && (
                    <Row>
                        <CreateBookForm />
                    </Row>
                )}
            </Row>
                <Row type='horizontal'>
                    <Heading as="h1">My Books</Heading>
                    <SearchInput
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Row>
            <Row type="horizontal" style={{ flexWrap: "wrap", gap: "1.6rem", cursor: "pointer" }}>
                {filteredBooks.map(({ id, title, description, publicationDate, genre, author }) => (
                    <Card key={id}>
                        <Link to={`/books/${id}`}>
                            <ImageWrapper>
                                <Image
                                    src="./glasses-book.jpg" // Static image
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
                                    <BsPersonCircle />
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
