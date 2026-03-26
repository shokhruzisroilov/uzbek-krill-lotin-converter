"use client";

import { CheckCircle, XCircle, InfoIcon, X } from "lucide-react";
import { useToast } from "./ToastContext";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            animate-fade-in
            px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
            flex items-center justify-between gap-3
            smooth-transition
            ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-primary-600"
            }
          `}
        >
          <span className="flex items-center gap-2">
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "error" && <XCircle size={18} />}
            {toast.type === "info" && <InfoIcon size={18} />}
            {toast.message}
          </span>
          <button
            onClick={() => removeToast(toast.id)}
            className="hover:opacity-80 transition-opacity"
            aria-label="Yopish"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
