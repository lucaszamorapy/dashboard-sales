import { deleteOrder, getAllOrders } from "@/app/_actions/orders/indext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { useData } from "@/app/contexts/data-context";
import { Trash2Icon } from "lucide-react";
import React from "react";

interface DeleteOrderProps {
  order_id: number;
}

const DeleteOrder = ({ order_id }: DeleteOrderProps) => {
  const { setData } = useData();

  const onDelete = async () => {
    try {
      await deleteOrder(order_id);
      const response = await getAllOrders();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2Icon size={16} className="text-primary cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza que deseja excluir este pedido?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível, você perderá todos os dados associados a
            este pedido.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="bg-muted">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="text-white" onClick={onDelete}>
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOrder;
