import React, { FC, useState, useEffect } from "react";
import Page from "./Page";
import Appcontext from "../Context";
import Adduser from "./Adduser";
import { CSVLink } from "react-csv";

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

  const fetchData = async () => {
    const fetching = await fetch("https://jsonplaceholder.typicode.com/users");
    const res = await fetching.json();
    setUserData(res);
  };

  const deleteUser = (ids: number) => {
    setUserData(userData.filter((data) => data.id !== ids));
  };

  const editUserData = (ids: number) => {
    console.log("editing");
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);

  return (
    <Appcontext.Provider
      value={{ userData, setUserData, pageCount, setPageCount }}
    >
      <main className="w-[60%] h-[70vh] border-2 rounded-md">
        {/* Top content */}
        <section className="flex justify-between items-center p-4 border-b-2">
          <div className="flex flex-col">
            <div className="gap-2 flex">
              <h1>Users</h1>
              <h2 className="border-2 rounded-full pl-1 pr-1">
                {userData.length} users
              </h2>
            </div>
            <h1>some content here --------- </h1>
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
              <button className="p-2 border-2 rounded-md"> Download CSV</button>
            </CSVLink>

            <button className="p-2 border-2 rounded-md">+ Add User</button>
          </div>
        </section>

        {/* Middle content */}
        <section className="flex flex-col w-[100%] h-[550px] border-b-2 overflow-hidden">
          {/* topic / nav */}
          <div className="h-[50px] border flex w-[100%] justify-between items-center p-4">
            <h1 className="w-[20%]">Name</h1>
            <h1>Status</h1>
            <h1>Role</h1>
            <h1>last login</h1>
            <h1>Others</h1>
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
                    className="h-[100px] border flex w-[100%] justify-between items-center p-4"
                    key={idx}
                  >
                    <div className="w-[20%] flex flex-col">
                      <h1 className="">{data.name}</h1>
                      <h1>{data.email}</h1>
                    </div>

                    <h1>active</h1>
                    <h1>{data.role ? data.role : "developer"}</h1>
                    <h1>7.30pm</h1>
                    <div className="flex gap-4">
                      <button onClick={() => deleteUser(data.id)}>del</button>
                      <button onClick={() => editUserData(data.id)}>
                        edit
                      </button>
                    </div>
                  </div>
                );
              })}
        </section>

        {/* Bottom content */}
        <Page />

        {/* add user */}
        <Adduser />
      </main>
    </Appcontext.Provider>
  );
};

export default Users;
