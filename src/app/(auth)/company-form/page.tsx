'use client';

import { useState, ChangeEvent, FormEvent, DragEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Upload, Building2, Mail, Phone, Globe } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroEmpresa() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    website: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileExplorer = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted:', { ...formData, logo: selectedImage });
    setIsLoading(false);
    toast.success('Empresa cadastrada com sucesso!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Cadastro de Empresa
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Preencha os dados da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6 flex flex-col items-center">
              <div
                className={`group relative cursor-pointer transition-all duration-300 ease-in-out ${isDragging ? 'scale-105' : 'hover:scale-105'} ${selectedImage ? 'bg-transparent' : 'bg-gray-50'} flex items-center justify-center overflow-hidden border-2 border-dashed ${selectedImage ? 'border-transparent' : 'border-gray-300'} h-40 w-60`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => openFileExplorer()}
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Logo da empresa"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="p-4 text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Arraste ou clique para selecionar o logo
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={handleImageChange}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Upload className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="nome" className="text-gray-700">
                  Nome da Empresa
                </Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o nome da empresa"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="email" className="text-gray-700">
                  E-mail
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="empresa@exemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="telefone" className="text-gray-700">
                  Telefone
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="(00) 0000-0000"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="website" className="text-gray-700">
                  Website
                </Label>
                <div className="relative mt-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full rounded-md border py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.exemplo.com"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full transform rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar Empresa'}
          </Button>
        </CardFooter>
      </Card>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
