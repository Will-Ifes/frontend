'use client';

import { useState, ChangeEvent, FormEvent, DragEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImagePlus, Upload } from 'lucide-react';

export default function Component() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Image submitted:', selectedImage);
    setIsLoading(false);
    alert('Image submitted successfully!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`group relative cursor-pointer transition-all duration-300 ease-in-out ${isDragging ? 'scale-105' : 'hover:scale-105'} ${selectedImage ? 'bg-transparent' : 'bg-gray-50'} flex aspect-square items-center justify-center overflow-hidden rounded-full border-2 border-dashed ${selectedImage ? 'border-transparent' : 'border-gray-300'} `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Selected image preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <div className="p-4 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag & drop or click to select
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
            <Button
              type="submit"
              disabled={!selectedImage || isLoading}
              className="w-full transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
