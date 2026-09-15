import { InputHTMLAttributes, ReactNode } from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  label: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  error?: FieldError;
  icon?: ReactNode;
}

const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  icon,
  ...props
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-text-muted text-sm font-semibold sm:text-lg"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </span>
        )}

        <input
          id={name}
          {...(register ? register(name) : {})}
          {...props}
          className={`w-full rounded-xl border bg-bg py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted sm:text-base ${
            icon ? "pl-12" : "px-5"
          } ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary-dark"
          } ${props.className ?? ""}`}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormInput;
