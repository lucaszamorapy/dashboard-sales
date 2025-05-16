import PaymentMethodBadge from "@/app/components/payment-method-badge";
import { IOrder } from "@/app/types";
import { formatDate } from "@/utils/functions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export const columns: ColumnDef<IOrder>[] = [
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
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <div
          className="w-20 flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produtos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex w-[150px] flex-col">
          {order.order_products.map((item) => (
            <div key={item.product.name}>
              <div className="flex gap-2">
                <span>{item.product.name}</span>
                <span>({item.quantity} Uni.)</span>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.client.name,
    id: "client_name", // você precisa de um ID se usar `accessorFn`
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
          <span>{order.client.name}</span>
          <PaymentMethodBadge method={order.payment_method} />
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
            {order.client.street}, {order.client.neighborhood}
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
