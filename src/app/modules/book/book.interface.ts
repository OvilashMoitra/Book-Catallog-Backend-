import { Book } from '@prisma/client';
export type IBookFilter = {
    searchTerm: string
} & Book
