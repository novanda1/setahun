import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { CreateCertifiedModalProvider } from "context/CreateSertifModalContext";
import { MeProvider } from "context/MeContext";
import SidebarContext, { SidebarProvider } from "context/SidebarContext";
import WithAuth from "lib/withAuth";
import { useContext } from "react";
import Main from "./Main";

interface ILayout {
  children: React.ReactNode;
  role?: string;
}

function Layout({ children, role }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <SidebarProvider>
      <CreateCertifiedModalProvider>
        <MeProvider role={role}>
          <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
              isSidebarOpen && "overflow-hidden"
            }`}
          >
            <WithAuth>
              <Sidebar />
              <div className="flex flex-col flex-1 w-full">
                <Header />
                <Main>{children}</Main>
              </div>
            </WithAuth>
          </div>
        </MeProvider>
      </CreateCertifiedModalProvider>
    </SidebarProvider>
  );
}

export default Layout;

