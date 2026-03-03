import { prisma } from "../../config/prisma.js"

export const authRepository = {
    findUserByEmail: (email) =>
        prisma.user.findUnique({
            where: {
                email
            }
        }),
    
    createUser: (data) => 
        prisma.user.create({
            data
        }),

    createRefreshToken: (data) =>
        prisma.refreshToken.create({
            data
        }),

    findRefreshToken: (token) =>
        prisma.refreshToken.findUnique({
            where: {
                token
            },
            include: {
                user: true
            }
        }),
    
    deleteRefreshToken: (token) =>
        prisma.refreshToken.delete({
            where: {
                token
            }
        }),
};