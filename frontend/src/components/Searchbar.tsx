import React from "react";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { Form } from "react-router-dom";

const Searchbar = () => {
  return (
    <div>
      <Form className="mt-24 ">
        <div>
          <div className="mt-2 flex max-w-xl  mx-auto rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <SearchIcon
                className="-ml-0.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Search
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Searchbar;
