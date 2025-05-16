import { IVwOrder } from "@/app/types";
import { formatDate } from "@/utils/functions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export const columns: ColumnDef<IVwOrder>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center px-6 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: order } }) => {
      return <div className="w-[10px] px-6">{order.order_id}</div>;
    },
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <div
          className="w-20 flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex w-[50px] flex-col">
          <span>{order.product_name}</span>
          <span>{order.quantity} unidades</span>
        </div>
      );
    },
  },

  {
    accessorKey: "client_name",
    header: ({ column }) => {
      return (
        <div
          className="w-30 flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex flex-col">
          <span>{order.client_name}</span>
          <span>{order.payment_method}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "delivery_date",
    header: "Entrega",
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex flex-col">
          <span className="flex">
            {formatDate(order.delivery_date)} às {order.delivery_time}
          </span>
          <span className="flex">
            {order.client_street}, {order.client_neighborhood}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Valor",
    cell: ({ row: { original: order } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(order.total)),
  },

  {
    accessorKey: "actions",
    header: () => <div className="">Ações</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="">
          {order.order_id}
          {/* <UpsertProduct product={product} /> */}
        </div>
      );
    },
  },
];
