import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Book } from './book.schema'

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll() {
        const books = await this.bookModel.find()
        return books
    }

    async create(book: Book): Promise<Book> {
        const res = await this.bookModel.create(book)
        return res
    }

    async finById(id: string): Promise<Book> {
        try {            
            const book = await this.bookModel.findById(id)
            if (book) return book
        } catch (error) {
            throw new NotFoundException('Book not found!')
        }       
    }

    async updateById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
    }

    async deleteById(id: string): Promise<Book> {
        try {            
            return await this.bookModel.findByIdAndDelete(id)
        } catch (error) {
            throw new NotFoundException('Book not found!')
        }
    }
}
