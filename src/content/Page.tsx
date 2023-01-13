import React, { FC, useContext } from "react";
import Appcontext from "../Context";

const Page: FC = () => {
  const { setPageCount, userData, pageCount } = useContext(Appcontext);

  const selectedPage = (selectedPage: number) => {
    setPageCount(selectedPage);
  };

  return (
    <>
      {userData.length > 0 && (
        <section className="flex p-5 justify-between items-center" id="adduser">
          <button
            onClick={() => selectedPage(pageCount - 1)}
            style={{ opacity: pageCount < userData.length / 5 ? 0 : 1 }}
          >
            - previous
          </button>

          <div className="flex gap-4">
            {[...Array(Math.ceil(userData.length / 5))].map((_, i) => {
              return (
                <button
                  key={i}
                  onClick={() => selectedPage(i + 1)}
                  style={{
                    fontWeight: pageCount === i + 1 ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selectedPage(pageCount + 1)}
            style={{ opacity: pageCount < userData.length / 5 ? 1 : 0 }}
          >
            Next -{" "}
          </button>
        </section>
      )}
    </>
  );
};

export default Page;
