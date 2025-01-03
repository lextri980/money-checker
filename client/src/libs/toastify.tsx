"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        style={
          {
            // "--toastify-color-success": "#2563eb", // blue-600
            // "--toastify-color-error": "#18cd69", // red-600
            // "--toastify-color-info": "#4b5563", // gray-600
            // "--toastify-color-warning": "#fb923c", // orange-400
            // "--toastify-color-progress-error": "#FB4141",
            // "--toastify-icon-color-error": "#FB4141",
          } as React.CSSProperties
        }
        autoClose={3000}
      />
    </>
  );
}
