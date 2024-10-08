import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual API calls
const mockEntries = [
  {
    id: 1,
    material: "Item 1",
    supplier: "Supplier A",
    date: "2023-05-01",
    quantity: 100,
    value: 1000,
  },
  {
    id: 2,
    material: "Item 2",
    supplier: "Supplier B",
    date: "2023-05-02",
    quantity: 50,
    value: 750,
  },
];

const mockExits = [
  {
    id: 1,
    material: "Item 1",
    client: "Client X",
    employee: "John Doe",
    date: "2023-05-03",
    quantity: 20,
  },
  {
    id: 2,
    material: "Item 2",
    client: "Client Y",
    employee: "Jane Smith",
    date: "2023-05-04",
    quantity: 10,
  },
];

export default function InventoryMovements() {
  const [entriesFilters, setEntriesFilters] = useState({
    material: "",
    supplier: "",
    startDate: "",
    endDate: "",
  });
  const [exitsFilters, setExitsFilters] = useState({
    material: "",
    client: "",
    employee: "",
    startDate: "",
    endDate: "",
  });

  const handleEntriesFilterChange = (key: string, value: string) => {
    setEntriesFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleExitsFilterChange = (key: string, value: string) => {
    setExitsFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredEntries = mockEntries.filter(
    (entry) =>
      entry.material
        .toLowerCase()
        .includes(entriesFilters.material.toLowerCase()) &&
      entry.supplier
        .toLowerCase()
        .includes(entriesFilters.supplier.toLowerCase()) &&
      (!entriesFilters.startDate || entry.date >= entriesFilters.startDate) &&
      (!entriesFilters.endDate || entry.date <= entriesFilters.endDate)
  );

  const filteredExits = mockExits.filter(
    (exit) =>
      exit.material
        .toLowerCase()
        .includes(exitsFilters.material.toLowerCase()) &&
      exit.client.toLowerCase().includes(exitsFilters.client.toLowerCase()) &&
      exit.employee
        .toLowerCase()
        .includes(exitsFilters.employee.toLowerCase()) &&
      (!exitsFilters.startDate || exit.date >= exitsFilters.startDate) &&
      (!exitsFilters.endDate || exit.date <= exitsFilters.endDate)
  );

  return (
    <Tabs defaultValue="entries">
      <TabsList>
        <TabsTrigger value="entries">Entradas</TabsTrigger>
        <TabsTrigger value="exits">Saídas</TabsTrigger>
      </TabsList>

      <TabsContent value="entries">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Material"
              value={entriesFilters.material}
              onChange={(e) =>
                handleEntriesFilterChange("material", e.target.value)
              }
            />
            <Input
              placeholder="Fornecedor"
              value={entriesFilters.supplier}
              onChange={(e) =>
                handleEntriesFilterChange("supplier", e.target.value)
              }
            />
            <Input
              type="date"
              placeholder="Data Início"
              value={entriesFilters.startDate}
              onChange={(e) =>
                handleEntriesFilterChange("startDate", e.target.value)
              }
            />
            <Input
              type="date"
              placeholder="Data Fim"
              value={entriesFilters.endDate}
              onChange={(e) =>
                handleEntriesFilterChange("endDate", e.target.value)
              }
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.material}</TableCell>
                  <TableCell>{entry.supplier}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.quantity}</TableCell>
                  <TableCell>R$ {entry.value.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="exits">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Material"
              value={exitsFilters.material}
              onChange={(e) =>
                handleExitsFilterChange("material", e.target.value)
              }
            />
            <Input
              placeholder="Empresa (Cliente)"
              value={exitsFilters.client}
              onChange={(e) =>
                handleExitsFilterChange("client", e.target.value)
              }
            />
            <Input
              placeholder="Empregado"
              value={exitsFilters.employee}
              onChange={(e) =>
                handleExitsFilterChange("employee", e.target.value)
              }
            />
            <Input
              type="date"
              placeholder="Data Início"
              value={exitsFilters.startDate}
              onChange={(e) =>
                handleExitsFilterChange("startDate", e.target.value)
              }
            />
            <Input
              type="date"
              placeholder="Data Fim"
              value={exitsFilters.endDate}
              onChange={(e) =>
                handleExitsFilterChange("endDate", e.target.value)
              }
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Empresa (Cliente)</TableHead>
                <TableHead>Empregado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExits.map((exit) => (
                <TableRow key={exit.id}>
                  <TableCell>{exit.material}</TableCell>
                  <TableCell>{exit.client}</TableCell>
                  <TableCell>{exit.employee}</TableCell>
                  <TableCell>{exit.date}</TableCell>
                  <TableCell>{exit.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
