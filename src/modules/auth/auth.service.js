import { authRepository } from "./auth.repository.js"
import { AppError } from "../../utils/AppError.js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { config } from "../../config/config.js";
import ms from "ms";

export const registerService = async ({ name, email, password }) => {
    const existing = await authRepository.findUserByEmail(email);

    if (existing) {
        throw new AppError({
            message:"User already exists",
            statusCode: 400,
            code: "USER_ALREADY_EXISTS"
        });
    }

    const hashedPassword = await hashPassword(password);

    const user = await authRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    }
};

export const loginService = async ({ email, password }) => {
    const user = await authRepository.findUserByEmail(email);

    if(!user) {
        throw new AppError({
            message: "User not found",
            statusCode: 404,
            code: "USER_NOT_FOUND"
        });
    }

    await comparePassword(password, user.password);

    const accessToken = generateAccessToken({
        id: user.id,
    });

    const refreshToken = generateRefreshToken({
        id: user.id,
    });

    await authRepository.createRefreshToken({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + ms(config.jwt.refresh.expiresIn))
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
};

export const refreshTokenService = async ({ refreshToken }) => {
    const storedToken = await authRepository.findRefreshToken(refreshToken);

    if (!storedToken) {
        throw new AppError({
            message: "Invalid refresh token",
            statusCode: 401,
            code: "INVALID_REFRESH_TOKEN"
        });
    }

    if (storedToken.expiresAt < new Date()) {
        await authRepository.deleteRefreshToken(refreshToken);
        throw new AppError({
            message: "Refresh token has expired",
            statusCode: 401,
            code: "REFRESH_TOKEN_EXPIRED"
        });
    }

    verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
        id: storedToken.user.id,
    });

    return {
        accessToken: newAccessToken
    };
};

export const logoutService = async ({ refreshToken }) => {
    const storedToken = await authRepository.findRefreshToken(refreshToken);
    if (!storedToken) {
        throw new AppError({
            message: "Invalid refresh token",
            statusCode: 401,
            code: "INVALID_REFRESH_TOKEN"
        })
    }

    await authRepository.deleteRefreshToken(refreshToken);

    return {
        message: "Logged out successfully"
    };
}