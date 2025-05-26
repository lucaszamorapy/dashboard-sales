import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ListFilterPlus, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";
import { filterOrders } from "@/app/_actions/orders/indext";
import { IOrder } from "@/app/types";

interface FilterOrderProps {
  handleFilter: (result: IOrder[]) => void;
}

const dateFilterSchema = z.object({
  init_date: z.date().optional(),
  final_date: z.date().optional(),
});

const FilterOrder = ({ handleFilter }: FilterOrderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof dateFilterSchema>>({
    resolver: zodResolver(dateFilterSchema),
    defaultValues: {
      init_date: undefined,
      final_date: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof dateFilterSchema>) => {
    setLoading(true);
    const filter = {
      init_date: data.init_date
        ? format(data.init_date, "yyyy-MM-dd")
        : undefined,
      final_date: data.final_date
        ? format(data.final_date, "yyyy-MM-dd")
        : undefined,
    };
    const response = await filterOrders(filter);
    handleFilter(response);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-end mb-5 gap-5 lg:flex-row lg:mb-0 lg:items-end"
      >
        <FormField
          control={form.control}
          name="init_date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Inicial</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="final_date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Final</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button className="text-white" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Filtrando
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button className="text-white" type="submit">
              <ListFilterPlus /> Filtrar
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default FilterOrder;
