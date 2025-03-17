// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = BookType[]
type BookType = {
    id: number,
    name: string
}
const booksDB = [
    {id: 1, name: 'Book 1'},
    {id: 2, name: 'Book 2'},
    {id: 3, name: 'Book 3'},
    {id: 4, name: 'name 1'},
    {id: 5, name: 'Name 1'},
]



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(req.method === 'GET') {
        let books = booksDB
        const name = req.query.name as string
        if (name) {
            books = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
        }
        res.status(200).json(books) 
    }

}
