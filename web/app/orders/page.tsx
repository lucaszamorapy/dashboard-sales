"use client";

import { useCallback, useEffect } from "react";
import { DataTable } from "../components/ui/data-table";
import { getAllOrders } from "../_actions/orders/indext";
import { columns } from "./columns";
import UpsertOrder from "./components/upsert-order";
import FilterOrder from "./components/filter-order";
import { IOrder } from "../types";
import { useData } from "../contexts/data-context";

const Orders = () => {
  const { data, setData } = useData();

  const getOrders = useCallback(async () => {
    const response = await getAllOrders();
    setData(response);
  }, [setData]);

  const updateDataTable = (result: IOrder[]) => {
    setData(result);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row  justify-between">
          <FilterOrder handleFilter={updateDataTable} />
          <UpsertOrder />
        </div>
        <DataTable columns={columns} data={data} columnFilter="client_name" />
      </div>
    </div>
  );
};

export default Orders;
