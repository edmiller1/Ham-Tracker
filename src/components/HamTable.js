import React from "react";
import { API } from "aws-amplify";
import { deleteHam, updateHam } from "../graphql/mutations";
import { DropdownMenu } from "./DropdownMenu";

export const HamTable = ({ hams, setDeleting, fetchHams, searchValue }) => {
  const editHamCollected = async (id) => {
    const ham = hams.find((h) => h.id === id);
    const editedHam = {
      id: ham.id,
      name: ham.name,
      phone: ham.phone,
      invoiceNumber: ham.invoiceNumber,
      hamType: ham.hamType,
      collected: !ham.collected,
    };
    await API.graphql({
      query: updateHam,
      variables: { input: editedHam },
    });
    fetchHams();
  };

  const removeHam = async (id) => {
    try {
      const currentHam = hams.find((h) => (h.id = id));
      console.log(currentHam);
      await API.graphql({
        query: deleteHam,
        variables: { input: { id: currentHam.id } },
      });
      setDeleting(true);
      fetchHams();
    } catch (error) {
      console.log(error.errors[0].message);
    }
  };
  return (
    <div className="flex flex-col text-center">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-h-full">
          <div className="ml-3 shadow overflow-hidden border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  >
                    Phone #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  >
                    Invoice #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  >
                    Ham Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  >
                    Collected?
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 upper tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hams
                  .filter((ham) => ham.name.match(new RegExp(searchValue, "i")))
                  .map((ham, index) => (
                    <tr key={ham.id ? ham.id : index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="text-sm font-medium text-gray-900">
                              {ham.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{ham.phone}</div>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          POSASH{ham.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ham.hamType}
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ham.collected ? (
                            <i
                              className="fas fa-check-circle text-2xl text-green-500 cursor-pointer"
                              onClick={() => editHamCollected(ham.id)}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times-circle text-2xl text-red-500 cursor-pointer"
                              onClick={() => editHamCollected(ham.id)}
                            ></i>
                          )}
                        </div>
                      </td>
                      <td className="px-6">
                        <DropdownMenu
                          removeHam={removeHam}
                          ham={ham}
                          fetchHams={fetchHams}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
