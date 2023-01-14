import React, { useContext } from "react";
import Appcontext from "../Context";

const Adduser = () => {
  const {
    setUserData,
    userData,
    name,
    mail,
    role,
    setName,
    setMail,
    setRole,
    setEditID,
    editID,
  } = useContext(Appcontext);

  const handleUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (editID) {
    //   const editUser = userData.find((data) => data.id === editID);
    //   const editUserData = userData.map((d) =>
    //     d.id === editUser?.id
    //       ? { name, email: mail, id: d.id, role }
    //       : { name: d.name, email: d.email, id: d.id, role }
    //   );
    //   // setUserData([...userData, { name, email: mail, id: editID, role }]);
    //   setUserData(editUserData);
    // }

    setUserData([
      ...userData,
      { name, email: mail, id: userData.length + 1, role },
    ]);
    setName("");
    setMail("");
    setRole("");
  };

  return (
    <section className="w-[100%] h-[10vh] rounded-md flex justify-center items-center flex-col mt-7">
      <h1 className="text-center text-2xl">Add \ Edit Users </h1>

      <form
        className="flex justify-center items-center h-[40vh] gap-2"
        onSubmit={handleUser}
      >
        <input
          type="text"
          placeholder="Name here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <input
          type="email"
          placeholder="Email here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          required
        />

        <input
          type="text"
          placeholder="Role here"
          className="border w-[300px] p-3 rounded-md"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        />

        <button className="border-2 p-2 w-[150px] rounded-md  bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Adduser;
