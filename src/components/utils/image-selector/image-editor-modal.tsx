// image-editor-modal.tsx

import React, { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from './canvas-utils';

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
  isOpen: boolean;
  onClose: () => void;
  onSave: (image: Blob) => void;
  isRounded: boolean;
  initialImage: string | null;
  initialAdjustments?: ImageAdjustments;
  size?: { width: number; height: number };
}
const sizes: Record<'profile' | 'banner', any> = {
    profile: { width: 150, height: 150 },
    banner: { width: 820, height: 312 }
  };
export function ImageEditorModal({
  isOpen,
  onClose,
  onSave,
  isRounded,
  initialImage,
  size
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  if (!isOpen || !initialImage) return null;

  const handleSave = async () => {
    const cropped = await getCroppedImg(getImageUrl(initialImage), croppedAreaPixels!, rotation);
    onSave(cropped as Blob);
    onClose()
};
  const getImageUrl= (src:string | Blob)=>{
    if(typeof src ==="string")
    {
        return src;
    }
    else if(src instanceof Blob){
        return URL.createObjectURL(src)
    }
    else {
        return ""
    }
  }
  return (
    <div className='mt-12'>
      <div className="relative h-96 overflow-hidden rounded-md">
              <Cropper
                image={getImageUrl(initialImage)}
                crop={crop}
                cropShape={isRounded?"round":"rect"}
                zoom={zoom}
                rotation={rotation}
                aspect={
                  isRounded 
                    ? sizes.profile.width / sizes.profile.height 
                    : sizes.banner.width / sizes.banner.height
                }
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                  },
              
                }}
              />
            </div>

      <div className="controls mt-12 grid grid-cols-2 gap-4">
        <ControlSlider label="Zoom" value={zoom} onChange={setZoom} min={1} max={3} step={0.1} />
        <ControlSlider label="Rotate" value={rotation} onChange={setRotation} min={0} max={360} step={1} />
        <ControlSlider label="Brightness" value={brightness} onChange={setBrightness} min={0} max={100} step={1} />
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

function ControlSlider({
  label,
  value,
  onChange,
  min,
  max,
  step
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <p>{label}</p>
      <Slider
        className="w-[200px]"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}
