import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import { CreateCertifiedModalProvider } from 'context/CreateSertifModalContext'
import SidebarContext, { SidebarProvider } from 'context/SidebarContext'
import WithAuth from 'lib/withAuth'
import { useContext } from 'react'
import Main from './Main'

interface ILayout {
  children: React.ReactNode
}

function Layout({ children }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext)

  return <WithAuth>
    <SidebarProvider>
      <CreateCertifiedModalProvider>
        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
          <Sidebar />
          <div className="flex flex-col flex-1 w-full">
            <Header />
            <Main>
              {children}
            </Main>
          </div>
        </div>
      </CreateCertifiedModalProvider>
    </SidebarProvider>
  </WithAuth>
}

export default Layout