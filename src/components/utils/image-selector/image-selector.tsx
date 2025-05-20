// ImageSelector.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Upload, Pencil } from 'lucide-react';
import { toast } from 'sonner';

import { ImageEditorModal } from './image-editor-modal';
import { BACKEND_BASE_URL } from '@/constants';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import CustomImage from '@/components/ui/image';

interface ImageAdjustments {
  brightness: number;
  contrast: number;
  rotation: number;
  scale: number;
  x: number;
  y: number;
  isRound: boolean;
}

interface Props {
  preview: string | null;
  isRound: boolean;
  type: string;
  title?: string;
  key?:any
  setImage: (url: string) => void;
  size?: { width: number; height: number };
}

export function ImageSelector({ preview, isRound, type, title, setImage, size,key }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string |Blob| null>(preview);
  const [isChanged, setIsChanged] = useState(false);

  const [adjustments, setAdjustments] = useState<ImageAdjustments>({
    brightness: 100,
    contrast: 100,
    rotation: 0,
    scale: 2,
    x: 0,
    y: 0,
    isRound
  });

  const handleSave = async (image: Blob) => {
    try {
      setSelectedImage(image)
      setImage(URL.createObjectURL(image))
      // const res = await axios.post(`${BACKEND_BASE_URL}/uploads/start`, {
      //   metaData: {
      //     title: title || `${type} image from user`,
      //     type,
      //     mimeType: image.type,
      //     fileSize: image.size,
      //     protected: false
      //   }
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${Cookies.get('access-token')}`
      //   }
      // });

      // const preSignedUrl = res.data.preSignedUrl;
      // await axios.put(preSignedUrl, image, {
      //   headers: { "Content-Type": image.type }
      // });

      // setImage(res.data.url);
      // setSelectedImage(res.data.url);
      // setIsChanged(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          setIsChanged(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto p-6">
      <input
        type="file"
        id={`image-upload-input-${type}`}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div
        onClick={() => document.getElementById(`image-upload-input-${type}`)?.click()}
        className={`border-2 border-dashed border-gray-300 text-center cursor-pointer hover:border-blue-500 transition-colors relative ${adjustments.isRound ? 'rounded-full' : 'rounded-lg'}`}
        style={{
          height: size?.height || 200,
          width: size?.width || 200,
          margin: '0 auto',
          objectFit: 'contain'
        }}
      >
        {selectedImage ? (
          <>
            <div className={`absolute inset-0 overflow-hidden ${adjustments.isRound ? 'rounded-full' : 'rounded-lg'}`}>
              <CustomImage
                src={selectedImage}
                className="max-w-none"
                alt="Selected"
                width="100%"
                height="100%"
                draggable="false"
              />
            </div>
            <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
              <Pencil className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">Click to add image</p>
          </div>
        )}
      </div>

      {isChanged && (
        <Dialog   key={key?key:""} defaultOpen open={isChanged} onOpenChange={setIsChanged}>
          <DialogContent className="max-h-screen w-full "  style={{
      width: size ? `${size.width + 32}px` : 'auto',
      height: size ? `${size.height + 300}px` : 'auto',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh )',
      overflow: 'visible', // Prevent scroll if you want full fit
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

            <ImageEditorModal
              size={size}
              isRounded={isRound}
              isOpen={isChanged}
              onClose={() => setIsChanged(false)}
              onSave={handleSave}
              initialImage={selectedImage as string}
              initialAdjustments={adjustments}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
