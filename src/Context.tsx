import { createContext, SetStateAction } from "react";
import { userDataInfo } from "./content/Users";

interface Props {
  userData: userDataInfo[];
  setUserData: React.Dispatch<React.SetStateAction<userDataInfo[]>>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  mail: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  editID: number;
  setEditID: React.Dispatch<React.SetStateAction<number>>;
}

const Appcontext = createContext<Props>({
  userData: [],
  setUserData: () => {},
  pageCount: 1,
  setPageCount: () => {},
  name: "ss",
  setName: () => {},
  mail: "ss",
  setMail: () => {},
  role: "ss",
  setRole: () => {},
  editID: 1,
  setEditID: () => {},
});

export default Appcontext;
