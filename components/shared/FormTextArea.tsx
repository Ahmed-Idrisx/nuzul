import { TextareaHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextAreaProps<T extends FieldValues> extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> {
  label: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
}

export default function FormTextArea<T extends FieldValues>({
  label,
  name,
  register,
  registerOptions,
  error,
  className = "",
  ...props
}: TextAreaProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-text-muted text-sm font-semibold sm:text-lg"
      >
        {label}
      </label>

      <textarea
        id={name}
        {...(register ? register(name, registerOptions) : {})}
        {...props}
        className={`w-full resize-none rounded-xl border bg-bg px-5 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted sm:text-base ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary-dark"
        } ${className}`}
      />

      {error && (
        <p className="text-xs font-medium text-red-500">{error.message}</p>
      )}
    </div>
  );
}
