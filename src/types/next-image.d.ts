declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

  export interface ImageProps
    extends DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    objectPosition?: string;
    onLoadingComplete?: (result: {
      naturalWidth: number;
      naturalHeight: number;
    }) => void;
  }

  export default function Image(props: ImageProps): JSX.Element;
}
