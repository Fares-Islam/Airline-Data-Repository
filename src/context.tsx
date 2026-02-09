import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

interface ContextData {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

export const Context = createContext<ContextData | null>(null);

export const UseContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("UseContext must be within a ContextProvider");
  return context;
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState("One way");

  return (
    <Context value={{ selectedOption, setSelectedOption }}>
      {children} 
    </Context>
  );
};