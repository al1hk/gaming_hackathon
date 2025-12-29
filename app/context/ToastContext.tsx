"use client";

import React, { createContext, useContext, useCallback, useMemo, useState, type ReactNode } from "react";

type ToastType = "success" | "info" | "error";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed top-28 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "border px-4 py-3 bg-black/90 backdrop-blur text-xs font-mono uppercase tracking-widest max-w-xs " +
              (t.type === "success"
                ? "border-green-500/50 text-green-300"
                : t.type === "error"
                  ? "border-red-500/50 text-red-300"
                  : "border-green-500/20 text-gray-200")
            }
            onClick={() => removeToast(t.id)}
            role="status"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
