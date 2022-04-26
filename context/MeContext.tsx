import React, { createContext, useState } from "react";

interface MeContext {
  role: string;
}
const MeContext = createContext<MeContext>({
  role: "",
});

export const MeProvider: React.FC<{ role?: string }> = ({
  children,
  role: r = "",
}) => {
  const [role] = useState(r);

  return <MeContext.Provider value={{ role }}>{children}</MeContext.Provider>;
};

export default MeContext;
