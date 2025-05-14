"use client";

import React, { useCallback, useEffect } from "react";
import { DataTable } from "../components/ui/data-table";
import { columns } from "./columns";
import { IProduct } from "../types";
import { getAllProducts } from "../_actions/products";

const Products = () => {
  const [data, setData] = React.useState<IProduct[]>();

  const getProducts = useCallback(async () => {
    const response = await getAllProducts();
    setData(response);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="container px-6 mt-6">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export default Products;
