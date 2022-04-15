import { useQuery } from 'react-query'

const serialize = (obj: any) => {
  if (obj) {
    const str: string[] = [];
    Object.keys(obj).forEach(p => !p && delete obj[p])
    Object.keys(obj).forEach(p => str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])))
    return str.join("&");
  }

  return ''
}

const getUsers = async (query: string) => {
  const response = await fetch(`/api/users?${query}`)

  if (!response.ok) {
    throw new Error('Error fetch users')
  }

  return response.json()
}

const useUsers = (filter?: { query?: string, page?: number, perPage?: number }) => {
  const query = serialize(filter)
  return useQuery(['users', filter], () => getUsers(query), {
    keepPreviousData: true
  })
}

export default useUsers