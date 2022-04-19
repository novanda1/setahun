import { CreateUserDTO } from "lib/types/User";
import { useMutation, useQueryClient } from "react-query";

const createUser = async (user: CreateUserDTO) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return response.json();
};

export default function useCreateUser(user: CreateUserDTO) {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, CreateUserDTO, unknown>(
    () => createUser(user),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
      },
    }
  );
}
