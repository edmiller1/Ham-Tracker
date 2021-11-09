import React from "react";
import {
  boehringerHalfHam,
  boehringerTwoHalfHam,
  allevaHam,
} from "../util/data";

export const ProductList = ({ productListStatus }) => {
  return (
    <div className={`products ${productListStatus ? "active-products" : ""}`}>
      <h2 className="pl-2 py-5 font-semibold text-2xl text-left">
        Qualifying Products
      </h2>
      <hr />
      <span className="mx-3 font-extrabold text-lg border-b-2 border-gray-900">
        1/2 Ham Qualifying Purchases
      </span>
      <div className="flex flex-col text-left">
        {boehringerHalfHam.map((ham) => (
          <div
            key={ham.id}
            className="px-3 pt-3 hover:bg-gray-100 transition-all"
          >
            <h1 className="font-semibold text-gray-800">{ham.product}</h1>
            <span className="text-gray-500 text-sm">{ham.quantity}</span>
            <hr />
          </div>
        ))}
      </div>
      <span className="mx-3 font-extrabold text-lg border-b-2 border-gray-900">
        2x 1/2 Ham Qualifying Purchases
      </span>
      <div className="flex flex-col text-left">
        {boehringerTwoHalfHam.map((ham) => (
          <div
            key={ham.id}
            className="px-3 pt-3 hover:bg-gray-100 transition-all"
          >
            <h1 className="font-semibold text-gray-800">{ham.product}</h1>
            <span className="text-gray-500 text-sm">{ham.quantity}</span>
            <hr />
          </div>
        ))}
      </div>
      <span className="mx-3 font-extrabold text-lg border-b-2 border-gray-900">
        Alleva Ham Qualifying Purchases
      </span>
      <div className="flex flex-col text-left">
        {allevaHam.map((ham) => (
          <div
            key={ham.id}
            className="px-3 pt-3 hover:bg-gray-100 transition-all"
          >
            <h1 className="font-semibold text-gray-800">{ham.product}</h1>
            <span className="text-gray-500 text-sm">{ham.quantity}</span>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
