"use client";

import React, { useCallback, useEffect } from "react";
import { DataTable } from "../components/ui/data-table";
import { columns } from "./columns";
import { getAllProducts } from "../_actions/products";
import UpsertProduct from "./components/upsert-product";
import { useData } from "../contexts/data-context";

const Products = () => {
  const { data, setData } = useData();

  const getProducts = useCallback(async () => {
    const response = await getAllProducts();
    setData(response);
  }, [setData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container px-6 mt-6">
      {data && (
        <div className="flex flex-col gap-10">
          <UpsertProduct />
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default Products;
