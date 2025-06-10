"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/app/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { useCallback, useEffect, useState } from "react";
import { filterOrders } from "@/app/_actions/orders/indext";
import { IFilterOrder, IOrder } from "@/app/types";
import { formatDate } from "@/utils/functions";

const chartConfig = {
  price: {
    label: "Lucro",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface IChartData {
  delivery_date?: Date;
  date: Date;
  price: number;
}
export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("90d");
  const [orders, setOrders] = useState<IOrder[]>([] as IOrder[]);

  const getChartData = useCallback(async (filter: IFilterOrder) => {
    const response = await filterOrders(filter);
    const chartData = response.reduce((acc: IChartData[], item: IOrder) => {
      const exist = acc.find(
        (el) =>
          formatDate(new Date(el.date), "bd") ===
          formatDate(new Date(item.delivery_date), "bd")
      );
      if (exist) {
        exist.price += item.total;
      } else {
        acc.push({ date: item.delivery_date, price: item.total });
      }

      return acc;
    }, []);
    setOrders(chartData);
  }, []);

  const filteredOrders = useCallback(async () => {
    const today = new Date();

    switch (timeRange) {
      case "7d":
        const week = new Date();
        week.setDate(today.getDate() - 6);
        await getChartData({
          init_date: formatDate(week, "bd"),
          final_date: formatDate(today, "bd"),
        });
        break;
      case "30d":
        const day30 = new Date();
        day30.setDate(today.getDate() - 29);
        await getChartData({
          init_date: formatDate(day30, "bd"),
          final_date: formatDate(today, "bd"),
        });
        break;
      case "90d":
        const day90 = new Date();
        day90.setDate(today.getDate() - 89);
        await getChartData({
          init_date: formatDate(day90, "bd"),
          final_date: formatDate(today, "bd"),
        });
        break;
      default:
        break;
    }
  }, [getChartData, timeRange]);

  useEffect(() => {
    if (["7d", "30d", "90d"].includes(timeRange)) {
      filteredOrders();
    }
  }, [filteredOrders, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total de Lucro</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de lucro durante 90 dias
          </span>
          <span className="@[540px]/card:hidden"> Últimos 90 dias</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem className="cursor-pointer" value="90d">
              Últimos 90 dias
            </ToggleGroupItem>
            <ToggleGroupItem className="cursor-pointer" value="30d">
              Últimos 30 dias
            </ToggleGroupItem>
            <ToggleGroupItem className="cursor-pointer" value="7d">
              Últimos 7 dias
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Últimos 90 dias" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 90 dias
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={orders}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="price"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--primary)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
