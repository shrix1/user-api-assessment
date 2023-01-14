import React, { FC, useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import Appcontext from "../Context";
import Adduser from "./Adduser";
import { CSVLink } from "react-csv";
import { FiDownloadCloud, FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDownArrowAlt } from "react-icons/bi";
import { BsDot } from "react-icons/bs";

export interface userDataInfo {
  name: string;
  email: string;
  id: number;
  role: string;
}

const Users: FC = () => {
  const [userData, setUserData] = useState<userDataInfo[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [editID, setEditID] = useState<number>(0);

  const fetchData = async () => {
    const fetching = await fetch("https://jsonplaceholder.typicode.com/users");
    const res = await fetching.json();
    setUserData(res);
    console.log(res);
  };

  const deleteUser = (ids: number) => {
    setUserData(userData.filter((data) => data.id !== ids));
  };

  const editUser = (ids: number) => {
    const editUser = userData.find((data) => data.id === ids);
    if (editUser) {
      setName(editUser?.name);
      setMail(editUser?.email);
      setRole(editUser?.role);
    }
    // setEditID(ids);
    setUserData(userData.filter((data) => data.id !== ids));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Appcontext.Provider
      value={{
        userData,
        setUserData,
        pageCount,
        setPageCount,
        name,
        setName,
        mail,
        setMail,
        role,
        setRole,
        editID,
        setEditID,
      }}
    >
      <main className="w-[60%] h-[70vh] border-2 rounded-md">
        {/* Top content */}
        <section className="flex justify-between items-center p-4 border-b-2">
          <div className="flex flex-col">
            <div className="gap-2 flex">
              <h1 className="text-2xl">Users</h1>
              <h2
                className="rounded-full text-[14px] text-green-700 
              bg-[#b7e7c542] font-bold w-[70px] h-[30px] flex justify-center items-center"
              >
                {userData?.length} users
              </h2>
            </div>
            <h1 className="text-[15px] opacity-50">
              Manage Team members and their account permission here .
            </h1>
          </div>

          {/* search feature */}
          <input
            type="search"
            className="border  p-2 rounded-md focus:outline-dashed "
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search Users...."
          />

          <div className="flex justify-center items-center gap-5">
            <CSVLink data={userData}>
              <button className="p-2 border-2 rounded-md flex gap-3 justify-center items-center">
                {" "}
                <FiDownloadCloud className="text-xl" /> Download CSV
              </button>
            </CSVLink>

            <button className="p-2 rounded-md bg-blue-500 text-white">
              + Add User
            </button>
          </div>
        </section>

        {/* Middle content */}
        <section className="flex flex-col w-[100%] h-[550px] border-b-2 overflow-hidden">
          {/* topic / nav */}
          <div className="h-[50px] flex w-[100%] justify-between items-center p-4 border-b border-opacity-50">
            <h1 className="w-[30%] flex gap-1 opacity-60">
              Name <BiDownArrowAlt className="text-xl" />
            </h1>
            <h1 className="flex gap-1 opacity-60">
              Status <BiDownArrowAlt className="text-xl" />
            </h1>
            <h1 className=" flex gap-1 opacity-60">
              Role <BiDownArrowAlt className="text-xl" />
            </h1>
            <h1 className=" flex gap-1 opacity-60">
              Last Login
              <BiDownArrowAlt className="text-xl" />
            </h1>
            <h1>{"    "}</h1>
          </div>

          {/* user contents */}
          {userData.length > 0 &&
            userData
              .filter((user: userDataInfo) => {
                if (searchValue === "") {
                  return user;
                } else if (
                  searchValue
                    .toLowerCase()
                    .replaceAll(" ", "")
                    .includes(user.name.toLowerCase().replaceAll(" ", ""))
                ) {
                  return user;
                }
              })
              .slice(pageCount * 5 - 5, pageCount * 5)
              .map((data: userDataInfo, idx: number) => {
                return (
                  <div
                    className="h-[100px] border-b flex w-[100%] justify-between items-center p-4"
                    key={idx}
                  >
                    <div className="flex gap-2 w-[33%] ">
                      <div className="w-[50px] h-[50px] border-2 rounded-full text-3xl bg-blue-500 text-white">
                        <h1 className="text-center mt-1">{data.name[0]}</h1>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="">{data.name}</h1>
                        <h1 className=" opacity-50">{data.email}</h1>
                      </div>
                    </div>

                    <h1
                      className="rounded-full p-1 text-[15px] text-green-700 
                      bg-[#b7e7c562] font-bold w-[80px] flex justify-center items-center h-[30px]"
                    >
                      <BsDot className="text-2xl" /> Active
                    </h1>
                    <h1 className="opacity-50">
                      {data.role ? data.role : "Developer"}
                    </h1>
                    <div className="flex flex-col">
                      <h1>June 30, 2023</h1>
                      <h1 className="opacity-50">7.30pm</h1>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => deleteUser(data.id)}
                        className="hover:text-red-500 text-gray-500"
                      >
                        <AiOutlineDelete className="text-2xl " />
                      </button>
                      <button
                        onClick={() => editUser(data.id)}
                        className="hover:text-blue-500  text-gray-500"
                      >
                        <FiEdit2 className="text-[22px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
        </section>

        {/* Bottom content */}
        <Pagenation />

        {/* add user */}
        <Adduser />
      </main>
    </Appcontext.Provider>
  );
};

export default Users;
