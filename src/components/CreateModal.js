import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API, graphqlOperation } from "aws-amplify";
import { createHam } from "../graphql/mutations";

const initialState = {
  name: "",
  phone: "",
  invoiceNumber: "",
  hamType: "",
  collected: false,
};

export const CreateModal = ({ isOpen, setIsOpen, fetchHams }) => {
  const [formState, setFormState] = useState(initialState);

  const closeModal = () => {
    setIsOpen(false);
  };

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const addHam = async () => {
    try {
      if (
        !formState.name ||
        !formState.phone ||
        !formState.invoiceNumber ||
        !formState.hamType
      )
        return;
      const ham = { ...formState };
      setFormState(initialState);
      await API.graphql(graphqlOperation(createHam, { input: ham }));
      closeModal();
      fetchHams();
    } catch (error) {
      throw new Error(`Failed to create ham object: ${error}`);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-gray-900"
              >
                Create a new ham purchase
              </Dialog.Title>
              <div className="mt-2">
                <form className="pt-6 pb-8 mb-4">
                  <div className="flex">
                    <div className="mb-4 mr-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="clientName"
                      >
                        Name
                      </label>
                      <input
                        onChange={(event) =>
                          setInput("name", event.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="clientName"
                        value={formState.name}
                        type="text"
                        placeholder="client name"
                      />
                    </div>
                    <div className="mb-4 mr-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="clientPhone"
                      >
                        Phone
                      </label>
                      <input
                        onChange={(event) =>
                          setInput("phone", event.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="clientPhone"
                        value={formState.phone}
                        type="text"
                        placeholder="phone"
                      />
                    </div>
                    {/* <div class="mb-6">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p class="text-red-500 text-xs italic">
                      Please choose a password.
                    </p>
                  </div> */}
                  </div>
                  <div className="flex">
                    <div className="mb-4 mr-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="invoiceNumber"
                      >
                        Invoice #
                      </label>
                      <input
                        onChange={(event) =>
                          setInput("invoiceNumber", event.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="invoiceNumber"
                        value={formState.invoiceNumber}
                        type="text"
                        placeholder="#"
                      />
                    </div>
                    <div className="mb-4 mr-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="hamType"
                      >
                        Ham Type
                      </label>
                      <div className="relative">
                        <select
                          onChange={(event) =>
                            setInput("hamType", event.target.value)
                          }
                          value={formState.hamType}
                          className="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin"
                          id="grid-state"
                        >
                          <option defaultValue hidden>
                            ham type
                          </option>
                          <option>Alleva</option>
                          <option>Boehringer</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                  onClick={addHam}
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
