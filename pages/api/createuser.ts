import { ApiError, createClient, User } from "@supabase/supabase-js";
import { CreateUserDTO } from "lib/types/User";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_ROLE_KEY as string
);
type Data = {
  data: User | null;
  error: ApiError | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dynamicInput = (index: number) => {
    const input: Omit<CreateUserDTO, "passwordConfirm"> = {
      email: `demouser${index}@gmail.com`,
      password: "password",
      user_metadata: {
        fullname: `Demo User ${index}`,
        nip: 101823183 + index,
        unit: "Demo Unit",
      },
    };

    return input;
  };

  for (let i = 0; i < 10; i++) {
    const { data, error } = await supabase.auth.api.createUser({
      ...dynamicInput(i),
      email_confirm: true,
    });
  }
  res.status(200).json({ ok: "ok" });
}
