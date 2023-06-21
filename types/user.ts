import { Profile, User } from "@prisma/client"

export type AuthUser = Omit<User, "password"> &
  Partial<Omit<Profile, "id" | "user_id">>
