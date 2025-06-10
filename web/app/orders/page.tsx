"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable } from "../components/ui/data-table";
import { getAllOrders } from "../_actions/orders/indext";
import { getColumns } from "./columns";
import UpsertOrder from "./components/upsert-order";
import FilterOrder from "./components/filter-order";
import { IOrder } from "../types";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrders = useCallback(async () => {
    const response = await getAllOrders();
    setOrders(response);
  }, [setOrders]);

  const updateDataTable = (order: IOrder[]) => {
    setOrders(order);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row  justify-between">
          <FilterOrder handleFilter={updateDataTable} />
          <UpsertOrder onUpsert={updateDataTable} />
        </div>
        <DataTable
          columns={getColumns(updateDataTable)}
          data={orders}
          columnFilter="client_name"
        />
      </div>
    </div>
  );
};

export default Orders;
