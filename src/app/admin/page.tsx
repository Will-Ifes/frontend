'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ProtectedRoute from '@/components/application-bases/protected-route-client';

// Schema de validação para o formulário de cadastro e filtro
const employeeSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' }),
  company: z
    .string()
    .min(2, { message: 'Empresa deve ter pelo menos 2 caracteres' }),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Data de nascimento inválida' }),
  dailyExposureHours: z
    .number()
    .min(0)
    .max(24, { message: 'Horas de exposição devem estar entre 0 e 24' }),
});

type Employee = z.infer<typeof employeeSchema>;

export default function AdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const form = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      cpf: '',
      company: '',
      birthDate: '',
      dailyExposureHours: 0,
    },
  });

  const filterForm = useForm<Partial<Employee>>({
    defaultValues: {
      name: '',
      cpf: '',
      company: '',
    },
  });

  const onSubmit = (data: Employee) => {
    setEmployees([...employees, data]);
    setFilteredEmployees([...employees, data]);
    form.reset();
  };

  const handleFilter = (data: Partial<Employee>) => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(data.name?.toLowerCase() || '') &&
        employee.cpf.includes(data.cpf || '') &&
        employee.company
          .toLowerCase()
          .includes(data.company?.toLowerCase() || ''),
    );
    setFilteredEmployees(filtered);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      const newEmployees = employees.filter((_, i) => i !== index);
      setEmployees(newEmployees);
      setFilteredEmployees(newEmployees);
    }
  };

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        [
          'Nome',
          'CPF',
          'Empresa',
          'Data de Nascimento',
          'Horas de Exposição Diárias',
        ],
        ...filteredEmployees.map((e) => [
          e.name,
          e.cpf,
          e.company,
          e.birthDate,
          e.dailyExposureHours.toString(),
        ]),
      ]
        .map((e) => e.join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'empregados.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto min-h-[40rem] p-4">
        <h1 className="mb-4 text-2xl font-bold">Interface do Administrador</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="João Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="123.456.789-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Empresa A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyExposureHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de Exposição Diárias</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Cadastrar Empregado</Button>
          </form>
        </Form>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Filtros</h2>
          <form
            onSubmit={filterForm.handleSubmit(handleFilter)}
            className="flex gap-4"
          >
            <Input placeholder="Nome" {...filterForm.register('name')} />
            <Input placeholder="CPF" {...filterForm.register('cpf')} />
            <Input placeholder="Empresa" {...filterForm.register('company')} />
            <Button type="submit">Filtrar</Button>
          </form>
        </div>

        <div className="mb-4">
          <Button onClick={handleExport}>Exportar</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Horas de Exposição Diárias</TableHead>
              <TableHead className="w-1">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.cpf}</TableCell>
                <TableCell>{employee.company}</TableCell>
                <TableCell>{employee.birthDate}</TableCell>
                <TableCell>{employee.dailyExposureHours}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detalhes do Empregado</DialogTitle>
                        </DialogHeader>
                        <div>
                          <p>
                            <strong>Nome:</strong> {employee.name}
                          </p>
                          <p>
                            <strong>CPF:</strong> {employee.cpf}
                          </p>
                          <p>
                            <strong>Empresa:</strong> {employee.company}
                          </p>
                          <p>
                            <strong>Data de Nascimento:</strong>{' '}
                            {employee.birthDate}
                          </p>
                          <p>
                            <strong>Horas de Exposição Diárias:</strong>{' '}
                            {employee.dailyExposureHours}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">Editar</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                    >
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ProtectedRoute>
  );
}
