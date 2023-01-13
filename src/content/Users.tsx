import React, { FC, useState, useEffect } from "react";
import Page from "./Page";
import Appcontext from "../Context";
import Adduser from "./Adduser";

export interface userDataInfo {
  name: string;
  email: string;
}

const Users: FC = () => {
  const [userData, setUserData] = useState<userDataInfo[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const fetchData = async () => {
    const fetching = await fetch("https://jsonplaceholder.typicode.com/users");
    const res = await fetching.json();
    setUserData(res);
    // setUserData([...res, { name: "shri", email: "sasasasa" }]);
    console.log(res.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);

  return (
    <Appcontext.Provider
      value={{
        userData,
        setUserData,
        pageCount,
        setPageCount,
      }}
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
            <h1>some content here ---------</h1>
          </div>

          <div className="flex justify-center items-center gap-5">
            <button className="p-2 border-2 rounded-md">Download CSV</button>
            <button
              className="p-2 border-2 rounded-md"
              // onClick={() => inputFocus.current.focus()}
            >
              + Add User
            </button>
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
              .slice(pageCount * 5 - 5, pageCount * 5)
              .map((data: any, idx: number) => {
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
                    <h1>dev</h1>
                    <h1>7.30pm</h1>
                    <div className="flex gap-4">
                      <button>del</button>
                      <button>edit</button>
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
