import { Category } from "../book.schema"

export class createBookDto {
    readonly title: string
    readonly description: string
    readonly author: string
    readonly price: number
    readonly category: Category
}