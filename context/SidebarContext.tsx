import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

// create context

interface IScrollY {
  id: string | null;
  position: number;
}
interface ISidebarContext {
  isSidebarOpen: boolean;
  scrollY: IScrollY;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  saveScroll: (el: HTMLElement | null) => void;
}

const SidebarContext = React.createContext<ISidebarContext>({
  isSidebarOpen: false,
  scrollY: { id: null, position: 0 },
  closeSidebar: () => {},
  toggleSidebar: () => {},
  saveScroll: (el: HTMLElement | null) => {},
});

interface ISidebarProvider {
  children: React.ReactNode;
}

export const SidebarProvider = ({ children }: ISidebarProvider) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const defaultScrollY = useMemo(() => {
    return { id: null, position: 0 };
  }, []);

  const storageScrollY = useCallback(() => {
    return JSON.parse(
      localStorage.getItem("sidebarScrollY") || JSON.stringify(defaultScrollY)
    );
  }, [defaultScrollY]);

  const [scrollY, setScrollY] = useState<IScrollY>(
    process.browser ? storageScrollY() : defaultScrollY
  );

  function saveScroll(el: HTMLElement | null) {
    const id = el?.id || null;
    const position = el?.scrollTop || 0;
    setScrollY({ id, position });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarScrollY", JSON.stringify(scrollY));
    }
  }, [scrollY]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const { id, position } = storageScrollY();
      document.getElementById(id)?.scrollTo(0, position);

      if (isSidebarOpen) {
        document.getElementById(id)?.scrollTo(0, position);
      }
    }
  }, [scrollY, storageScrollY, isSidebarOpen]);

  const context = {
    isSidebarOpen,
    scrollY,
    toggleSidebar,
    closeSidebar,
    saveScroll,
  };

  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
