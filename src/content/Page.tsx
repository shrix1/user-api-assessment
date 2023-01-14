import React, { FC, useContext } from "react";
import Appcontext from "../Context";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Page: FC = () => {
  const { setPageCount, userData, pageCount } = useContext(Appcontext);

  const selectedPage = (selectedPage: number) => {
    setPageCount(selectedPage);
  };

  return (
    <>
      {userData.length > 0 && (
        <section className="flex p-3 justify-between items-center" id="adduser">
          <button
            onClick={() => selectedPage(pageCount - 1)}
            style={{ opacity: pageCount < userData.length / 5 ? 0 : 1 }}
            className="flex justify-center items-center border-2 p-2 rounded-md border-gray-200 
            hover:text-blue-500  gap-3"
          >
            <AiOutlineArrowLeft className="text-xl" /> Previous
          </button>

          <div className="flex gap-6">
            {[...Array(Math.ceil(userData.length / 5))].map((_, i) => {
              return (
                <button
                  key={i}
                  onClick={() => selectedPage(i + 1)}
                  style={{
                    fontSize: pageCount === i + 1 ? "20px" : "15px",
                  }}
                  className="hover:text-blue-500"
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selectedPage(pageCount + 1)}
            style={{ opacity: pageCount < userData.length / 5 ? 1 : 0 }}
            className="flex justify-center items-center border-2 p-2 rounded-md border-gray-200 gap-3 
            hover:text-blue-500 hover:border-blue-600"
          >
            Next <AiOutlineArrowRight className="text-xl " />
          </button>
        </section>
      )}
    </>
  );
};

export default Page;
