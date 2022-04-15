import React, { createContext, useEffect, useState } from "react";

interface MeContext {
  role: string
}
const MeContext = createContext<MeContext>({
  role: ''
})

export const MeProvider: React.FC = ({ children }) => {
  const [role, setRole] = useState('')

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(r => {
        setRole(r?.role?.data?.role)
      })
  }, [])

  return <MeContext.Provider value={{ role }}>{children}</MeContext.Provider>
}

export default MeContext