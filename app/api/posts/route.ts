import axios from "axios";
import config from "@/config";
import apiEndpoints from "@/config/apiEndpoints";
import { NextResponse } from "next/server";

export async function GET() {
  const endpoint = config.api.host + apiEndpoints.posts.list();

  const headers = {
    "content-type": "application/json",
  };

  try {
    const response = await axios.get(endpoint, { headers, timeout: 10000 });
    return NextResponse.json(response.data);
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
