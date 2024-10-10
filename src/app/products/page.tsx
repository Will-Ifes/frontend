'use client';

import { useState } from 'react';
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
import { PlusIcon, FileDownIcon, Pencil, Trash2 } from 'lucide-react';
import ProductModal from './components/product-modal';
import DeleteConfirmationModal from './components/delete-confirmation-modal';
import ProtectedRoute from '@/components/application-bases/protected-route-client';

// Mock data - replace with actual API calls in a real application
const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    complement: 'Complement 1',
    brand: 'Brand 1',
    unit: 'Unit 1',
    quantity: 10,
    suppliers: ['Supplier 1', 'Supplier 2'],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    complement: 'Complement 2',
    brand: 'Brand 2',
    unit: 'Unit 2',
    quantity: 20,
    suppliers: ['Supplier 3'],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filters, setFilters] = useState({
    name: '',
    brand: '',
    code: '',
    supplier: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{
    id: number;
    name: string;
    description: string;
    complement: string;
    brand: string;
    unit: string;
    quantity: number;
    suppliers: string[];
  } | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<{
    id: number;
    name: string;
    description: string;
    complement: string;
    brand: string;
    unit: string;
    quantity: number;
    suppliers: string[];
  } | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      product.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
      (filters.code ? product.id.toString() === filters.code : true) &&
      (filters.supplier
        ? product.suppliers.some((s) =>
            s.toLowerCase().includes(filters.supplier.toLowerCase()),
          )
        : true),
  );

  const handleCreateProduct = (newProduct: {
    name: string;
    description: string;
    complement?: string;
    brand: string;
    unit: string;
    quantity: number;
    suppliers: string;
  }) => {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: prev.length + 1,
        complement: newProduct.complement || '',
        suppliers: newProduct.suppliers.split(', '),
      },
    ]);
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = (updatedProduct: {
    id: number;
    name: string;
    description: string;
    complement?: string;
    brand: string;
    unit: string;
    quantity: number;
    suppliers: string;
  }) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id
          ? {
              ...p,
              ...updatedProduct,
              suppliers: updatedProduct.suppliers.split(', '),
            }
          : p,
      ),
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct?.id));
    setDeletingProduct(null);
  };

  const exportToCSV = () => {
    // Implement CSV export logic here
    console.log('Exporting to CSV...');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto min-h-[40rem] p-4">
        <h1 className="mb-4 text-2xl font-bold">Product Management</h1>

        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input
            placeholder="Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
          <Input
            placeholder="Brand"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          />
          <Input
            placeholder="Code"
            value={filters.code}
            onChange={(e) => handleFilterChange('code', e.target.value)}
          />
          <Input
            placeholder="Supplier"
            value={filters.supplier}
            onChange={(e) => handleFilterChange('supplier', e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="mb-4 flex justify-between">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Product
          </Button>
          <Button onClick={exportToCSV}>
            <FileDownIcon className="mr-2 h-4 w-4" /> Export to CSV
          </Button>
        </div>

        {/* Products Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Complement</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Suppliers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.complement}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.suppliers.join(', ')}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeletingProduct(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modals */}
        <ProductModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProduct}
        />
        {editingProduct && (
          <ProductModal
            isOpen={true}
            onClose={() => setEditingProduct(null)}
            onSubmit={(data) =>
              handleEditProduct({ ...editingProduct, ...data })
            }
            product={{
              ...editingProduct,
              suppliers: editingProduct.suppliers.join(', '),
            }}
          />
        )}
        {deletingProduct && (
          <DeleteConfirmationModal
            isOpen={true}
            onClose={() => setDeletingProduct(null)}
            onConfirm={handleDeleteProduct}
            instanceName={deletingProduct.name}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
