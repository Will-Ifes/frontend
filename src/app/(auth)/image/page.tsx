'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Component() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the image to your server
    console.log('Image submitted:', selectedImage);
    // For demo purposes, we'll just log to console
    alert('Image submitted successfully!');
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Circular Image Uploader</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-gray-100">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected image preview"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <Button type="button" variant="outline" size="sm">
                    Choose Image
                  </Button>
                </div>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Label>
            </div>
          </div>
          <CardFooter className="mt-4 flex justify-center">
            <Button type="submit" disabled={!selectedImage}>
              Submit Image
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
