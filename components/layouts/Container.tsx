import React from "react";
import clsx from "clsx";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Container(props: ContainerProps) {
  return (
    <div
      {...props}
      className={clsx(
        "tw-container tw-mx-auto tw-px-2 md:tw-px-10",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
