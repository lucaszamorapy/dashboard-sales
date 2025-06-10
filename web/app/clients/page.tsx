"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable } from "../components/ui/data-table";
import { getAllClients } from "../_actions/clients";
import UpsertClient from "./components/upsert-client";
import { getColumns } from "./columns";
import { IClient } from "../types";

const Clients = () => {
  const [clients, setClients] = useState<IClient[]>([]);

  const getClients = useCallback(async () => {
    const response = await getAllClients();
    setClients(response);
  }, [setClients]);

  const handleUpsert = (client: IClient) => {
    const clientExist = clients.find(
      (item: IClient) => item.client_id === client.client_id
    );
    let updatedClients: IClient[] = [];
    if (clientExist) {
      updatedClients = clients.map((item: IClient) => {
        if (item.client_id === client.client_id) {
          return { ...item, ...client };
        } else {
          return item;
        }
      });
    } else {
      updatedClients = [...clients, client];
    }
    setClients(updatedClients);
  };

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <div className="@container/main flex flex-1 flex-col p-6 gap-2">
      {clients && (
        <div className="flex flex-col gap-5">
          <UpsertClient onUpsert={handleUpsert} />
          <DataTable
            columns={getColumns(handleUpsert)}
            data={clients}
            columnFilter="name"
          />
        </div>
      )}
    </div>
  );
};

export default Clients;
