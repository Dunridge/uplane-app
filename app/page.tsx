"use client";

import { useState } from "react";
import Header from "@/components/Header";
import UploadCard from "@/components/UploadCard";
import ProcessingState from "@/components/ProcessingState";
import ResultCard from "@/components/ResultCard";

import { uploadImage, deleteImage } from "@/lib/api";

type Status = "idle" | "processing" | "success";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");

  const handleUpload = async (file: File) => {
    setStatus("processing");

    try {
      const data = await uploadImage(file);

      setImageUrl(data.url);
      setImageId(data.id);
      setStatus("success");
    } catch {
      setStatus("idle");
      alert("Upload failed");
    }
  };

  const handleDelete = async () => {
    await deleteImage(imageId);
    setStatus("idle");
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center gap-8"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <Header />

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">
          Image Transformation
        </h1>
        <p className="text-gray-500">Remove background and flip horizontally</p>
      </div>

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
