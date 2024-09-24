import Link from "next/link";
import React from "react";

const Error = ({error}) => {
  return (
    <>
      <div className="relative bg-black min-h-[calc(100vh-66px)]">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4 py-28">
              <div className="mx-auto max-w-[400px] text-center ">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  Error
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  Oops! There's a problem on this page
                </h4>
                <p className="mb-8 text-lg text-white">
                  {error}
                </p>
                <Link
                 href='/'
                  className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-yellow-500 hover:text-black"
                >
                  Go To Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="flex h-full w-1/3">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </div>
    </>
  );
};

export default Error;
