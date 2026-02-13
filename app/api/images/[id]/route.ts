import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    const resultsDir = path.join(process.cwd(), "results");
    const filePath = path.join(resultsDir, `output-${id.split("-")[1]}.png`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Failed to delete image", { status: 500 });
  }
}
