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
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      {data && (
        <div className="flex flex-col gap-5">
          <UpsertProduct />
          <DataTable columns={columns} data={data} columnFilter="name" />
        </div>
      )}
    </div>
  );
};

export default Products;
