import { upsertProduct } from "@/app/_actions/products";
import { MoneyInput } from "@/app/components/money-input";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { IProduct } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2, PencilIcon, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpsertProductProps {
  product?: IProduct;
  onUpsert: (product: IProduct) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Por favor, preencha o nome do produto." }),
  price: z.number({ required_error: "O preço é obrigatório." }),
});

const UpsertProduct = ({ product, onUpsert }: UpsertProductProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ?? {
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        product ?? {
          name: "",
          price: 0,
        }
      );
    }
  }, [isOpen, form, product]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let productUpsert = {} as IProduct;
      if (product?.product_id) {
        productUpsert = { product_id: product.product_id, ...data };
      } else {
        productUpsert = data;
      }
      const response = await upsertProduct(productUpsert);
      onUpsert(response);
      setIsOpen(false);
      form.reset(
        product ?? {
          name: "",
          price: 0,
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {product && (
        <DialogTrigger asChild>
          <PencilIcon size={16} className="text-primary cursor-pointer" />
        </DialogTrigger>
      )}
      {!product && (
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="bg-primary text-white w-40">
              <PlusCircle />
              Adicionar Produto
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edite" : "Adicione"} o seu Produto
          </DialogTitle>
          <DialogDescription>
            Preencha as informações adequeadas do seu novo produto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o preço"
                      value={field.value ?? 0}
                      ref={field.ref}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue ?? 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              {loading ? (
                <Button className="text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando
                </Button>
              ) : (
                <Button className="text-white" type="submit">
                  {product ? "Atualizar" : "Cadastrar"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProduct;
