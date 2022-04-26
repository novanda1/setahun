import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "./supabase";

const WithAuth: React.FC<any> = ({ children }) => {
  const { replace } = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) replace("/login");
  }, [replace, user]);

  if (!user) return <>Waiting for authentication...</>;

  return <>{children}</>;
};

export default WithAuth;
