import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    id: "test-id",
    url: "https://picsum.photos/400",
  });
}
