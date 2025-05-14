import { IProduct } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";

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
      return (
        <div className="flex">
          {/* <EditProductButton product={product} />
          <DeleteProductButton productId={product.product_id} /> */}
        </div>
      );
    },
  },
];
