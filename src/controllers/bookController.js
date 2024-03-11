// controllers/bookController.js
import { Book } from "../models/Book.js";

const books = [];

const addBook = (req, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const newBook = new Book({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    });

    books.push(newBook);

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: newBook.id,
        },
      })
      .code(201);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

const getAllBooks = (req, h) => {
  try {
    const bookList = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));

    return h
      .response({
        status: "success",
        data: {
          books: bookList,
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

const getBookById = (req, h) => {
  try {
    const { bookId } = req.params;

    const foundBook = books.find((book) => book.id === bookId);

    if (!foundBook) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        data: {
          book: foundBook,
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

const updateBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    const foundBookIndex = books.findIndex((book) => book.id === bookId);

    if (foundBookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const updatedBook = {
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      insertedAt: books[foundBookIndex].insertedAt,
      updatedAt: new Date().toISOString(),
    };

    books[foundBookIndex] = updatedBook;

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

const deleteBookById = (req, h) => {
  try {
    const { bookId } = req.params;

    const foundBookIndex = books.findIndex((book) => book.id === bookId);

    if (foundBookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    books.splice(foundBookIndex, 1);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

export { addBook, getAllBooks, getBookById, updateBookById, deleteBookById };
