import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

const MainButton = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  icon,
  disabled,
  className = "",
  fullWidth = false,
  ...props
}: MainButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "group flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary-dark active:scale-98 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base",
        fullWidth ? "w-full" : "w-fit",
        className,
      )}
    >
      <span>{isLoading ? loadingText : children}</span>
      {icon && (
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};

export default MainButton;
