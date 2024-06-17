"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface ContextType {
  isLoading: boolean;
  loadingText: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingText: Dispatch<SetStateAction<string>>;
}
export const GlobalContext = createContext<ContextType>({
  isLoading: false,
  loadingText: "",
  setIsLoading: () => false,
  setLoadingText: () => "",
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const value = {
    isLoading,
    loadingText,
    setIsLoading,
    setLoadingText,
  };

  const reset = () => {
    setIsLoading(false);
    setLoadingText("");
  };

  useEffect(() => {
    reset();
  }, [pathname, searchParams]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
