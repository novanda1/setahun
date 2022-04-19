import React, { createContext, useEffect, useState } from "react";

interface MeContext {
  role: string
}
const MeContext = createContext<MeContext>({
  role: ''
})

export const MeProvider: React.FC<{ role?: string }> = ({ children, role: r = '' }) => {
  const [role, setRole] = useState(r)

  return <MeContext.Provider value={{ role }}>{children}</MeContext.Provider>
}

export default MeContext