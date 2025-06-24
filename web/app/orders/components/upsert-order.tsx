import { getAllClients } from "@/app/_actions/clients";
import { getAllProducts } from "@/app/_actions/products";
import FormatInput from "@/app/components/format-input";
import { MoneyInput } from "@/app/components/money-input";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { IClient, IOrder, IOrderProduct, IProduct } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, Loader2, PencilIcon, PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { paymentMethods, transformedDefaultValues } from "../constants";

import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Textarea } from "@/app/components/ui/textarea";
import {
  deleteOrderProducts,
  getAllOrders,
  upsertOrderProducts,
  upsertOrders,
} from "@/app/_actions/orders/indext";

interface UpsertOrderProps {
  order?: IOrder;
  onUpsert: (order: IOrder[]) => void;
}

const formSchema = z.object({
  client_id: z.number().min(1, { message: "O cliente é obrigatório" }),
  order_products: z.array(
    z.object({
      order_product_id: z.number().optional(),
      order_id: z.number().optional(),
      product_id: z.number(),
      quantity: z.number(),
      product: z
        .object({
          product_id: z.number(),
          name: z.string(),
          price: z.number(),
        })
        .nullable(),
    })
  ),
  total: z.number(),
  payment_method: z.string(),
  delivery_date: z.date({
    required_error: "A data é obrigatório.",
  }),
  delivery_time: z.string().nullable(),
  obs: z.string().nullable(),
});

const UpsertOrder = ({ order, onUpsert }: UpsertOrderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<IClient[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState({} as IProduct);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: transformedDefaultValues(order ?? {}, product),
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_products",
  });

  const totalValue = useCallback(() => {
    const updatedProducts = form.getValues("order_products");
    const total = updatedProducts.reduce((acc, item) => {
      let price;
      if (item.product?.price === undefined) {
        price = 0;
      }
      price = item.product?.price ?? 0;
      return acc + price * item.quantity;
    }, 0);
    form.setValue("total", total);
  }, [form]);

  const removeProduct = async (index: number) => {
    if (order && order.order_id && fields[index].order_product_id) {
      await deleteOrderProducts(fields[index].order_product_id);
    }
    remove(index);
    totalValue();
  };

  const addProduct = () => {
    append({
      product_id: product.product_id ?? 1,
      quantity: 1,
      product: {
        product_id: product.product_id ?? 1,
        name: product.name,
        price: product.price,
      },
    });
    totalValue();
  };

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const [clientsData, productsData] = await Promise.all([
          getAllClients(),
          getAllProducts(),
        ]);

        const productFind = productsData.find(
          (item: IProduct) => item.product_id === 1
        );

        setProduct(productFind);
        setClients(clientsData);
        setProducts(productsData);

        const newDefaults = order
          ? transformedDefaultValues(order)
          : transformedDefaultValues(order ?? ({} as IOrder), productFind);

        form.reset(newDefaults);
        totalValue();
      };
      loadData();
    }
  }, [isOpen, order, form, totalValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let orderUpsert = {
        client_id: data?.client_id,
        payment_method: data?.payment_method,
        delivery_date: data?.delivery_date,
        delivery_time: data?.delivery_time,
        total: data?.total,
        obs: data?.obs,
      } as IOrder;
      if (order?.order_id) {
        orderUpsert = { ...orderUpsert, order_id: order.order_id };
      }
      const responseOrder = await upsertOrders(orderUpsert);
      for (const item of data.order_products) {
        let orderProductUpsert = {
          order_id: responseOrder.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
        } as IOrderProduct;
        if (order?.order_id) {
          orderProductUpsert = {
            ...orderProductUpsert,
            order_product_id: item.order_product_id,
          };
        }
        await upsertOrderProducts(orderProductUpsert);
      }
      const response = await getAllOrders();
      onUpsert(response);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
    form.reset(transformedDefaultValues(order, product));
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {order ? (
        <DialogTrigger asChild>
          <PencilIcon size={16} className="text-primary cursor-pointer" />
        </DialogTrigger>
      ) : (
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="bg-primary text-white w-40">
              <PlusCircle />
              Adicionar Pedido
            </Button>
          </DialogTrigger>
        </div>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{order ? "Edite" : "Adicione"} o Pedido</DialogTitle>
          <DialogDescription>
            Preencha as informações adequeadas do novo cliente.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value ?? "")}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o Cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {clients.map((item) => {
                            return (
                              <SelectItem
                                key={item.client_id}
                                value={String(item.client_id)}
                              >
                                {item.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <Card key={field.id} className="flex px-5 w-full  gap-5">
                  <div className="flex justify-end gap-2">
                    <Button
                      title="Adicionar produto"
                      type="button"
                      size={"sm"}
                      onClick={addProduct}
                    >
                      <PlusCircle />
                    </Button>
                    {index > 0 ? (
                      <Button
                        type="button"
                        onClick={() => removeProduct(index)}
                        title="Remover produto"
                        size={"sm"}
                      >
                        <CircleMinus />
                      </Button>
                    ) : null}
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center gap-2">
                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name={`order_products.${index}.product_id`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Produto</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) => {
                                    const productId = Number(value);
                                    field.onChange(productId);

                                    const selectedProduct = products.find(
                                      (p) => p.product_id === productId
                                    );
                                    if (selectedProduct) {
                                      form.setValue(
                                        `order_products.${index}.product`,
                                        {
                                          product_id:
                                            selectedProduct.product_id ?? 1,
                                          name: selectedProduct.name,
                                          price: selectedProduct.price,
                                        }
                                      );
                                      totalValue();
                                    }
                                  }}
                                  value={String(field.value)}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um produto" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {products.map((product) => (
                                      <SelectItem
                                        key={product.product_id}
                                        value={String(product.product_id)}
                                      >
                                        {product.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`order_products.${index}.product.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                              <MoneyInput
                                placeholder="Digite o preço"
                                value={field.value}
                                onValueChange={({ floatValue }) => {
                                  field.onChange(floatValue);
                                }}
                                onBlur={field.onBlur}
                                disabled={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`order_products.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                              <FormatInput
                                placeholder="Digite a quantidade"
                                type="onlyNumber"
                                onChange={(value) => {
                                  field.onChange(value);
                                  totalValue();
                                }}
                                initialValue={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              <div className="flex items-center w-full gap-2">
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Método de Pagamento</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um produto" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Valor total"
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
              </div>
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="delivery_date"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Data de Entrega</FormLabel>
                        <FormatInput
                          type="date"
                          placeholder="Data"
                          initialValue={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="delivery_time"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <FormatInput
                          type="time"
                          placeholder="Horário"
                          onChange={field.onChange}
                          initialValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value ?? ""}
                        placeholder="Observações"
                        className="resize-none"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
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
                    {order ? "Atualizando" : "Cadastrando"}
                  </Button>
                ) : (
                  <Button className="text-white" type="submit">
                    {order ? "Atualizar" : "Cadastrar"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertOrder;
