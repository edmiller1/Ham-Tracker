import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listHams } from "./graphql/queries";
import { CreateModal } from "./components/CreateModal";
import { FilterSort } from "./components/FilterSort";
import { HamTable } from "./components/HamTable";
import { ProductList } from "./components/ProductList";
import "./App.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  const [hams, setHams] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [productListStatus, setProductListStatus] = useState(false);

  const fetchHams = async () => {
    try {
      setDeleting(false);
      setLoading(true);
      const hamData = await API.graphql(graphqlOperation(listHams));
      const hams = hamData.data.listHams.items;
      setHams(hams);
      setLoading(false);
    } catch (error) {
      throw new Error(`Failed to fetch hams: ${error}`);
    }
  };

  const showProducts = () => {
    setProductListStatus(!productListStatus);
  };

  useEffect(() => {
    fetchHams();
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <div className="flex items-center justify-center mt-10">
          <img
            className="w-20"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/meat-on-bone_1f356.png"
            alt="ham on the bone"
          />
          <h1 className="text-6xl font-semibold">&nbsp;Ham Tracker</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-52">
          <i className="fas fa-atom animate-spin text-4xl"></i>
          <span>Loading Hams...</span>
        </div>
      </div>
    );
  }

  if (deleting) {
    return (
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <i className="fas fa-atom animate-spin text-4xl"></i>
        <span>deleting...</span>
      </div>
    );
  }

  return (
    <div className={`App ${productListStatus ? "product-active" : ""}`}>
      <button className="product-button" onClick={showProducts}>
        Qualifying Products
      </button>
      <ProductList productListStatus={productListStatus} />
      <div className="flex items-center justify-center mt-3">
        <img
          className="w-20"
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/meat-on-bone_1f356.png"
          alt="ham on the bone"
        />
        <h1 className="text-6xl font-semibold">&nbsp;Ham Tracker</h1>
      </div>
      <FilterSort
        setIsOpen={setIsOpen}
        hams={hams}
        setHams={setHams}
        fetchHams={fetchHams}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <HamTable
        hams={hams}
        setDeleting={setDeleting}
        fetchHams={fetchHams}
        searchValue={searchValue}
      />
      <CreateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchHams={fetchHams}
      />
    </div>
  );
}

export default App;
