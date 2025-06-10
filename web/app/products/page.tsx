"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "../components/ui/data-table";
import { getColumns } from "./columns";
import { getAllProducts } from "../_actions/products";
import UpsertProduct from "./components/upsert-product";
import { IProduct } from "../types";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = useCallback(async () => {
    const response = await getAllProducts();
    setProducts(response);
  }, [setProducts]);

  const handleUpsert = (product: IProduct) => {
    const productExist = products.find(
      (item: IProduct) => item.product_id === product.product_id
    );
    let updatedProducts: IProduct[] = [];
    if (productExist) {
      updatedProducts = products.map((item: IProduct) => {
        if (item.product_id === product.product_id) {
          return { ...item, ...product };
        } else {
          return item;
        }
      });
    } else {
      updatedProducts = [...products, product];
    }
    setProducts(updatedProducts);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      {products && (
        <div className="flex flex-col gap-5">
          <UpsertProduct onUpsert={handleUpsert} />
          <DataTable
            columns={getColumns(handleUpsert)}
            data={products}
            columnFilter="name"
          />
        </div>
      )}
    </div>
  );
};

export default Products;
