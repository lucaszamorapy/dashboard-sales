"use client";

import { useCallback, useEffect } from "react";
import { useData } from "../contexts/data-context";
import { DataTable } from "../components/ui/data-table";
import { columns } from "./columns";
import { getAllClients } from "../_actions/clients";
import UpsertClient from "./components/upsert-client";

const Clients = () => {
  const { data, setData } = useData();

  const getClients = useCallback(async () => {
    const response = await getAllClients();
    setData(response);
  }, [setData]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      {data && (
        <div className="flex flex-col gap-5">
          <UpsertClient />
          <DataTable columns={columns} data={data} columnFilter="name" />
        </div>
      )}
    </div>
  );
};

export default Clients;
