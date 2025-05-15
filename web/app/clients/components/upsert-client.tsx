import { getAllClients, upsertClient } from "@/app/_actions/clients";
import FormatInput from "@/app/components/format-input";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { useData } from "@/app/contexts/data-context";
import { IClient } from "@/app/types";
import { getCep } from "@/utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, PencilIcon, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpsertClientProps {
  client?: IClient;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Por favor, preencha o nome do cliente." })
    .max(255),
  cep: z.string().min(1, { message: "Por favor, preencha o CEP." }).max(9),
  street: z
    .string()
    .min(1, { message: "Por favor, preencha a sua rua." })
    .max(255),
  neighborhood: z
    .string()
    .min(1, { message: "Por favor, preencha o seu bairro." })
    .max(255),
  tel: z.string().max(15),
  cel: z.string().max(15),
});

const UpsertClient = ({ client }: UpsertClientProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { setData } = useData();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: client ?? {
      name: "",
      cep: "",
      street: "",
      neighborhood: "",
      tel: "",
      cel: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        client ?? {
          name: "",
          cep: "",
          street: "",
          neighborhood: "",
          tel: "",
          cel: "",
        }
      );
    }
  }, [client, form, isOpen]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    let clientUpsert = {} as IClient;
    if (client?.client_id) {
      clientUpsert = { client_id: client.client_id, ...data };
    } else {
      clientUpsert = data;
    }
    await upsertClient(clientUpsert);
    const response = await getAllClients();
    setData(response);
    setIsOpen(false);
    form.reset(
      client ?? {
        name: "",
        cep: "",
        street: "",
        neighborhood: "",
        tel: "",
        cel: "",
      }
    );
    setLoading(false);
  };

  const getAddress = async () => {
    const cep = form.getValues("cep").replace(/\D/g, "");
    if (cep.length !== 8) return;
    try {
      const data = await getCep(cep);
      form.setValue("street", data.logradouro);
      form.setValue("neighborhood", data.bairro);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTitle>
            {client ? "Edite" : "Adicione"} o seu Cliente
          </DialogTitle>
          <DialogDescription>
            Preencha as informações adequeadas do novo cliente.
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
                    <Input placeholder="Digite o nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field: { onBlur, ...rest } }) => (
                <FormItem className="w-30 lg:w-24">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <FormatInput
                      onBlur={() => {
                        onBlur();
                        getAddress();
                      }}
                      placeholder="CEP"
                      maxLength={9}
                      type="cep"
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5 justify-between">
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <FormatInput
                        {...field}
                        placeholder="Telefone"
                        maxLength={14}
                        type="phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <FormatInput
                        {...field}
                        placeholder="Celular"
                        type="phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              {loading ? (
                <Button className="text-white" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando
                </Button>
              ) : (
                <Button className="text-white" type="submit">
                  {client ? "Atualizar" : "Cadastrar"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertClient;
