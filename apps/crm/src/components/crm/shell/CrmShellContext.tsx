'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from 'react';

interface CrmShellContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (value: boolean) => void;
  commandOpen: boolean;
  setCommandOpen: (value: boolean) => void;
  openCommand: () => void;
  closeCommand: () => void;
  isHydrated: boolean;
}

const CrmShellContext = createContext<CrmShellContextType | null>(null);

let sidebarListeners: Array<() => void> = [];

function emitSidebarChange() {
  for (const listener of sidebarListeners) {
    listener();
  }
}

const sidebarStore = {
  subscribe(listener: () => void) {
    sidebarListeners = [...sidebarListeners, listener];
    return () => {
      sidebarListeners = sidebarListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('travelos_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  },
  getServerSnapshot() {
    return false;
  },
  setCollapsed(value: boolean | ((prev: boolean) => boolean)) {
    const current = sidebarStore.getSnapshot();
    const next = typeof value === 'function' ? value(current) : value;
    try {
      localStorage.setItem('travelos_sidebar_collapsed', String(next));
    } catch {
      // ignore
    }
    emitSidebarChange();
  },
};

const emptySubscribe = () => () => {};

export function CrmShellProvider({ children }: { children: React.ReactNode }) {
  // Hydration-safe subscription to external localStorage store
  const sidebarCollapsed = useSyncExternalStore(
    sidebarStore.subscribe,
    sidebarStore.getSnapshot,
    sidebarStore.getServerSnapshot
  );

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const handleSetSidebarCollapsed = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      sidebarStore.setCollapsed(value);
    },
    []
  );

  const toggleSidebar = useCallback(() => {
    sidebarStore.setCollapsed((prev) => !prev);
  }, []);

  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  // Global CMD+K shortcut listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <CrmShellContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed: handleSetSidebarCollapsed,
        toggleSidebar,
        mobileNavOpen,
        setMobileNavOpen,
        commandOpen,
        setCommandOpen,
        openCommand,
        closeCommand,
        isHydrated,
      }}
    >
      {children}
    </CrmShellContext.Provider>
  );
}

export function useCrmShell(): CrmShellContextType {
  const ctx = useContext(CrmShellContext);
  if (!ctx) {
    throw new Error('useCrmShell must be used within a CrmShellProvider');
  }
  return ctx;
}
