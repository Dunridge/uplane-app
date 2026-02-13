export type UploadResponse = {
  id: string;
  url: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/images", {
    method: "POST",
    body: form,
  });

  return handleResponse<UploadResponse>(res);
}

export async function deleteImage(id: string): Promise<void> {
  const res = await fetch(`/api/images/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }
}
