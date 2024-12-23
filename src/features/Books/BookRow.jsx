import styled from "styled-components";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateBookForm from "./CreateBookForm.jsx";
import { HiUpload, HiUserAdd } from "react-icons/hi";
import ButtonIcon        from "../../ui/ButtonIcon.jsx";
import { useDeleteBook } from "../../hooks/useDeleteBook.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 1.2fr 1.5fr 1.5fr 1fr 1fr;
  column-gap: 1.6rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: 4px;
`;

const BookTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-family: "Roboto";
`;

const Status = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-blue-700);
`;

export default function BookRow({ book }) {
  const [showForm, setShowForm] = useState(false);

  const { isDeleting, deleteBook } = useDeleteBook();
  const {
    id,
    title,
    genre,
    author,
    reviews,
    publicationDate,
    image,
  } = book;

  // Handle image fallback
  const BookImage = image || "placeholder-image-url.jpg";

  return (
      <>
        <TableRow role="row">
          <BookTitle>{title}</BookTitle>
          <div>{author?.firstName} {author?.lastName}</div>
          <div>{genre}</div>
          <div>{new Date(publicationDate).toLocaleDateString()}</div>
          <Description>{reviews?.length || 0} Reviews</Description>
          <Img src={BookImage} alt={title} />
          <div>
            <ButtonIcon onClick={() => setShowForm((prev) => !prev)}>
              <HiPencil />
            </ButtonIcon>
            <ButtonIcon disabled={isDeleting} onClick={() => deleteBook(id)}>
              <HiTrash />
            </ButtonIcon>
          </div>
        </TableRow>

        {showForm && <CreateBookForm bookToEdit={book} />}
      </>
  );
}
