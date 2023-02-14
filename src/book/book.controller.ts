import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Book } from './book.schema'
import { BookService } from './book.service'
import { createBookDto } from './dto/create-book-dto'
import { updateBookDto } from './dto/update-book-dto'

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll()
    }

    @Post()      
    async createBook(
        @Body()
        book: createBookDto
    ): Promise<Book> {
        return this.bookService.create(book)
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.finById(id)
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: updateBookDto
    ): Promise<Book> {
        return this.bookService.updateById(id, book)
    }

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string        
    ): Promise<Book> {
        return this.bookService.deleteById(id)
    }
}
