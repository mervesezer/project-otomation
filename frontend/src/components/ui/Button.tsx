import { ButtonHTMLAttributes } from "react";
import { ImSpinner9 } from "react-icons/im";
import classnames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  loading?: boolean;
}

export default function Button({
  className,
  text,
  loading = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classnames(
        "px-4 py-2 font-medium tracking-wide text-white",
        "transition-colors duration-200 transform bg-blue-600 disabled:bg-opacity-50",
        "rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80",
        className
      )}
      {...rest}
    >
      {loading ? <ImSpinner9 className="animate-spin mx-auto" /> : text}
    </button>
  );
}
