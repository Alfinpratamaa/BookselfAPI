import { Book } from '../models/Book.js'

const books = []

const addBook = (req, res) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = req.body

    if (!name) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
    }

    const newBook = new Book({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    })

    books.push(newBook)

    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const getAllBooks = (req, res) => {
  try {
    const bookList = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher
    }))

    return res.status(200).json({
      status: 'success',
      data: {
        books: bookList
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const getBookById = (req, res) => {
  try {
    const { bookId } = req.params

    const foundBook = books.find((book) => book.id === bookId)

    if (!foundBook) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      })
    }

    return res.status(200).json({
      status: 'success',
      data: {
        book: foundBook
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const updateBookById = (req, res) => {
  try {
    const { bookId } = req.params
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    } = req.body

    const foundBookIndex = books.findIndex((book) => book.id === bookId)

    if (foundBookIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      })
    }

    if (!name) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })
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
      updatedAt: new Date().toISOString()
    }

    books[foundBookIndex] = updatedBook

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const deleteBookById = (req, res) => {
  try {
    const { bookId } = req.params

    const foundBookIndex = books.findIndex((book) => book.id === bookId)

    if (foundBookIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      })
    }

    books.splice(foundBookIndex, 1)

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

export { addBook, getAllBooks, getBookById, updateBookById, deleteBookById }
