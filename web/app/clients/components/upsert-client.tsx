import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { IClient } from "@/app/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PencilIcon, PlusCircle } from "lucide-react";
import React from "react";

interface UpsertClientProps {
  client?: IClient;
}

const UpsertClient = ({ client }: UpsertClientProps) => {
  console.log(client);
  return (
    <Dialog>
      {client ? (
        <DialogTrigger asChild>
          <PencilIcon size={16} className="text-primary cursor-pointer" />
        </DialogTrigger>
      ) : (
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="bg-primary text-white w-40">
              <PlusCircle />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Desenvolvimento</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertClient;
