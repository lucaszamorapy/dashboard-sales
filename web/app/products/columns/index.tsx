import { IProduct } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import UpsertProduct from "../components/upsert-product";

//colunas do datatable
export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "product_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row: { original: product } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price)),
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return <div className="flex">{<UpsertProduct product={product} />}</div>;
    },
  },
];
