import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "./supabase";

// Gets the display name of a JSX component for dev tools
function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Unknown';
}

const WithAuth: React.FC<any> = ({ children }) => {
  const { replace } = useRouter()
  const user = supabase.auth.user()

  useEffect(() => {
    if (!user) replace("/login")
  }, [replace, user])

  if (!user) return <>Wait for auth...</>

  return <>{children}</>;
}

export default WithAuth