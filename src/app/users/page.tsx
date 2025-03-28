'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, FileDown, Eye } from 'lucide-react';
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
import UserModal from './components/user-modal';
import ViewUserModal from './components/view-user-modal';
import DeleteConfirmationModal from '../products/components/delete-confirmation-modal';
import ProtectedRoute from '@/components/application-bases/protected-route-client';
import { Card } from '@/components/ui/card';

// Mock data - replace with actual API calls in a real application
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    cpf: '123.456.789-00',
    company: 'ABC Corp',
    birthDate: '1990-01-01',
    dailyExposureHours: 8,
  },
  {
    id: '2',
    name: 'Jane Smith',
    cpf: '987.654.321-00',
    company: 'XYZ Inc',
    birthDate: '1985-05-15',
    dailyExposureHours: 6,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    cpf: '456.789.123-00',
    company: 'DEF Ltd',
    birthDate: '1992-11-30',
    dailyExposureHours: 7,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({ name: '', cpf: '', company: '' });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.cpf.includes(filters.cpf) &&
      user.company.toLowerCase().includes(filters.company.toLowerCase()),
  );

  interface User {
    id: string;
    name: string;
    cpf: string;
    company: string;
    birthDate: string;
    dailyExposureHours: number;
  }

  const handleCreateUser = (newUser: Omit<User, 'id'>): void => {
    setUsers((prev) => [
      ...prev,
      { ...newUser, id: (prev.length + 1).toString() },
    ]);
    setIsCreateModalOpen(false);
  };

  const handleEditUser = (updatedUser: {
    id?: string;
    name: string;
    cpf: string;
    company: string;
    birthDate: string;
    dailyExposureHours: number;
  }): void => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u)),
    );
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser?.id));
    setDeletingUser(null);
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log('Exporting data...');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto min-h-[40rem] p-4">
        <Card className="p-6">
          <h1 className="mb-4 text-2xl font-bold">Gerenciamento de Usuários</h1>

          <div className="mb-4 flex flex-wrap gap-4">
            <Input
              placeholder="Filtrar por nome"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.target.value }))
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Filtrar por CPF"
              value={filters.cpf}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, cpf: e.target.value }))
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Filtrar por empresa"
              value={filters.company}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, company: e.target.value }))
              }
              className="max-w-xs"
            />
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Usuário
            </Button>
            <Button onClick={handleExport} variant="outline">
              <FileDown className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Horas de Exposição Diária</TableHead>
                <TableHead className="w-1">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.cpf}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                  <TableCell>{user.dailyExposureHours}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingUser(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingUser(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <UserModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateUser}
        />
        {editingUser && (
          <UserModal
            isOpen={true}
            onClose={() => setEditingUser(null)}
            onSubmit={handleEditUser}
            user={editingUser}
          />
        )}
        {deletingUser && (
          <DeleteConfirmationModal
            isOpen={true}
            onClose={() => setDeletingUser(null)}
            onConfirm={handleDeleteUser}
            instanceName={deletingUser.name}
          />
        )}
        {viewingUser && (
          <ViewUserModal
            isOpen={true}
            onClose={() => setViewingUser(null)}
            user={viewingUser}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
