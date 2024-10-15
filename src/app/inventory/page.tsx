'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InventoryList from './components/inventory-list';
import InventoryEntry from './components/inventory-entry';
import InventoryExit from './components/inventory-exit';
import InventoryMovements from './components/inventory-movements';
import ProtectedRoute from '@/components/application-bases/protected-route-client';
import { Card } from '@/components/ui/card';

export default function InventoryControl() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h1 className="mb-4 text-2xl font-bold">Controle de Estoque</h1>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">Consultar Itens</TabsTrigger>
              <TabsTrigger value="entry">Entrada</TabsTrigger>
              <TabsTrigger value="exit">Saída</TabsTrigger>
              <TabsTrigger value="movements">Movimentações</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <InventoryList />
            </TabsContent>
            <TabsContent value="entry">
              <InventoryEntry />
            </TabsContent>
            <TabsContent value="exit">
              <InventoryExit />
            </TabsContent>
            <TabsContent value="movements">
              <InventoryMovements />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
