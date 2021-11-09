import React, { Fragment, useState } from "react";
import { Transition, Menu } from "@headlessui/react";
import { EditModal } from "./EditModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const DropdownMenu = ({ removeHam, ham, fetchHams }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Menu as="div" className="absolute -mt-3 inline-block text-left z-50">
        <div>
          <Menu.Button>
            <i className="fas fa-ellipsis-v"></i>
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
          <Menu.Items className="z-50 origin-top-right absolute left-2 top-3 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                    onClick={() => setIsOpen(true)}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                    onClick={() => removeHam(ham.id)}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <EditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ham={ham}
        fetchHams={fetchHams}
      />
    </div>
  );
};
