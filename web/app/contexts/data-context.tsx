"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface IDataContext {
  data: any;
  setData: Dispatch<SetStateAction<any[]>>;
}

interface IChildren {
  children: React.ReactNode;
}

const DataContext = createContext<IDataContext>({} as IDataContext);

export const DataProvider = ({ children }: IChildren) => {
  const [data, setData] = useState<any[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within its corresponding Provider");
  }
  return context;
};
