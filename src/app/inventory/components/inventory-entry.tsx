import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const entrySchema = z.object({
  supplier: z.string().min(1, 'Fornecedor é obrigatório'),
  invoice: z.string().min(1, 'Nota Fiscal é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  items: z
    .array(
      z.object({
        code: z.string().min(1, 'Código é obrigatório'),
        quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
        value: z.number().min(0, 'Valor não pode ser negativo'),
        expirationDate: z.string().optional(),
      }),
    )
    .min(1, 'Adicione pelo menos um item'),
});

export default function InventoryEntry() {
  const [items, setItems] = useState<
    { code: string; quantity: number; value: number; expirationDate: string }[]
  >([]);

  const form = useForm<z.infer<typeof entrySchema>>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      supplier: '',
      invoice: '',
      date: '',
      items: [],
    },
  });

  const onSubmit = (data: z.infer<typeof entrySchema>) => {
    console.log(data);
    // Implement API call to save entry
  };

  const addItem = () => {
    setItems([
      ...items,
      { code: '', quantity: 0, value: 0, expirationDate: '' },
    ]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome/Código" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nota Fiscal</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
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
              <TableHead>Valor</TableHead>
              <TableHead>Data de Validade</TableHead>
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
                <TableCell>
                  <Input
                    {...form.register(`items.${index}.value`, {
                      valueAsNumber: true,
                    })}
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`items.${index}.expirationDate`)}
                    type="date"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button type="button" onClick={addItem}>
          Adicionar Item
        </Button>
        <Button type="submit">Salvar Entrada</Button>
      </form>
    </Form>
  );
}
