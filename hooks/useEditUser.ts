import { UpdateUserDTO } from "lib/types/User";
import { useMutation, useQueryClient } from "react-query";

const editUser = async (user: UpdateUserDTO) => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  return response.json();
};

export default function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, UpdateUserDTO, unknown>(
    (input) => editUser(input),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("users");
      },
    }
  );
}
