"use server"

import { cookies } from "next/headers"
import { AUTH_TOKEN_KEY } from "@/defaults/enum"
import { JWT_SECRET_KEY } from "@/defaults/env"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import ValidationError from "@/lib/error"
import prisma from "@/lib/prisma"

interface DataOnToken {
  user: {
    id: string
    full_name?: string
  }
}

const signToken = (data: DataOnToken, expiresIn: number | string) => {
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  })
}

export const loginAction = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  })
  const passwordCorrect = bcrypt.compareSync(password, user?.password ?? "")
  if (!user || !passwordCorrect)
    throw new ValidationError("Incorrect email or password")
  const tokenExpires = new Date(new Date().setDate(new Date().getDate() + 30))
  const token = signToken(
    { user: { id: user.id, full_name: user.profile?.full_name } },
    tokenExpires.getTime() - new Date().getTime()
  )
  cookies().set(AUTH_TOKEN_KEY, token, {
    expires: tokenExpires,
    httpOnly: true,
  })
  return {
    ...user,
    token,
    password: undefined,
  }
}
export const registerAction = async ({
  email,
  password,
  full_name,
  phone,
}: {
  email: string
  password: string
  full_name: string
  phone?: string
}) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (existUser)
    throw new ValidationError(`User with email "${email}" already registered`)
  password = bcrypt.hashSync(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password,
      profile: {
        create: {
          full_name: full_name,
          phone: phone || undefined,
        },
      },
    },
    include: {
      profile: true,
    },
  })

  const tokenExpires = new Date(new Date().setDate(new Date().getDate() + 30))
  const token = signToken(
    { user: { id: user.id, full_name: user.profile?.full_name } },
    tokenExpires.getTime() - new Date().getTime()
  )
  cookies().set(AUTH_TOKEN_KEY, token, {
    expires: tokenExpires,
    httpOnly: true,
  })
  return {
    ...user,
    token,
    password: undefined,
  }
}

export const verifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY) as DataOnToken
    return data
  } catch (error) {
    return null
  }
}

export const destroyAuth = () => {
  cookies().delete(AUTH_TOKEN_KEY)
}
