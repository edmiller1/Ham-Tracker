import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { listHams } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const FilterSort = ({
  setIsOpen,
  hams,
  setHams,
  fetchHams,
  searchValue,
  setSearchValue,
}) => {
  const openModal = () => {
    setIsOpen(true);
  };

  const filterCollected = async () => {
    const hamData = await API.graphql(
      graphqlOperation(listHams, {
        filter: { collected: { eq: true } },
      })
    );
    const newHams = hamData.data.listHams.items;
    setHams(newHams);
    // const newHams = hams.filter((ham) => ham.collected === true);
    // setHams(newHams);
  };
  const filterNotCollected = async () => {
    const hamData = await API.graphql(
      graphqlOperation(listHams, {
        filter: { collected: { eq: false } },
      })
    );
    const newHams = hamData.data.listHams.items;
    setHams(newHams);
    // const newHams = hams.filter((ham) => ham.collected === false);
    // setHams(newHams);
  };

  // await API.graphql({
  //   query: updateHam,
  //   variables: { input: editedHam },
  // });

  const filterAlleva = async () => {
    const hamData = await API.graphql(
      graphqlOperation(listHams, {
        filter: { hamType: { contains: "Alleva" } },
      })
    );
    const newHams = hamData.data.listHams.items;
    setHams(newHams);
  };

  const filterBoehringer = async () => {
    const hamData = await API.graphql(
      graphqlOperation(listHams, {
        filter: { hamType: { contains: "Boehringer" } },
      })
    );
    const newHams = hamData.data.listHams.items;
    setHams(newHams);
  };

  return (
    <div className="my-3 flex justify-center">
      <div className="text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-12 px-3 pr-16 rounded-lg text-md focus:outline-none"
          type="search"
          name="search"
          value={searchValue}
          placeholder="🎅 Search..."
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      {/* <Menu as="div" className="flex-auto relative inline-block text-left mx-5">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            Sort
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                  >
                    Alphabetical
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                  >
                    Collected
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                  >
                    Ham Type
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
      <Menu as="div" className="relative inline-block text-left mx-5">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            Filter
            <i className="fas fa-chevron-down ml-2 mt-1"></i>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute -right-12 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                    onClick={fetchHams}
                  >
                    Default
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                    onClick={filterCollected}
                  >
                    Collected
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                    onClick={filterNotCollected}
                  >
                    Not Collected
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                    onClick={filterAlleva}
                  >
                    Alleva
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-2 py-2 text-sm"
                    )}
                    onClick={filterBoehringer}
                  >
                    Boehringer
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <button
        className="py-2 px-2 rounded-lg bg-green-600 text-white text-xl hover:bg-green-500 transition-all"
        onClick={openModal}
      >
        🍖 New +
      </button>
    </div>
  );
};
