"use client";

import { useState } from "react";
import Button from "./Button";
import Toast from "./Toast";

type Props = {
  imageUrl: string;
  onDelete: () => void;
  onReset: () => void;
};

export default function ResultCard({ imageUrl, onDelete, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <img
        src={imageUrl}
        alt="result"
        className="mx-auto max-h-64 rounded-lg"
      />

      <div className="flex gap-2">
        <Button onClick={onReset}>New Image</Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>

      {copied && <Toast message="Copied!" onClose={() => setCopied(false)} />}
    </div>
  );
}
