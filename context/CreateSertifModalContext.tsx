import React, { useState } from 'react';

interface ICreateCertifiedModalContext {
  isCreateCertifiedModalOpen: boolean
  closeCreateCertifiedModal: () => void
  toggleCreateCertifiedModal: () => void
}

const CreateCertifiedModalContext = React.createContext<ICreateCertifiedModalContext>(
  {
    isCreateCertifiedModalOpen: false,
    closeCreateCertifiedModal: () => { },
    toggleCreateCertifiedModal: () => { },
  }
);

interface ICreateCertifiedModalProvider { children: React.ReactNode }

export const CreateCertifiedModalProvider = ({ children }: ICreateCertifiedModalProvider) => {
  const [isCreateCertifiedModalOpen, setIsCreateCertifiedModalOpen] = useState(false)

  function toggleCreateCertifiedModal() {
    setIsCreateCertifiedModalOpen(!isCreateCertifiedModalOpen)
  }

  function closeCreateCertifiedModal() {
    setIsCreateCertifiedModalOpen(false)
  }

  const context = {
    isCreateCertifiedModalOpen,
    toggleCreateCertifiedModal,
    closeCreateCertifiedModal,
  }

  return <CreateCertifiedModalContext.Provider value={context}>{children}</CreateCertifiedModalContext.Provider>
}

export default CreateCertifiedModalContext
