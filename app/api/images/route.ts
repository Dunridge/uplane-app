import { NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) throw new Error("No file uploaded");

    const uploadedBuffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const resultsDir = path.join(process.cwd(), "results");
    if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

    const timestamp = Date.now();
    const inputPath = path.join(uploadsDir, `input-${timestamp}.png`);
    const outputPath = path.join(resultsDir, `output-${timestamp}.png`);

    // Save uploaded file
    fs.writeFileSync(inputPath, uploadedBuffer);

    const pythonScriptPath = path.join(
      process.cwd(),
      "scripts",
      "process_image.py"
    );

    await new Promise<void>((resolve, reject) => {
      execFile(
        "/opt/anaconda3/bin/python", // path to your Conda Python
        [pythonScriptPath, inputPath, outputPath],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    const processedBuffer = fs.readFileSync(outputPath);
    const base64Image = processedBuffer.toString("base64");

    fs.unlinkSync(inputPath);

    return NextResponse.json({
      id: `image-${timestamp}`,
      url: `data:image/png;base64,${base64Image}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
};
