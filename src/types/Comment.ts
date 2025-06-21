import Book from './Book'
import User from './User'

type Comment = {
    _id: string,
    book: Book,
    user:User,
    content:string,
    createdAt:string,
    updatedAt:string
}

export default Comment