import { createContext } from "react";
import { userDataInfo } from "./content/Users";

interface Props {
  userData: userDataInfo[];
  setUserData: React.Dispatch<React.SetStateAction<userDataInfo[]>>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
}

const Appcontext = createContext<Props>({
  userData: [],
  setUserData: () => {},
  pageCount: 1,
  setPageCount: () => {},
});

export default Appcontext;
