import { CreateUserDTO } from "lib/types/User";
import { useMutation, useQueryClient } from "react-query";

const createUser = async (user: CreateUserDTO) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return response.json();
};

export default function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, CreateUserDTO, unknown>(
    (input) => createUser(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
      },
    }
  );
}
