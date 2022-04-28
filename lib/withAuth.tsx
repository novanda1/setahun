import React from "react";

const WithAuth: React.FC<any> = ({ children }) => {
  // const { replace } = useRouter();
  // const user = supabase.auth.user();

  // useEffect(() => {
  //   if (!user) replace("/login");
  // }, [replace, user]);

  return <>{children}</>;
};

export default WithAuth;
