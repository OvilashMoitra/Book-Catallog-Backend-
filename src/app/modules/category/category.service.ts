import { Category } from "@prisma/client";
import { prisma } from "../../../app";

const createCategory = async (payload: Category) => {
    const category = await prisma.category.create({
        data: payload
    })
    return category
}

const deleteCategory = async (payload: string) => {
    const deletedCategory = await prisma.category.delete({
        where: {
            id: payload
        }
    })
    return deletedCategory
}

const getSingleCategory = async (payload: string) => {
    const getCategory = await prisma.category.findUnique({
        where: {
            id: payload
        }
    })
    return getCategory
}

const getAllCategory = async () => {
    const getAllCategory = await prisma.category.findMany()
    return getAllCategory
}

const updateCategory = async (payload: Category, id: string) => {
    const getAllCategory = await prisma.category.update({
        where: {
            id
        },
        data: payload
    })
    return getAllCategory
}

export const CategoryService = {
    getAllCategory,
    deleteCategory,
    updateCategory,
    getSingleCategory,
    createCategory
}


