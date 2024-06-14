"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const value = {
    isLoading,
    loadingText,
    setIsLoading,
    setLoadingText,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
