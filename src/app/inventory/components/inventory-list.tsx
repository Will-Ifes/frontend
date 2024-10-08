import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, Plus } from "lucide-react";

// Mock data - replace with actual API calls
const mockItems = [
  {
    code: "001",
    description: "Item 1",
    brand: "Brand A",
    unit: "pcs",
    quantity: 100,
    avgPurchaseValue: 10.5,
    avgMonthlyConsumption: 20,
  },
  {
    code: "002",
    description: "Item 2",
    brand: "Brand B",
    unit: "kg",
    quantity: 50,
    avgPurchaseValue: 25.0,
    avgMonthlyConsumption: 5,
  },
];

export default function InventoryList() {
  const [items, setItems] = useState(mockItems);
  const [filters, setFilters] = useState({
    code: "",
    description: "",
    brand: "",
  });

  const handleItens = () => {
    // atualizzar a lista de itens com a api
    setItems([
      ...items,
      {
        code: "",
        description: "",
        brand: "",
        unit: "",
        quantity: 0,
        avgPurchaseValue: 0,
        avgMonthlyConsumption: 0,
      },
    ]);
  };

  console.log(handleItens);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredItems = items.filter(
    (item) =>
      item.code.includes(filters.code) &&
      item.description
        .toLowerCase()
        .includes(filters.description.toLowerCase()) &&
      item.brand.toLowerCase().includes(filters.brand.toLowerCase())
  );

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Código"
          value={filters.code}
          onChange={(e) => handleFilterChange("code", e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Descrição"
          value={filters.description}
          onChange={(e) => handleFilterChange("description", e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Marca"
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Valor Médio de Compra</TableHead>
            <TableHead>Média de Consumo Mensal</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>R$ {item.avgPurchaseValue.toFixed(2)}</TableCell>
              <TableCell>{item.avgMonthlyConsumption}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Entrada
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
