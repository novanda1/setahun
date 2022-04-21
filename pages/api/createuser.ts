import {
  ApiError,
  createClient,
  User,
} from "@supabase/supabase-js";
import { CreateUserDTO } from "lib/types/User";
import {
  NextApiRequest,
  NextApiResponse,
} from "next";

const supabase = createClient(
  "https://benjcxrorlscnklwljhp.supabase.co",
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
    const input: Omit<
      CreateUserDTO,
      "passwordConfirm"
    > = {
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

  if (process.env.NODE_ENV === "development")
    for (let i = 0; i < 10; i++) {
      const { data, error } =
        await supabase.auth.api.createUser({
          ...dynamicInput(i),
          email_confirm: true,
        });

      console.log(
        "data,error",
        data,
        error,
        dynamicInput(i)
      );
    }
  res
    .status(200)
    .json({ ok: process.env.NODE_ENV });
}
