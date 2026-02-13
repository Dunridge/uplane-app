import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

async function removeBackground(buffer: Buffer): Promise<Buffer> {
  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_KEY!,
    },
    body: (() => {
      const form = new FormData();
      form.append(
        "image_file",
        new Blob([new Uint8Array(buffer)]),
        "image.png"
      );
      form.append("size", "auto");
      return form;
    })(),
  });

  if (!res.ok) throw new Error("remove.bg failed");

  return Buffer.from(await res.arrayBuffer());
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) throw new Error("No file uploaded");

    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const bgRemovedBuffer = await removeBackground(inputBuffer);
    const flippedBuffer = await sharp(bgRemovedBuffer).flop().png().toBuffer();
    const base64 = flippedBuffer.toString("base64");

    return NextResponse.json({
      id: crypto.randomUUID(),
      url: `data:image/png;base64,${base64}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
