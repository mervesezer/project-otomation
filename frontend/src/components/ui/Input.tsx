import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={classNames(
        "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border",
        "border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring",
        className
      )}
      
      {...rest}
    />
  );
}
