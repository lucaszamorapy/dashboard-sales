import { IProduct } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import UpsertProduct from "../components/upsert-product";
import { ArrowUpDown } from "lucide-react";

//colunas do datatable
export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "product_id",
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
    cell: ({ row: { original: product } }) => {
      return <div className="px-6">{product.product_id}</div>;
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
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="lg:w-30 flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row: { original: product } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price)),
  },

  {
    accessorKey: "actions",
    header: () => <div className="lg:w-[1px]">Ações</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="lg:w-[1px]">
          <UpsertProduct product={product} />
        </div>
      );
    },
  },
];
