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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogoutButton from '@/components/common/logoutButton';
import ProtectedRoute from '@/components/application-bases/protected-route-server';

// Simula busca de dados do banco de dados
async function getCompanies() {
  // Em uma aplicação real, isso seria uma chamada a um banco de dados ou API
  return [
    {
      name: 'Empresa A',
      employeesCount: 100,
      itemsInTime: 80,
      itemsNearExpiration: 15,
      itemsExpired: 5,
    },
    {
      name: 'Empresa B',
      employeesCount: 50,
      itemsInTime: 40,
      itemsNearExpiration: 8,
      itemsExpired: 2,
    },
  ];
}

async function getEmployees() {
  // Em uma aplicação real, isso seria uma chamada a um banco de dados ou API
  return [
    {
      name: 'João Silva',
      cpf: '123.456.789-00',
      role: 'Operador',
      status: 'Ativo',
      items: [
        {
          name: 'Capacete',
          receivedDate: '2023-01-01',
          quantity: 1,
          replacementDate: '2023-12-31',
          validity: '2024-01-01',
          nextReplacement: '2023-12-31',
        },
      ],
    },
    {
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      role: 'Supervisora',
      status: 'Ativo',
      items: [
        {
          name: 'Luvas',
          receivedDate: '2023-02-01',
          quantity: 2,
          replacementDate: '2023-08-01',
          validity: '2023-08-01',
          nextReplacement: '2023-08-01',
        },
      ],
    },
  ];
}

// function getStatusColor(date: string) {
//   const now = new Date();
//   const targetDate = new Date(date);
//   const diffDays = Math.ceil(
//     (targetDate.getTime() - now.getTime()) / (1000 * 3600 * 24)
//   );

//   if (diffDays > 15) return "bg-green-500";
//   if (diffDays > 0) return "bg-yellow-500";
//   return "bg-red-500";
// }

export default async function DashboardPage() {
  const companies = await getCompanies();
  const employees = await getEmployees();

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h1 className="mb-6 text-3xl font-bold">Dashboard da Empresa</h1>

          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">Quadro Geral</TabsTrigger>
              <TabsTrigger value="employees">
                Relatório de Empregados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <CardHeader>
                <CardTitle>Quadro Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  action="/api/filter-companies"
                  className="mb-4 flex gap-4"
                >
                  <Input name="companyName" placeholder="Filtrar por Empresa" />
                  <Button type="submit">Filtrar</Button>
                </form>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Qtd. Empregados</TableHead>
                      <TableHead>Itens no Prazo</TableHead>
                      <TableHead>Itens Próx. Reposição</TableHead>
                      <TableHead>Itens Fora do Prazo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company, index) => (
                      <TableRow key={index}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.employeesCount}</TableCell>
                        <TableCell>
                          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-green-500"></span>
                          {company.itemsInTime}
                        </TableCell>
                        <TableCell>
                          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-yellow-500"></span>
                          {company.itemsNearExpiration}
                        </TableCell>
                        <TableCell>
                          <span className="mr-2 inline-block h-4 w-4 rounded-full bg-red-500"></span>
                          {company.itemsExpired}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline">Abrir</Button>
                            <form action="/api/generate-company-report">
                              <input
                                type="hidden"
                                name="companyName"
                                value={company.name}
                              />
                              <Button type="submit">Gerar Relatório</Button>
                            </form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </TabsContent>

            <TabsContent value="employees">
              <CardHeader>
                <CardTitle>Relatório de Empregados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Situação</TableHead>
                      <TableHead>Itens</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.cpf}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>
                          <Button variant="outline">Ver Itens</Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline">Abrir</Button>
                            <form action="/api/generate-employee-report">
                              <input
                                type="hidden"
                                name="employeeName"
                                value={employee.name}
                              />
                              <Button type="submit">Gerar Relatório</Button>
                            </form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
