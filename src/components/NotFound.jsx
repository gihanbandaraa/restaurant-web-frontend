import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center font-montserrat justify-center h-screen">
      <h1 className="text-5xl font-bold ">Uh-Oh...</h1>
      <p className="mt-4 text-xl font-semibold text-center">
        The Page you are looking for may been moved, deleted, or possibly never
        existed
      </p>
      <h2 className="text-8xl font-poppins font-extrabold text-red-400">404</h2>
    </div>
  );
};

export default NotFound;
