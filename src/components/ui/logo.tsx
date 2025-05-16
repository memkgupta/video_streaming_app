import Link from 'next/link';
import React from 'react';
// or 'next/link' if using Next.js

const Logo = ({ src = "/logo.png", alt = "App Logo", width = 100, height = 50, text = "MyApp", showText = true }) => {
  return (
    <Link href="/home" className="flex items-center gap-2">
      <img src={src} alt={alt} width={width} height={height} className="object-contain ml-2 mt-2" />
    
    </Link>
  );
};

export default Logo;