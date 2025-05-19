import { BACKEND_BASE_URL as BACKEND_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState, forwardRef } from "react";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  ({ src, className, ...props }, ref) => {
    const [imageUrl, setImageUrl] = useState<string|Blob>(src ?? "");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
      if (!src) return;

      setLoading(true);
      setError(false);

      const fetchImage = async () => {
        if(typeof src === "string"){
  try {
        
          const req = await axios.get(src, { responseType: "text" });
          setImageUrl(req.data); // assuming backend returns a full image URL or base64
        } catch (err) {
          console.error("Error fetching image:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
        }
      
      };
      if(typeof src === "string")
      {
  if (src.startsWith(BACKEND_URL)) {
        fetchImage();
      } else {
        setImageUrl(src);
        setLoading(false);
      }
      }
      else{
       const blobUrl = URL.createObjectURL(src);
        setImageUrl(blobUrl);
        setLoading(false)
      }

    }, [src]);

    if (!src) return null;

    if (loading) return <div>Loading image...</div>;

    if (error) return <div>Failed to load image</div>;

    return <img ref={ref} src={imageUrl} className={className} {...props} />;
  }
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
