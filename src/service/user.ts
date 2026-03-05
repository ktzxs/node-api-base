import { error } from 'console';
import { prisma } from '../libs/prisma';
import { Prisma } from '@prisma/client';

type CreateUserProps = {
    name: string;
    email: string;
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        const user = await prisma.user.create({ data })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error('Email already exists');
                return false;
            }
        }
        console.error('Error creating user:', error);
        return false;
    }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    const result = await prisma.user.createMany({
        data: [
            {name: 'João', email: 'joao@exemple.com'},
            {name: 'Ana', email: 'ana@exemple'},
            {name: 'Lucap', email: 'lucap@exemple'}
        ]
    });
}

export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                status: true
            }
        });
    } catch (err) {
        console.error('Error fetching users:', error);
        return false;
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
           where: { email },
           select: {
            id: true,
            name: true,
            status: true
           }
        })
    } catch (err) {
        console.error('Erro fetching user by email:', err);
        return false;
    }
}