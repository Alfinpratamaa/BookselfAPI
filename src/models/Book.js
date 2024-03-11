import { nanoid } from 'nanoid'

export class Book {
  constructor ({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  }) {
    this.id = nanoid(16)
    this.name = name
    this.year = year
    this.author = author
    this.summary = summary
    this.publisher = publisher
    this.pageCount = pageCount
    this.readPage = readPage
    this.finished = pageCount === readPage
    this.reading = reading
    this.insertedAt = new Date().toISOString()
    this.updatedAt = this.insertedAt
  }
}
