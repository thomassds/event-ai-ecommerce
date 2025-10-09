import { ReactNode } from "react";

interface BannerItemProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  role?: string;
  ariaLabel?: string;
}

export function BannerItem({
  src,
  alt,
  className = "",
  children,
  role = "banner",
  ariaLabel,
}: BannerItemProps) {
  return (
    <div
      role={role}
      aria-label={ariaLabel || alt}
      className={`
        w-full h-full min-h-[480px]
        pt-[62px] pb-[62px] px-4 md:px-[184px]
        flex items-center justify-center
        relative gap-2 overflow-hidden
        bg-[#CAB0F2]
        ${className}
      `}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
}
