import React, { useState } from "react";
import Image from "next/image";

interface FallbackImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const FallbackImage = (props: FallbackImageProps) => {
  const { src, ...rest } = props;
  const [isErr, setIsErr] = useState(false);

  return (
    isErr ? <img src={src} alt={props.alt ?? ""} {...rest} /> : (
      <Image
        alt={props.alt ?? ""}
        {...rest}
        src={src}
        onError={() => {
          setIsErr(true);
        }}
      />
    )
  );
};

export default FallbackImage;
