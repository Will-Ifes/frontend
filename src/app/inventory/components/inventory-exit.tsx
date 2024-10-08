import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const exitSchema = z.object({
  client: z.string().min(1, "Cliente é obrigatório"),
  deliveryDate: z.string().min(1, "Data de entrega é obrigatória"),
  items: z
    .array(
      z.object({
        code: z.string().min(1, "Código é obrigatório"),
        quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
      })
    )
    .min(1, "Adicione pelo menos um item"),
  employees: z.string().min(1, "Adicione pelo menos um colaborador"),
});

export default function InventoryExit() {
  const [items, setItems] = useState<{ code: string; quantity: number }[]>([]);

  type FormValues = {
    client: string;
    deliveryDate: string;
    items: { code: string; quantity: number }[];
    employees: string;
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(exitSchema),
    defaultValues: {
      client: "",
      deliveryDate: "",
      items: [],
      employees: "",
    },
  });

  const onSubmit = (data: z.infer<typeof exitSchema>) => {
    console.log(data);
    // Implement API call to save exit and generate "Ficha de Entrega de Material"
  };

  const addItem = () => {
    setItems([...items, { code: "", quantity: 0 }]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa (Cliente)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome/Código" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Entrega</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    {...form.register(`items.${index}.code`)}
                    placeholder="Código"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Quantidade"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button type="button" onClick={addItem}>
          Adicionar Item
        </Button>

        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colaborador(es)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nomes dos colaboradores" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Gerar Ficha de Entrega</Button>
      </form>
    </Form>
  );
}
