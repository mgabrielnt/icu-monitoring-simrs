import React from "react";

export default function ContainerContent({
  children,
  className = "",
  wide = true, // <── default: wide mode
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`
        bg-white p-6 rounded-xl shadow 
        ${wide ? "max-w-[1800px]" : "max-w-[1200px]"} 
        w-full mx-auto 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
