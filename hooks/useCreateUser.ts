import { CreateUserDTO } from "lib/types/User"
import { QueryClient, useMutation } from "react-query"

const queryClient = new QueryClient()
const createUser = async (user: CreateUserDTO) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  console.log('response', response)

  return response.json()
}

export default function useCreateUser(user: CreateUserDTO) {
  return useMutation<any, unknown, CreateUserDTO, unknown>(() => createUser(user),
    {
      onSuccess: (data: any[]) => {
        queryClient.invalidateQueries('users')
      }
    })
}
