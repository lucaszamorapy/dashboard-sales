"use client";

import { useCallback, useEffect } from "react";
import { useData } from "../contexts/data-context";
import { DataTable } from "../components/ui/data-table";
import { getAllOrders } from "../_actions/orders/indext";
import { columns } from "./columns";

const Orders = () => {
  const { data, setData } = useData();

  const getOrders = useCallback(async () => {
    const response = await getAllOrders();
    setData(response);
  }, [setData]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      {data && (
        <div className="flex flex-col gap-5">
          <DataTable columns={columns} data={data} columnFilter="client_name" />
        </div>
      )}
    </div>
  );
};

export default Orders;
