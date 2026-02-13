"use client";

import Header from "@/components/Header";
import UploadCard from "@/components/UploadCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-gray-50 p-8">
      <Header />
      <UploadCard onUpload={() => {}} />
    </main>
  );
}
