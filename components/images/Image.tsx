import React from "react";
import ImageNext from "next/image";

export default function Image(props: any) {
  console.log(props);
  return (
    <ImageNext
      alt="thumbnail"
      width={200}
      height={400}
      {...props}
      src={props.src && process.env.NEXT_PUBLIC_MEDIA + props.src}
    />
  );
}
