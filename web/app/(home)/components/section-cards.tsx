"use client";
import { getAllClients } from "@/app/_actions/clients";
import { getAllOrders } from "@/app/_actions/orders/indext";
import { getAllProducts } from "@/app/_actions/products";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { IClient, IOrder, IProduct } from "@/app/types";
import { IconTrendingUp } from "@tabler/icons-react";
import { DollarSign, Store, Users } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

const SectionCards = () => {
  const [quantityTotal, setQuantityTotal] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrder[] | []>([]);
  const [clients, setClients] = useState<IClient[] | []>([]);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [totalPastMonth, setTotalPastMonth] = useState<number>(0);
  const [totalCurrentMonth, setTotalCurrentMonth] = useState<number>(0);
  const [percentual, setPercentual] = useState<string>("");
  const [diffValueMonths, setDiffValueMonths] = useState<string>("");

  const fetch = useCallback(async () => {
    const orders = await getAllOrders();
    setOrders(orders);
    const clients = await getAllClients();
    setClients(clients);
    const products = await getAllProducts();
    setProducts(products);
  }, []);

  const quantityCalc = useCallback(async () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (orders.length > 0) {
      const ordersFilter = orders.filter(
        (item: IOrder) =>
          new Date(item.delivery_date) >= firstDay &&
          new Date(item.delivery_date) <= lastDay
      );
      const count = ordersFilter.reduce(
        (acc: number, item: IOrder) => acc + item.total,
        0
      );
      setQuantityTotal(
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(count))
      );
    }
  }, [orders]);

  const percentualCalc = useCallback(() => {
    const today = new Date();
    const currentDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const pastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const pastCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const ordersFilterLastMonth = orders.filter(
      (item: IOrder) =>
        new Date(item.delivery_date) >= pastMonth &&
        new Date(item.delivery_date) < currentDay
    );
    const ordersCurrentMonth = orders.filter(
      (item: IOrder) =>
        new Date(item.delivery_date) >= currentDay &&
        new Date(item.delivery_date) < pastCurrentMonth
    );
    setTotalPastMonth(calculate(ordersFilterLastMonth));
    setTotalCurrentMonth(calculate(ordersCurrentMonth));
    const calc = totalCurrentMonth - totalPastMonth;
    const percentual = totalPastMonth > 0 ? (calc / totalPastMonth) * 100 : 0;
    const formated = percentual.toFixed(2);

    setPercentual(formated);
  }, [orders, totalCurrentMonth, totalPastMonth]);

  const calculate = (itens: IOrder[]) => {
    return itens.reduce((acc: number, item: IOrder) => {
      return acc + item.total;
    }, 0);
  };

  const diffCalc = useCallback(() => {
    const calc = totalCurrentMonth - totalPastMonth;
    setDiffValueMonths(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(calc))
    );
  }, [totalCurrentMonth, totalPastMonth]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    quantityCalc();
    percentualCalc();
    diffCalc();
  }, [quantityCalc, percentualCalc, diffCalc]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Quantia</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {quantityTotal}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <DollarSign />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Refere-se ao valor total do lucro obtido do mês atual.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Comparativo de lucros</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {diffValueMonths}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {percentual + "%"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Diferença entre os lucros do mês passado com o atual.
          </div>
          <div className="flex flex-col text-muted-foreground">
            <span>
              Passado:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(totalPastMonth))}
            </span>
            <span>
              Atual:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(totalCurrentMonth))}
            </span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Clientes Registrados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {clients.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Users />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Refere ao número total de clientes registrados no sistema.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Produtos Registrados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {products.length}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Store />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Refere ao número total de produtos registrados no sistema.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SectionCards;
