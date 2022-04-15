import { CreateUserDTO } from "lib/types/User"
import { useMutation } from "react-query"

const createUser = async (user: CreateUserDTO) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    throw new Error('Error create users')
  }

  return response.json()
}

export default function useCreateUser(user: CreateUserDTO) {
  return useMutation(() => createUser(user))
}
