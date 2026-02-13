"use client";

import Header from "@/components/Header";
import ProcessingState from "@/components/ProcessingState";
import ResultCard from "@/components/ResultCard";
import UploadCard from "@/components/UploadCard";
import { useState } from "react";

type Status = "idle" | "processing" | "success";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  // TODO: write the endpoints for doing the upload of the images
  const handleUpload = async (file: File) => {
    setStatus("processing");

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    setImageUrl(data.url);
    setImageId(data.id);
    setStatus("success");
  };

  const handleDelete = async () => {
    await fetch(`/api/images/${imageId}`, {
      method: "DELETE",
    });

    setStatus("idle");
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-gray-50 p-8">
      <Header />

      {status === "idle" && <UploadCard onUpload={handleUpload} />}

      {status === "processing" && <ProcessingState />}

      {status === "success" && (
        <ResultCard
          imageUrl={imageUrl}
          onDelete={handleDelete}
          onReset={() => setStatus("idle")}
        />
      )}
    </main>
  );
}
