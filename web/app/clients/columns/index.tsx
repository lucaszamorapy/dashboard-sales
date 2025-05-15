import { IClient } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import UpsertClient from "../components/upsert-client";

//colunas do datatable
export const columns: ColumnDef<IClient>[] = [
  {
    accessorKey: "client_id",
    header: ({ column }) => {
      return (
        <div
          className="flex px-6 items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: client } }) => {
      return <div className="px-6">{client.client_id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="w-30 flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "cep",
    header: "CEP",
  },
  {
    accessorKey: "street",
    header: "Endereço",
    cell: ({ row: { original: client } }) => {
      return (
        <div className="flex items-center">
          {client.street}, {client.neighborhood}
        </div>
      );
    },
  },

  {
    accessorKey: "tel",
    header: "Contato",
    cell: ({ row: { original: client } }) => {
      return (
        <div className="flex flex-col">
          {client.tel ? (
            <span>Telefone: {client.tel}</span>
          ) : (
            <span>Telefone não informado</span>
          )}

          {client.cel ? (
            <span>Celular: {client.cel}</span>
          ) : (
            <span>Celular não informado</span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <>Ações</>,
    cell: ({ row: { original: client } }) => {
      return (
        <div className="lg:w-[1px]">
          <UpsertClient client={client} />
        </div>
      );
    },
  },
];
