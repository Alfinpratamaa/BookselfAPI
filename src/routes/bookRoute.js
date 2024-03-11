import express from 'express'
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
} from '../controllers/bookController.js'

const router = express.Router()

router.post('/books', addBook)
router.get('/books', getAllBooks)
router.get('/books/:bookId', getBookById)
router.put('/books/:bookId', updateBookById)
router.delete('/books/:bookId', deleteBookById)

export { router as bookRoutes }
