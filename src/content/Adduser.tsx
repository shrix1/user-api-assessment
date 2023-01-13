import React, { useContext, useState } from "react";
import Appcontext from "../Context";

const Adduser = () => {
  const { setUserData, userData } = useContext(Appcontext);
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserData([
      ...userData,
      { name, email: mail, id: userData.length + 1, role },
    ]);
    console.log(name, mail, userData.length);
    console.log("submited");
  };

  return (
    <section className="w-[100%] h-[10vh] rounded-md flex justify-center items-center flex-col mt-7">
      <h1 className="text-center text-2xl">Add Users here</h1>

      <form
        className="flex justify-center items-center h-[40vh] gap-2"
        onSubmit={handleUser}
      >
        <input
          type="text"
          placeholder="Name here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setMail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Role here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <button className="border-2 p-2 w-[150px] rounded-md">Submit</button>
      </form>
    </section>
  );
};

export default Adduser;
