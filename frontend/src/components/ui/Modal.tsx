import { HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  label?: string;
  onClickX?: () => void;
}

export default function Modal({
  visible = false,
  children,
  onClickX,
  label,
  ...rest
}: ModalProps) {
  useEffect(() => {
    if (visible) {
      document.documentElement.className = "overflow-hidden";
    } else {
      document.documentElement.className = "";
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="absolute w-full h-full bg-slate-500 z-50 bg-opacity-50 backdrop-blur-sm overflow-hidden flex justify-center items-center">
      <div
        className="bg-white rounded-lg shadow-md px-5 py-3 w-96 relative"
        {...rest}
      >
        <button className="absolute right-5" onClick={onClickX}>
          <FiX size={20} />
        </button>
        {label ? (
          <>
            <h1 className="text-2xl mb-2">{label}</h1>
            <hr />
          </>
        ) : null}

        <div className="flex flex-col gap-3 mt-3">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
