import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { supabase } from "./supabase";

const WithAuth: React.FC<any> = ({ children }) => {
  const { replace } = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) replace("/login");
  }, [replace, user]);

  return <>{children}</>;
};

export default WithAuth;
