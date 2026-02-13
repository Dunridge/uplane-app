"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, onClose, duration = 2000 }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 right-6 rounded-lg bg-black px-4 py-2 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}
