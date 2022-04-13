export type UserMetaData = {
  fullname: string
  nip: number
  unit: string
  username?: string
}

export type CreateUserDTO = {
  email: string,
  password: string,
  user_metadata: UserMetaData
}
