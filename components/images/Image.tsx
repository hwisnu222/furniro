import React from "react";
import ImageNext from "next/image";
import { Skeleton } from "@mui/material";

export default function Image(props: any) {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" className="tw-h-full tw-w-full" />
      )}
      <ImageNext
        hidden={loading}
        alt="thumbnail"
        width={200}
        height={400}
        {...props}
        src={props.src && process.env.NEXT_PUBLIC_MEDIA + props.src}
        onLoad={() => {
          setLoading(false);
        }}
      />
    </>
  );
}
