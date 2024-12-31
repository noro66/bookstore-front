import customAxios from "./customAxios.js"; // Import the custom Axios instance

export async function getBooks(keyword = "") {
  try {
    const response = await customAxios.get("books");
    console.log("books : ", response.data.member);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw new Error("Books could not be loaded");
  }
}

export async function createEditBook(newBook, id) {
  try {
    let response;

    if (!id) {
      // Create Book
      response = await customAxios.post("books", newBook);
    } else {
      // Update Book
      response = await customAxios.put(`Books/${id}`, newBook);
    }
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw new Error("Book could not be created/updated");
  }
}

export async function deleteBook(id) {
  try {
    const response = await customAxios.delete(`books/${id}`);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw new Error("Book could not be deleted");
  }
}

export async function addParticipants(BookId, participants) {
  console.log("step2", BookId, participants);

  try {
    const response = await customAxios.put(
        `Books/add-participants/${BookId}`,
        { participants }
    );
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw new Error("Participants could not be added to the Book");
  }
}

export async function getAuthors() {
  try {
    const response = await customAxios.get("authors");
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw new Error("Authors could not be loaded");
  }
}
