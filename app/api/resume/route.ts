import axios from "axios";
import { NextResponse } from "next/server";
import data from "@/resume.json"

export async function GET() {
  try {
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error || "Failed to fetch posts",
        },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
